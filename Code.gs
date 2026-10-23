/**
 * ==================================================================
 *  BOOSTER CLASSES · Grades 6–8
 *  Google Apps Script web app, bound to one Google Sheet.
 *
 *  Paste into: the Booster Google Sheet › Extensions › Apps Script
 *  Then run:   Booster › Set up / repair sheets   (menu in the Sheet)
 *  Deploy:     Deploy › New deployment › Web app
 *              Execute as: Me · Who has access: Anyone within <school domain>
 * ==================================================================
 */

const GRADES = ['6', '7', '8'];

/** Every tab in the Sheet and its columns. Add columns at the END only. */
const SCHEMA = {
  Settings:    ['Key', 'Value'],
  Teachers:    ['Email', 'Name', 'Grades', 'AddedOn'],
  Classes:     ['ClassId', 'Grade', 'ClassName', 'Subject', 'TeacherEmail', 'Schedule', 'ClassroomCourseId', 'CreatedOn'],
  Students:    ['Email', 'Name', 'Grade', 'ClassId', 'RegisteredBy', 'RegisteredOn', 'Status'],
  Topics:      ['TopicId', 'Grade', 'Order', 'Title', 'Objectives', 'VideoUrl', 'Explanation', 'Syntax', 'Example', 'Note',
                'ResourceUrl', 'AttachmentUrl', 'TryItUrl', 'Published', 'UpdatedBy', 'UpdatedOn'],
  Questions:   ['QuestionId', 'TopicId', 'Order', 'Question', 'OptionA', 'OptionB', 'OptionC', 'OptionD', 'Answer'],
  Objectives:  ['Grade', 'Order', 'Objective'],
  Attendance:  ['Date', 'ClassId', 'StudentEmail', 'Status', 'MarkedBy', 'Timestamp'],
  Sessions:    ['SessionId', 'Email', 'Grade', 'Start', 'LastActive', 'Minutes', 'TopicId'],
  Progress:    ['Email', 'TopicId', 'Status', 'LastSection', 'UpdatedOn'],
  Submissions: ['Timestamp', 'Email', 'Grade', 'TopicId', 'TopicTitle', 'Score', 'Total', 'Percent', 'TabSwitches', 'AutoSubmitted', 'Answers'],
  Integrity:   ['Timestamp', 'Email', 'Grade', 'Event', 'Detail']
};

const DEFAULT_SETTINGS = {
  AdminEmails: '',                 // filled with the deploying account on first setup
  SchoolName: 'Booster Programme',
  DefaultSubject: 'Computer Science',
  TargetPercent: 85,
  MaxTabSwitches: 3,               // assessment auto-submits after this many tab switches
  TryItUrl: 'https://www.w3schools.com/python/trypython.asp?filename=demo_default'
};

/* ================================================================
 *  MENU, SETUP, LINKS
 * ================================================================ */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Booster')
    .addItem('1. Set up / repair sheets', 'setup')
    .addItem('2. Show web app links', 'showLinks')
    .addToUi();
}

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', ss.getId());

  Object.keys(SCHEMA).forEach(function (name) {
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);
    const h = SCHEMA[name];
    sh.getRange(1, 1, 1, h.length).setValues([h])
      .setFontWeight('bold').setBackground('#1f2937').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  });

  const st = ss.getSheetByName('Settings');
  const have = st.getLastRow() > 1 ? st.getRange(2, 1, st.getLastRow() - 1, 1).getValues().map(function (r) { return r[0]; }) : [];
  Object.keys(DEFAULT_SETTINGS).forEach(function (k) {
    if (have.indexOf(k) < 0) {
      const v = k === 'AdminEmails' ? Session.getEffectiveUser().getEmail() : DEFAULT_SETTINGS[k];
      st.appendRow([k, v]);
    }
  });

  ['Sheet1', 'Trang tính1'].forEach(function (n) {
    const s = ss.getSheetByName(n);
    if (s && s.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(s);
  });

  if (ss.getSheetByName('Topics').getLastRow() === 1) seedSample_();
  SpreadsheetApp.getUi().alert('Booster sheets are ready.\n\nNext: Deploy › New deployment › Web app\n(Execute as: Me · Access: Anyone within your school domain).');
}

function showLinks() {
  const url = ScriptApp.getService().getUrl();
  const ui = SpreadsheetApp.getUi();
  if (!url) { ui.alert('Deploy the web app first: Deploy › New deployment › Web app.'); return; }
  const links = [['Teacher portal', url + '?page=teacher']]
    .concat(GRADES.map(function (g) { return ['Grade ' + g + ' page', url + '?page=grade&grade=' + g]; }));
  const html = '<div style="font-family:Arial;font-size:14px;line-height:1.7">' +
    links.map(function (l) { return '<b>' + l[0] + '</b><br><a href="' + l[1] + '" target="_blank">' + l[1] + '</a>'; }).join('<br><br>') +
    '</div>';
  ui.showModalDialog(HtmlService.createHtmlOutput(html).setWidth(620).setHeight(330), 'Booster web app links');
}

