import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ChatAppBar from '../components/common/ChatAppBar';
import MessageList from '../components/messages/MessageList';
import ChatInput from '../components/common/ChatInput';
import FastQuestion from '../components/common/FastQuestion';
import { sendMessageToOpenAI } from '../backend/backend';
import { extractCodeBlocks } from '../utils/codeBlockExtractor';

function ChatPage({ chatHistory, updateChatHistory }) {
  const [loading, setLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');

  const addMessage = (data) => {
    updateChatHistory((prevHistory) => [...prevHistory, { ...data }]);
  };

  const sendMessage = async (message) => {
    setLoading(true);
    setStreamingMessage('');

    try {
      let accumulatedMessage = '';
      await sendMessageToOpenAI(chatHistory, message, (streamContent) => {
        if (streamContent === null) {
          // Stream has ended, process the full message
          const codeBlocks = extractCodeBlocks(accumulatedMessage);

          addMessage({
            message: accumulatedMessage,
            sender: 'AI',
            type: 'text',
            codeBlocks: codeBlocks,
          });
        } else {
          // Process each chunk of the stream
          accumulatedMessage += streamContent;
          setStreamingMessage(accumulatedMessage);
        }
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
      sendMessage(lastMessage.message);
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
          {chatHistory.length === 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: { xs: '100%', sm: '50%' },
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: '40px',
                  gap: 2,
                }}
              >
                <FastQuestion
                  addMessage={addMessage}
                  question="What is Blue Yonder?"
                />
                <FastQuestion
                  addMessage={addMessage}
                  question="Write hello world in python."
                />
                {/* <FastQuestion
                  addMessage={addMessage}
                  question="What is ERP optimization?"
                /> */}
              </Box>
            </Box>
          )}
          <ChatInput addMessage={addMessage} loading={loading} />
        </Box>
      </Box>
    </Box>
  );
}

export default ChatPage;
