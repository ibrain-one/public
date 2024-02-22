
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

function displayDataSummary(data) {
    // Calculate the summaries
    const totalAcCapacity = d3.sum(data, d => +d.p_cap_ac);
    const totalDcCapacity = d3.sum(data, d => +d.p_cap_dc);
    const averageAcCapacity = d3.mean(data, d => +d.p_cap_ac);
    const averageDcCapacity = d3.mean(data, d => +d.p_cap_dc);
    const totalPanels = totalDcCapacity * 1000 / 0.35; // Assuming 350W per panel

    // Display the summaries in the visualization div
    const visualization = d3.select('#visualization');
    visualization.html(''); // Clear previous content
    visualization.append('p').text(`Total AC Capacity: ${totalAcCapacity.toFixed(2)} MW`);
    visualization.append('p').text(`Total DC Capacity: ${totalDcCapacity.toFixed(2)} MW`);
    visualization.append('p').text(`Average AC Capacity per Project: ${averageAcCapacity.toFixed(2)} MW`);
    visualization.append('p').text(`Average DC Capacity per Project: ${averageDcCapacity.toFixed(2)} MW`);
    visualization.append('p').text(`Estimated Total Number of Solar Panels: ${Math.round(totalPanels)}`);
}