/** A complete sample topic so you can see the layout. Edit or delete it in the teacher portal. */
function seedSample_() {
  const tid = 'T' + shortId_();
  append_('Topics', {
    TopicId: tid, Grade: 6, Order: 1, Title: 'Python Output with print()', Objectives: '', VideoUrl: '',
    Explanation: [
      'The **print()** function shows a message or a value on the screen. It is usually the first Python instruction you learn.',
      '',
      '- Text must be inside quotation marks: `"Hello"` or `\'Hello\'`.',
      '- Numbers do not need quotation marks: `print(25)`.',
      '- Separate several items with commas. Python puts a space between them.',
      '',
      'Python is **case-sensitive**: `print` works, but `Print` causes an error.'
    ].join('\n'),
    Syntax: 'print(value1, value2, ..., sep=" ", end="\\n")',
    Example: '# Display a greeting\nprint("Hello, World!")\nprint("I am", 12, "years old")\nprint(5 + 3)',
    Note: 'Every opening bracket ( needs a closing bracket ). A missing bracket gives a **SyntaxError**.',
    ResourceUrl: '', AttachmentUrl: '', TryItUrl: '', Published: 'Yes', UpdatedBy: 'setup', UpdatedOn: new Date()
  });
  const qs = [
    ['Which line displays Hello on the screen?', 'print("Hello")', 'Print("Hello")', 'print(Hello)', 'echo "Hello"', 'A'],
    ['What is the output of: print(5 + 3)', '5 + 3', '8', '53', '"8"', 'B'],
    ['What does print("I am", 12) display?', 'I am12', 'I am 12', '"I am" 12', 'An error', 'B'],
    ['Type the name of the Python function that displays output on the screen.', '', '', '', '', 'print|print()']
  ];
  qs.forEach(function (q, i) {
    append_('Questions', { QuestionId: 'Q' + shortId_(), TopicId: tid, Order: i + 1, Question: q[0],
      OptionA: q[1], OptionB: q[2], OptionC: q[3], OptionD: q[4], Answer: q[5] });
  });
}

/* ================================================================
 *  WEB APP ENTRY
 *  ?page=grade&grade=6   ·   ?page=teacher   ·   (no params → auto)
 * ================================================================ */

function doGet(e) {
  const p = (e && e.parameter) || {};
  const u = me_();
  const s = settings_();
  const staff = isStaff_(u);
  let page = p.page || (u.role === 'student' ? 'grade' : staff ? 'teacher' : 'home');
  let grade = String(p.grade || '');
  let notice = '';

  if (page === 'grade') {
    if (u.role === 'student') grade = u.grade;           // students always land on their own grade
    if (GRADES.indexOf(grade) < 0) { page = 'home'; notice = 'Choose a grade page.'; }
    else if (!canGrade_(u, grade)) { page = 'home'; notice = 'Your account is not registered for Grade ' + grade + '.'; }
  }
  if (page === 'teacher' && !staff) { page = 'home'; notice = 'The teacher portal is for registered teachers only.'; }
  if (['home', 'grade', 'teacher'].indexOf(page) < 0) page = 'home';

  const file = { home: 'Home', grade: 'Grade', teacher: 'Teacher' }[page];
  const t = HtmlService.createTemplateFromFile(file);
  const url = ScriptApp.getService().getUrl();
  t.boot = json_({
    user: { name: u.name, email: u.email, role: u.role, grade: u.grade, grades: u.grades },
    grade: grade, url: url, school: s.SchoolName || 'Booster Programme',
    target: Number(s.TargetPercent) || 85, notice: notice
  });
  t.grade = grade;
  t.school = s.SchoolName || 'Booster Programme';
  t.isStudent = u.role === 'student';     // the integrity guard is loaded for students only
  const title = page === 'grade' ? 'Grade ' + grade + ' · Booster' : page === 'teacher' ? 'Teacher Portal · Booster' : 'Booster Classes';
  return t.evaluate().setTitle(title).addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(name) { return HtmlService.createHtmlOutputFromFile(name).getContent(); }

/* ================================================================
 *  STUDENT-FACING API (also used when teachers preview a grade page)
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
    .sort(byOrder_)
    .map(function (t) { return topicOut_(t, qCount[t.TopicId] || 0, s); });

  const objectives = rows_('Objectives')
    .filter(function (o) { return String(o.Grade) === grade && String(o.Objective).trim(); })
    .sort(byOrder_).map(function (o) { return String(o.Objective); });

  const progress = {}; let lastTopic = '', lastTime = '';
  rows_('Progress').forEach(function (p) {
    if (lower_(p.Email) !== u.email) return;
    progress[p.TopicId] = { status: p.Status, section: p.LastSection, updated: p.UpdatedOn };
    if (String(p.UpdatedOn) > lastTime) { lastTime = String(p.UpdatedOn); lastTopic = p.TopicId; }
  });

  const scores = {};
  rows_('Submissions').forEach(function (r) {
    if (lower_(r.Email) !== u.email) return;
    const sc = scores[r.TopicId] || (scores[r.TopicId] = { best: 0, attempts: 0, last: 0 });
    sc.attempts++; sc.last = Number(r.Percent) || 0; sc.best = Math.max(sc.best, sc.last);
  });

  return {
    grade: grade, topics: topics, objectives: objectives, progress: progress, scores: scores,
    lastTopic: lastTopic, minutes: totalMinutes_(u.email),
    target: Number(s.TargetPercent) || 85, maxSwitches: Number(s.MaxTabSwitches) || 3,
    preview: staff
  };
}

/** Starts an hours-tracking session. Hours accumulate per Google account across every session. */
function startSession(grade, topicId) {
  const u = me_();
  if (u.role !== 'student') return { id: '', row: 0, minutes: 0, preview: true };
  return withLock_(function () {
    const id = shortId_();
    const now = new Date();
    append_('Sessions', { SessionId: id, Email: u.email, Grade: grade, Start: now, LastActive: now, Minutes: 0, TopicId: topicId || '' });
    return { id: id, row: sheet_('Sessions').getLastRow(), minutes: totalMinutes_(u.email) };
  });
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
  // One login counted once: a second open tab/device cannot double-count time.
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
  return withLock_(function () {
    const ex = rows_('Progress').find(function (p) { return lower_(p.Email) === u.email && p.TopicId === topicId; });
    if (ex) {
      const keep = ex.Status === 'Completed' && status !== 'Completed' ? 'Completed' : status;
      update_('Progress', ex._row, { Status: keep, LastSection: section || '', UpdatedOn: new Date() });
    } else {
      append_('Progress', { Email: u.email, TopicId: topicId, Status: status, LastSection: section || '', UpdatedOn: new Date() });
    }
    return { ok: true };
  });
}

/** English → Vietnamese for LESSON content only. Assessments never call this. */
function translateToVi(html) {
  const u = me_();
  if (u.role === 'guest') throw new Error('Please sign in.');
  html = String(html || '');
  if (!html.trim()) return '';
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, html, Utilities.Charset.UTF_8);
  const key = 'vi_' + Utilities.base64EncodeWebSafe(digest);
  const cache = CacheService.getScriptCache();
  const hit = cache.get(key);
  if (hit) return hit;
  const out = LanguageApp.translate(html, 'en', 'vi', { contentType: 'html' });
  try { cache.put(key, out, 21600); } catch (err) { /* too large to cache – fine */ }
  return out;
}

