import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import logo from '../../images/logo.png';
import LoadingDots from '../common/LoadingDots';
import * as AdaptiveCards from 'adaptivecards';

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
  return {
    type: 'AdaptiveCard',
    body: [
      {
        type: 'Container',
        items: [
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
          {
            type: 'TextBlock',
            text: message + (loading ? '...' : ''),
            wrap: true,
            horizontalAlignment: 'Left',
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
