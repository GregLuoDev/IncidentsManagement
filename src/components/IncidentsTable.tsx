
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Incident, Priority } from "../shared/type";
import { formatLocalDateTime, formatLocalName, priorityIcon, priorityName } from "../shared/helper";

type Props = {
    incidents: Incident[]
}

export function IncidentsTable({ incidents }: Props) {
    const paginationModel = { page: 0, pageSize: 50 };

    const columns: GridColDef[] = [
        {
            field: "priority", headerName: "", type: "number", width: 40,
            renderCell: (params) => {
                const priority=params.value as Priority
                return <img src={priorityIcon[priority]} alt={priorityName[priority]} style={{ width: 15, height: 15 }} />
            }
        },
        {
            field: "datetime", headerName: "Date and Time", width: 200,
            renderCell: (params) =>
                formatLocalDateTime(params.value),
        },
        { field: "id", headerName: "ID", width: 40 },
        {
            field: 'locationId', headerName: 'Location Name', width: 200,
            renderCell: (params) =>
                formatLocalName(params.value),
        },
        { field: "name", headerName: "Incident Name", width: 200 },
        {
            field: 'priority2',
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
            density="compact"
        />
    </div>
}