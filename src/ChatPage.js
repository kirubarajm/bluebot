import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import ChatAppBar from './ChatAppBar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import FastQuestion from './FastQuestion';
import OpenAI from 'openai';
import { prepareMessages } from './utils/contextManager';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function ChatPage({ chatHistory, updateChatHistory }) {
  const [loading, setLoading] = useState(false);

  const [streamingMessage, setStreamingMessage] = useState('');
  const streamingMessageRef = useRef('');

  const addMessage = (data) => {
    updateChatHistory((prevHistory) => [...prevHistory, { ...data }]);
  };

  const sendMessageToOpenAI = async (message) => {
    setLoading(true);
    setStreamingMessage('');
    streamingMessageRef.current = '';

    try {
      const preparedMessages = prepareMessages(chatHistory, message);

      const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: preparedMessages,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          streamingMessageRef.current += content;
          setStreamingMessage(streamingMessageRef.current);
        }
      }

      // Add the complete message to chat history after streaming is done
      addMessage({
        message: streamingMessageRef.current,
        sender: 'AI',
        type: 'text',
      });
    } catch (error) {
      console.error('Error:', error);
      setStreamingMessage('An error occurred while fetching the response.');
      addMessage({
        message: 'An error occurred while fetching the response.',
        sender: 'AI',
        type: 'text',
      });
    } finally {
      setLoading(false);
      setStreamingMessage('');
    }
  };

  // Use effect to ask a question by adding it to chatHistory and triggering Open AI call
  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];
    if (
      lastMessage &&
      lastMessage.sender === 'You' &&
      lastMessage.type === 'text'
    ) {
      sendMessageToOpenAI(lastMessage.message);
    }
  }, [chatHistory]);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        maxHeight: '100vh',
        maxWidth: '100vw',
        overflowX: 'hidden',
        overflowY: 'hidden',
        background: 'linear-gradient(to bottom, #1a3a5a, #0a1929)',
        color: '#f7f7f7',
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <ChatAppBar />
        <MessageList
          messages={chatHistory}
          streamingMessage={streamingMessage}
          loading={loading}
        />
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                width: '50%',
                display: 'flex',
                justifyContent: 'start',
                mb: '40px',
              }}
            >
              <>
                <FastQuestion
                  addMessage={addMessage}
                  question="What is Blue Yonder?"
                />
                <FastQuestion
                  addMessage={addMessage}
                  question="What is Blue Yonder's business model?"
                />
                <FastQuestion
                  addMessage={addMessage}
                  question="What is ERP optimization?"
                />
              </>
            </Box>
          </Box>
          <ChatInput addMessage={addMessage} loading={loading} />
        </Box>
      </Box>
    </Box>
  );
}

export default ChatPage;
