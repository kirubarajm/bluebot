import React, { useEffect, useRef, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import logo from './images/logo.png';
import profileAvatar from './images/dp.jpeg';
import StreamingMessage from './StreamingMessage';
import * as AdaptiveCards from 'adaptivecards';
import { v4 as uuidv4 } from 'uuid';

const hostConfig = {
  fontFamily: "Segoe UI, Helvetica Neue, sans-serif",
  containerStyles: {
    default: {
      foregroundColors: {
        default: {
          default: "#ffffff",
          subtle: "#cccccc",
        },
        accent: {
          default: "#0078D7",
          subtle: "#384259",
        },
      },
    },
  },
};

const generateAdaptiveCard = (msg, isUser) => {
  const senderName = isUser ? 'You' : 'Blue Bot';
  const avatar = isUser ? profileAvatar : logo;
  
  return {
    type: "AdaptiveCard",
    body: [
      {
        type: "Container",
        items: [
          {
            type: "Image",
            url: avatar,
            size: "Small",
            style: "Person",
            horizontalAlignment: isUser ? "Right" : "Left",
          },
          {
            type: "TextBlock",
            text: senderName,
            weight: "Bolder",
            wrap: true,
            horizontalAlignment: isUser ? "Right" : "Left",
            spacing: "Small",
          },
          {
            type: "TextBlock",
            text: msg.message,
            wrap: true,
            horizontalAlignment: isUser ? "Right" : "Left",
          },
        ],
        spacing: "Medium",
      },
    ],
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.3",
  };
};

const AdaptiveCardRenderer = ({ card }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      try {
        cardRef.current.innerHTML = "";

        const adaptiveCard = new AdaptiveCards.AdaptiveCard();
        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig(hostConfig);
        adaptiveCard.parse(card);
        const renderedCard = adaptiveCard.render();
        cardRef.current.appendChild(renderedCard);
      } catch (error) {
        console.error("Adaptive Card rendering error:", error);
        cardRef.current.innerHTML = "<p>Error rendering card.</p>";
      }
    }
  }, [card]);

  return <div ref={cardRef}></div>;
};

function MessageList({ messages, streamingMessage, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages, streamingMessage]);

  const formatMessage = (msg, index) => {
    const isUser = msg.role === 'user' || msg.sender === 'You';
    const adaptiveCard = generateAdaptiveCard(msg, isUser);

    return (
      <Box
        key={uuidv4()}
        sx={{ mb: 4 }}
      >
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
            <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            color: '#ffffff',
            fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
            fontWeight: 'bold'
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
                <StreamingMessage message={streamingMessage} loading={loading} />
              </Box>
            )}
          </>
        )}
        <Box ref={bottomRef} sx={{ minHeight: '20px' }}></Box>
      </Box>
    </Box>
  );
}

export default MessageList;