function getQuiz(topicId) {
  const u = me_();
  const t = rows_('Topics').find(function (x) { return x.TopicId === topicId; });
  if (!t || !canGrade_(u, t.Grade)) throw new Error('Assessment not available.');
  const qs = rows_('Questions').filter(function (q) { return q.TopicId === topicId; }).sort(byOrder_)
    .map(function (q) {
      const opts = ['A', 'B', 'C', 'D']
        .map(function (k) { return { k: k, t: String(q['Option' + k] || '') }; })
        .filter(function (o) { return o.t.trim() !== ''; });
      return { id: q.QuestionId, q: String(q.Question), type: opts.length ? 'mcq' : 'text', options: shuffle_(opts) };
    });
  logEvent(t.Grade, 'assessment_start', t.Title);
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
    if (hasOpts) {
      ok = given.toUpperCase() === String(q.Answer).trim().charAt(0).toUpperCase();
    } else {
      const englishOnly = /^[\x20-\x7E]*$/.test(given);   // assessments are English only
      const accepted = String(q.Answer).split('|').map(function (a) { return norm_(a); });
      ok = englishOnly && given !== '' && accepted.indexOf(norm_(given)) >= 0;
    }
    if (ok) score++;
    return { q: q.QuestionId, a: given, ok: ok };
  });
  const total = qs.length;
  const percent = total ? Math.round(score / total * 1000) / 10 : 0;
  const target = Number(settings_().TargetPercent) || 85;
  if (u.role === 'student') {
    append_('Submissions', {
      Timestamp: new Date(), Email: u.email, Grade: t.Grade, TopicId: topicId, TopicTitle: t.Title,
      Score: score, Total: total, Percent: percent, TabSwitches: Number(tabSwitches) || 0,
      AutoSubmitted: autoSubmitted ? 'Yes' : 'No', Answers: JSON.stringify(detail).slice(0, 45000)
    });
    if (percent >= target) saveProgress(topicId, 'Completed', 'assessment');
  }
  return { score: score, total: total, percent: percent, target: target, met: percent >= target,
           results: detail.map(function (d) { return { q: d.q, ok: d.ok }; }) };
}

/** Integrity log: tab switches, blocked copy/paste/right-click attempts, assessment events. */
function logEvent(grade, event, detail) {
  const u = me_();
  if (u.role !== 'student') return;
  append_('Integrity', { Timestamp: new Date(), Email: u.email, Grade: grade || u.grade,
    Event: String(event).slice(0, 60), Detail: String(detail || '').slice(0, 500) });
}

/* ================================================================
 *  TEACHER API
 * ================================================================ */

