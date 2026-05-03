import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = new URL("./output/", import.meta.url);
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Applications");
sheet.showGridLines = false;
sheet.freezePanes.freezeRows(1);

const headers = [
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
  "User Agent",
];

sheet.getRange("A1:P1").values = [headers];
sheet.getRange("A1:P1").format = {
  fill: "#0F3D2E",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
};

sheet.getRange("A:P").format.font = { name: "Arial", size: 10, color: "#1B2A24" };
sheet.getRange("A:A").format.columnWidthPx = 150;
sheet.getRange("B:B").format.columnWidthPx = 140;
sheet.getRange("C:F").format.columnWidthPx = 130;
sheet.getRange("G:G").format.columnWidthPx = 190;
sheet.getRange("H:H").format.columnWidthPx = 320;
sheet.getRange("I:I").format.columnWidthPx = 320;
sheet.getRange("J:J").format.columnWidthPx = 320;
sheet.getRange("K:K").format.columnWidthPx = 320;
sheet.getRange("L:L").format.columnWidthPx = 320;
sheet.getRange("M:M").format.columnWidthPx = 320;
sheet.getRange("N:P").format.columnWidthPx = 180;

const preview = await workbook.render({
  sheetName: "Applications",
  range: "A1:P8",
  scale: 1,
  format: "png",
});
await fs.writeFile(new URL("./output/applications-preview.png", import.meta.url), new Uint8Array(await preview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(fileURLToPath(new URL("./output/social-impact-content-creator-applications.xlsx", import.meta.url)));
