const QUESTION_1 = "ถ้าต้องเล่าเรื่องประเด็นสังคมที่ซับซ้อนให้คนดูหยุดเลื่อนใน 5 วินาที คุณจะเริ่มด้วย hook แบบไหน และเพราะอะไร?";
const QUESTION_2 = "เลือกหนึ่งปัญหาสังคมที่คุณอยากทำคอนเทนต์เพื่อสร้างการเปลี่ยนแปลง คุณจะเล่าให้คนรู้สึกอยากมีส่วนร่วมอย่างไร?";
const QUESTION_3 = "เมื่อข้อมูลจริงกับความรู้สึกของผู้ชมดูขัดกัน คุณจะบาลานซ์ความถูกต้อง ความน่าสนใจ และความรับผิดชอบต่อสังคมอย่างไร?";

const landing = document.querySelector("#landing");
const formScreen = document.querySelector("#formScreen");
const successScreen = document.querySelector("#successScreen");
const startButton = document.querySelector("#startApplication");
const backButton = document.querySelector("#backToLanding");
const form = document.querySelector("#applicationForm");
const submitButton = document.querySelector("#submitButton");
const message = document.querySelector("#formMessage");

function showScreen(screen) {
  landing.hidden = screen !== "landing";
  formScreen.hidden = screen !== "form";
  successScreen.hidden = screen !== "success";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setMessage(text, ok = false) {
  message.textContent = text;
  message.classList.toggle("is-ok", ok);
}

function getEndpoint() {
  const url = window.SOCIAL_IMPACT_FORM_CONFIG?.googleScriptUrl?.trim() || "";
  if (!url || url.includes("PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE")) {
    return "";
  }
  return url;
}

function collectPayload() {
  const data = new FormData(form);
  return {
    submittedAtClient: new Date().toISOString(),
    position: data.get("position") || "Content Creator",
    firstName: String(data.get("firstName") || "").trim(),
    lastName: String(data.get("lastName") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    email: String(data.get("email") || "").trim(),
    portfolio: String(data.get("portfolio") || "").trim(),
    question1: QUESTION_1,
    answer1: String(data.get("answer1") || "").trim(),
    question2: QUESTION_2,
    answer2: String(data.get("answer2") || "").trim(),
    question3: QUESTION_3,
    answer3: String(data.get("answer3") || "").trim(),
    consent: data.get("consent") === "yes" ? "yes" : "no",
    sourceUrl: window.location.href,
    userAgent: navigator.userAgent
  };
}

async function submitApplication(payload) {
  const endpoint = getEndpoint();
  if (!endpoint) {
    throw new Error("ยังไม่ได้ตั้งค่า Google Apps Script Web App URL ในไฟล์ config.js");
  }

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams(payload)
  });
}

startButton.addEventListener("click", () => showScreen("form"));
backButton.addEventListener("click", () => showScreen("landing"));

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "กำลังส่ง...";

  try {
    await submitApplication(collectPayload());
    form.reset();
    showScreen("success");
  } catch (error) {
    setMessage(error.message || "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'ส่งใบสมัคร <span aria-hidden="true">→</span>';
  }
});
