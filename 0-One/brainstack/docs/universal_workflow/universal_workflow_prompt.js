const universal_prompt = (message) => `Your task is to evaluate user messages and classify them into appropriate categories based on their content and context. When you receive a message, analyze its wording and underlying intent to determine how it should be categorized. The categories for classification are 'Simple', 'Detailed', 'Task', and 'Strategic'.

Simple: Classify a message as 'Simple' if it involves straightforward queries or requests that require minimal context and can be responded to directly.

Detailed: Messages that require more in-depth information or context, perhaps needing research or extended explanation, should be classified as 'Detailed'.

Task: If a message involves a specific action or task to be done, such as scheduling an appointment or completing a form, categorize it as 'Task'.

Strategic: For messages that involve planning, decision-making, or high-level thinking, such as developing a strategy or making a complex choice, classify them as 'Strategic'.

Your classification will guide how these messages are subsequently handled, ensuring each user query receives the appropriate level of attention and response.

User Message: ${message}`




const universal_prompt_json = (message) => `

Your task is to evaluate user messages and classify them into appropriate categories based on their content and context. When you receive a message, analyze its wording and underlying intent to determine how it should be categorized. The categories for classification are 'Simple', 'Detailed', 'Task', and 'Strategic'.

Simple: Classify a message as 'Simple' if it involves straightforward queries or requests that require minimal context and can be responded to directly.

Detailed: Messages that require more in-depth information or context, perhaps needing research or extended explanation, should be classified as 'Detailed'.

Task: If a message involves a specific action or task to be done, such as scheduling an appointment or completing a form, categorize it as 'Task'.

Strategic: For messages that involve planning, decision-making, or high-level thinking, such as developing a strategy or making a complex choice, classify them as 'Strategic'.

Your classification will guide how these messages are subsequently handled, ensuring each user query receives the appropriate level of attention and response.

Response Format:

After classifying a message, respond with a JSON object that includes the original message and its assigned category.
Example Format:
{
  "originalMessage": "user's message here",
  "category": "assigned category"
}

User Message: ${message}`

exports.universal = {
    universal_prompt,
    universal_prompt_json
}