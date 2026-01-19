
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Incident, Priority } from "../shared/type";
import { Box } from "@mui/material";
import { formatLocalDateTime, formatLocalName } from "../shared/helper";

const priorityName: Record<Priority, string> = { 1: 'High', 2: "Medium", 3: "Low" };
const priorityIcon: Record<Priority, string> = { 1: '/img/alarm-high.svg', 2: "/img/alarm-medium.svg", 3: "/img/alarm-low.svg" };

type Props = {
    incidents: Incident[]
}

export function IncidentsTable({ incidents }: Props) {
    const paginationModel = { page: 0, pageSize: 50 };

    const columns: GridColDef[] = [
        {
            field: "priority", headerName: "", type: "number", width: 80,
            renderCell: (params) => (
                <Box fontSize={20}>
                    <img src={priorityIcon[params.value as Priority]} alt="Low" style={{ width: 15, height: 15 }} />
                </Box>
            )
        },
        {
            field: "datetime", headerName: "Date and Time", width: 200,
            renderCell: (params) =>
                formatLocalDateTime(params.value),
        },
        { field: "id", headerName: "ID", width: 40 },
        { field: 'locationId', headerName: 'Location Name', width: 200,
             renderCell: (params) =>
                formatLocalName(params.value),
         },
        { field: "name", headerName: "Incident Name", width: 200 },
        {
            field: 'priority2', // different field name
            headerName: 'Priority',
            width: 120,
            valueGetter: (value, row) => {
                return row?.priority
            },
            renderCell: (params) => priorityName[params.value as Priority]

        },

    ];

    return <div style={{ height: 400, width: "100%" }}>
        <DataGrid
            rows={incidents.map((i: Incident) => ({ ...i, id: i.id }))}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[50, 100]}
        />
    </div>
}