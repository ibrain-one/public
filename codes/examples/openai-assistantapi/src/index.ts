import {OpenAIAssistant} from '@brainstack/openai-assistantapi';

// Initialize the OpenAIAssistant with your API key and assistant ID
const apiKey: string = "key";
const assistantId: string = "id";
const assistant: OpenAIAssistant = new OpenAIAssistant({apiKey}, assistantId);

// Define a function to handle required actions
const handleRequiredAction = async (args: any): Promise<any> => {
    // Your logic to handle the required action
    console.log('readFile required action with arguments:', args);
    // Return some result
    return 'helo data file test';
  };
  

// Add the function to the assistant
assistant.addTool('readFile', handleRequiredAction);

// Subscribe to events emitted by the assistant
assistant.on('status_changed', (_event: any) => {
  console.log('Status changed:', _event?.status);
});

assistant.on('run_completed', (data: any) => {
  console.log('Run completed:', data?.respmsg?.data?.[0]?.content?.[0]?.text?.value ?? 'No text found');
});

// Start the assistant
async function startAssistant(): Promise<void> {
  try {
    console.log('Initializing thread...');
    await assistant.initThread();

    // Create a message before running the step
    console.log('Creating message...');
    await assistant.addMessage('Can you readfile test.txt?');

    // Handle the run step after creating the message
    console.log('Handling run step...');
    
    await assistant.run();



    await assistant.addMessage('How are you?');

    // Handle the run step after creating the message
    console.log('Handling run step 2...');
    
    await assistant.run();
  } catch (error) {
    console.error('Error starting assistant:', error);
  }
}

startAssistant();
