**@brainstack/openai-Assistant**

**Description**

This package simplifies integrating the OpenAI assistant API into your application. It offers an abstraction layer that streamlines interaction with assistants, empowering you to create powerful conversational experiences.

**Installation**

```bash
npm install @brainstack/openai-assistant
```

**Usage**

1. **Import the necessary classes:**

   ```javascript
   import { OpenAIAssistant } from '@brainstack/openai-assistant';
   ```

2. **Create an OpenAIAssistant instance:**

   ```javascript
   const assistant = new OpenAIAssistant({
     apiKey: 'YOUR_OPENAI_API_KEY',
     assistantId: 'YOUR_ASSISTANT_ID',
   });
   ```

   - Replace `YOUR_OPENAI_API_KEY` with your actual OpenAI API key.
   - Obtain your `assistantId` from the OpenAI Assistant interface.

3. **(Optional) Add custom tools:**

   ```javascript
   assistant.addTool('myTool', async (args) => {
     // Your tool implementation here
     return 'Tool result';
   });
   ```

   Enhance your assistant's capabilities by defining custom tools that handle specific tasks.

4. **Subscribe to events (recommended):**

   ```javascript
   assistant.on('status_changed', (event) => {
     console.log('Assistant status changed:', event.status);
   });

   assistant.on('run_completed', (data) => {
     const response = data?.respmsg?.data?.[0]?.content?.[0]?.text?.value;
     console.log('Assistant response:', response || 'No text found');
   });
   ```

   Register event listeners to stay informed about the assistant's status and response to your messages.

5. **Start the assistant:**

   ```javascript
   async function startAssistant() {
     try {
       console.log('Initializing assistant...');
       await assistant.initThread();

       console.log('Creating message...');
       await assistant.addMessage('Can you readfile test.txt?');

       console.log('Running assistant...');
       await assistant.run();

       console.log('Sending another message...');
       await assistant.addMessage('How are you?');

       console.log('Running assistant again...');
       await assistant.run();
     } catch (error) {
       console.error('Assistant error:', error);
     }
   }

   startAssistant();
   ```

   This code snippet demonstrates how to:
   - Initialize the assistant thread.
   - Send messages to the assistant.
   - Trigger the assistant to process messages and generate responses.
   - Handle potential errors.

**API Reference**

- **OpenAIAssistant**
  - **constructor(options: ClientOptions, assistantId: string):** Creates a new OpenAI assistant instance.
  - **on(eventName: string | RegExp, callback: Function):** Registers an event listener.
  - **getStatus():** Returns the current assistant status (string).
  - **addTool(name: string, func: Function):** Adds a custom tool.
  - **removeTool(name: string):** Removes a custom tool.
  - **initThread(): Promise<any>** Initializes the OpenAI thread.
  - **pollAnswers(threadId: string, runId: string):** Polls the thread for answers.
  - **handleActionRequired(threadId: string, runId: string, requiredAction: any):** Handles required actions.
  - **handleCompletedRun(threadId: string):** Handles a completed run.
  - **addMessage(message: string):** Adds a message to the thread.
  - **cancel(runId: string):** Cancels a run in the thread.
  - **run(): Promise<void>** Starts the assistant and returns a promise that resolves when it finishes running.

- **OpenAIAssistantInterface** (extends OpenAIAssistant)
  - Inherits all methods from `OpenAIAssistant`.

**License**

MIT

**Additional Notes**

- Ensure you have a valid OpenAI API key and assistant ID before using this package.
- Refer to the OpenAI Assistant documentation for detailed information about available tools and required actions.
