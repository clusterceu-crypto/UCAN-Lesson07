UCAN Lesson 07 — Harmonized HTML Preview Candidate
Runtime candidate: v1.2.5 Harmonized Pre-Release
Classification: Controlled Candidate / Final Route Navigation Hotfix / Browser FFQA not yet final
Lesson ID: UCAN-L07
GitHub: NOT MODIFIED
Deployment: NOT MODIFIED

AUTHORITY
Canonical chain: KS-006 → AS-078 → BP-002 → MBM-002 → UCAN-L07
Approved learner-facing content: UCAN_Lesson_07_Editorial_v2.1.docx — Drive ID 1IfSxxS26Cenx2_9VRAPyDbm5TbrSl854
Canonical Methodical QA: UCAN_Lesson_07_Methodical_QA_Report_v1.0.docx — Drive ID 1r0o6sXCd2_zbHd16MZR1hDxRVr_uvUnd
HTML Pre-Implementation Handoff: UCAN_Lesson_07_HTML_PreImplementation_Handoff_v1.0.docx — Drive ID 1GMfmcpUMpGX8Sm85AWCckSt5fvK67d5x
Gate 9 Micro-Approval: UCAN_Lesson_07_Evidence_Methodical_MicroApproval_Handoff_v1.0.docx — Drive ID 1zDMiDYsAS-Sfo7MjdDzCcGYIaCI97J6P
Baseline runtime: UCAN_Lesson_07_HTML_Preview_v1.1_PreRelease — Drive folder 1RQVpweiupnVTpZ0PZP7OUj02nOVdNnyC

CURRENT STANDARDS / ARCHITECTURE CHECK
- UCAN_HTML_LMS_Standard_v1.5 located as latest current HTML/LMS standard lineage.
- UCAN_Course_Wide_Learner_Experience_Architecture_v1.0 reviewed for shell/progress/navigation/layout principles; its status is Draft for Approval, therefore it is used only where consistent with already-controlled HTML/LMS / Shared Runtime decisions.
- UCAN_Learner_Experience_ADR_and_Standards_Update_Package_v1.0 reviewed as Proposed for Approval; no proposed-only decision is treated as independent content authority.
- UCAN Shared Runtime ADR/API reviewed for navigation/state/storage/PDF/clipboard boundaries.
- UCAN Designer Standard v1.2 and Brandbook v1.1 retained as visual/UX implementation references.
- Lesson 06 current controlled runtime/process evidence used only as runtime reference, not content authority.

LOCKED CURRICULUM PRESERVED
Practical Artifact: Карта зеленого активу громади та його екосистемної цінності.
PF-01–PF-05: unchanged.
Final Assessment Q1–Q5: unchanged.
Keys: A / B / A / B / B.
Pass: 5/5.
Unlimited retry.
Final Assessment: completion-gating.
Formative: non-scored / non-gating.
AI: optional / non-gating.
CS-07-01: prohibited learner-facing.
GAP-07-01: non-blocking.
WUA: OUT OF SCOPE.
Circular Economy video: N/A FOR L07.

FINAL ROUTE SEQUENCE
R1 — Orientation / Початок
R2 — Green Infrastructure
R3 — Ecosystem Value
R4 — Management Logic + Rotterdam
R5 — Formative
R6 — Examples and Tools
R7 — Portfolio + AI
R8 — Assessment
R9 — Completion

FORMATIVE MICRO-POLISH DECISION — APPROVED
Methodical boundary: scenario stems, learning purposes, correct concepts, correct options, non-gating status and feedback purpose are preserved. Only distractors were revised so that each option is municipally plausible but less appropriate than the best answer for the specific situation.

Scenario 1 revised distractors:
B. Дерева вздовж вулиці → затінення й охолодження → розглядати їх лише як елемент благоустрою без зв’язку з рішенням щодо перегрітої вулиці.
C. Міський парк неподалік → рекреація і добробут → зосередити управлінську увагу на парку, не змінюючи умови саме на перегрітій вулиці.
D. Зелений коридор → підтримка біорізноманіття → зробити збереження коридору головною відповіддю на проблему відсутності тіні на цій вулиці.

