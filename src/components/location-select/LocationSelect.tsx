import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { LocationId } from "../../shared/type";

type Props = {
    locations: LocationId[],
    selectedLocation: string,
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>
}

export function LocationSelect({ locations, selectedLocation, setSelectedLocation }: Props) {
    return <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
        <InputLabel id="select-location-label" >Location</InputLabel>
        <Select
            labelId="select-location-label"
            value={selectedLocation}
            label="Location"
            onChange={(e) => setSelectedLocation(e.target.value)}
            sx={{ mb: 2, minWidth: 200 }}
            size="small"
        >
            {locations.map((loc: LocationId) => (
                <MenuItem key={loc.id} value={loc.id}>
                    {loc.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}