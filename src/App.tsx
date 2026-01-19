import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import { Home } from './components/Home.js';
import { IncidentsContextProvider } from './hooks/useIncidentsContext .js';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
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
