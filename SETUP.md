# Booster Classes (Grades 6–8): Setup Guide

A Google Apps Script web app linked to one Google Sheet. It gives you three things:

- **Separate student pages** for Grade 6, Grade 7 and Grade 8.
- **A teacher portal** for classes, student registration, attendance, topics and assessments, Google Classroom, and reports.
- **An admin area** where you download all the data.

---

## Before you start

You need a **Google Workspace for Education account** (your school account, e.g. `you@school.edu.vn`) to own and deploy the app.

Students and teachers sign in with accounts on the **same school domain**. The app identifies each student by that login. This is how their hours and progress carry on from session to session.

> A personal `@gmail.com` account will not work as the owner. Google hides the visitor's email from apps deployed by personal accounts, so the app could not tell students apart.

---

## 1. Create the Sheet and paste the code (about 10 minutes)

1. Sign in with your school account and create a new Google Sheet. Name it, for example, **Booster Classes 2026–27**.
2. Open **Extensions › Apps Script**.
3. Click the gear icon (**Project Settings**) and tick **Show "appsscript.json" manifest file in editor**.
4. Back in the **Editor**, create these files. Use the **+** button: choose *Script* for `.gs` files and *HTML* for `.html` files. Type the name without the extension. Paste the matching contents into each file.

   | File in editor | Paste from |
   |---|---|
   | `Code.gs` (replace the default code) | Code.gs |
   | `appsscript.json` (replace everything) | appsscript.json |
   | `Styles` (HTML) | Styles.html |
   | `Lib` (HTML) | Lib.html |
   | `Guard` (HTML) | Guard.html |
   | `Home` (HTML) | Home.html |
   | `Grade` (HTML) | Grade.html |
   | `Teacher` (HTML) | Teacher.html |

5. Click **Save** (💾).
6. Go back to the Sheet and reload it. A **Booster** menu appears.
7. Click **Booster › 1. Set up / repair sheets**.
8. Approve the permissions when Google asks. The app needs the Sheet, Drive (for uploads) and read-only Classroom access.

Setup creates 12 tabs: Settings, Teachers, Classes, Students, Topics, Questions, Objectives, Attendance, Sessions, Progress, Submissions and Integrity. It also adds a sample Grade 6 topic so you can see the layout. Your account becomes the administrator.

## 2. Deploy the web app

1. In Apps Script, click **Deploy › New deployment**.
2. For the type, choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone within [your school domain]**.
5. Click **Deploy** and copy the web app URL.
6. In the Sheet, click **Booster › 2. Show web app links** to see each link:
   - Teacher portal: `…/exec?page=teacher`
   - Grade 6: `…/exec?page=grade&grade=6`
   - Grade 7: `…/exec?page=grade&grade=7`
   - Grade 8: `…/exec?page=grade&grade=8`

Students can also use the plain `…/exec` link. It always takes them to their own grade page. If they try another grade's link, they are sent back to their own grade.

> **After you change any code:** go to **Deploy › Manage deployments › Edit (pencil) › Version: New version › Deploy**. The URL stays the same.

## 3. First steps in the teacher portal

1. **Admin & Downloads** tab: add each teacher with their school email and the grades they teach. Teachers only see and edit their own grades and classes.
2. **Classes** tab: create the booster classes. To link a class to Google Classroom, click **Choose from my Google Classroom** or paste the course ID.
3. **Students** tab: register students one at a time, or paste a list (`Name, email` per line).
4. **Topics & Assessments** tab: add, edit or delete topics for each grade. Each topic can have:
   - A video (YouTube, Google Drive or Google Slides link, or an uploaded file)
   - An explanation
   - A Syntax box
   - An Example box with a *Try it Yourself* button
   - A Note
   - A Hodder Boost link and a lesson file
   - English-only assessment questions (multiple choice or short answer)

   Leave **Published** unticked while you are drafting.
