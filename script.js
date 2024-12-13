// Scroll to section function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function scrollToCalculator(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Placeholder for interactive counter logic
// document.getElementById('impact-calculator').innerHTML = `
//     <h3>Input calculator here</h3>
//     <p>Explanation here</p>
//     <input type="range" min="0" max="50" step="1" id="impactRange" oninput="updateImpact()">
//     <p id="impactOutput">Result: </p>
// `;

// function updateImpact() {
//     const value = document.getElementById('impactRange').value;
//     document.getElementById('impactOutput').textContent = `Clothes reduced: ${value}`;
// }