# Booster Computing v2: Setup Guide

A Google Apps Script web app linked to one Google Sheet. It has three kinds of access:

| Role | Who | How they get access | What they can do |
|---|---|---|---|
| **Administrator** | Only you (the account that runs Setup) | Automatic | Everything. Approve, deny, remove and restore teachers and students. See the full activity log. Change settings and download all data. |
| **Teacher** | Staff with a school account | Register on the main page, then **you** approve them and choose their grade levels | Approve or deny students in their grades. Manage classes, attendance and topics in their grades. See reports and Google Classroom for their grades. |
| **Student** | Students with a school account | Register on the main page, then a **teacher of that grade** (or you) approves | Only their own grade page: lessons, translation, assessments. Their hours and progress carry on across sessions. |

Lessons follow the Hodder *Cambridge Lower Secondary Computing* books:

| Grade | Book | Units | Topics |
|---|---|---|---|
| Grade 6 | Stage 7 | 7.1–7.6 | 31 |
| Grade 7 | Stage 8 | 8.1–8.6 | 34 |
| Grade 8 | Stage 9 | 9.1–9.6 | 39 |

That makes **104 topics and 520 English-only assessment questions**. Every topic includes:
- Learning objectives
- A book page reference
- A W3Schools-style explanation, with Syntax and Example boxes for programming topics
- 5 assessment questions

---

## Before you start

- Use your **school Google Workspace account** (for example `you@school.edu.vn`), **not** a personal Gmail account. Google hides who is visiting apps run by personal accounts, so the app could not tell users apart.
- Start with a **new, empty Google Sheet**. Version 2 changes the tab structure, so don't reuse the version 1 Sheet.

## 1. Create the Sheet and add the code

1. Create a new Google Sheet, for example **Booster Computing 2026–27**.
2. Open **Extensions › Apps Script**.
3. Open **Project Settings** (the gear icon) and tick **Show "appsscript.json" manifest file in editor**.
4. Create these files and paste the matching contents into each:

   | Add as | Type | Paste from |
   |---|---|---|
   | `Code` (replace the default) | Script | Code.gs |
   | `Content_G6` | Script | Content_G6.gs |
   | `Content_G7` | Script | Content_G7.gs |
   | `Content_G8` | Script | Content_G8.gs |
   | `appsscript.json` (replace everything) | — | appsscript.json |
   | `Styles` | HTML | Styles.html |
   | `Lib` | HTML | Lib.html |
   | `Guard` | HTML | Guard.html |
   | `Home` | HTML | Home.html |
   | `Grade` | HTML | Grade.html |
   | `Portal` | HTML | Portal.html |

   > If you copied version 1 into this project, delete `Teacher.html`. It is replaced by `Portal.html`.

5. Click **Save**.
6. Reload the Sheet. A **Booster** menu appears.
7. Click **Booster › 1. Set up / repair sheets** and approve the permissions.

Setup does four things:
- It creates the tabs.
- It records **your** account as the only administrator.
- It sets the school email domain from your address.
- It loads all 104 book lessons.

## 2. Deploy

1. Click **Deploy › New deployment**.
2. Choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone within [your school domain]**.
5. Click **Deploy**.
6. Use **Booster › 3. Show web app links** to see every link. Share the **main link** (ending in `/exec`) with everyone. It shows each person the right page:
   - New users see the registration form.
   - Pending users see the status of their request.
   - Students go to their grade page.
   - Teachers and you go to the portal.

> **After any code change:** go to **Deploy › Manage deployments › Edit › Version: New version › Deploy**. The link stays the same.

## 3. Day-to-day

1. **Teachers register.** They open the main link and choose **I am a teacher**, then tick their grades.
2. **You approve teachers.** In **Portal › Requests**, tick the grades to grant and click **Approve**, or click **Deny** and add a note. Teacher grades can be changed or removed later in **Teachers**.
3. **Students register.** They choose **I am a student**, then their grade and class.
4. **Teachers approve students** in **Requests**. Each teacher only sees requests for their own grade levels.
5. **You oversee every request.** You can also grant, deny, **remove** or **restore** any student from **Students**. Removed students lose access immediately and cannot re-register by themselves.
6. **Activity log** (admin only) traces what everyone does:
   - Page views and registrations
   - Approvals, denials and removals
   - Lessons opened and completed, translations
   - Assessment starts and scores
   - Copy, paste and right-click attempts, and tab switches
   - Topic, class and attendance changes, uploads and downloads

   You can filter by person, role, action type, date or text, and click any name to see that person's full history. Download the results as CSV, or use **Archive old activity** to keep the Sheet fast.
7. **Lesson objectives.** Every topic already has objectives taken from the book's unit outcomes. You or the teachers can edit them in **Topics & Assessments**. A topic cannot be saved without at least one objective.

## Notes

- **Videos.** No video links are included. Add your own (YouTube, Google Drive or Google Slides) to each topic in **Topics & Assessments**.
- **Copyright of the books.** The lesson text was written in my own words using the books as a syllabus guide, and each topic points to the matching book pages. Students still need the books, or your school's Hodder Boost access, for the full content. **Do not upload the PDF books to your public GitHub repository**: that would publish copyrighted material.
- **Grade mapping.** Grade 6 is set to Stage 7, Grade 7 to Stage 8 and Grade 8 to Stage 9. To change this, edit `STAGE_FOR_GRADE` at the top of `Code.gs`, and the `grade` values in the `Content_G*.gs` files.
- **Changing the administrator.** Go to **Apps Script › Project Settings › Script Properties** and edit `ADMIN_EMAIL`. Only one account can be the administrator.
- **Classroom.** The app reads Google Classroom as your account, so you must be a teacher or co-teacher in each linked course.
- **Integrity.** Copy, paste and right-click are blocked on student pages, and tab switches are detected and logged. During an assessment, answers are auto-submitted after 3 switches. No website can physically stop someone switching tabs, so supervise important tests.
- **Reloading lessons.** **Booster › 2. Load book lessons** only adds topics that are missing. It never overwrites your edits.
