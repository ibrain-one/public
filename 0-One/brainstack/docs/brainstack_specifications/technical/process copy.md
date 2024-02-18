## System Process Flow

This document outlines the end-to-end process flow of the system, describing how messages are received, processed, and acted upon through the loop mechanism with attention, short-term memory, and long-term memory.

1. **Bridge Server**: The entry point for messages entering the system loop. It captures the attention by flagging important messages for further processing and reinforcement.

2. **Data Transformation**: The Data Transformation Service processes the raw data and sends it forward in a structured format.

3. **Routing**: Messages are routed based on their content and importance. The Router ensures that messages are looped back for reinforcement or advanced towards long-term storage.

4. **Short-Term Memory (STM)**: The STM temporarily holds important messages. It uses a scoring system to evaluate which messages require reinforcement. Messages with decreasing relevance over time are subject to removal unless they are reinforced through user interaction or related activities.

5. **Long-Term Memory (LTM)**: If a message's importance is reinforced over time, it is transferred from STM to LTM, where it is stored more permanently.

6. **Reinforcement**: User interactions and related activities in the system can reinforce the messages. This process involves boosting the importance score of messages in STM to ensure their transition to LTM.

7. **Garbage Collection**: STM periodically cleans up messages that have not been reinforced, allowing the memory to focus on retaining only the most relevant data.

8. **AI Elements Service**: AI models may be queried for decision support, enhancing the system's ability to process and route messages effectively.

9. **BrainStack Services**: BrainStack Logging, BrainStack Hub, BrainStack Storage, STM, and LTM are integral parts of the process, each fulfilling their roles in memory retention, persistence, and system-wide event handling.

This loop mechanism aims to mimic cognitive memory processes, where messages are continuously cycled, reinforced, and either retained or dissipated based on their relevance and importance.

## System Process Flow

This document outlines the end-to-end process flow of the system, describing how messages are received, processed, and acted upon.

1. **Incoming Message**: An incoming message is received by the bridge server.

```typescript
class BridgeServer implements IBridgeServer {
  // ...
  public receiveMessage(rawData: string | Buffer): void {
    // ...
  }
}
```

2. **Data Transformation**: The bridge server sends the raw data to the `DataTransformationService` to transform it into a structured message.

```typescript
class DataTransformationService implements IDataTransformationService {
  // ...
}
```

3. **Routing**: The `Router` receives the structured message and decides where to route it based on predefined rules and the messageâs action.

```typescript
class Router implements IRouter {
  // ...
}
```

4. **Rule and State Engines**: The router utilizes the `RuleEngine` and `StateEngine` to apply rules to the message and predict the next state.

```typescript
class RuleEngine implements IRuleEngine {
  // ...
}

class StateEngine implements IStateEngine {
  // ...
}
```

5. **Task Management**: Once the rules are cleared and the next state is calculated, the `TaskManagerService` processes the task.

```typescript
class TaskManagerService implements ITaskManagerService {
  // ...
}
```

6. **AI Elements Service**: If additional decision support is required, the system can query the `AIElementsService`.

```typescript
class AIElementsService implements IAIElementsService {
  // ...
}
```

7. **BrainStack Hub**: The `BrainStackHub` is used to publish and subscribe to events related to the task processing.

```typescript
class BrainStackHub implements IBrainStackHub {
  // ...
}
```

8. **BrainStack Storage, STM, and LTM**: For storage of data and handling memory, the system would interact with respective services.

```typescript
class BrainStackStorage implements IBrainStackStorage {
  // ...
}

class BrainStackSTM implements IBrainStackSTM {
  // ...
}

class BrainStackLTM implements IBrainStackLTM {
  // ...
}
```

This is a high-level overview. Each service will interact with others based on these interfaces, making it clear how data flows from the moment it enters the system until tasks are processed and managed. The actual processing logic within each method would be based on the specific implementations you develop for your system.
