# Blue Bot - ChatGPT-like Conversational UI

This project is a ChatGPT-like conversational UI built using React and Material UI. It replicates the core functionality and aesthetics of the ChatGPT interface while incorporating Adaptive Cards to enhance the user experience. The application integrates with OpenAI's GPT-4 model to enable real-time conversations.

## Tech Stack

- React
- Material UI
- Adaptive Cards
- OpenAI API

## Exciting Features

1. 🚀 Lightning-fast chat with real-time message streaming
2. 🧠 Powered by OpenAI's cutting-edge GPT-4 model
3. 🎨 Interactive Adaptive Cards - Ask about code and prepare to be amazed!
4. 📱 Sleek, responsive design for seamless chatting on any device
5. 🔽 Never lose your place with our handy scroll-to-bottom button
6. ⚡ Quick-fire questions at your fingertips with shortcut buttons

## Main Components

- `App.js`: The root component that renders the Home page.
- `Home.js`: Contains the main chat interface.
- `ChatPage.js`: Manages the chat logic and renders the MessageList and ChatInput components.
- `AdaptiveCardRenderer.js`: Common wrapper component for rendering Adaptive Cards for past (`MesageList.js`) and currently streaming (`StreamingMessage.js`) messages.
- `ChatInput.js`: Handles user input for sending messages.
- `backend.js`: Currently contains the backend logic for interacting with the OpenAI API. This will be part of a server deployment in an ideal full stack project.

## Setup and Running the Project

1. Clone the repository to your local machine.

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the OpenAI API Key:
   - Create a `.env` file in the root directory of the project.
   - Add the following line to the `.env` file, replacing `your_api_key_here` with your actual OpenAI API key:
     ```
     REACT_APP_OPENAI_API_KEY=your_api_key_here
     ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

For Material UI components and styling, refer to the [Material UI documentation](https://mui.com/material-ui/getting-started/).

To explore Adaptive Cards and their capabilities, visit the [Adaptive Cards documentation](https://adaptivecards.io/documentation/).