function getTeacherData() {
  const u = requireStaff_();
  const admin = u.role === 'admin';
  const s = settings_();

  const classes = rows_('Classes')
    .filter(function (c) { return admin || lower_(c.TeacherEmail) === u.email; })
    .map(function (c) {
      return { id: c.ClassId, grade: String(c.Grade), name: c.ClassName, subject: c.Subject, teacher: c.TeacherEmail,
               schedule: c.Schedule, courseId: String(c.ClassroomCourseId || '') };
    });
  const ids = classes.map(function (c) { return c.id; });
  const mins = minutesByEmail_();

  const students = rows_('Students')
    .filter(function (st) { return admin || ids.indexOf(st.ClassId) >= 0; })
    .map(function (st) {
      return { email: lower_(st.Email), name: st.Name, grade: String(st.Grade), classId: st.ClassId,
               status: st.Status || 'Active', registeredOn: st.RegisteredOn, minutes: mins[lower_(st.Email)] || 0 };
    });

  const qCount = {};
  rows_('Questions').forEach(function (q) { qCount[q.TopicId] = (qCount[q.TopicId] || 0) + 1; });
  const topics = rows_('Topics')
    .filter(function (t) { return admin || u.grades.indexOf(String(t.Grade)) >= 0; })
    .sort(byOrder_)
    .map(function (t) { return topicOut_(t, qCount[t.TopicId] || 0, s); });

  const out = {
    user: { name: u.name, email: u.email, role: u.role, grades: u.grades },
    classes: classes, students: students, topics: topics,
    target: Number(s.TargetPercent) || 85, url: ScriptApp.getService().getUrl(), today: today_()
  };
  if (admin) {
    const ss = ss_();
    out.teachers = rows_('Teachers').map(function (t) { return { email: lower_(t.Email), name: t.Name, grades: gradesOf_(t.Grades) }; });
    out.settings = { SchoolName: s.SchoolName, DefaultSubject: s.DefaultSubject, TargetPercent: s.TargetPercent,
                     MaxTabSwitches: s.MaxTabSwitches, TryItUrl: s.TryItUrl, AdminEmails: s.AdminEmails };
    out.downloads = {
      sheetUrl: ss.getUrl(),
      xlsx: 'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?format=xlsx',
      tabs: Object.keys(SCHEMA).filter(function (n) { return n !== 'Settings'; }).map(function (n) {
        return { name: n, csv: 'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?format=csv&gid=' + ss.getSheetByName(n).getSheetId() };
      })
    };
  }
  out.objectives = rows_('Objectives')
    .filter(function (o) { return admin || u.grades.indexOf(String(o.Grade)) >= 0; })
    .sort(byOrder_).map(function (o) { return { grade: String(o.Grade), text: String(o.Objective) }; });
  return out;
}

/** Grade-level lesson objectives: one per line. Replaces the list for that grade. */
function saveObjectives(grade, text) {
  const u = requireStaff_();
  grade = String(grade);
  if (!canGrade_(u, grade)) throw new Error('You are not assigned to Grade ' + grade + '.');
  withLock_(function () {
    deleteRows_('Objectives', rows_('Objectives').filter(function (o) { return String(o.Grade) === grade; }).map(function (o) { return o._row; }));
    String(text || '').split(/\r?\n/).map(function (l) { return l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim(); })
      .filter(String).forEach(function (line, i) { append_('Objectives', { Grade: Number(grade), Order: i + 1, Objective: line }); });
  });
  return getTeacherData();
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
      const r = ownClass_(u, c.id);
      if (u.role === 'admin' && c.teacher) data.TeacherEmail = lower_(c.teacher);
      update_('Classes', r._row, data);
      // keep students' grade in sync with their class
      rows_('Students').forEach(function (st) { if (st.ClassId === c.id && String(st.Grade) !== grade) update_('Students', st._row, { Grade: Number(grade) }); });
    } else {
      data.ClassId = 'C' + shortId_();
      data.TeacherEmail = u.role === 'admin' && c.teacher ? lower_(c.teacher) : u.email;
      data.CreatedOn = new Date();
      append_('Classes', data);
    }
  });
  return getTeacherData();
}

function deleteClass(classId) {
  const u = requireStaff_();
  withLock_(function () {
    const r = ownClass_(u, classId);
    const n = rows_('Students').filter(function (s) { return s.ClassId === classId; }).length;
    if (n) throw new Error('This class still has ' + n + ' student(s). Move or remove them first.');
    sheet_('Classes').deleteRow(r._row);
  });
  return getTeacherData();
}

/* ---------- Students (registration) ---------- */