Scenario 2 revised distractors:
A. Озеленена ділянка, що приймає дощову воду → рекреація → планувати її насамперед як простір відпочинку, не роблячи водну функцію частиною рішення.
C. Дерева навколо громадського простору → затінення й охолодження → зробити озеленення головною відповіддю на затримання води без окремого розгляду водної функції.
D. Міський парк поруч → рекреація та добробут → спрямувати рішення на покращення користування парком, не пов’язуючи його з проблемою опадів біля цього простору.

Scenario 3 revised distractors:
B. Зелений коридор → рекреація і добробут → пріоритезувати зручність користування простором, розглядаючи екологічну зв’язність як другорядну.
C. Зелений коридор → затінення й охолодження → оцінювати його насамперед як комфортний маршрут, не враховуючи зв’язок між природними ділянками.
D. Зелений коридор → підтримка управління дощовою водою → зосередити рішення тільки на водній функції, не враховуючи просторову зв’язність зелених ділянок.

HARMONIZATION APPLIED
- compact persistent UCAN header;
- controlled Previous Lesson link to UCAN Lesson 06;
- Lesson H1/subtitle moved into R1 content;
- progress layer separated from title;
- 9-item semantic horizontal route strip;
- fixed bottom Назад / Далі navigation;
- 1240px shell + ~820px prose target;
- restrained page kickers;
- functional emoji grammar aligned; decorative Gemini sparkle removed;
- R3 HTML-first explanatory component: one green asset → several ecosystem values;
- Rotterdam wording and official URL preserved in R4;
- Urban Nature Atlas removed from R4 and appears only in R6;
- R6 resources rewritten as learner-benefit cards without production IDs/status language;
- R7 Portfolio + AI preserved;
- exact PF helpers preserved;
- informational readiness indicator preserved;
- AI prompts/actions preserved, no automatic transmission or learner data in service URLs;
- assessment dirty-state invalidation preserved;
- reset preserves Portfolio; Portfolio delete remains separate and confirmed.

QA PREVIEW MODE
?qa=1 is implemented as an isolated Creator QA Preview mode.
- permits temporary R9 access;
- does not write route progress to localStorage;
- does not write assessment state to localStorage;
- does not load or write persisted Portfolio values;
- does not expose answer keys;
- displays QA MODE only while query parameter is active;
- normal learner behavior returns when URL is opened without ?qa=1.

ROUTING
Previous lesson URL: https://clusterceu-crypto.github.io/UCAN-Lesson06/ (controlled current Lesson 06 Partner Review URL).
Next lesson URL: https://clusterceu-crypto.github.io/UCAN-Lesson08/
Next lesson classification: Controlled Reserved Next-Lesson Route, explicitly reserved by Chief Consultant / User for L07.
R9 uses a dedicated «Наступне заняття →» CTA rather than reusing the ordinary within-Lesson «Далі» control.
Pre-Release note: the reserved Lesson 08 URL may not yet be live. Verify target availability before Final Release of Lesson 07. This note is QA/development-only and is not learner-facing.

DIRECT PORTFOLIO PDF
Status: SHARED PDF DEPENDENCY BLOCKED.
Architecture authority confirms a shared local client-side PDF service boundary (js/ucan-pdf.js), but no approved distributable shared PDF helper artifact was available in the controlled L07 package / accessible current runtime sources for safe reuse in this Sprint.
No remote PDF API, CDN dependency or L07-specific workaround was introduced.
The primary PDF control remains visibly unavailable and truthful; browser print is retained as secondary fallback.
This does not block the harmonized candidate, but it blocks Final FFQA closure and shared shell freeze.

CANDIDATE MANIFEST
index.html
css/style.css
js/script.js
README.txt

EXCLUDED
noop-test-ignore
root v1.0 runtime
DOCX / QA / Blueprint / evidence source files
ZIP-inside-ZIP
temporary files
desktop.ini
.DS_Store

