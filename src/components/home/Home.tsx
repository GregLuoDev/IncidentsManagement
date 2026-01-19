import { Box, Typography, useMediaQuery } from "@mui/material";
import { useIncidentsContext } from "../../hooks/useIncidentsContext";
import { IncidentsList } from "../incidents-list/IncidentsList";
import { IncidentsTable } from "../incidents-table/IncidentsTable";
import { LocationSelect } from "../location-select/LocationSelect";

export function Home() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { locations, selectedLocation, setSelectedLocation, incidents } =
        useIncidentsContext()

    return <Box sx={{ flexGrow: 1, p: 4 }}>
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
}