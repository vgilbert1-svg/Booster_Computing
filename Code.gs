/**
 * ==================================================================
 *  BOOSTER COMPUTING · Grades 6–8   (version 2)
 *  Google Apps Script web app, bound to one Google Sheet.
 *
 *  Roles
 *   • Administrator – ONE account only (the owner). Set automatically
 *     the first time "Set up" runs; stored in Script Properties.
 *   • Teacher – registers with their school account; the administrator
 *     approves the request and grants grade levels.
 *   • Student – registers with their student account; a teacher of that
 *     grade (or the administrator) approves. The administrator can
 *     grant, deny, remove or restore any student.
 *  Every action is written to the Activity tab (audit trail).
 *
 *  Lessons follow Cambridge Lower Secondary Computing (Hodder):
 *   Grade 6 → Stage 7 · Grade 7 → Stage 8 · Grade 8 → Stage 9
 * ==================================================================
 */

const GRADES = ['6', '7', '8'];
const STAGE_FOR_GRADE = { '6': '7', '7': '8', '8': '9' };
const STATUS = { PENDING: 'Pending', APPROVED: 'Approved', DENIED: 'Denied', REMOVED: 'Removed' };

/** Every tab in the Sheet and its columns. Add new columns at the END only. */
const SCHEMA = {
  Settings:    ['Key', 'Value'],
  Teachers:    ['Email', 'Name', 'RequestedGrades', 'Grades', 'Status', 'Message', 'RequestedOn', 'DecidedBy', 'DecidedOn', 'Note'],
  Students:    ['Email', 'Name', 'Grade', 'ClassId', 'Status', 'Message', 'RequestedOn', 'DecidedBy', 'DecidedOn', 'Note'],
  Classes:     ['ClassId', 'Grade', 'ClassName', 'Subject', 'TeacherEmail', 'Schedule', 'ClassroomCourseId', 'CreatedOn'],
  Topics:      ['TopicId', 'Grade', 'Unit', 'Order', 'Title', 'Objectives', 'VideoUrl', 'Explanation', 'Syntax', 'Example', 'Note',
                'BookRef', 'ResourceUrl', 'AttachmentUrl', 'TryItUrl', 'Published', 'UpdatedBy', 'UpdatedOn', 'ContentKey'],
  Questions:   ['QuestionId', 'TopicId', 'Order', 'Question', 'OptionA', 'OptionB', 'OptionC', 'OptionD', 'Answer'],
  Attendance:  ['Date', 'ClassId', 'StudentEmail', 'Status', 'MarkedBy', 'Timestamp'],
  Sessions:    ['SessionId', 'Email', 'Grade', 'Start', 'LastActive', 'Minutes', 'TopicId'],
  Progress:    ['Email', 'TopicId', 'Status', 'LastSection', 'UpdatedOn'],
  Submissions: ['Timestamp', 'Email', 'Grade', 'TopicId', 'TopicTitle', 'Score', 'Total', 'Percent', 'TabSwitches', 'AutoSubmitted', 'Answers'],
  Activity:    ['Timestamp', 'Email', 'Name', 'Role', 'Action', 'Target', 'Details', 'Grade']
};

const DEFAULT_SETTINGS = {
  SchoolName: 'Booster Computing',
  SchoolDomain: '',                // e.g. school.edu.vn – only these accounts may register (blank = any Google account)
  DefaultSubject: 'Computing',
  TargetPercent: 85,
  MaxTabSwitches: 3,
  TryItUrl: 'https://www.w3schools.com/python/trypython.asp?filename=demo_default',
  ActivityKeepDays: 120            // "Archive old activity" moves older rows to a separate Sheet
};

/* ================================================================
 *  MENU & SETUP
 * ================================================================ */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Booster')
    .addItem('1. Set up / repair sheets', 'setup')
    .addItem('2. Load book lessons (Grades 6–8)', 'loadBookLessonsMenu')
    .addItem('3. Show web app links', 'showLinks')
    .addSeparator()
    .addItem('Archive old activity', 'archiveActivityMenu')
    .addToUi();
}

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getScriptProperties();
  props.setProperty('SHEET_ID', ss.getId());
  if (!props.getProperty('ADMIN_EMAIL')) props.setProperty('ADMIN_EMAIL', lower_(Session.getEffectiveUser().getEmail()));

  Object.keys(SCHEMA).forEach(function (name) {
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);
    const h = SCHEMA[name];
    sh.getRange(1, 1, 1, h.length).setValues([h]).setFontWeight('bold').setBackground('#1f2937').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  });

  const st = ss.getSheetByName('Settings');
  const have = st.getLastRow() > 1 ? st.getRange(2, 1, st.getLastRow() - 1, 1).getValues().map(function (r) { return r[0]; }) : [];
  Object.keys(DEFAULT_SETTINGS).forEach(function (k) {
    if (have.indexOf(k) >= 0) return;
    let v = DEFAULT_SETTINGS[k];
    if (k === 'SchoolDomain') {
      const d = adminEmail_().split('@')[1] || '';
      v = /^(gmail|googlemail)\.com$/.test(d) ? '' : d;
    }
    st.appendRow([k, v]);
  });

  ['Sheet1', 'Trang tính1'].forEach(function (n) {
    const s = ss.getSheetByName(n);
    if (s && s.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(s);
  });

  let msg = 'Booster sheets are ready.\n\nAdministrator: ' + adminEmail_();
  if (ss.getSheetByName('Topics').getLastRow() === 1) {
    const n = loadBookLessons_();
    msg += '\nBook lessons loaded: ' + n.topics + ' topics, ' + n.questions + ' questions.';
  }
  log_({ email: adminEmail_(), name: 'Administrator', role: 'admin' }, 'admin.setup', '', 'Sheets set up / repaired', '');
  SpreadsheetApp.getUi().alert(msg + '\n\nNext: Deploy › New deployment › Web app\n(Execute as: Me · Access: Anyone within your school domain).');
}

function loadBookLessonsMenu() {
  const n = loadBookLessons_();
  SpreadsheetApp.getUi().alert('Added ' + n.topics + ' new topics and ' + n.questions + ' questions.\n' +
    'Topics that were already loaded (same ContentKey) were left unchanged, so your edits are safe.');
}

/** Adds every lesson from Content.gs that is not already in the Topics tab (matched by ContentKey). */
function loadBookLessons_() {
  const have = {};
  rows_('Topics').forEach(function (t) { if (t.ContentKey) have[t.ContentKey] = true; });
  let topics = 0, questions = 0;
  const txt = function (v) { return Array.isArray(v) ? v.join('\n') : (v || ''); };
  BOOK_LESSONS.forEach(function (L) {
    if (have[L.key]) return;
    L = { key: L.key, grade: L.grade, unit: L.unit, order: L.order, title: L.title, objectives: L.objectives,
          explanation: txt(L.explanation), syntax: txt(L.syntax), example: txt(L.example), note: txt(L.note),
          bookRef: L.bookRef, tryIt: L.tryIt, questions: L.questions };
    const tid = 'T' + shortId_();
    append_('Topics', {
      TopicId: tid, Grade: Number(L.grade), Unit: L.unit, Order: L.order, Title: L.title,
      Objectives: L.objectives.join('\n'), VideoUrl: '', Explanation: L.explanation, Syntax: L.syntax || '',
      Example: L.example || '', Note: L.note || '', BookRef: L.bookRef || '', ResourceUrl: '', AttachmentUrl: '',
      TryItUrl: L.tryIt || '', Published: 'Yes', UpdatedBy: 'book-lessons', UpdatedOn: new Date(), ContentKey: L.key
    });
    topics++;
    (L.questions || []).forEach(function (q, i) {
      append_('Questions', { QuestionId: 'Q' + shortId_(), TopicId: tid, Order: i + 1, Question: q[0],
        OptionA: q[1] || '', OptionB: q[2] || '', OptionC: q[3] || '', OptionD: q[4] || '', Answer: q[5] });
      questions++;
    });
  });
  return { topics: topics, questions: questions };
}