function saveStudent(st) {
  const u = requireStaff_();
  st = st || {};
  const email = lower_(st.email);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('Enter a valid student email (their Google login).');
  if (!String(st.name || '').trim()) throw new Error('Student name is required.');
  withLock_(function () {
    const cls = ownClass_(u, st.classId);
    const all = rows_('Students');
    const original = lower_(st.originalEmail || email);
    const ex = all.find(function (r) { return lower_(r.Email) === original; });
    const clash = all.find(function (r) { return lower_(r.Email) === email && r !== ex; });
    if (clash) throw new Error(email + ' is already registered (class ' + clash.ClassId + ').');
    if (isStaffEmail_(email)) throw new Error(email + ' belongs to a teacher/admin account.');
    const data = { Email: email, Name: String(st.name).trim(), Grade: Number(cls.Grade), ClassId: cls.ClassId, Status: st.status || 'Active' };
    if (ex) {
      if (u.role !== 'admin') ownClass_(u, ex.ClassId);    // must own the student's current class too
      update_('Students', ex._row, data);
    } else {
      data.RegisteredBy = u.email; data.RegisteredOn = new Date();
      append_('Students', data);
    }
  });
  return getTeacherData();
}

/** Paste one student per line: "Name, email" (or "email, Name"). Tabs from a spreadsheet also work. */
function addStudentsBulk(classId, text) {
  const u = requireStaff_();
  const added = [], skipped = [];
  withLock_(function () {
    const cls = ownClass_(u, classId);
    const existing = {};
    rows_('Students').forEach(function (r) { existing[lower_(r.Email)] = true; });
    String(text || '').split(/\r?\n/).forEach(function (line) {
      if (!line.trim()) return;
      const parts = line.split(/[,\t;]/).map(function (p) { return p.trim(); }).filter(String);
      const email = lower_(parts.find(function (p) { return p.indexOf('@') > 0; }) || '');
      const name = parts.filter(function (p) { return p.indexOf('@') < 0; }).join(' ').trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { skipped.push(line + ' (no valid email)'); return; }
      if (existing[email]) { skipped.push(email + ' (already registered)'); return; }
      if (isStaffEmail_(email)) { skipped.push(email + ' (teacher account)'); return; }
      append_('Students', { Email: email, Name: name || email.split('@')[0], Grade: Number(cls.Grade), ClassId: cls.ClassId,
        RegisteredBy: u.email, RegisteredOn: new Date(), Status: 'Active' });
      existing[email] = true; added.push(email);
    });
  });
  const data = getTeacherData();
  data.bulk = { added: added.length, skipped: skipped };
  return data;
}

function removeStudent(email) {
  const u = requireStaff_();
  email = lower_(email);
  withLock_(function () {
    const r = rows_('Students').find(function (x) { return lower_(x.Email) === email; });
    if (!r) throw new Error('Student not found.');
    ownClass_(u, r.ClassId);
    sheet_('Students').deleteRow(r._row);   // hours, attendance and scores stay in their own tabs
  });
  return getTeacherData();
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
  let id = t.id;
  withLock_(function () {
    const data = {
      Grade: Number(grade), Order: Number(t.order) || 1, Title: String(t.title).trim(), Objectives: t.objectives || '',
      VideoUrl: t.videoUrl || '', Explanation: t.explanation || '', Syntax: t.syntax || '', Example: t.example || '',
      Note: t.note || '', ResourceUrl: t.resourceUrl || '', AttachmentUrl: t.attachmentUrl || '', TryItUrl: t.tryItUrl || '',
      Published: t.published ? 'Yes' : 'No', UpdatedBy: u.email, UpdatedOn: new Date()
    };
    if (id) {
      const ex = rows_('Topics').find(function (x) { return x.TopicId === id; });
      if (!ex || !canGrade_(u, ex.Grade)) throw new Error('Topic not found.');
      update_('Topics', ex._row, data);
    } else {
      id = 'T' + shortId_(); data.TopicId = id; append_('Topics', data);
    }
    if (Array.isArray(questions)) {
      deleteRows_('Questions', rows_('Questions').filter(function (q) { return q.TopicId === id; }).map(function (q) { return q._row; }));
      questions.filter(function (q) { return String(q.q || '').trim(); }).forEach(function (q, i) {
        const hasOpts = [q.a, q.b, q.c, q.d].some(function (o) { return String(o || '').trim(); });
        if (!String(q.answer || '').trim()) throw new Error('Question ' + (i + 1) + ' has no answer.');
        if (hasOpts && !/^[ABCD]$/i.test(String(q.answer).trim())) throw new Error('Question ' + (i + 1) + ': the answer must be A, B, C or D.');
        append_('Questions', { QuestionId: 'Q' + shortId_(), TopicId: id, Order: i + 1, Question: q.q,
          OptionA: q.a || '', OptionB: q.b || '', OptionC: q.c || '', OptionD: q.d || '',
          Answer: hasOpts ? String(q.answer).trim().toUpperCase() : String(q.answer).trim() });
      });
    }
  });
  const data = getTeacherData();
  data.savedTopicId = id;
  return data;
}

function deleteTopic(topicId) {
  const u = requireStaff_();
  withLock_(function () {
    const t = rows_('Topics').find(function (x) { return x.TopicId === topicId; });
    if (!t || !canGrade_(u, t.Grade)) throw new Error('Topic not found.');
    deleteRows_('Questions', rows_('Questions').filter(function (q) { return q.TopicId === topicId; }).map(function (q) { return q._row; }));
    sheet_('Topics').deleteRow(t._row);
  });
  return getTeacherData();
}

