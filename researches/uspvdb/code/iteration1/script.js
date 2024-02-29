
function processData() {
    const input = document.getElementById('csvFileInput');
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const data = d3.csvParse(text);
        displayDataSummary(data);
    };
    reader.readAsText(file);
}

function manualInputData() {
    const acCapacity = parseFloat(document.getElementById('acCapacityInput').value);
    const dcCapacity = parseFloat(document.getElementById('dcCapacityInput').value);

    // Assume the user inputs are in MW, convert them to the format expected by displayDataSummary
    const data = [
        { p_cap_ac: acCapacity, p_cap_dc: dcCapacity }
    ];

    displayDataSummary(data);
}

function displayDataSummary(data) {
    // Updated calculations with new metric
    const totalAcCapacity = d3.sum(data, d => +d.p_cap_ac);
    const totalDcCapacity = d3.sum(data, d => +d.p_cap_dc);
    const averageAcCapacity = d3.mean(data, d => +d.p_cap_ac);
    const averageDcCapacity = d3.mean(data, d => +d.p_cap_dc);
    const totalPanels = (totalAcCapacity + totalDcCapacity) * 5000; // New metric: 5000 panels per MW

    // Display the summaries
    const visualization = d3.select('#visualization');
    visualization.html(''); // Clear previous content
    visualization.append('p').text(`Total AC Capacity: ${totalAcCapacity.toFixed(2)} MW`);
    visualization.append('p').text(`Total DC Capacity: ${totalDcCapacity.toFixed(2)} MW`);
    visualization.append('p').text(`Average AC Capacity per Project: ${averageAcCapacity.toFixed(2)} MW`);
    visualization.append('p').text(`Average DC Capacity per Project: ${averageDcCapacity.toFixed(2)} MW`);
    visualization.append('p').text(`Estimated Total Number of Solar Panels: ${Math.round(totalPanels)}`);
}