function showLinks() {
  const url = ScriptApp.getService().getUrl();
  const ui = SpreadsheetApp.getUi();
  if (!url) { ui.alert('Deploy the web app first: Deploy › New deployment › Web app.'); return; }
  const links = [['Register / sign-in page (share with everyone)', url], ['Teacher & admin portal', url + '?page=portal']]
    .concat(GRADES.map(function (g) { return ['Grade ' + g + ' page', url + '?page=grade&grade=' + g]; }));
  const html = '<div style="font-family:Arial;font-size:14px;line-height:1.7">' +
    links.map(function (l) { return '<b>' + l[0] + '</b><br><a href="' + l[1] + '" target="_blank">' + l[1] + '</a>'; }).join('<br><br>') + '</div>';
  ui.showModalDialog(HtmlService.createHtmlOutput(html).setWidth(640).setHeight(380), 'Booster web app links');
}

/* ================================================================
 *  WEB APP ENTRY
 *  (no params) → register / status page, or the user's home
 *  ?page=grade&grade=6 · ?page=portal
 * ================================================================ */

function doGet(e) {
  const p = (e && e.parameter) || {};
  const u = me_();
  const s = settings_();
  const staff = isStaff_(u);
  let page = p.page || (u.role === 'student' ? 'grade' : staff ? 'portal' : 'home');
  if (page === 'teacher') page = 'portal';
  let grade = String(p.grade || '');
  let notice = '';

  if (page === 'grade') {
    if (u.role === 'student') grade = u.grade;
    if (GRADES.indexOf(grade) < 0) { page = staff ? 'portal' : 'home'; }
    else if (!canGrade_(u, grade)) { page = staff ? 'portal' : 'home'; notice = 'You do not have access to the Grade ' + grade + ' page.'; }
  }
  if (page === 'portal' && !staff) { page = 'home'; if (p.page) notice = 'The portal is for approved teachers only.'; }
  if (['home', 'grade', 'portal'].indexOf(page) < 0) page = 'home';

  log_(u, 'page.view', page + (page === 'grade' ? ':' + grade : ''), notice, grade);

  const file = { home: 'Home', grade: 'Grade', portal: 'Portal' }[page];
  const t = HtmlService.createTemplateFromFile(file);
  t.boot = json_({
    user: publicUser_(u), grade: grade, stage: STAGE_FOR_GRADE[grade] || '', url: ScriptApp.getService().getUrl(),
    school: s.SchoolName, domain: s.SchoolDomain, target: Number(s.TargetPercent) || 85, notice: notice,
    classes: page === 'home' ? classesForRegistration_() : []
  });
  t.grade = grade;
  t.school = s.SchoolName || 'Booster Computing';
  t.isStudent = u.role === 'student';
  const title = page === 'grade' ? 'Grade ' + grade + ' · Booster' : page === 'portal' ? (u.role === 'admin' ? 'Admin' : 'Teacher') + ' Portal · Booster' : 'Booster Computing';
  return t.evaluate().setTitle(title).addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(name) { return HtmlService.createHtmlOutputFromFile(name).getContent(); }

/* ================================================================
 *  REGISTRATION (anyone signed in with a school account)
 * ================================================================ */

/** form: {type:'student'|'teacher', name, grade, grades:[], classId, message} */
function submitRegistration(form) {
  const u = me_();
  form = form || {};
  if (!u.email) throw new Error('Please sign in with your school Google account first.');
  if (u.role !== 'guest') throw new Error('This account already has access.');
  const domain = lower_(settings_().SchoolDomain);
  if (domain && u.email.split('@')[1] !== domain) throw new Error('Please use your @' + domain + ' school account to register.');
  const name = String(form.name || '').trim().replace(/\s+/g, ' ');
  if (name.length < 3) throw new Error('Please enter your full name.');
  const message = String(form.message || '').trim().slice(0, 300);

  withLock_(function () {
    const tRow = rows_('Teachers').find(function (r) { return lower_(r.Email) === u.email; });
    const sRow = rows_('Students').find(function (r) { return lower_(r.Email) === u.email; });
    const now = new Date();

    if (form.type === 'teacher') {
      if (sRow && sRow.Status !== STATUS.DENIED) throw new Error('This account is already registered as a student.');
      if (tRow && tRow.Status === STATUS.REMOVED) throw new Error('Your teacher access was removed. Please contact the administrator.');
      const grades = (form.grades || []).map(String).filter(function (g) { return GRADES.indexOf(g) >= 0; });
      if (!grades.length) throw new Error('Choose the grade level(s) you teach.');
      const data = { Email: u.email, Name: name, RequestedGrades: "'" + grades.join(','), Status: STATUS.PENDING,
                     Message: message, RequestedOn: now, DecidedBy: '', DecidedOn: '', Note: '' };
      if (tRow) update_('Teachers', tRow._row, data); else { data.Grades = ''; append_('Teachers', data); }
      log_(u, 'register.teacher', u.email, 'Requested grades ' + grades.join(', ') + (message ? ' · "' + message + '"' : ''), grades.join(','));
    } else if (form.type === 'student') {
      if (tRow && tRow.Status !== STATUS.DENIED) throw new Error('This account is already registered as a teacher.');
      if (sRow && sRow.Status === STATUS.REMOVED) throw new Error('Your access was removed. Please speak to your teacher.');
      const grade = String(form.grade || '');
      if (GRADES.indexOf(grade) < 0) throw new Error('Choose your grade.');
      let classId = String(form.classId || '');
      if (classId) {
        const c = rows_('Classes').find(function (x) { return x.ClassId === classId; });
        if (!c || String(c.Grade) !== grade) classId = '';
      }
      const data = { Email: u.email, Name: name, Grade: Number(grade), ClassId: classId, Status: STATUS.PENDING,
                     Message: message, RequestedOn: now, DecidedBy: '', DecidedOn: '', Note: '' };
      if (sRow) update_('Students', sRow._row, data); else append_('Students', data);
      log_(u, 'register.student', u.email, 'Requested Grade ' + grade + (classId ? ' · class ' + classId : '') + (message ? ' · "' + message + '"' : ''), grade);
    } else {
      throw new Error('Choose whether you are a student or a teacher.');
    }
  });
  resetCache_();
  return publicUser_(me_());
}

function classesForRegistration_() {
  return rows_('Classes').map(function (c) { return { id: c.ClassId, grade: String(c.Grade), name: c.ClassName }; });
}

/* ================================================================
 *  STUDENT-FACING API (also used when teachers/admin preview)
 * ================================================================ */

function getGradeData(grade) {
  const u = me_(); grade = String(grade);
  if (!canGrade_(u, grade)) throw new Error('You do not have access to Grade ' + grade + '.');
  const s = settings_();
  const staff = isStaff_(u);
  const qCount = {};
  rows_('Questions').forEach(function (q) { qCount[q.TopicId] = (qCount[q.TopicId] || 0) + 1; });
  const topics = rows_('Topics')
    .filter(function (t) { return String(t.Grade) === grade && (staff || yes_(t.Published)); })
    .sort(byUnitOrder_)
    .map(function (t) { return topicOut_(t, qCount[t.TopicId] || 0, s); });

  const progress = {}; let lastTopic = '', lastTime = '';
  rows_('Progress').forEach(function (p) {
    if (lower_(p.Email) !== u.email) return;
    progress[p.TopicId] = { status: p.Status, section: p.LastSection };
    if (String(p.UpdatedOn) > lastTime) { lastTime = String(p.UpdatedOn); lastTopic = p.TopicId; }
  });
  const scores = {};
  rows_('Submissions').forEach(function (r) {
    if (lower_(r.Email) !== u.email) return;
    const sc = scores[r.TopicId] || (scores[r.TopicId] = { best: 0, attempts: 0, last: 0 });
    sc.attempts++; sc.last = Number(r.Percent) || 0; sc.best = Math.max(sc.best, sc.last);
  });
  return { grade: grade, stage: STAGE_FOR_GRADE[grade], topics: topics, progress: progress, scores: scores,
           lastTopic: lastTopic, minutes: totalMinutes_(u.email), target: Number(s.TargetPercent) || 85,
           maxSwitches: Number(s.MaxTabSwitches) || 3, preview: staff };
}

function startSession(grade, topicId) {
  const u = me_();
  if (u.role !== 'student') return { id: '', row: 0, minutes: 0, preview: true };
  const out = withLock_(function () {
    const id = shortId_();
    const now = new Date();
    append_('Sessions', { SessionId: id, Email: u.email, Grade: grade, Start: now, LastActive: now, Minutes: 0, TopicId: topicId || '' });
    return { id: id, row: sheet_('Sessions').getLastRow() };
  });
  out.minutes = totalMinutes_(u.email);
  log_(u, 'session.start', grade, 'Total so far ' + out.minutes + ' min', grade);
  return out;
}

/** Called once a minute while the student is active on a visible tab. Adds at most 1 minute per ~minute. */
function heartbeat(sess, topicId) {
  const u = me_();
  if (u.role !== 'student' || !sess || !sess.row) return { ok: false };
  const sh = sheet_('Sessions');
  if (sess.row > sh.getLastRow()) return { ok: false };
  const rng = sh.getRange(sess.row, 1, 1, 7);
  const r = rng.getValues()[0];
  if (String(r[0]) !== String(sess.id) || lower_(r[1]) !== u.email) return { ok: false };
  const now = new Date();
  const cache = CacheService.getScriptCache();
  const key = 'hb_' + u.email;
  const c = cache.get(key);
  if (c) {
    const parts = c.split('|');
    if (parts[0] !== String(sess.id) && now.getTime() - Number(parts[1]) < 50000) return { ok: true, duplicate: true };
  }
  const last = r[4] instanceof Date ? r[4] : new Date(r[4]);
  let added = false;
  if (now - last >= 50000 || Number(r[5]) === 0) {
    r[4] = now; r[5] = Number(r[5] || 0) + 1; if (topicId) r[6] = topicId;
    rng.setValues([r]);
    cache.put(key, sess.id + '|' + now.getTime(), 300);
    added = true;
  }
  return { ok: true, added: added };
}

function saveProgress(topicId, status, section) {
  const u = me_();
  if (u.role !== 'student') return { ok: true, preview: true };
  const t = rows_('Topics').find(function (x) { return x.TopicId === topicId; });
  if (!t || !canGrade_(u, t.Grade)) throw new Error('Topic not found.');
  let changed = '';
  withLock_(function () {
    const ex = rows_('Progress').find(function (p) { return lower_(p.Email) === u.email && p.TopicId === topicId; });
    if (ex) {
      const keep = ex.Status === 'Completed' && status !== 'Completed' ? 'Completed' : status;
      if (keep !== ex.Status) changed = keep;
      update_('Progress', ex._row, { Status: keep, LastSection: section || '', UpdatedOn: new Date() });
    } else {
      changed = status;
      append_('Progress', { Email: u.email, TopicId: topicId, Status: status, LastSection: section || '', UpdatedOn: new Date() });
    }
  });
  if (changed === 'Completed') log_(u, 'lesson.complete', t.Title, '', t.Grade);
  return { ok: true };
}

/** Student opened a topic (for the audit trail). */
function openedTopic(topicId) {
  const u = me_();
  const t = rows_('Topics').find(function (x) { return x.TopicId === topicId; });
  if (!t || !canGrade_(u, t.Grade)) return;
  log_(u, 'lesson.open', t.Title, 'Unit ' + t.Unit, t.Grade);
}

/** English → Vietnamese for LESSON content only. Assessments never call this. */
function translateToVi(html, topicTitle) {
  const u = me_();
  if (u.role === 'guest') throw new Error('Please sign in.');
  html = String(html || '');
  if (!html.trim()) return '';
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, html, Utilities.Charset.UTF_8);
  const key = 'vi_' + Utilities.base64EncodeWebSafe(digest);
  const cache = CacheService.getScriptCache();
  log_(u, 'lesson.translate', topicTitle || '', 'English → Vietnamese', u.grade);
  const hit = cache.get(key);
  if (hit) return hit;
  const out = LanguageApp.translate(html, 'en', 'vi', { contentType: 'html' });
  try { cache.put(key, out, 21600); } catch (err) { /* too large to cache */ }
  return out;
}

