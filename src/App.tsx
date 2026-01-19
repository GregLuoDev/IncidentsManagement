import './App.css';
import { useEffect, useState, } from 'react';
import { Box, Typography, useMediaQuery } from "@mui/material";
import { type Incident, type LocationId } from './shared/type.js';
// @ts-expect-error: import all APIs as an object
import fakeApi from './API/fake-api.js';
import { IncidentsTable } from './components/IncidentsTable.js';
import { IncidentsList } from './components/IncidentsList.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocationSelect } from './components/LocationSelect.js';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [locations, setLocations] = useState<LocationId[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    (async () => {
      const data: LocationId[] = await fakeApi.getLocations()
      setLocations(data);
      if (data.length > 0) setSelectedLocation(data[0].id);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!selectedLocation) return;

      const incidents: Incident[] = await fakeApi.getIncidentsByLocationId(selectedLocation);
      const uniqueIncidents = [...new Map(incidents.map(i => [i.id, i])).values()];
      const sortedIncidents = uniqueIncidents.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return new Date(b.datetime).getMilliseconds() - new Date(a.datetime).getMilliseconds();
      })
      setIncidents(sortedIncidents);
    })();

  }, [selectedLocation]);


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box p={2} sx={{ width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Incidents
        </Typography>

        <LocationSelect locations={locations} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />

        {isMobile ? (
          <IncidentsList incidents={incidents} />
        ) : (
          <IncidentsTable incidents={incidents} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
