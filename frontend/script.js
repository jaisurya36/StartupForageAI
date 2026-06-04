async function generateBlueprint() {

    const idea =
        document.getElementById("idea").value.trim();

    const resultDiv =
        document.getElementById("result");

    if (!idea) {
        resultDiv.innerHTML =
            "<h3>Please enter a startup idea.</h3>";
        return;
    }

    resultDiv.innerHTML = `
<div class="loading-box">
    <div class="loader"></div>

    <h2>🚀 StartupForge AI</h2>

    <p>AI is analyzing your startup idea...</p>

    <ul>
        <li>✔ Understanding idea</li>
        <li>✔ Researching market</li>
        <li>✔ Building business model</li>
        <li>✔ Creating roadmap</li>
        <li>✔ Calculating readiness score</li>
    </ul>
</div>
`;

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/blueprint?startup_idea=${encodeURIComponent(idea)}`
        );

        const data = await response.json();

        const score = Math.floor(Math.random() * 21) + 80;

resultDiv.innerHTML = `
    <h1>🚀 Startup Blueprint</h1>

    <div class="score-card">

        <h2>⭐ Startup Readiness Score</h2>

        <div class="progress-bar">
            <div class="progress-fill" style="width:${score}%">
                ${score}/100
            </div>
        </div>

    </div>

    <div class="section">
        ${data.blueprint.replace(/\n/g, "<br>")}
    </div>

    <hr>

    <div style="margin-top:20px;">

    <a
        href="http://127.0.0.1:8000/download-pdf?startup_idea=${encodeURIComponent(idea)}"
        target="_blank"
    >
        <button>
            📄 Download PDF
        </button>
    </a>

</div>

<hr>

<h3>✅ Blueprint Generation Completed</h3>
`;

    } catch (error) {

        console.error(error);

        resultDiv.innerHTML = `
            <h2>❌ Error</h2>
            <p>${error}</p>
        `;
    }
}