function getQuiz(topicId) {
  const u = me_();
  const t = rows_('Topics').find(function (x) { return x.TopicId === topicId; });
  if (!t || !canGrade_(u, t.Grade)) throw new Error('Assessment not available.');
  const qs = rows_('Questions').filter(function (q) { return q.TopicId === topicId; }).sort(byOrder_)
    .map(function (q) {
      const opts = ['A', 'B', 'C', 'D'].map(function (k) { return { k: k, t: String(q['Option' + k] || '') }; })
        .filter(function (o) { return o.t.trim() !== ''; });
      return { id: q.QuestionId, q: String(q.Question), type: opts.length ? 'mcq' : 'text', options: shuffle_(opts) };
    });
  log_(u, 'quiz.start', t.Title, qs.length + ' questions', t.Grade);
  return { topicId: topicId, title: t.Title, questions: shuffle_(qs), maxSwitches: Number(settings_().MaxTabSwitches) || 3,
           target: Number(settings_().TargetPercent) || 85 };
}

function submitQuiz(topicId, answers, tabSwitches, autoSubmitted) {
  const u = me_();
  const t = rows_('Topics').find(function (x) { return x.TopicId === topicId; });
  if (!t || !canGrade_(u, t.Grade)) throw new Error('Assessment not available.');
  answers = answers || {};
  const qs = rows_('Questions').filter(function (q) { return q.TopicId === topicId; });
  let score = 0;
  const detail = qs.map(function (q) {
    const given = String(answers[q.QuestionId] || '').trim();
    const hasOpts = ['A', 'B', 'C', 'D'].some(function (k) { return String(q['Option' + k] || '').trim(); });
    let ok;
    if (hasOpts) ok = given.toUpperCase() === String(q.Answer).trim().charAt(0).toUpperCase();
    else {
      const englishOnly = /^[\x20-\x7E]*$/.test(given);
      const accepted = String(q.Answer).split('|').map(norm_);
      ok = englishOnly && given !== '' && accepted.indexOf(norm_(given)) >= 0;
    }
    if (ok) score++;
    return { q: q.QuestionId, a: given, ok: ok };
  });
  const total = qs.length;
  const percent = total ? Math.round(score / total * 1000) / 10 : 0;
  const target = Number(settings_().TargetPercent) || 85;
  if (u.role === 'student') {
    append_('Submissions', { Timestamp: new Date(), Email: u.email, Grade: t.Grade, TopicId: topicId, TopicTitle: t.Title,
      Score: score, Total: total, Percent: percent, TabSwitches: Number(tabSwitches) || 0,
      AutoSubmitted: autoSubmitted ? 'Yes' : 'No', Answers: JSON.stringify(detail).slice(0, 45000) });
    if (percent >= target) saveProgress(topicId, 'Completed', 'assessment');
  }
  log_(u, 'quiz.submit', t.Title, score + '/' + total + ' (' + percent + '%)' + (autoSubmitted ? ' · auto-submitted' : '') +
       (tabSwitches ? ' · ' + tabSwitches + ' tab switches' : ''), t.Grade);
  return { score: score, total: total, percent: percent, target: target, met: percent >= target,
           results: detail.map(function (d) { return { q: d.q, ok: d.ok }; }) };
}

/** Client-side events: integrity (tab switches, blocked copy/paste), downloads, link clicks. */
function logEvent(grade, event, detail) {
  const u = me_();
  if (!u.email) return;
  event = String(event || '').replace(/[^\w.:-]/g, '').slice(0, 60);
  if (!/^(integrity|lesson|link|download|ui)\./.test(event)) event = 'ui.' + event;
  log_(u, event, '', String(detail || '').slice(0, 500), grade || u.grade);
}

/* ================================================================
 *  PORTAL (teachers see their grade levels · admin sees everything)
 * ================================================================ */

