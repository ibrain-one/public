const { cognitiveLogicDeterninistic } = require('./cognitive_logic_deterministic')
const { universal } = require('./universal_workflow_prompt')

const { universal_prompt_json, universal_prompt } = universal

const prompt = (message) => `You are the Perspective AI of the Universal Workflow. Your responsability is to evaluate user intentions and identify the appropriate perspective of the universal workflow leading to a success. When you receive a message, analyze its wording and underlying intent to determine the necessary perspective that will convert a complex problem into multiple simple steps. The categories for classification are 'Simple', 'Detailed', 'Task', and 'Strategic'.

Micro: Classify a message as 'Simple' if it involves straightforward queries or requests that require minimal context and can be responded to directly.

Meso: Messages that require more in-depth information or context, perhaps needing research or extended explanation, should be classified as 'Detailed'.

Macro: If a message involves a specific action or task to be done, such as scheduling an appointment or completing a form, categorize it as 'Task'.

Strategic: For messages that involve planning, decision-making, or high-level thinking, such as developing a strategy or making a complex choice, classify them as 'Strategic'.

Your classification will guide how these messages are subsequently handled, ensuring each user query receives the appropriate level of attention and response.

User Message: ${message}
`

// Sample function to categorize the query
async function categorizeQuery(query) {

    const result = String(await cognitiveLogicDeterninistic(query)).toLowerCase()
    console.log(result)
    if (result.includes("simple")) {
        return "Simple";
    } else if (result.includes("detailed")) {
        return "Detailed";
    } else if (result.includes("task")) {
        return "Task";
    } else if (result.includes("strategic")) {
        return "Strategic";
    } else {
        return "Unknown";
    }
}

// Sample function to handle a simple query with LLM
async function handleSimpleQuery(query) {
    // Integrate with LLM API
    // Placeholder for LLM API call
    // console.log(`Handling simple query: ${query}`);
    return "Simple query response";
}

// Sample function to handle a detailed query with LLM
async function handleDetailedQuery(query) {
    // Integrate with LLM API and provide a detailed response
    // console.log(`Handling detailed query: ${query}`);
    return "Detailed query response";
}

// Sample function to handle a task query with Task Manager
async function handleTaskQuery(query) {
    // Integrate with your Task Manager system
    // console.log(`Handling task query: ${query}`);
    // Placeholder for Task Manager API call
    return "Task plan executed";
}

// Sample function to handle a strategic query with Intention Manager
async function handleStrategicQuery(query) {
    // Integrate with your Intention Manager system
    // console.log(`Handling strategic query: ${query}`);
    // Placeholder for Intention Manager API call
    return "Strategic plan executed";
}

// Main function to process queries
async function universalWorkflow(query) {
    const category = await categorizeQuery(query);
    let response;

    switch (category) {
        case "Simple":
            response = await handleSimpleQuery(query);
            break;
        case "Detailed":
            response = await handleDetailedQuery(query);
            break;
        case "Task":
            response = await handleTaskQuery(query);
            break;
        case "Strategic":
            response = await handleStrategicQuery(query);
            break;
        default:
            response = "Query category not recognized";
    }

    return response;
}

// Example usage
// universalWorkflow(universal_prompt("Hello how are you ?")).then(response => {
//     console.log(response);

// });
universalWorkflow(prompt("build a bridge")).then(response => {
    console.log(response);

});

// F