/** Uploads a lesson file (slides, PDF, short video, image) to Drive › "Booster Uploads". */
function uploadFile(name, mime, base64) {
  requireStaff_();
  const props = PropertiesService.getScriptProperties();
  let folder;
  try { folder = DriveApp.getFolderById(props.getProperty('UPLOAD_FOLDER')); } catch (err) { folder = null; }
  if (!folder) { folder = DriveApp.createFolder('Booster Uploads'); props.setProperty('UPLOAD_FOLDER', folder.getId()); }
  const file = folder.createFile(Utilities.newBlob(Utilities.base64Decode(base64), mime || 'application/octet-stream', name));
  try { file.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW); }
  catch (err) { try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e2) { /* keep private */ } }
  return { url: 'https://drive.google.com/file/d/' + file.getId() + '/view', name: name, mime: mime, isVideo: /^video\//.test(mime || '') };
}

/* ---------- Attendance ---------- */

function getAttendance(classId, date) {
  const u = requireStaff_();
  const cls = ownClass_(u, classId);
  date = String(date || today_()).slice(0, 10);
  const marks = {};
  rows_('Attendance').forEach(function (a) {
    if (a.ClassId === classId && String(a.Date).slice(0, 10) === date) marks[lower_(a.StudentEmail)] = a.Status;
  });
  const online = {};
  rows_('Sessions').forEach(function (s) {
    if (String(s.Start).slice(0, 10) === date) online[lower_(s.Email)] = (online[lower_(s.Email)] || 0) + (Number(s.Minutes) || 0);
  });
  const list = rows_('Students').filter(function (s) { return s.ClassId === classId; })
    .sort(function (a, b) { return String(a.Name).localeCompare(String(b.Name)); })
    .map(function (s) { const e = lower_(s.Email); return { email: e, name: s.Name, status: marks[e] || '', online: online[e] || 0 }; });
  return { classId: classId, className: cls.ClassName, date: date, students: list };
}

function saveAttendance(classId, date, records) {
  const u = requireStaff_();
  ownClass_(u, classId);
  date = String(date).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid date.');
  withLock_(function () {
    const existing = {};
    rows_('Attendance').forEach(function (a) {
      if (a.ClassId === classId && String(a.Date).slice(0, 10) === date) existing[lower_(a.StudentEmail)] = a._row;
    });
    (records || []).forEach(function (r) {
      if (!r.status) return;
      const data = { Status: r.status, MarkedBy: u.email, Timestamp: new Date() };
      const row = existing[lower_(r.email)];
      if (row) update_('Attendance', row, data);
      else { data.Date = date; data.ClassId = classId; data.StudentEmail = lower_(r.email); append_('Attendance', data); }
    });
  });
  return getAttendance(classId, date);
}

/* ---------- Reports (85% target tracking) ---------- */

function getReport(classId) {
  const u = requireStaff_();
  const cls = ownClass_(u, classId);
  const target = Number(settings_().TargetPercent) || 85;
  const grade = String(cls.Grade);
  const published = rows_('Topics').filter(function (t) { return String(t.Grade) === grade && yes_(t.Published); });
  const pubIds = published.map(function (t) { return t.TopicId; });
  const studs = rows_('Students').filter(function (s) { return s.ClassId === classId; });
  const set = {}; studs.forEach(function (s) { set[lower_(s.Email)] = true; });

  const mins = minutesByEmail_();
  const done = {}, best = {}, attempts = {}, flags = {}, att = {};
  rows_('Progress').forEach(function (p) {
    const e = lower_(p.Email);
    if (set[e] && p.Status === 'Completed' && pubIds.indexOf(p.TopicId) >= 0) done[e] = (done[e] || 0) + 1;
  });
  rows_('Submissions').forEach(function (r) {
    const e = lower_(r.Email); if (!set[e]) return;
    best[e] = best[e] || {}; best[e][r.TopicId] = Math.max(best[e][r.TopicId] || 0, Number(r.Percent) || 0);
    attempts[e] = (attempts[e] || 0) + 1;
  });
  rows_('Integrity').forEach(function (r) {
    const e = lower_(r.Email);
    if (set[e] && r.Event !== 'assessment_start' && r.Event !== 'tab_return') flags[e] = (flags[e] || 0) + 1;
  });
  rows_('Attendance').forEach(function (a) {
    const e = lower_(a.StudentEmail); if (a.ClassId !== classId || !set[e]) return;
    att[e] = att[e] || { p: 0, n: 0 }; att[e].n++;
    if (a.Status === 'Present' || a.Status === 'Late') att[e].p++;
  });

  const rows = studs.map(function (s) {
    const e = lower_(s.Email);
    const b = best[e] || {};
    const vals = Object.keys(b).map(function (k) { return b[k]; });
    const avg = vals.length ? Math.round(vals.reduce(function (x, y) { return x + y; }, 0) / vals.length * 10) / 10 : null;
    return {
      name: s.Name, email: e, minutes: mins[e] || 0, completed: done[e] || 0, topics: published.length,
      average: avg, assessed: vals.length, attempts: attempts[e] || 0, flags: flags[e] || 0,
      attendance: att[e] ? Math.round(att[e].p / att[e].n * 100) : null,
      status: avg === null ? 'No assessments yet' : avg >= target ? 'On target' : avg >= target - 15 ? 'Close' : 'Needs support'
    };
  }).sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); });

  const assessed = rows.filter(function (r) { return r.average !== null; });
  return {
    className: cls.ClassName, grade: grade, target: target, rows: rows,
    summary: {
      students: rows.length,
      onTarget: assessed.filter(function (r) { return r.average >= target; }).length,
      assessed: assessed.length,
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
  const cls = ownClass_(u, classId);
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
      roster[s.userId] = { name: (s.profile && s.profile.name && s.profile.name.fullName) || s.userId,
                           email: (s.profile && s.profile.emailAddress) || '' };
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
      if (s.state === 'TURNED_IN') counts.turnedIn++;
      else if (s.state === 'RETURNED') counts.returned++;
      else counts.notSubmitted++;
      if (s.late) counts.late++;
      const who = roster[s.userId] || { name: s.userId, email: '' };
      return { name: who.name, email: who.email, state: s.state, late: !!s.late,
               grade: s.assignedGrade == null ? '' : s.assignedGrade, link: s.alternateLink };
    }).sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); });
    let due = '';
    if (w.dueDate) due = w.dueDate.year + '-' + pad_(w.dueDate.month) + '-' + pad_(w.dueDate.day) +
      (w.dueTime && w.dueTime.hours != null ? ' ' + pad_(w.dueTime.hours) + ':' + pad_(w.dueTime.minutes || 0) + ' UTC' : '');
    return { title: w.title, type: w.workType, due: due, link: w.alternateLink, maxPoints: w.maxPoints || '', counts: counts, students: students };
  });

  return { course: { name: course.name, section: course.section || '', link: course.alternateLink },
           announcements: announcements, work: items, rosterSize: Object.keys(roster).length };
}

