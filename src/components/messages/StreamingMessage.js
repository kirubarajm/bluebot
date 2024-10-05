import React from 'react';
import { Box } from '@mui/material';
import logo from '../../images/logo.png';
import LoadingDots from '../common/LoadingDots';
import AdaptiveCardRenderer from '../common/AdaptiveCardRenderer';

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
