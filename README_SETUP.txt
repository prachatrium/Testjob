Social Impact Content Creator Landing Page

ไฟล์หลัก:
- index.html
- styles.css
- app.js
- config.js
- assets/social-impact-hero.png
- Code.gs

Google Sheet ที่สร้างไว้:
https://docs.google.com/spreadsheets/d/1AYRdYtSHqYHBN4VLPs0Ln2EcKu9LQkot9sWuSsfXMjM/edit

ตั้งค่าให้ฟอร์มส่งข้อมูลเข้า Google Sheet:
1. เปิด Google Sheet ด้านบน
2. ไปที่ Extensions > Apps Script
3. วางโค้ดจากไฟล์ Code.gs แทนโค้ดเดิม แล้วกด Save
4. ไปที่ Deploy > New deployment
5. เลือก type เป็น Web app
6. ตั้งค่า Execute as: Me
7. ตั้งค่า Who has access: Anyone
8. กด Deploy แล้วคัดลอก Web App URL
9. เปิดไฟล์ config.js แล้วแทนค่า PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE ด้วย Web App URL
10. นำโฟลเดอร์นี้ไปอัปโหลดขึ้นโฮสติ้ง แล้วใช้ URL ของ index.html สำหรับสร้าง QR Code

หลังตั้งค่าเสร็จ เมื่อผู้สมัครกดส่งใบสมัคร ข้อมูลจะถูกเพิ่มเข้าแท็บ Applications โดยอัตโนมัติ