function getPortalData() {
  const u = requireStaff_();
  const admin = u.role === 'admin';
  const s = settings_();
  const mins = minutesByEmail_();
  const inGrades = function (g) { return admin || u.grades.indexOf(String(g)) >= 0; };

  const classes = rows_('Classes').filter(function (c) { return inGrades(c.Grade); }).map(function (c) {
    return { id: c.ClassId, grade: String(c.Grade), name: c.ClassName, subject: c.Subject, teacher: lower_(c.TeacherEmail),
             schedule: c.Schedule, courseId: String(c.ClassroomCourseId || ''), mine: lower_(c.TeacherEmail) === u.email };
  });
  const students = rows_('Students').filter(function (r) { return inGrades(r.Grade); }).map(function (r) {
    const e = lower_(r.Email);
    return { email: e, name: r.Name, grade: String(r.Grade), classId: r.ClassId, status: r.Status, message: r.Message,
             requestedOn: r.RequestedOn, decidedBy: r.DecidedBy, decidedOn: r.DecidedOn, note: r.Note, minutes: mins[e] || 0 };
  });
  const qCount = {};
  rows_('Questions').forEach(function (q) { qCount[q.TopicId] = (qCount[q.TopicId] || 0) + 1; });
  const topics = rows_('Topics').filter(function (t) { return inGrades(t.Grade); }).sort(byUnitOrder_)
    .map(function (t) { return topicOut_(t, qCount[t.TopicId] || 0, s); });

  const out = {
    user: publicUser_(u), classes: classes, students: students, topics: topics,
    target: Number(s.TargetPercent) || 85, url: ScriptApp.getService().getUrl(), today: today_(),
    stages: STAGE_FOR_GRADE
  };
  if (admin) {
    const ss = ss_();
    out.teachers = rows_('Teachers').map(function (t) {
      return { email: lower_(t.Email), name: t.Name, requested: gradesOf_(t.RequestedGrades), grades: gradesOf_(t.Grades),
               status: t.Status, message: t.Message, requestedOn: t.RequestedOn, decidedOn: t.DecidedOn, note: t.Note };
    });
    out.settings = { SchoolName: s.SchoolName, SchoolDomain: s.SchoolDomain, DefaultSubject: s.DefaultSubject,
                     TargetPercent: s.TargetPercent, MaxTabSwitches: s.MaxTabSwitches, TryItUrl: s.TryItUrl,
                     ActivityKeepDays: s.ActivityKeepDays, AdminEmail: adminEmail_() };
    out.downloads = {
      sheetUrl: ss.getUrl(),
      xlsx: 'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?format=xlsx',
      tabs: Object.keys(SCHEMA).filter(function (n) { return n !== 'Settings'; }).map(function (n) {
        return { name: n, csv: 'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?format=csv&gid=' + ss.getSheetByName(n).getSheetId() };
      })
    };
  }
  return out;
}

/* ---------- Access decisions ---------- */

/**
 * Teachers: approve or deny PENDING/DENIED students in their grades.
 * Admin: approve, deny, remove or restore any student.
 * opts: {classId, grade, note}
 */
function decideStudent(email, decision, opts) {
  const u = requireStaff_();
  const admin = u.role === 'admin';
  opts = opts || {};
  email = lower_(email);
  const allowed = admin ? ['approve', 'deny', 'remove', 'restore'] : ['approve', 'deny'];
  if (allowed.indexOf(decision) < 0) throw new Error(admin ? 'Unknown decision.' : 'Only the administrator can remove students.');
  withLock_(function () {
    const r = rows_('Students').find(function (x) { return lower_(x.Email) === email; });
    if (!r) throw new Error('Student not found.');
    if (!canGrade_(u, r.Grade)) throw new Error('This student is not in your grade levels.');
    if (!admin && r.Status === STATUS.APPROVED && decision === 'deny') throw new Error('Only the administrator can remove an approved student.');
    if (!admin && r.Status === STATUS.REMOVED) throw new Error('This student was removed by the administrator.');
    const data = { DecidedBy: u.email, DecidedOn: new Date(), Note: String(opts.note || '').slice(0, 300) };
    if (decision === 'approve' || decision === 'restore') {
      let grade = String(opts.grade || r.Grade);
      if (!canGrade_(u, grade)) throw new Error('You cannot place a student in Grade ' + grade + '.');
      let classId = opts.classId === undefined ? r.ClassId : String(opts.classId || '');
      if (classId) {
        const c = rows_('Classes').find(function (x) { return x.ClassId === classId; });
        if (!c || String(c.Grade) !== grade) throw new Error('That class is not in Grade ' + grade + '.');
      }
      data.Status = STATUS.APPROVED; data.Grade = Number(grade); data.ClassId = classId;
    } else if (decision === 'deny') data.Status = STATUS.DENIED;
    else if (decision === 'remove') data.Status = STATUS.REMOVED;
    update_('Students', r._row, data);
    log_(u, 'access.student.' + decision, email, (r.Name || '') + ' · Grade ' + (data.Grade || r.Grade) +
         (data.ClassId ? ' · class ' + data.ClassId : '') + (data.Note ? ' · note: ' + data.Note : ''), data.Grade || r.Grade);
  });
  return getPortalData();
}

/** Admin only: approve (with grades), deny, remove or restore a teacher. */
function decideTeacher(email, decision, grades, note) {
  const u = requireAdmin_();
  email = lower_(email);
  if (['approve', 'deny', 'remove'].indexOf(decision) < 0) throw new Error('Unknown decision.');
  withLock_(function () {
    const r = rows_('Teachers').find(function (x) { return lower_(x.Email) === email; });
    if (!r) throw new Error('Teacher not found.');
    const data = { DecidedBy: u.email, DecidedOn: new Date(), Note: String(note || '').slice(0, 300) };
    if (decision === 'approve') {
      const g = (grades || []).map(String).filter(function (x) { return GRADES.indexOf(x) >= 0; });
      if (!g.length) throw new Error('Grant at least one grade level.');
      data.Status = STATUS.APPROVED; data.Grades = "'" + g.join(',');
    } else {
      data.Status = decision === 'deny' ? STATUS.DENIED : STATUS.REMOVED; data.Grades = '';
    }
    update_('Teachers', r._row, data);
    log_(u, 'access.teacher.' + decision, email, (r.Name || '') + (data.Grades ? ' · grades ' + String(data.Grades).replace("'", '') : '') +
         (data.Note ? ' · note: ' + data.Note : ''), String(data.Grades || '').replace("'", ''));
  });
  return getPortalData();
}

/** Admin: add a teacher directly (approved). */
function adminAddTeacher(t) {
  const u = requireAdmin_();
  t = t || {};
  const email = lower_(t.email);
  if (!validEmail_(email)) throw new Error('Enter a valid teacher email.');
  if (email === adminEmail_()) throw new Error('That is the administrator account.');
  const g = (t.grades || []).map(String).filter(function (x) { return GRADES.indexOf(x) >= 0; });
  if (!g.length) throw new Error('Grant at least one grade level.');
  withLock_(function () {
    const st = rows_('Students').find(function (x) { return lower_(x.Email) === email && x.Status !== STATUS.DENIED; });
    if (st) throw new Error(email + ' is registered as a student.');
    const r = rows_('Teachers').find(function (x) { return lower_(x.Email) === email; });
    const data = { Email: email, Name: String(t.name || '').trim() || email, Grades: "'" + g.join(','), Status: STATUS.APPROVED,
                   DecidedBy: u.email, DecidedOn: new Date() };
    if (r) update_('Teachers', r._row, data);
    else { data.RequestedGrades = "'" + g.join(','); data.RequestedOn = new Date(); data.Message = 'Added by administrator'; append_('Teachers', data); }
  });
  log_(u, 'access.teacher.add', email, 'Grades ' + g.join(', '), g.join(','));
  return getPortalData();
}

