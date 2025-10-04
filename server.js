import express from "express";
import bodyParser from "body-parser";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const app = express();
app.use(bodyParser.text());

// Initialize AWS Bedrock and S3 clients
const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });
const s3 = new S3Client({ region: "us-east-1" });
app.use(express.static("public"));
app.post("/summarize", async (req, res) => {
  const inputText = req.body;

  if (!inputText || inputText.trim() === "") {
    return res.status(400).send("Please provide some text to summarize.");
  }

  try {
  // Create the command for Titan Text Lite
    const command = new InvokeModelCommand({
      modelId: "amazon.titan-text-lite-v1",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        inputText: `Summarize this:\n\n${inputText}`,
        textGenerationConfig: {
          temperature: 0.7,
          maxTokenCount: 200,
          stopSequences: []
        }
      }),
    });

    // Send request to Bedrock
    const response = await bedrock.send(command);
    const data = JSON.parse(new TextDecoder().decode(response.body));

    // Extract summary from Titan response
    const summary = data.results[0].outputText;

    await s3.send(new PutObjectCommand({
      Bucket: "text-summarizer-bucket-arjn", 
      Key: `summaries/summary-${Date.now()}.txt`,
      Body: summary,
    }));
    res.send(summary);

  } catch (error) {
    console.error("Error summarizing text:", error);
    res.status(500).send("An error occurred while summarizing the text.");
  }
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));

