const { google } = require("googleapis");
require("dotenv").config();

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const getGoogleSheetClient = async () => {
  const client = await auth.getClient();
  return google.sheets({
    version: "v4",
    auth: client,
  });
};

const appendSpreadsheet = async (rowData) => {
  const googleSheetClient = await getGoogleSheetClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  // Nếu tab tên Sheet1 (mặc định)

    const range = `'Student Courses'!A:E`; // chú ý dấu nháy đơn nếu có khoảng trắng


  await googleSheetClient.spreadsheets.values.append({
    spreadsheetId,
    range: range, // Assuming columns A-E for Name, Email, Student ID, Course, Timestamp
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [rowData],
    },
  });
};

module.exports = { appendSpreadsheet };