BROWSER / QA STATUS
Static QA: PASSED (see Sprint handoff response for checks).
Responsive static QA: PASSED for declared desktop/mobile CSS constraints; formal Browser FFQA not claimed.
Preliminary local browser execution: may be run for candidate behavior only; it is not Final Functional QA.
Browser FFQA: NOT YET PASSED.
GitHub: NOT MODIFIED.
Deployment: NOT MODIFIED.

REUSABLE PRODUCTION OBSERVATIONS
Candidate features that should be evaluated for later shared infrastructure after L07 Browser FFQA and Chief Consultant validation:
- compact header;
- progress layer;
- semantic route strip;
- bottom navigation;
- reset/dialog behavior;
- localStorage namespace pattern;
- ?qa=1 isolation;
- assessment dirty-state invalidation;
- Portfolio persistence/delete;
- shared PDF integration hook;
- AI copy/launch behavior;
- completion state grammar;
- accessibility/status handling.
Do not freeze the shared shell before: L07 harmonization → shared PDF closure → Browser FFQA → Chief Consultant validation.


GATE 12A.1 — PORTFOLIO + AI ACTION SIMPLIFICATION
Candidate Shared Portfolio + AI Action Pattern
- Portfolio primary actions: SAVE + PDF.
- One explicit learner-facing Save action: «Зберегти карту». Autosave may remain as internal safety but is not presented as a competing Save control.
- PDF remains the single primary output action; direct PDF is still blocked by the approved shared-runtime dependency. Browser print is only a secondary data-management fallback.
- Portfolio deletion remains available under low-prominence «Керування даними» and keeps separate confirmation.
- AI uses exactly two task choices (AI-07-01 / AI-07-02) and exactly two service buttons (ChatGPT / Gemini).
- Selected AI task controls the locally assembled prompt. Service action copies first and opens the selected service only after clipboard success.
- Clipboard failure blocks external launch and reports: «Не вдалося скопіювати промпт. Спробуйте ще раз.»
- No learner-entered data is placed in AI service URLs.
Recommended candidate pattern for Lessons 08–26 pending L07 Browser FFQA: Portfolio Save + PDF; AI Task Selection + ChatGPT/Gemini. Avoid repeated copy buttons, repeated service buttons per task, duplicate Print/PDF controls, prominent Delete beside Save, and excessive competing action buttons.
No new Standard or ADR is created by this candidate.
Browser FFQA: NOT RUN.
GitHub: NOT MODIFIED.
Deployment: NOT MODIFIED.

GATE 12A.2 — AI INTERACTION SIMPLIFICATION
Candidate Shared AI Action Pattern — APPROVED FOR L07 PREVIEW VALIDATION
For Lessons 07–26 candidate pattern:
TASK SELECTION → SHORT TASK DESCRIPTION → COPY PROMPT → OPEN CHATGPT / OPEN GEMINI.
- exactly two AI tasks: AI-07-01 Перевірити логіку карти; AI-07-02 Уточнити управлінський висновок;
- no visible full prompt, textarea or “Переглянути промпт”;
- one Copy Prompt action; one ChatGPT action; one Gemini action;
- copy and service launch are separate actions;
- prompt generation is local; no prompt or Portfolio value is placed in service URLs;
- no automatic submission/transmission; AI remains optional and non-gating.

CANDIDATE SHARED UCAN COMPLETION PATTERN
Completion → Головна думка → Що Ви тепер розумієте → Ваш практичний результат → 5 reflection questions → Перший локальний крок → Портфель мера → Наступне заняття →.
Lesson 07 R9 uses six reflection sections and five non-scored, non-persisted reflection questions. Reflection does not mutate Portfolio or assessment state and is not a completion gate.
Completion gate remains checked Final Assessment = 5/5. Portfolio status remains separate and truthful.
Gate 12A.4 supersedes the prior Gate 12A.3 next-route absence: Chief Consultant / User explicitly reserved https://clusterceu-crypto.github.io/UCAN-Lesson08/ as the controlled next-Lesson target for L07. R9 therefore shows a dedicated «Наступне заняття →» CTA.
This pattern is a candidate only and is not a new Standard or ADR. Eligibility for shared-shell freeze remains contingent on L07 Browser FFQA.

