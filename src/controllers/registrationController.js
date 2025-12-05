const googleSheetsService = require("../services/googleSheetsService");

const registerCourse = async (req, res) => {
  const { name, email, studentId, course } = req.body;

  // Basic validation
  if (!name || !email || !studentId || !course) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Email format validation
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  // Student ID format validation (example: assumes numeric)
  if (!/^[0-9]+$/.test(studentId)) {
    return res.status(400).json({ error: "Student ID must be numeric." });
  }

  const timestamp = new Date().toISOString();
  const rowData = [name, email, studentId, course, timestamp];

  try {
    await googleSheetsService.appendSpreadsheet(rowData);
    res.status(200).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error registering course:", error);
    res.status(500).json({ error: "Failed to register course." });
  }
};

module.exports = { registerCourse };
