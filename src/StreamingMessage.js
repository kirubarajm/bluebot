import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import logo from './images/logo.png';
import LoadingDots from './LoadingDots';

function StreamingMessage({ message, loading }) {
  return (
    <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 6 }}>
      <img src={logo} alt="Logo" style={{ height: '50px' }} />
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
          {message}
          {loading && <LoadingDots />}
        </Typography>
      </Box>
    </Stack>
  );
}

export default StreamingMessage;
