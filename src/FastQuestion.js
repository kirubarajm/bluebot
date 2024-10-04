// Another delightful feature demonstrating Material UI theming!

import React from 'react';
import { Box } from '@mui/material';

const FastQuestion = ({ addMessage, question }) => {
  const handleClick = () => {
    addMessage({ message: question, type: 'text', sender: 'You' });
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black with 20% opacity
        padding: '20px',
        marginRight: '10px',
        borderRadius: '16px', // Rounded corners
        color: '#fff', // Text color for better readability against the black background
        cursor: 'pointer', // Change cursor to pointer on hover
        fontWeight: 'bold',
        fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif', 
      }}
      onClick={handleClick}
    >
      {question}
    </Box>
  );
};

export default FastQuestion;
