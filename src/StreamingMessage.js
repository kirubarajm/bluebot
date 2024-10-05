import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import logo from './images/logo.png';
import LoadingDots from './LoadingDots';
import * as AdaptiveCards from 'adaptivecards';
import { extractCodeBlocks } from './utils/codeBlockExtractor';

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

const generateAdaptiveCard = (message, loading) => {
  const codeBlocks = extractCodeBlocks(message);
  // console.log("STREAMED MESSAGE : ", message)
  // console.log("STREAMED CODE BLOCKS : ", codeBlocks)
  const bodyItems = [
    {
      type: 'Image',
      url: logo,
      size: 'Small',
      style: 'Person',
      horizontalAlignment: 'Left',
    },
    {
      type: 'TextBlock',
      text: 'Blue Bot',
      weight: 'Bolder',
      wrap: true,
      horizontalAlignment: 'Left',
      spacing: 'Small',
    },
  ];

  if (codeBlocks.length > 0) {
    codeBlocks.forEach((block, index) => {
      bodyItems.push({
        type: 'TextBlock',
        text: message.split('```')[index * 2],
        wrap: true,
        horizontalAlignment: 'Left',
      });
      bodyItems.push({
        type: 'CodeBlock',
        codeSnippet: block.code,
        language: block.language || 'plaintext',
      });
    });
    if (message.split('```').length % 2 === 0) {
      bodyItems.push({
        type: 'TextBlock',
        text: message.split('```').pop() + (loading ? '...' : ''),
        wrap: true,
        horizontalAlignment: 'Left',
      });
    }
  } else {
    bodyItems.push({
      type: 'TextBlock',
      text: message + (loading ? '...' : ''),
      wrap: true,
      horizontalAlignment: 'Left',
    });
  }

  return {
    type: 'AdaptiveCard',
    body: [
      {
        type: 'Container',
        items: bodyItems,
        spacing: 'Medium',
      },
    ],
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.5',
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

function StreamingMessage({ message, loading }) {
  const adaptiveCard = generateAdaptiveCard(message, loading);

  return (
    <Box sx={{ mb: 4 }}>
      <AdaptiveCardRenderer card={adaptiveCard} />
      {/* {loading && <LoadingDots />} */}
    </Box>
  );
}

export default StreamingMessage;
