import type { Incident } from "../shared/type";
import { List, ListItem, ListItemText } from "@mui/material";

type Props = {
    incidents: Incident[]
}

export function IncidentsList({ incidents }: Props) {


    return <List>
        {incidents.map((item: Incident) => (
            <ListItem key={item.id} divider>
                <ListItemText
                    primary={item.name}
                    secondary={
                        <>
                            Priority: {item.priority} <br />
                            Date: {new Date(item.datetime).toLocaleString()}
                        </>
                    }
                />
            </ListItem>
        ))}
    </List>
}