/** Teachers & admin: register approved students directly (one per line: "Name, email"). */
function addStudentsBulk(grade, classId, text) {
  const u = requireStaff_();
  grade = String(grade);
  if (!canGrade_(u, grade)) throw new Error('You are not assigned to Grade ' + grade + '.');
  if (classId) {
    const c = rows_('Classes').find(function (x) { return x.ClassId === classId; });
    if (!c || String(c.Grade) !== grade) throw new Error('That class is not in Grade ' + grade + '.');
  }
  const added = [], skipped = [];
  const domain = lower_(settings_().SchoolDomain);
  withLock_(function () {
    const existing = {};
    rows_('Students').forEach(function (r) { existing[lower_(r.Email)] = r.Status; });
    rows_('Teachers').forEach(function (r) { existing[lower_(r.Email)] = 'teacher'; });
    existing[adminEmail_()] = 'admin';
    String(text || '').split(/\r?\n/).forEach(function (line) {
      if (!line.trim()) return;
      const parts = line.split(/[,\t;]/).map(function (p) { return p.trim(); }).filter(String);
      const email = lower_(parts.find(function (p) { return p.indexOf('@') > 0; }) || '');
      const name = parts.filter(function (p) { return p.indexOf('@') < 0; }).join(' ').trim();
      if (!validEmail_(email)) { skipped.push(line + ' (no valid email)'); return; }
      if (domain && email.split('@')[1] !== domain) { skipped.push(email + ' (not @' + domain + ')'); return; }
      if (existing[email]) { skipped.push(email + ' (already ' + String(existing[email]).toLowerCase() + ')'); return; }
      append_('Students', { Email: email, Name: name || email.split('@')[0], Grade: Number(grade), ClassId: classId || '',
        Status: STATUS.APPROVED, Message: 'Added by ' + u.email, RequestedOn: new Date(), DecidedBy: u.email, DecidedOn: new Date() });
      existing[email] = STATUS.APPROVED; added.push(email);
    });
  });
  if (added.length) log_(u, 'access.student.bulk_add', added.length + ' students', added.join(', ').slice(0, 480), grade);
  const d = getPortalData();
  d.bulk = { added: added.length, skipped: skipped };
  return d;
}

/** Teachers & admin: change an approved student's name or class (within the staff member's grades). */
function updateStudent(email, name, grade, classId) {
  const u = requireStaff_();
  email = lower_(email);
  withLock_(function () {
    const r = rows_('Students').find(function (x) { return lower_(x.Email) === email; });
    if (!r || !canGrade_(u, r.Grade)) throw new Error('Student not found in your grades.');
    grade = String(grade || r.Grade);
    if (!canGrade_(u, grade)) throw new Error('You cannot move a student to Grade ' + grade + '.');
    if (classId) {
      const c = rows_('Classes').find(function (x) { return x.ClassId === classId; });
      if (!c || String(c.Grade) !== grade) throw new Error('That class is not in Grade ' + grade + '.');
    }
    update_('Students', r._row, { Name: String(name || r.Name).trim(), Grade: Number(grade), ClassId: classId || '' });
    log_(u, 'student.update', email, 'Grade ' + grade + (classId ? ' · class ' + classId : '') + ' · name "' + (name || r.Name) + '"', grade);
  });
  return getPortalData();
}

/* ---------- Classes ---------- */

function saveClass(c) {
  const u = requireStaff_();
  c = c || {};
  const grade = String(c.grade);
  if (!canGrade_(u, grade)) throw new Error('You are not assigned to Grade ' + grade + '.');
  if (!String(c.name || '').trim()) throw new Error('Class name is required.');
  withLock_(function () {
    const data = { Grade: Number(grade), ClassName: String(c.name).trim(), Subject: c.subject || settings_().DefaultSubject,
                   Schedule: c.schedule || '', ClassroomCourseId: String(c.courseId || '').trim() };
    if (c.id) {
      const r = editableClass_(u, c.id);
      if (u.role === 'admin' && c.teacher) data.TeacherEmail = lower_(c.teacher);
      update_('Classes', r._row, data);
      rows_('Students').forEach(function (st) { if (st.ClassId === c.id && String(st.Grade) !== grade) update_('Students', st._row, { Grade: Number(grade) }); });
      log_(u, 'class.update', data.ClassName, 'Grade ' + grade + (data.ClassroomCourseId ? ' · Classroom ' + data.ClassroomCourseId : ''), grade);
    } else {
      data.ClassId = 'C' + shortId_();
      data.TeacherEmail = u.role === 'admin' && c.teacher ? lower_(c.teacher) : u.email;
      data.CreatedOn = new Date();
      append_('Classes', data);
      log_(u, 'class.create', data.ClassName, 'Grade ' + grade, grade);
    }
  });
  return getPortalData();
}

function deleteClass(classId) {
  const u = requireStaff_();
  withLock_(function () {
    const r = editableClass_(u, classId);
    const n = rows_('Students').filter(function (s) { return s.ClassId === classId && s.Status === STATUS.APPROVED; }).length;
    if (n) throw new Error('This class still has ' + n + ' student(s). Move them to another class first.');
    sheet_('Classes').deleteRow(r._row);
    log_(u, 'class.delete', r.ClassName, '', r.Grade);
  });
  return getPortalData();
}

/* ---------- Topics & assessment questions ---------- */

function getQuestions(topicId) {
  const u = requireStaff_();
  const t = rows_('Topics').find(function (x) { return x.TopicId === topicId; });
  if (!t || !canGrade_(u, t.Grade)) throw new Error('Topic not found.');
  return rows_('Questions').filter(function (q) { return q.TopicId === topicId; }).sort(byOrder_)
    .map(function (q) { return { q: q.Question, a: q.OptionA, b: q.OptionB, c: q.OptionC, d: q.OptionD, answer: q.Answer }; });
}

function saveTopic(t, questions) {
  const u = requireStaff_();
  t = t || {};
  const grade = String(t.grade);
  if (!canGrade_(u, grade)) throw new Error('You are not assigned to Grade ' + grade + '.');
  if (!String(t.title || '').trim()) throw new Error('Topic title is required.');
  const objectives = String(t.objectives || '').split(/\r?\n/).map(function (l) { return l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim(); }).filter(String);
  if (!objectives.length) throw new Error('Every topic needs at least one learning objective.');
  let id = t.id, isNew = !id;
  withLock_(function () {
    const data = {
      Grade: Number(grade), Unit: String(t.unit || '').trim(), Order: Number(t.order) || 1, Title: String(t.title).trim(),
      Objectives: objectives.join('\n'), VideoUrl: t.videoUrl || '', Explanation: t.explanation || '', Syntax: t.syntax || '',
      Example: t.example || '', Note: t.note || '', BookRef: t.bookRef || '', ResourceUrl: t.resourceUrl || '',
      AttachmentUrl: t.attachmentUrl || '', TryItUrl: t.tryItUrl || '', Published: t.published ? 'Yes' : 'No',
      UpdatedBy: u.email, UpdatedOn: new Date()
    };
    if (id) {
      const ex = rows_('Topics').find(function (x) { return x.TopicId === id; });
      if (!ex || !canGrade_(u, ex.Grade)) throw new Error('Topic not found.');
      update_('Topics', ex._row, data);
    } else { id = 'T' + shortId_(); data.TopicId = id; append_('Topics', data); }
    if (Array.isArray(questions)) {
      const clean = questions.filter(function (q) { return String(q.q || '').trim(); });
      clean.forEach(function (q, i) {
        const hasOpts = [q.a, q.b, q.c, q.d].some(function (o) { return String(o || '').trim(); });
        if (!String(q.answer || '').trim()) throw new Error('Question ' + (i + 1) + ' has no answer.');
        if (hasOpts && !/^[ABCD]$/i.test(String(q.answer).trim())) throw new Error('Question ' + (i + 1) + ': the answer must be A, B, C or D.');
        if (hasOpts && !String(q[String(q.answer).trim().toLowerCase()] || '').trim()) throw new Error('Question ' + (i + 1) + ': option ' + String(q.answer).toUpperCase() + ' is empty.');
      });
      deleteRows_('Questions', rows_('Questions').filter(function (q) { return q.TopicId === id; }).map(function (q) { return q._row; }));
      clean.forEach(function (q, i) {
        const hasOpts = [q.a, q.b, q.c, q.d].some(function (o) { return String(o || '').trim(); });
        append_('Questions', { QuestionId: 'Q' + shortId_(), TopicId: id, Order: i + 1, Question: q.q,
          OptionA: q.a || '', OptionB: q.b || '', OptionC: q.c || '', OptionD: q.d || '',
          Answer: hasOpts ? String(q.answer).trim().toUpperCase() : String(q.answer).trim() });
      });
    }
    log_(u, isNew ? 'topic.create' : 'topic.update', data.Title, (data.Published === 'Yes' ? 'Published' : 'Draft') +
         (Array.isArray(questions) ? ' · ' + questions.filter(function (q) { return String(q.q || '').trim(); }).length + ' questions' : ''), grade);
  });
  const d = getPortalData();
  d.savedTopicId = id;
  return d;
}

