import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#782885',
    },
    secondary: {
      main: '#bdb6b6',
    },
    background: {
      default: '#f4f4f4',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;