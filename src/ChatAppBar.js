import { AppBar, Toolbar, Box } from '@mui/material';
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
      </Toolbar>
    </AppBar>
  );
}

export default ChatAppBar;
