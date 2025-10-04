const button = document.getElementById("summarizeBtn");
const textarea = document.getElementById("inputText");
const summaryDiv = document.getElementById("summary");

button.addEventListener("click", async () => {
  const text = textarea.value.trim();
  if (!text) {
    alert("Please enter some text");
    return;
  }

  summaryDiv.textContent = "Summarizing...";

  try {
    const response = await fetch("/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: text
    });

    if (!response.ok) throw new Error("Failed to summarize text");

    const summary = await response.text();
    summaryDiv.textContent = summary;

  } catch (error) {
    summaryDiv.textContent = "Error: " + error.message;
  }
});

