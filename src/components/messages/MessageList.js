import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import logo from '../../images/logo.png';
import profileAvatar from '../../images/dp.jpeg';
import StreamingMessage from './StreamingMessage';
import * as AdaptiveCards from 'adaptivecards';
import { v4 as uuidv4 } from 'uuid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const hostConfig = {
  fontFamily: 'Segoe UI, Helvetica Neue, sans-serif',
  containerStyles: {
    default: {
      foregroundColors: {
        default: {
          default: '#ffffff',
          subtle: '#cccccc',
        },
        accent: {
          default: '#0078D7',
          subtle: '#384259',
        },
      },
    },
  },
};

const generateAdaptiveCard = (msg, isUser) => {
  const senderName = isUser ? 'You' : 'Blue Bot';
  const avatar = isUser ? profileAvatar : logo;

  return {
    type: 'AdaptiveCard',
    body: [
      {
        type: 'Container',
        items: [
          {
            type: 'Image',
            url: avatar,
            size: 'Small',
            style: 'Person',
            horizontalAlignment: isUser ? 'Right' : 'Left',
          },
          {
            type: 'TextBlock',
            text: senderName,
            weight: 'Bolder',
            wrap: true,
            horizontalAlignment: isUser ? 'Right' : 'Left',
            spacing: 'Small',
          },
          {
            type: 'TextBlock',
            text: msg.message,
            wrap: true,
            horizontalAlignment: isUser ? 'Right' : 'Left',
          },
        ],
        spacing: 'Medium',
      },
    ],
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.3',
  };
};

const AdaptiveCardRenderer = ({ card }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      try {
        cardRef.current.innerHTML = '';

        const adaptiveCard = new AdaptiveCards.AdaptiveCard();
        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig(hostConfig);
        adaptiveCard.parse(card);
        const renderedCard = adaptiveCard.render();
        cardRef.current.appendChild(renderedCard);
      } catch (error) {
        console.error('Adaptive Card rendering error:', error);
        cardRef.current.innerHTML = '<p>Error rendering card.</p>';
      }
    }
  }, [card]);

  return <div ref={cardRef}></div>;
};

function MessageList({ messages, streamingMessage, loading }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages, streamingMessage]);

  // Hook to handle visibility of 'scroll to bottom' icon
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        setShowScrollButton(scrollHeight - scrollTop - clientHeight > 20);
      };

      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatMessage = (msg, index) => {
    const isUser = msg.role === 'user' || msg.sender === 'You';
    const adaptiveCard = generateAdaptiveCard(msg, isUser);

    return (
      <Box key={uuidv4()} sx={{ mb: 4 }}>
        <AdaptiveCardRenderer card={adaptiveCard} />
      </Box>
    );
  };

  // Memoize the formatted messages
  const memoizedMessages = useMemo(() => {
    return messages.map((msg, index) => formatMessage(msg, index));
  }, [messages]);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
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
          alignSelf: 'center',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                color: '#ffffff',
                fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
                fontWeight: 'bold',
              }}
            >
              How can I help you today ?
            </Typography>
          </Box>
        ) : (
          <>
            {memoizedMessages}
            {streamingMessage && (
              <Box sx={{ mb: 4 }}>
                <StreamingMessage
                  message={streamingMessage}
                  loading={loading}
                />
              </Box>
            )}
          </>
        )}
        <Box ref={bottomRef} sx={{ minHeight: '20px' }}></Box>
      </Box>
      {showScrollButton && (
        <IconButton
          color="primary"
          onClick={scrollToBottom}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      )}
    </Box>
  );
}

export default MessageList;