/* ---------- Admin ---------- */

function saveTeacher(t) {
  requireAdmin_();
  t = t || {};
  const email = lower_(t.email);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('Enter a valid teacher email.');
  const grades = (t.grades || []).map(String).filter(function (g) { return GRADES.indexOf(g) >= 0; });
  if (!grades.length) throw new Error('Pick at least one grade.');
  withLock_(function () {
    if (rows_('Students').some(function (s) { return lower_(s.Email) === email; })) throw new Error(email + ' is registered as a student.');
    const original = lower_(t.originalEmail || email);
    const ex = rows_('Teachers').find(function (r) { return lower_(r.Email) === original; });
    const data = { Email: email, Name: String(t.name || '').trim() || email, Grades: "'" + grades.join(',') };
    if (ex) update_('Teachers', ex._row, data);
    else { data.AddedOn = new Date(); append_('Teachers', data); }
  });
  return getTeacherData();
}

function removeTeacher(email) {
  requireAdmin_();
  withLock_(function () {
    const r = rows_('Teachers').find(function (x) { return lower_(x.Email) === lower_(email); });
    if (r) sheet_('Teachers').deleteRow(r._row);
  });
  return getTeacherData();
}

function saveSettings(obj) {
  requireAdmin_();
  const allowed = ['SchoolName', 'DefaultSubject', 'TargetPercent', 'MaxTabSwitches', 'TryItUrl', 'AdminEmails'];
  withLock_(function () {
    const rows = rows_('Settings');
    allowed.forEach(function (k) {
      if (obj[k] === undefined) return;
      let v = obj[k];
      if (k === 'TargetPercent') v = Math.min(100, Math.max(1, Number(v) || 85));
      if (k === 'MaxTabSwitches') v = Math.min(20, Math.max(1, Number(v) || 3));
      if (k === 'AdminEmails' && !String(v).trim()) return;   // never lock yourself out
      const ex = rows.find(function (r) { return r.Key === k; });
      if (ex) update_('Settings', ex._row, { Value: v }); else append_('Settings', { Key: k, Value: v });
    });
  });
  _settings = null;
  return getTeacherData();
}

/* ================================================================
 *  IDENTITY & PERMISSIONS
 * ================================================================ */

function me_() {
  const email = lower_(Session.getActiveUser().getEmail());
  const u = { email: email, role: 'guest', name: '', grades: [], grade: '', classId: '' };
  if (!email) return u;
  const admins = lower_(settings_().AdminEmails).split(/[,;\s]+/).filter(String);
  const t = rows_('Teachers').find(function (r) { return lower_(r.Email) === email; });
  if (admins.indexOf(email) >= 0) { u.role = 'admin'; u.name = t ? t.Name : 'Administrator'; u.grades = GRADES.slice(); return u; }
  if (t) { u.role = 'teacher'; u.name = t.Name || email; u.grades = gradesOf_(t.Grades); return u; }
  const s = rows_('Students').find(function (r) { return lower_(r.Email) === email && r.Status !== 'Inactive'; });
  if (s) { u.role = 'student'; u.name = s.Name || email; u.grade = String(s.Grade); u.classId = s.ClassId; }
  return u;
}

