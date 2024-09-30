import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ChatPage from './ChatPage';

function Home() {
  // Chat history state declared here proactively, in case session management is needed later
  const [currentChatHistory, setCurrentChatHistory] = useState([]);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        maxHeight: '100vh',
        maxWidth: '100vw',
        overflowX: 'hidden',
        overflowY: 'hidden',
        background: 'linear-gradient(to bottom, #264e31, #112a18)',
        color: '#f7f7f7',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <ChatPage
          chatHistory={currentChatHistory}
          updateChatHistory={setCurrentChatHistory}
        />
      </Box>
    </Box>
  );
}

export default Home;