function deleteTopic(topicId) {
  const u = requireStaff_();
  withLock_(function () {
    const t = rows_('Topics').find(function (x) { return x.TopicId === topicId; });
    if (!t || !canGrade_(u, t.Grade)) throw new Error('Topic not found.');
    deleteRows_('Questions', rows_('Questions').filter(function (q) { return q.TopicId === topicId; }).map(function (q) { return q._row; }));
    sheet_('Topics').deleteRow(t._row);
    log_(u, 'topic.delete', t.Title, '', t.Grade);
  });
  return getPortalData();
}

function uploadFile(name, mime, base64) {
  const u = requireStaff_();
  const props = PropertiesService.getScriptProperties();
  let folder;
  try { folder = DriveApp.getFolderById(props.getProperty('UPLOAD_FOLDER')); } catch (err) { folder = null; }
  if (!folder) { folder = DriveApp.createFolder('Booster Uploads'); props.setProperty('UPLOAD_FOLDER', folder.getId()); }
  const file = folder.createFile(Utilities.newBlob(Utilities.base64Decode(base64), mime || 'application/octet-stream', name));
  try { file.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW); }
  catch (err) { try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e2) { /* keep private */ } }
  log_(u, 'file.upload', name, mime + ' · ' + file.getUrl(), '');
  return { url: 'https://drive.google.com/file/d/' + file.getId() + '/view', name: name, mime: mime, isVideo: /^video\//.test(mime || '') };
}

/* ---------- Attendance ---------- */

function getAttendance(classId, date) {
  const u = requireStaff_();
  const cls = gradeClass_(u, classId);
  date = String(date || today_()).slice(0, 10);
  const marks = {};
  rows_('Attendance').forEach(function (a) {
    if (a.ClassId === classId && String(a.Date).slice(0, 10) === date) marks[lower_(a.StudentEmail)] = a.Status;
  });
  const online = {};
  rows_('Sessions').forEach(function (s) {
    if (String(s.Start).slice(0, 10) === date) online[lower_(s.Email)] = (online[lower_(s.Email)] || 0) + (Number(s.Minutes) || 0);
  });
  const list = rows_('Students').filter(function (s) { return s.ClassId === classId && s.Status === STATUS.APPROVED; })
    .sort(function (a, b) { return String(a.Name).localeCompare(String(b.Name)); })
    .map(function (s) { const e = lower_(s.Email); return { email: e, name: s.Name, status: marks[e] || '', online: online[e] || 0 }; });
  return { classId: classId, className: cls.ClassName, date: date, students: list };
}

function saveAttendance(classId, date, records) {
  const u = requireStaff_();
  const cls = gradeClass_(u, classId);
  date = String(date).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid date.');
  const counts = {};
  withLock_(function () {
    const existing = {};
    rows_('Attendance').forEach(function (a) {
      if (a.ClassId === classId && String(a.Date).slice(0, 10) === date) existing[lower_(a.StudentEmail)] = a._row;
    });
    (records || []).forEach(function (r) {
      if (!r.status) return;
      counts[r.status] = (counts[r.status] || 0) + 1;
      const data = { Status: r.status, MarkedBy: u.email, Timestamp: new Date() };
      const row = existing[lower_(r.email)];
      if (row) update_('Attendance', row, data);
      else { data.Date = date; data.ClassId = classId; data.StudentEmail = lower_(r.email); append_('Attendance', data); }
    });
  });
  log_(u, 'attendance.save', cls.ClassName, date + ' · ' + Object.keys(counts).map(function (k) { return k + ' ' + counts[k]; }).join(', '), cls.Grade);
  return getAttendance(classId, date);
}

/* ---------- Reports (85% target) ---------- */

/** scope: a classId, or "grade:6" for every approved student in a grade. */
function getReport(scope) {
  const u = requireStaff_();
  const target = Number(settings_().TargetPercent) || 85;
  let grade, label, studs;
  const all = rows_('Students').filter(function (s) { return s.Status === STATUS.APPROVED; });
  if (/^grade:/.test(String(scope))) {
    grade = String(scope).split(':')[1];
    if (!canGrade_(u, grade)) throw new Error('No access to Grade ' + grade + '.');
    label = 'All Grade ' + grade + ' students';
    studs = all.filter(function (s) { return String(s.Grade) === grade; });
  } else {
    const cls = gradeClass_(u, scope);
    grade = String(cls.Grade); label = cls.ClassName;
    studs = all.filter(function (s) { return s.ClassId === scope; });
  }
  const published = rows_('Topics').filter(function (t) { return String(t.Grade) === grade && yes_(t.Published); });
  const pubIds = {}; published.forEach(function (t) { pubIds[t.TopicId] = true; });
  const set = {}; studs.forEach(function (s) { set[lower_(s.Email)] = true; });

  const mins = minutesByEmail_();
  const done = {}, best = {}, attempts = {}, flags = {}, att = {}, lastSeen = {};
  rows_('Progress').forEach(function (p) {
    const e = lower_(p.Email);
    if (set[e] && p.Status === 'Completed' && pubIds[p.TopicId]) done[e] = (done[e] || 0) + 1;
  });
  rows_('Submissions').forEach(function (r) {
    const e = lower_(r.Email); if (!set[e]) return;
    best[e] = best[e] || {}; best[e][r.TopicId] = Math.max(best[e][r.TopicId] || 0, Number(r.Percent) || 0);
    attempts[e] = (attempts[e] || 0) + 1;
  });
  rows_('Activity').forEach(function (r) {
    const e = lower_(r.Email); if (!set[e]) return;
    if (/^integrity\./.test(r.Action) && r.Action !== 'integrity.return') flags[e] = (flags[e] || 0) + 1;
    if (String(r.Timestamp) > String(lastSeen[e] || '')) lastSeen[e] = r.Timestamp;
  });
  rows_('Attendance').forEach(function (a) {
    const e = lower_(a.StudentEmail); if (!set[e]) return;
    att[e] = att[e] || { p: 0, n: 0 }; att[e].n++;
    if (a.Status === 'Present' || a.Status === 'Late') att[e].p++;
  });
  const rows = studs.map(function (s) {
    const e = lower_(s.Email), b = best[e] || {};
    const vals = Object.keys(b).map(function (k) { return b[k]; });
    const avg = vals.length ? Math.round(vals.reduce(function (x, y) { return x + y; }, 0) / vals.length * 10) / 10 : null;
    return { name: s.Name, email: e, minutes: mins[e] || 0, completed: done[e] || 0, topics: published.length,
             average: avg, assessed: vals.length, attempts: attempts[e] || 0, flags: flags[e] || 0,
             attendance: att[e] ? Math.round(att[e].p / att[e].n * 100) : null, lastSeen: lastSeen[e] || '',
             status: avg === null ? 'No assessments yet' : avg >= target ? 'On target' : avg >= target - 15 ? 'Close' : 'Needs support' };
  }).sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); });
  const assessed = rows.filter(function (r) { return r.average !== null; });
  log_(u, 'report.view', label, rows.length + ' students', grade);
  return {
    label: label, grade: grade, target: target, rows: rows,
    summary: {
      students: rows.length, assessed: assessed.length,
      onTarget: assessed.filter(function (r) { return r.average >= target; }).length,
      classAverage: assessed.length ? Math.round(assessed.reduce(function (x, r) { return x + r.average; }, 0) / assessed.length * 10) / 10 : null,
      totalHours: Math.round(rows.reduce(function (x, r) { return x + r.minutes; }, 0) / 6) / 10
    }
  };
}

/* ---------- Google Classroom (stream + submissions) ---------- */

function listMyCourses() {
  const u = requireStaff_();
  const opt = { pageSize: 100, courseStates: ['ACTIVE'] };
  if (u.role !== 'admin') opt.teacherId = u.email;
  const out = [];
  let token;
  do {
    if (token) opt.pageToken = token;
    const res = Classroom.Courses.list(opt);
    (res.courses || []).forEach(function (c) { out.push({ id: c.id, name: c.name, section: c.section || '', link: c.alternateLink }); });
    token = res.nextPageToken;
  } while (token && out.length < 300);
  return out;
}