function isStaff_(u) { return u.role === 'admin' || u.role === 'teacher'; }
function requireStaff_() { const u = me_(); if (!isStaff_(u)) throw new Error('Teachers only.'); return u; }
function requireAdmin_() { const u = me_(); if (u.role !== 'admin') throw new Error('Administrators only.'); return u; }
function canGrade_(u, g) {
  g = String(g);
  return u.role === 'admin' || (u.role === 'teacher' && u.grades.indexOf(g) >= 0) || (u.role === 'student' && u.grade === g);
}
function isStaffEmail_(email) {
  const admins = lower_(settings_().AdminEmails).split(/[,;\s]+/);
  return admins.indexOf(email) >= 0 || rows_('Teachers').some(function (t) { return lower_(t.Email) === email; });
}
function ownClass_(u, classId) {
  const c = rows_('Classes').find(function (x) { return x.ClassId === classId; });
  if (!c) throw new Error('Class not found.');
  if (u.role !== 'admin' && lower_(c.TeacherEmail) !== u.email) throw new Error('That class belongs to another teacher.');
  return c;
}

/* ================================================================
 *  SHEET HELPERS
 * ================================================================ */

let _ss = null, _tz = null, _settings = null;

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
  const sh = sheet_(name);
  const last = sh.getLastRow();
  if (last < 2) return [];
  const h = SCHEMA[name];
  return sh.getRange(2, 1, last - 1, h.length).getValues().map(function (r, i) {
    const o = { _row: i + 2 };
    h.forEach(function (k, j) {
      const x = r[j];
      o[k] = x instanceof Date ? Utilities.formatDate(x, tz_(), 'yyyy-MM-dd HH:mm:ss') : x;
    });
    return o;
  });
}

function clean_(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') {
    if (/^[=+\-@]/.test(v)) return "'" + v;           // never let content become a formula
    if (/^\d{10,}$/.test(v)) return "'" + v;           // long IDs (Classroom course IDs) stay exact
    if (/^\d+([.,]\d+)+$/.test(v)) return "'" + v;     // "6,7" must not become a number
  }
  return v;
}

function append_(name, obj) {
  sheet_(name).appendRow(SCHEMA[name].map(function (k) { return clean_(obj[k]); }));
}

function update_(name, row, obj) {
  const h = SCHEMA[name];
  const rng = sheet_(name).getRange(row, 1, 1, h.length);
  const cur = rng.getValues()[0];
  h.forEach(function (k, j) { if (obj[k] !== undefined) cur[j] = clean_(obj[k]); });
  rng.setValues([cur]);
}

function deleteRows_(name, rowNums) {
  const sh = sheet_(name);
  rowNums.slice().sort(function (a, b) { return b - a; }).forEach(function (r) { sh.deleteRow(r); });
}

function settings_() {
  if (_settings) return _settings;
  const s = {};
  Object.keys(DEFAULT_SETTINGS).forEach(function (k) { s[k] = DEFAULT_SETTINGS[k]; });
  try { rows_('Settings').forEach(function (r) { if (r.Key) s[r.Key] = r.Value; }); } catch (err) { /* before setup */ }
  _settings = s;
  return s;
}

function withLock_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { return fn(); } finally { lock.releaseLock(); }
}

function totalMinutes_(email) { return minutesByEmail_()[lower_(email)] || 0; }
function minutesByEmail_() {
  const m = {};
  rows_('Sessions').forEach(function (s) { const e = lower_(s.Email); m[e] = (m[e] || 0) + (Number(s.Minutes) || 0); });
  return m;
}

function topicOut_(t, qCount, s) {
  return {
    id: t.TopicId, grade: String(t.Grade), order: Number(t.Order) || 0, title: t.Title, objectives: t.Objectives,
    videoUrl: t.VideoUrl, explanation: t.Explanation, syntax: t.Syntax, example: t.Example, note: t.Note,
    resourceUrl: t.ResourceUrl, attachmentUrl: t.AttachmentUrl, tryItUrl: t.TryItUrl || s.TryItUrl,
    customTryIt: t.TryItUrl || '', published: yes_(t.Published), questions: qCount,
    updatedBy: t.UpdatedBy, updatedOn: t.UpdatedOn
  };
}

function byOrder_(a, b) { return (Number(a.Order) || 0) - (Number(b.Order) || 0); }
function shortId_() { return Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase(); }
function lower_(s) { return String(s == null ? '' : s).trim().toLowerCase(); }
function yes_(v) { return v === true || /^(y|yes|true|1)$/i.test(String(v).trim()); }
function norm_(s) { return String(s || '').trim().toLowerCase().replace(/\s+/g, ' '); }
function pad_(n) { return (n < 10 ? '0' : '') + n; }
function gradesOf_(v) {
  return (String(v || '').match(/[678]/g) || []).filter(function (g, i, a) { return a.indexOf(g) === i; });
}
function shuffle_(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function json_(o) { return JSON.stringify(o).replace(/</g, '\\u003c'); }