Browser FFQA: NOT RUN.
GitHub: NOT MODIFIED.
Deployment: NOT MODIFIED.


GATE 12A.3 — LEARNER-FACING COMPLETION CLEANUP
- Completion learner UI no longer contains QA Preview technical messaging.
- Normal successful assessment status on R9: «5/5 — пройдено».
- Portfolio completion states: «Карта готова: усі 5 елементів заповнені.» / «Карта частково заповнена: X із 5 елементів.» / «Карта ще не заповнена.».
- Gate 12A.4 supplies the controlled reserved Lesson 08 target; «Наступне заняття →» is now shown on R9 as a dedicated CTA.
- Publication-state learner messaging was removed.
- QA badge remains available only under ?qa=1; QA state isolation is preserved.
- Developer/configuration wording was removed from learner-facing PDF status; Direct PDF remains unavailable pending the approved shared dependency.

Course-Wide UX Conformance Backlog
After Lessons 01–26 are assembled, perform one controlled harmonization pass covering:
- AI prompt/copy/open pattern;
- Portfolio Save/PDF pattern;
- Completion/reflection pattern;
- next-Lesson CTA;
- QA mode;
- navigation;
- shell;
- emoji grammar.
Do not modify previous Lessons in Gate 12A.3.
Browser FFQA: NOT RUN.
GitHub: NOT MODIFIED.
Deployment: NOT MODIFIED.

GATE 12A.4 — FINAL NEXT-LESSON ROUTING CORRECTION
Controlled Reserved Next-Lesson Route for L07:
https://clusterceu-crypto.github.io/UCAN-Lesson08/
- R1–R8 retain the ordinary within-Lesson navigation grammar: «Назад» + «Далі» / «До завершення».
- R9 does not reuse the ordinary next-route control. It shows a dedicated «Наступне заняття →» CTA.
- No «До завершення», «Далі» or «Завершено» navigation action is visible on the right side of R9.
- No publication/repository/routing status is exposed learner-facing.
- ?qa=1 shows the same dedicated R9 CTA and remains persistence-isolated.
- The reserved Lesson 08 URL may not yet be live during Harmonized Pre-Release / QA. Verify it before Final Release of Lesson 07.

Candidate Shared Routing Rule
Each Lesson should receive controlled routing configuration values previousLessonUrl and nextLessonUrl from routing/configuration authority. The final route uses a dedicated «Наступне заняття →» CTA and does not derive that CTA dynamically from the ordinary within-Lesson «Далі» button. For L07 the controlled reserved nextLessonUrl is https://clusterceu-crypto.github.io/UCAN-Lesson08/.
This remains a candidate shared rule pending L07 Browser FFQA; no new ADR or Standard is created in Gate 12A.4.
Browser FFQA: NOT RUN.
GitHub: NOT MODIFIED.
Deployment: NOT MODIFIED.

GATE 12A.5 — FINAL ROUTE NAVIGATION HOTFIX
Purpose: Final Route Navigation Hotfix
- Root cause: author CSS declared .button-link { display:inline-flex }, which overrode the browser hidden-attribute display rule for #nextLessonCta.
- JS route-state authority in updateNav() was already correct and remains unchanged: R1–R8 set #nextLessonCta.hidden=true; R9 sets it false and hides ordinary #nextRoute.
- Added defensive [hidden] { display:none !important; } so hidden state is honored after every route transition, reload and QA navigation state.
- Curriculum/content, Portfolio, AI, Assessment, Completion Reflection and routing target remain unchanged.
Browser FFQA: NOT YET FINAL.
GitHub: NOT MODIFIED.
Deployment: NOT MODIFIED.
