import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import { Home } from './components/home/Home';
import { IncidentsContextProvider } from './hooks/useIncidentsContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1e1e', // main page background
      paper: '#1e1e1e',   // for cards, paper, etc.
    },
  },
  components: {
    // @ts-expect-error: customize color
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e', // dark mode background
          color: '#fff',
        },
        columnHeaders: {
          backgroundColor: '#121212',
        },
        row: {
          borderBottom: '1px solid #333',
          '&:hover': {
            backgroundColor: '#000', // row hover color
          },
        },
      },
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <IncidentsContextProvider>
        <Home />
      </IncidentsContextProvider>
    </ThemeProvider>
  );
}

export default App;
