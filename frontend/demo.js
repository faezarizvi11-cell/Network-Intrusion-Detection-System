let selectedSample = null;

let benign = document.getElementById("benignSample");
let dos = document.getElementById("dosSample");

fetch("http://127.0.0.1:8000/demo-samples")
    .then(response => response.json())
    .then(data => {

        console.log(data);

        // Benign Traffic
        benign.addEventListener("click", function() {

            selectedSample = { ...data.samples[0] };

            delete selectedSample.Label;

            selectedSample = Object.fromEntries(
                Object.entries(selectedSample).map(([key, value]) => [
                    key.replaceAll(" ", "_").replaceAll("/", "_"),
                    value
                ])
            );

            document.getElementById("selectedSample").textContent =
                "Selected traffic: Benign";

            console.log("Benign sample:", selectedSample);
            console.log("Number of fields:", Object.keys(selectedSample).length);
        });


        // DoS Attack Traffic
        dos.addEventListener("click", function() {

            selectedSample = { ...data.samples[1] };

            delete selectedSample.Label;

            selectedSample = Object.fromEntries(
                Object.entries(selectedSample).map(([key, value]) => [
                    key.replaceAll(" ", "_").replaceAll("/", "_"),
                    value
                ])
            );

            document.getElementById("selectedSample").textContent =
                "Selected traffic: DoS Attack";

            console.log("DoS sample:", selectedSample);
            console.log("Number of fields:", Object.keys(selectedSample).length);
        });


        // Check Traffic
        let check = document.getElementById("checkTraffic");

        check.addEventListener("click", function() {

            if (!selectedSample) {
                console.log("No sample selected");
                return;
            }

            console.log("Sending:", selectedSample);
            console.log(
                "Number of fields:",
                Object.keys(selectedSample).length
            );

            fetch("http://127.0.0.1:8000/NetworkFlow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(selectedSample)
            })
            .then(response => {

                console.log("Status:", response.status);

                return response.json();
            })
            .then(data => {

    console.log("FastAPI response:", data);

    let result = document.getElementById("predictionResult");
    let classification = document.getElementById("classification");
    let confidence = document.getElementById("confidence");
    let resultIcon = document.getElementById("resultIcon");

    result.style.display = "block";

    classification.textContent =
        "Classification: " + data.classification;

    confidence.textContent =
        "Confidence: " + (data.confidence * 100).toFixed(2) + "%";

    if (data.classification === "Benign") {
        resultIcon.textContent = "🛡️";
        classification.style.color = "green";
    } else {
        resultIcon.textContent = "🚨";
        classification.style.color = "red";
    }

})
            .catch(error => {

                console.log("Request error:", error);

            });

        });

    })
    .catch(error => {

        console.log("Error loading samples:", error);

    });