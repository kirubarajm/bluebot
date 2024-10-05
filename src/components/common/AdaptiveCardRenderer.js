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

function AdaptiveCardRenderer({ card, onExecuteAction }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      const adaptiveCard = new AdaptiveCards.AdaptiveCard();

      adaptiveCard.hostConfig = new AdaptiveCards.HostConfig(hostConfig);

      adaptiveCard.onExecuteAction = onExecuteAction;

      adaptiveCard.parse(card);
      const renderedCard = adaptiveCard.render();

      cardRef.current.innerHTML = '';
      cardRef.current.appendChild(renderedCard);
    }
  }, [card, onExecuteAction]);

  return <div ref={cardRef}></div>;
}

export default AdaptiveCardRenderer;
