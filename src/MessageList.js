import React, { useEffect, useRef, useMemo } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import logo from './images/logo.png';
import geneAvatar from './images/dp.jpeg';
import LoadingDots from './LoadingDots';
import StreamingMessage from './StreamingMessage';

function trimReactNode(node) {
  if (typeof node === 'string') {
    return node.trim();
  }
  if (React.isValidElement(node)) {
    const newChildren = React.Children.map(node.props.children, trimReactNode);
    return React.cloneElement(node, {}, newChildren);
  }
  if (Array.isArray(node)) {
    return node.map(trimReactNode);
  }
  return node;
}

function MessageList({ messages, streamingMessage, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, streamingMessage]);

  const formatMessage = (msg, index) => {
    if (msg.role === 'user') {
      msg.sender = 'You';
    }
    msg.text = msg.message;
    const isUser = msg.sender === 'You';
    const senderName = isUser ? 'You' : 'Finnly';

    return (
      <Stack
        key={index}
        direction="row"
        spacing={1}
        alignItems="flex-start"
        sx={{ mb: 6 }}
      >
        {senderName === 'Finnly' && (
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        )}
        <Box
          sx={{
            color: '#f7f7f7',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '20px',
            borderRadius: '20px',
            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <Typography sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {trimReactNode(msg?.text)}
            {senderName === 'Finnly' &&
              loading &&
              index === messages.length && <LoadingDots />}
          </Typography>
        </Box>
        {senderName === 'You' && (
          <img
            src={geneAvatar}
            alt="Avatar"
            style={{ height: '50px', borderRadius: '50%' }}
          />
        )}
      </Stack>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        '::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <Box
        sx={{
          px: 2,
          width: '80%',
          mt: '20px',
          maxHeight: '100%',
        }}
      >
        {messages.length === 0 && !streamingMessage ? (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 4,
            }}
          >
            <img
              src={logo}
              alt="No messages"
              style={{ width: '100px', height: '100px' }}
            />
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
              How can I help you today?
            </Typography>
          </Box>
        ) : (
          <>
            {messages.map((msg, index) => formatMessage(msg, index))}
            {streamingMessage && (
              <StreamingMessage message={streamingMessage} loading={loading} />
            )}
          </>
        )}
        <Box ref={bottomRef} sx={{ minHeight: '20px' }}></Box>
      </Box>
    </Box>
  );
}

export default MessageList;