function getClassroomFeed(classId) {
  const u = requireStaff_();
  const cls = gradeClass_(u, classId);
  const cid = String(cls.ClassroomCourseId || '').trim();
  if (!cid) throw new Error('Link a Google Classroom course to this class first (Classes tab).');
  const course = Classroom.Courses.get(cid);
  const announcements = (Classroom.Courses.Announcements.list(cid, { pageSize: 15, orderBy: 'updateTime desc' }).announcements || [])
    .map(function (a) { return { text: a.text || '', time: a.updateTime, link: a.alternateLink }; });
  const roster = {};
  let token;
  do {
    const r = Classroom.Courses.Students.list(cid, token ? { pageSize: 200, pageToken: token } : { pageSize: 200 });
    (r.students || []).forEach(function (s) {
      roster[s.userId] = { name: (s.profile && s.profile.name && s.profile.name.fullName) || s.userId, email: (s.profile && s.profile.emailAddress) || '' };
    });
    token = r.nextPageToken;
  } while (token);
  const work = (Classroom.Courses.CourseWork.list(cid, { pageSize: 20, orderBy: 'updateTime desc' }).courseWork || []);
  const subsByWork = {};
  token = undefined;
  do {
    const r = Classroom.Courses.CourseWork.StudentSubmissions.list(cid, '-', token ? { pageSize: 1000, pageToken: token } : { pageSize: 1000 });
    (r.studentSubmissions || []).forEach(function (s) { (subsByWork[s.courseWorkId] = subsByWork[s.courseWorkId] || []).push(s); });
    token = r.nextPageToken;
  } while (token);
  const items = work.map(function (w) {
    const subs = subsByWork[w.id] || [];
    const counts = { turnedIn: 0, returned: 0, notSubmitted: 0, late: 0 };
    const students = subs.map(function (s) {
      if (s.state === 'TURNED_IN') counts.turnedIn++; else if (s.state === 'RETURNED') counts.returned++; else counts.notSubmitted++;
      if (s.late) counts.late++;
      const who = roster[s.userId] || { name: s.userId, email: '' };
      return { name: who.name, email: who.email, state: s.state, late: !!s.late, grade: s.assignedGrade == null ? '' : s.assignedGrade };
    }).sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); });
    let due = '';
    if (w.dueDate) due = w.dueDate.year + '-' + pad_(w.dueDate.month) + '-' + pad_(w.dueDate.day);
    return { title: w.title, due: due, link: w.alternateLink, maxPoints: w.maxPoints || '', counts: counts, students: students };
  });
  log_(u, 'classroom.view', course.name, items.length + ' classwork items', cls.Grade);
  return { course: { name: course.name, section: course.section || '', link: course.alternateLink },
           announcements: announcements, work: items, rosterSize: Object.keys(roster).length };
}

/* ---------- Admin: activity trail ---------- */

/**
 * f: {email, role, action, text, from:'yyyy-mm-dd', to:'yyyy-mm-dd', limit}
 * Scans the most recent rows (up to 30,000) of the Activity tab.
 */
function getActivity(f) {
  requireAdmin_();
  f = f || {};
  const sh = sheet_('Activity');
  const last = sh.getLastRow();
  const out = { rows: [], people: [], today: { events: 0, users: 0 }, scanned: 0, total: Math.max(0, last - 1) };
  if (last < 2) return out;
  const n = Math.min(last - 1, 30000);
  const vals = sh.getRange(last - n + 1, 1, n, SCHEMA.Activity.length).getValues();
  out.scanned = n;
  const limit = Math.min(Number(f.limit) || 300, 2000);
  const today = today_();
  const fe = lower_(f.email), fr = lower_(f.role), fa = lower_(f.action), ft = lower_(f.text);
  const people = {}, todayUsers = {};
  for (let i = vals.length - 1; i >= 0; i--) {
    const r = vals[i];
    const ts = r[0] instanceof Date ? Utilities.formatDate(r[0], tz_(), 'yyyy-MM-dd HH:mm:ss') : String(r[0]);
    const email = lower_(r[1]), role = String(r[3]), action = String(r[4]);
    if (email && !people[email]) people[email] = { email: email, name: r[2], role: role, lastSeen: ts, lastAction: action, target: String(r[5]), count: 0 };
    if (email) people[email].count++;
    if (ts.slice(0, 10) === today) { out.today.events++; if (email) todayUsers[email] = 1; }
    if (out.rows.length >= limit) continue;
    if (fe && email.indexOf(fe) < 0 && lower_(r[2]).indexOf(fe) < 0) continue;
    if (fr && lower_(role) !== fr) continue;
    if (fa && lower_(action).indexOf(fa) !== 0) continue;
    if (f.from && ts.slice(0, 10) < f.from) continue;
    if (f.to && ts.slice(0, 10) > f.to) continue;
    if (ft && (lower_(r[5]) + ' ' + lower_(r[6])).indexOf(ft) < 0) continue;
    out.rows.push({ ts: ts, email: email, name: r[2], role: role, action: action, target: String(r[5]), details: String(r[6]), grade: String(r[7]) });
  }
  out.today.users = Object.keys(todayUsers).length;
  out.people = Object.keys(people).map(function (k) { return people[k]; })
    .sort(function (a, b) { return a.lastSeen < b.lastSeen ? 1 : -1; });
  return out;
}

function saveSettings(obj) {
  const u = requireAdmin_();
  const allowed = ['SchoolName', 'SchoolDomain', 'DefaultSubject', 'TargetPercent', 'MaxTabSwitches', 'TryItUrl', 'ActivityKeepDays'];
  const changed = [];
  withLock_(function () {
    const rows = rows_('Settings');
    allowed.forEach(function (k) {
      if (obj[k] === undefined) return;
      let v = obj[k];
      if (k === 'TargetPercent') v = Math.min(100, Math.max(1, Number(v) || 85));
      if (k === 'MaxTabSwitches') v = Math.min(20, Math.max(1, Number(v) || 3));
      if (k === 'ActivityKeepDays') v = Math.min(3650, Math.max(14, Number(v) || 120));
      if (k === 'SchoolDomain') v = lower_(v).replace(/^@/, '');
      const ex = rows.find(function (r) { return r.Key === k; });
      if (ex && String(ex.Value) === String(v)) return;
      changed.push(k + '=' + v);
      if (ex) update_('Settings', ex._row, { Value: v }); else append_('Settings', { Key: k, Value: v });
    });
  });
  if (changed.length) log_(u, 'admin.settings', '', changed.join(' · '), '');
  return getPortalData();
}

function archiveActivityMenu() {
  const n = archiveActivity_();
  SpreadsheetApp.getUi().alert(n ? 'Moved ' + n + ' old activity rows to a new archive Sheet in your Drive.' : 'Nothing old enough to archive.');
}
function archiveActivityNow() { requireAdmin_(); const n = archiveActivity_(); return { moved: n }; }

/** Moves Activity rows older than ActivityKeepDays into a new spreadsheet named "Booster Activity Archive …". */
function archiveActivity_() {
  const days = Number(settings_().ActivityKeepDays) || 120;
  const cutoff = new Date(Date.now() - days * 86400000);
  const sh = sheet_('Activity');
  const last = sh.getLastRow();
  if (last < 2) return 0;
  const vals = sh.getRange(2, 1, last - 1, SCHEMA.Activity.length).getValues();
  let k = 0;
  while (k < vals.length && vals[k][0] instanceof Date && vals[k][0] < cutoff) k++;
  if (!k) return 0;
  const arch = SpreadsheetApp.create('Booster Activity Archive ' + Utilities.formatDate(new Date(), tz_(), 'yyyy-MM-dd'));
  const a = arch.getSheets()[0];
  a.getRange(1, 1, 1, SCHEMA.Activity.length).setValues([SCHEMA.Activity]).setFontWeight('bold');
  a.getRange(2, 1, k, SCHEMA.Activity.length).setValues(vals.slice(0, k));
  sh.deleteRows(2, k);
  resetCache_();
  log_({ email: adminEmail_(), name: 'Administrator', role: 'admin' }, 'admin.archive', arch.getUrl(), k + ' rows older than ' + days + ' days', '');
  return k;
}

/* ================================================================
 *  AUDIT LOG
 * ================================================================ */

