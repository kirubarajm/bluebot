import React, { useEffect, useRef } from 'react';
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

export default AdaptiveCardRenderer;
