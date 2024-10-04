import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import logo from './images/logo.png';

function ChatAppBar() {
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: 'transparent', color: '#283a49' }}
      elevation={0}
    >
      <Toolbar>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ height: '50px', mr: 2 }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: '#ffffff',
            fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
            fontWeight: 'bold',
          }}
        >
          Blue Bot 1.0
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default ChatAppBar;