5. **Lesson objectives:** use the box under the topic list in **Topics & Assessments** (one objective per line, for each grade). Students see them at the top of their grade page. Each topic also has an optional *Topic objectives* field. Both can stay empty until you are ready.

---

## How each requirement is handled

| Requirement | How it works |
|---|---|
| **Linked to a Sheet / download data** | Every action is written to the Sheet. In **Admin & Downloads** you can download everything as `.xlsx`, download any single tab as CSV, or open the Sheet. Teachers can download their class report as CSV from the Dashboard. |
| **Separate Grade 6, 7, 8 pages** | Each grade has its own URL and colour (6 teal, 7 indigo, 8 orange). Students are locked to their registered grade. |
| **Teachers add students, classes, topics** | Teacher portal, limited to each teacher's grades. Uploads go to Drive › *Booster Uploads*, shared with your school domain. |
| **Google Classroom** | **Google Classroom** tab: shows the stream (announcements) and classwork, with turned-in, returned, missing and late counts, plus each student's status and grade. The data is read live and read-only. |
| **No right-click / copy / paste** | Blocked on student pages, along with text selection, drag-drop, printing, and Ctrl/Cmd + C V X A S P U, F12 and DevTools shortcuts. Each attempt is logged in the *Integrity* tab. |
| **Leaving tabs** | Detected and logged every time. During an assessment, the student gets a warning on each switch, and the answers are **auto-submitted** after 3 switches (change this in Settings). Hours stop counting while the student is away. |
| **Hours tracking that continues** | While the student is active on a visible tab, one minute is added each minute (idle for 3+ minutes or on another tab = paused). Totals add up across every session and device for the same login. Opening two tabs does not double-count. The page reopens on the last topic and scrolls to where the student stopped. |
| **Video presentations, topic breakdowns** | Video at the top, then explanation → Syntax → Example → *Try it Yourself* → Note, in the W3Schools style. Python code is colour-highlighted. |
| **English → Vietnamese** | The **Tiếng Việt** button translates the topic title, objectives, explanation and note with Google Translate. Code is never translated. |
| **Assessments English only** | Translation is switched off during assessments, and the page blocks the browser's own translate feature. Short-answer boxes reject Vietnamese letters, and the server also checks for them. Questions are marked on the server, so the answers are never sent to the student's browser. |
| **85% target** | The target is set in Settings (default 85). Students see their average against the target line. Reports label each student *On target*, *Close* or *Needs support* and show how many students in each class are at 85%+. |

## Things to know

- **Leaving tabs can't be physically prevented.** No website can stop a browser from switching tabs. The app does what is possible: it detects, warns, logs, pauses the hours and auto-submits. Students can also always use a phone camera. For high-stakes tests, add supervision, or use managed Chromebooks with Google's *Locked mode* for Classroom quizzes.
- **Google Classroom access:** the app reads Classroom as the account that deployed it. That account must be a **teacher or co-teacher in each linked course**, or a Workspace admin. Otherwise the Classroom tab shows an error for that class.
- **Hodder Education / Boost content:** Hodder's materials are copyrighted and need your school's subscription. Paste the Boost link into *Hodder Education / Boost link*, and students open it with their own Boost login. Don't paste Hodder's text into the page. Write explanations in your own words, which also keeps them at the right level for your students.
- **W3Schools:** the lesson layout copies the W3Schools style (Syntax box, Example box, *Try it Yourself*). The default *Try it* button opens the W3Schools Python editor. You can set a different editor per topic or in Settings.
- **Machine translation** is good for understanding but not perfect. Check key vocabulary for each topic with a Vietnamese-speaking colleague.
- **Scale:** this setup comfortably handles a few hundred students. Google limits daily translations per account. Translations are cached for 6 hours, so a class opening the same topic uses very little of that limit.
- **Data:** you can edit the Sheet directly, but don't rename the tabs or reorder the columns. If something breaks, run **Booster › Set up / repair sheets**. It never deletes data.
