# Technical Blueprint for Brain Stack

This technical blueprint provides an in-depth look at the architecture of Brain Stack, detailing its various components, the data they handle, the interfaces they expose, and the protocols that govern their communication.

The goal of this document is to serve as a comprehensive guide for developers and system architects involved in implementing and maintaining the Brain Stack system.

## Bridge Server & Client
### Interfaces
#### WebSocketInterface
##### Methods:
- `connect()`: Establishes a WebSocket connection to the client.
- `disconnect()`: Closes an existing WebSocket connection.
- `send(DataPacket packet)`: Serializes and sends data to the client.
- `receive()`: Deserializes incoming data for further processing.

#### DataInterface
##### Methods:
- `serialize(object data)`: Converts data into a transportable string or binary format.
- `deserialize(string rawData)`: Parses received data into a usable object format.

### Data Model
#### DataPacket
DataPacket: Represents the structured data transmitted between bridge server and clients.
##### Properties:
- `type`: Identifies the type of packet.
- `payload`: Encapsulates the contents of the packet.
- `timestamp`: Marks the time the packet was created.

### Communication Standards
- WebSocket Protocol (RFC 6455): Ensures full-duplex communication channels over a single TCP connection.
- JSON-RPC 2.0: Utilized for framing messages in a JSON format which supports both RPC calls and notifications.

### Workflow
A client initiates a connection using the WebSocketInterface.connect() method.
Once connected, the client can send messages, which the bridge server serializes using DataInterface.serialize().
The serialized data passes through WebSocket to the server and gets deserialized by the DataInterface.deserialize().
When the server processes a response, it returns the serialized data back to the client via WebSocket transmission.
The client receives and deserializes the data to update the UI accordingly.

## Data Transformation Service (DTS)
### Interfaces
#### TransformationInterface
##### Methods:
- `transformToUniform(object data)`: Standardizes various data formats to a uniform structure.
- `transformFromUniform(string uniformData)`: Converts standardized data back to its original form, if needed.

#### ValidationInterface
##### Methods:
- `validateData(object data)`: Checks data against business rules and data schemas to ensure integrity and correctness.

### Data Model
#### TransformationRules
TransformationRules: Contains the mapping of data fields and types to the corresponding uniform format.
##### Properties:
- `sourceField`: Name of the original data field.
- `targetField`: Name of the field in the uniform data model.
- `transformationLogic`: Specifies a function or method used to transform data.

### Communication Standards
- Data Format Agnostic: DTS can handle JSON, XML, CSV, and binary data. It uses MIME types to identify the incoming data format.
- Validation Schemas: JSON Schema or XML Schema Definitions (XSD) are used to define acceptable data structures for incoming data.

### Workflow
The DTS receives raw, serialized data from the bridge server.
The TransformationInterface.transformToUniform() method normalizes the data into a standardized format.
Once transformed, the ValidationInterface.validateData() method inspects the data for correctness as per the defined schemas.
The transformed and validated data is then passed on to the Router Service for further action.

## Router Service

### Interfaces

#### RoutingInterface

##### Methods

- `determineRoute(Event event)`: Determines the destination service for a given event based on its action type and associated metadata.
- `dispatch(Event event)`: Forwards the event to the determined service or micro-app for processing.

#### Data Model

- Event: Represents an action-driven data package routed within the Brain Stack.
  - Properties:
    - actionType: A string denoting the type of action required.
    - payload: The data payload associated with the action.
    - metadata: Any additional information that aids in routing decisions.

#### Communication Standards

- RESTful API: For synchronous tasks that require immediate acknowledgment.
- gRPC: For efficient, low-latency communication between services, particularly suitable for microservices like Router Service.

### Workflow

The Router Service listens for Event objects from the DTS. Upon receipt, the `RoutingInterface.determineRoute()` method is invoked, which consults a dynamic routing table to determine the correct destination. The event is dispatched to the designated service or micro-app via `RoutingInterface.dispatch()`.

## Task Manager

### Interfaces

#### ExecutionInterface

##### Methods

- `schedule(Task task)`: Adds a task to the execution queue with a specified priority.
- `execute()`: Dequeues and runs the next task in line, managing retries and exceptions.

#### Data Model

- Task: Encapsulates an actionable unit of work that the Task Manager oversees.
  - Properties:
    - id: A unique identifier for the task.
    - status: Current status of the task (pending, in_progress, completed, failed).
    - retryCount: The number of times the task has been retried.

#### Communication Standards

- AMQP: As a messaging protocol that supports task queues, priority, and reliable delivery.

### Workflow

Tasks are produced by various services and submitted to the Task Manager via the `ExecutionInterface.schedule()` method. The Task Manager maintains an ordered queue of tasks, managing execution based on priority and dependencies. As tasks are executed, the Task Manager handles successful completion, failure, and retry scenarios, updating the task's status accordingly.

## Micro Apps

### Interfaces

#### AppInterface

##### Methods

- `handleEvent(Event event)`: Processes incoming events and performs necessary actions.
- `reportState()`: Returns the current state representation of the micro-app.

#### Data Model

- Micro-app-specific models, schemas, and configurations as needed per application.

#### Communication Standards

- Event-Driven Model: Using discrete events to signify state changes, requests, or data updates.

### Workflow

Micro Apps subscribe to specific events via the Pub/Sub Hub and react to the notifications received. Interaction with the Hub ensures that the state remains synchronized with the rest of the Brain Stack system. Each Micro App exposes endpoints or functions that adhere to a defined interface, making them discoverable and communicable via API gateways.

## Event Structure Standard

### Standard Event Model

- Standard Event: A canonical representation for events in the Brain Stack system.
  - Properties:
    - eventType: Classifies the event (user-action, system-update, etc.).
    - source: The originator of the event (which could be a user ID, service name, etc.).

## State Management

### Brain Stack State Interface

#### Methods

- `getState(query)`: Retrieves state data based on a specified query.
- `updateState(mutator)`: Applies a mutator function or update object to the current state.

### Workflow

State changes within Micro Apps trigger events with the Standard Event structure, which are then broadcast through the Pub/Sub Hub. The Brain Stack State listens and reacts to events to maintain a consistent and up-to-date system state. State management protocols operate on a cycle of mutation and observation, ensuring that state changes are handled transactionally and atomically across services.
