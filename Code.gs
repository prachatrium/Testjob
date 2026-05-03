const SHEET_ID = "1AYRdYtSHqYHBN4VLPs0Ln2EcKu9LQkot9sWuSsfXMjM";
const SHEET_NAME = "Applications";

const QUESTION_1 = "ถ้าต้องเล่าเรื่องประเด็นสังคมที่ซับซ้อนให้คนดูหยุดเลื่อนใน 5 วินาที คุณจะเริ่มด้วย hook แบบไหน และเพราะอะไร?";
const QUESTION_2 = "เลือกหนึ่งปัญหาสังคมที่คุณอยากทำคอนเทนต์เพื่อสร้างการเปลี่ยนแปลง คุณจะเล่าให้คนรู้สึกอยากมีส่วนร่วมอย่างไร?";
const QUESTION_3 = "เมื่อข้อมูลจริงกับความรู้สึกของผู้ชมดูขัดกัน คุณจะบาลานซ์ความถูกต้อง ความน่าสนใจ และความรับผิดชอบต่อสังคมอย่างไร?";

const HEADERS = [
  "Timestamp",
  "Position",
  "First Name",
  "Last Name",
  "Phone",
  "Email",
  "Portfolio",
  "Question 1",
  "Answer 1",
  "Question 2",
  "Answer 2",
  "Question 3",
  "Answer 3",
  "Consent",
  "Source URL",
  "User Agent"
];

function doGet() {
  return jsonOutput_({ ok: true, message: "Social Impact application endpoint is running." });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const params = e.parameter || {};
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error(`Sheet tab not found: ${SHEET_NAME}`);
    }

    ensureHeaders_(sheet);

    sheet.appendRow([
      new Date(),
      clean_(params.position || "Content Creator"),
      clean_(params.firstName),
      clean_(params.lastName),
      clean_(params.phone),
      clean_(params.email),
      clean_(params.portfolio),
      QUESTION_1,
      clean_(params.answer1),
      QUESTION_2,
      clean_(params.answer2),
      QUESTION_3,
      clean_(params.answer3),
      params.consent === "yes" ? "Yes" : "No",
      clean_(params.sourceUrl),
      clean_(params.userAgent)
    ]);

    return jsonOutput_({ ok: true });
  } catch (error) {
    return jsonOutput_({ ok: false, message: error.message });
  } finally {
    lock.releaseLock();
  }
}

function ensureHeaders_(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const current = range.getValues()[0];
  const needsUpdate = HEADERS.some((header, index) => current[index] !== header);

  if (needsUpdate) {
    range.setValues([HEADERS]);
    range.setFontWeight("bold");
    range.setBackground("#0F3D2E");
    range.setFontColor("#FFFFFF");
  }
}

function clean_(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
