document.getElementById('calculate-button').addEventListener('click', function() {
    // Get the number of each clothing type from the input fields
    const numTshirt = document.getElementById('num-tshirt').value || 0;
    const numJeans = document.getElementById('num-jeans').value || 0;
    const numJacket = document.getElementById('num-jacket').value || 0;
    const numUndergarment = document.getElementById('num-undergarment').value || 0;

    // Waste factors for each clothing type
    const tshirtWasteFactor = 0.5; // kg per T-shirt
    const jeansWasteFactor = 1.0;  // kg per Jeans
    const jacketWasteFactor = 0.8; // kg per Jacket
    const undergarmentWasteFactor = 0.3; // kg per Undergarment

    // CO2 emission factors for each clothing type
    const tshirtCO2Factor = 10;    // kg CO2 per T-shirt
    const jeansCO2Factor = 20;     // kg CO2 per Jeans
    const jacketCO2Factor = 15;    // kg CO2 per Jacket
    const undergarmentCO2Factor = 5;  // kg CO2 per Undergarment

    // Calculate the total textile waste for each type
    const tshirtWaste = numTshirt * tshirtWasteFactor;
    const jeansWaste = numJeans * jeansWasteFactor;
    const jacketWaste = numJacket * jacketWasteFactor;
    const undergarmentWaste = numUndergarment * undergarmentWasteFactor;

    // Calculate the total CO2 emissions for each type
    const tshirtCO2 = numTshirt * tshirtCO2Factor;
    const jeansCO2 = numJeans * jeansCO2Factor;
    const jacketCO2 = numJacket * jacketCO2Factor;
    const undergarmentCO2 = numUndergarment * undergarmentCO2Factor;

    // Calculate the total waste and CO2 emissions
    const totalWaste = tshirtWaste + jeansWaste + jacketWaste + undergarmentWaste;
    const totalCO2 = tshirtCO2 + jeansCO2 + jacketCO2 + undergarmentCO2;

    // Display the results
    document.getElementById('result-waste').textContent = `Estimated Textile Waste: ${totalWaste.toFixed(2)} kg`;
    document.getElementById('result-co2').textContent = `Estimated CO2 Emissions: ${totalCO2.toFixed(2)} kg`;
});