import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function ChatInput({ addMessage, loading }) {
  const [message, setMessage] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    if (message) {
      addMessage({ message, type: 'text', sender: 'You' });
      setMessage('');
    }
  };

  return (
    <Box
      sx={{
        mt: 'auto',
        width: '100%',
        px: 2,
        boxSizing: 'border-box',
        mb: '40px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '53%' }}>
        <TextField
          placeholder="Message Blue Bot"
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              backgroundColor: '#0c2113',
              '& fieldset': {
                borderRadius: '20px',
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#7a877e',
            },
            '& .MuiOutlinedInput-input': {
              color: '#7a877e',
              paddingLeft: '8px',
              fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSubmit} disabled={loading}>
                  <ArrowCircleRightIcon sx={{ color: 'white' }} />
                </IconButton>
              </InputAdornment>
            ),
            style: { fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif' },
          }}
        />
      </Box>
    </Box>
  );
}

export default ChatInput;