function log_(u, action, target, details, grade) {
  try {
    sheet_('Activity').appendRow([new Date(), u.email || '(not signed in)', clean_(u.name || ''), u.role || 'guest',
      clean_(String(action).slice(0, 60)), clean_(String(target || '').slice(0, 200)), clean_(String(details || '').slice(0, 500)), clean_(String(grade || ''))]);
    delete _cache.Activity;
  } catch (err) { /* logging must never break the app */ }
}

/* ================================================================
 *  IDENTITY & PERMISSIONS
 * ================================================================ */

function adminEmail_() { return lower_(PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL')); }

function me_() {
  if (_me) return _me;
  const email = lower_(Session.getActiveUser().getEmail());
  const u = { email: email, role: 'guest', name: '', grades: [], grade: '', classId: '', request: null };
  _me = u;
  if (!email) return u;
  if (email === adminEmail_()) { u.role = 'admin'; u.name = 'Administrator'; u.grades = GRADES.slice(); return u; }
  const t = rows_('Teachers').find(function (r) { return lower_(r.Email) === email; });
  if (t) {
    const g = gradesOf_(t.Grades);
    if (t.Status === STATUS.APPROVED && g.length) { u.role = 'teacher'; u.name = t.Name || email; u.grades = g; return u; }
    u.name = t.Name;
    u.request = { type: 'teacher', status: t.Status, grades: gradesOf_(t.RequestedGrades), note: t.Note, on: t.RequestedOn };
    if (t.Status !== STATUS.DENIED) return u;
  }
  const s = rows_('Students').find(function (r) { return lower_(r.Email) === email; });
  if (s) {
    if (s.Status === STATUS.APPROVED) { u.role = 'student'; u.name = s.Name || email; u.grade = String(s.Grade); u.classId = s.ClassId; u.request = null; return u; }
    if (!u.request || s.Status !== STATUS.DENIED) {
      u.name = s.Name;
      u.request = { type: 'student', status: s.Status, grade: String(s.Grade), note: s.Note, on: s.RequestedOn };
    }
  }
  return u;
}
function publicUser_(u) {
  return { name: u.name, email: u.email, role: u.role, grade: u.grade, grades: u.grades, request: u.request };
}
function isStaff_(u) { return u.role === 'admin' || u.role === 'teacher'; }
function requireStaff_() { const u = me_(); if (!isStaff_(u)) throw new Error('Approved teachers only.'); return u; }
function requireAdmin_() { const u = me_(); if (u.role !== 'admin') throw new Error('Administrator only.'); return u; }
function canGrade_(u, g) {
  g = String(g);
  return u.role === 'admin' || (u.role === 'teacher' && u.grades.indexOf(g) >= 0) || (u.role === 'student' && u.grade === g);
}
/** Any class in the staff member's grade levels (for viewing, attendance, reports). */
function gradeClass_(u, classId) {
  const c = rows_('Classes').find(function (x) { return x.ClassId === classId; });
  if (!c) throw new Error('Class not found.');
  if (!canGrade_(u, c.Grade)) throw new Error('That class is not in your grade levels.');
  return c;
}
/** Only the class owner (or admin) may edit or delete a class. */
function editableClass_(u, classId) {
  const c = gradeClass_(u, classId);
  if (u.role !== 'admin' && lower_(c.TeacherEmail) !== u.email) throw new Error('Only the class owner or the administrator can change this class.');
  return c;
}

/* ================================================================
 *  SHEET HELPERS
 * ================================================================ */

let _ss = null, _tz = null, _settings = null, _me = null, _cache = {};
function resetCache_() { _cache = {}; _settings = null; _me = null; }

function ss_() {
  if (_ss) return _ss;
  const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  _ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  return _ss;
}
function tz_() { return _tz || (_tz = ss_().getSpreadsheetTimeZone() || Session.getScriptTimeZone()); }
function today_() { return Utilities.formatDate(new Date(), tz_(), 'yyyy-MM-dd'); }
function sheet_(name) {
  const sh = ss_().getSheetByName(name);
  if (!sh) throw new Error('Missing tab "' + name + '". Open the Sheet and run Booster › Set up / repair sheets.');
  return sh;
}
function rows_(name) {
  if (_cache[name]) return _cache[name];
  const sh = sheet_(name);
  const last = sh.getLastRow();
  if (last < 2) return (_cache[name] = []);
  const h = SCHEMA[name];
  return (_cache[name] = sh.getRange(2, 1, last - 1, h.length).getValues().map(function (r, i) {
    const o = { _row: i + 2 };
    h.forEach(function (k, j) { const x = r[j]; o[k] = x instanceof Date ? Utilities.formatDate(x, tz_(), 'yyyy-MM-dd HH:mm:ss') : x; });
    return o;
  }));
}
function clean_(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') {
    if (/^[=+\-@]/.test(v)) return "'" + v;
    if (/^\d{10,}$/.test(v)) return "'" + v;
    if (/^\d+([.,]\d+)+$/.test(v)) return "'" + v;
  }
  return v;
}
function append_(name, obj) {
  sheet_(name).appendRow(SCHEMA[name].map(function (k) { return clean_(obj[k]); }));
  delete _cache[name];
}
function update_(name, row, obj) {
  const h = SCHEMA[name];
  const rng = sheet_(name).getRange(row, 1, 1, h.length);
  const cur = rng.getValues()[0];
  h.forEach(function (k, j) { if (obj[k] !== undefined) cur[j] = clean_(obj[k]); });
  rng.setValues([cur]);
  delete _cache[name];
}
function deleteRows_(name, rowNums) {
  const sh = sheet_(name);
  rowNums.slice().sort(function (a, b) { return b - a; }).forEach(function (r) { sh.deleteRow(r); });
  delete _cache[name];
}
function settings_() {
  if (_settings) return _settings;
  const s = {};
  Object.keys(DEFAULT_SETTINGS).forEach(function (k) { s[k] = DEFAULT_SETTINGS[k]; });
  try { rows_('Settings').forEach(function (r) { if (r.Key) s[r.Key] = r.Value; }); } catch (err) { /* before setup */ }
  return (_settings = s);
}
function withLock_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { return fn(); } finally { lock.releaseLock(); _settings = null; _me = null; }
}
function totalMinutes_(email) { return minutesByEmail_()[lower_(email)] || 0; }
function minutesByEmail_() {
  const m = {};
  rows_('Sessions').forEach(function (s) { const e = lower_(s.Email); m[e] = (m[e] || 0) + (Number(s.Minutes) || 0); });
  return m;
}
function topicOut_(t, qCount, s) {
  return { id: t.TopicId, grade: String(t.Grade), unit: String(t.Unit || ''), order: Number(t.Order) || 0, title: t.Title,
    objectives: String(t.Objectives || ''), videoUrl: t.VideoUrl, explanation: t.Explanation, syntax: t.Syntax, example: t.Example,
    note: t.Note, bookRef: t.BookRef, resourceUrl: t.ResourceUrl, attachmentUrl: t.AttachmentUrl, tryItUrl: t.TryItUrl || s.TryItUrl,
    customTryIt: t.TryItUrl || '', published: yes_(t.Published), questions: qCount, updatedBy: t.UpdatedBy, updatedOn: t.UpdatedOn };
}
function unitNum_(u) { const m = String(u || '').match(/(\d+)(?:\.(\d+))?/); return m ? Number(m[1]) * 100 + Number(m[2] || 0) : 9999; }
function byUnitOrder_(a, b) { return (unitNum_(a.Unit) - unitNum_(b.Unit)) || ((Number(a.Order) || 0) - (Number(b.Order) || 0)); }
function byOrder_(a, b) { return (Number(a.Order) || 0) - (Number(b.Order) || 0); }
function shortId_() { return Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase(); }
function lower_(s) { return String(s == null ? '' : s).trim().toLowerCase(); }
function yes_(v) { return v === true || /^(y|yes|true|1)$/i.test(String(v).trim()); }
function norm_(s) { return String(s || '').trim().toLowerCase().replace(/\s+/g, ' '); }
function pad_(n) { return (n < 10 ? '0' : '') + n; }
function validEmail_(e) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e); }
function gradesOf_(v) { return (String(v || '').match(/[678]/g) || []).filter(function (g, i, a) { return a.indexOf(g) === i; }).sort(); }
function shuffle_(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function json_(o) { return JSON.stringify(o).replace(/</g, '\\u003c'); }
