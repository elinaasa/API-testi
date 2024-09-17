require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

// Function to process HTML and make it semantic
const processHtml = async (req, res) => {
  try {
    const filePath = req.file.path;
    const htmlContent = fs.readFileSync(filePath, "utf8");

    // Send request to your OpenAI instance for semantic enhancement
    const response = await axios.post(
      process.env.OPENAI_API_URL, // Ensure this URL is defined
      {
        model: "gpt-4", // Assuming this is compatible with your setup
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that enhances HTML for better semantic structure.",
          },
          {
            role: "user",
            content: `Here is some HTML that needs semantic enhancement:\n\n${htmlContent}`,
          },
        ],
      }
    );

    const semanticHtml = response.data.choices[0].message.content;

    // Send the enhanced HTML back to the client
    res.setHeader("Content-Type", "text/html");
    res.send(semanticHtml);
  } catch (error) {
    console.error("Error processing HTML:", error);
    res.status(500).send("Error processing the HTML");
  }
};

module.exports = { processHtml };
