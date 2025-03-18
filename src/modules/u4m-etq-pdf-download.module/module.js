// read the query params from the url for docNum and fileName
const urlParams = new URLSearchParams(window.location.search);
const docNum = urlParams.get("docNum");
const fileName = urlParams.get("fileName");

console.log("docNum:", docNum);
console.log("fileName:", fileName);

try {
  console.log("Starting PDF fetch process");

  // animate the ...
  const dots = document.querySelector(".dots");
  let i = 0;
  const interval = setInterval(() => {
    dots.textContent = ".".repeat(i);
    i = (i + 1) % 4;
  }, 500);

  // Direct request to fetch PDF
  fetch("https://w33ey6nkw6.execute-api.us-east-2.amazonaws.com/prod/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      docNumber: docNum,
    }),
  })
    .then((response) => {
      console.log("Response received:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log("Processing response data:", responseData);

      if (!responseData.status === "success" || !responseData.data) {
        throw new Error("Invalid response format");
      }

      // Find the matching PDF in the response data
      const matchingPdf = responseData.data.find(
        (pdfData) => pdfData.name === fileName
      );

      if (!matchingPdf) {
        throw new Error(`No PDF found matching filename: ${fileName}`);
      }

      console.log("Creating blob for PDF:", matchingPdf.name);
      const blob = new Blob([new Uint8Array(matchingPdf.buffer.data)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      console.log("Created URL:", url);
      window.location.href = url;
    })
    .catch((error) => {
      console.error("Error fetching PDF:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
      alert("Unable to download the PDF. Please try again later.");
    });
} catch (error) {
  console.error("Error in PDF process:", error);
  console.error("Error details:", {
    message: error.message,
    stack: error.stack,
  });
  alert("Unable to download the PDF. Please try again later.");
}
