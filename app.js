const express = require("express");
const multer = require("multer");
const path = require("path");
const { processHtml } = require("./routes/openai");

const app = express();
const port = 3000;

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static("public"));

// Routes
app.post("/upload", upload.single("htmlFile"), processHtml);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
