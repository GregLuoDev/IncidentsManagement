import { formatLocalDateTime, formatLocalName, priorityIcon, priorityName } from "../shared/helper";
import type { Incident } from "../shared/type";
import { Grid, List, ListItem } from "@mui/material";

type Props = {
    incidents: Incident[]
}

export function IncidentsList({ incidents }: Props) {

    return <List >
        {incidents.map((item: Incident) => (
            <ListItem key={item.id} divider sx={{ px: 0 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ width: '100%' }}>
                    <Grid size={2} sx={{ width: '20px' }}>
                        <img src={priorityIcon[item.priority]} alt={priorityName[item.priority]} style={{ width: 15, height: 15 }} />
                    </Grid>
                    <Grid size={10} >
                        <div>{formatLocalDateTime(item.datetime)}</div>
                        <div>{formatLocalName(item.locationId)}</div>
                        <div>{item.name}</div>
                    </Grid>
                </Grid>
            </ListItem>
        ))}
    </List>
}