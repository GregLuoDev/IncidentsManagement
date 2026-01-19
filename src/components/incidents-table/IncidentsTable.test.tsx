/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { priorityIcon, priorityName } from '../../shared/helper';
import type { Incident, Priority } from '../../shared/type';
import { IncidentsTable } from './IncidentsTable';

// Mock helper functions
jest.mock('../../shared/helper', () => ({
    ...jest.requireActual('../../shared/helper'),
    formatLocalDateTime: (value: string) => `Formatted:${value}`,
    formatLocalName: (value: string) => `Location:${value}`,
    priorityIcon: {
        1: '/icon1.png',
        2: '/icon2.png',
        3: '/icon3.png',
    },
    priorityName: {
        1: 'High',
        2: 'Medium',
        3: 'Low',
    },
}));

// Mock the DataGrid
jest.mock('@mui/x-data-grid', () => {
    return {
        DataGrid: (props: any) => {
            // Render a simple table-like structure for testing
            return (
                <table data-testid="mock-datagrid">
                    <thead>
                        <tr>
                            {props.columns.map((col: any) => (
                                <th key={col.field}>{col.headerName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.rows.map((row: any) => (
                            <tr key={row.id}>
                                {props.columns.map((col: any) => (
                                    <td key={col.field}>
                                        {col.renderCell
                                            ? col.renderCell({ value: row[col.field], row })
                                            : row[col.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        },
    };
});

describe('IncidentsTable with mocked DataGrid', () => {
    const incidents: Incident[] = [
        { id: 1, datetime: '2026-01-19T10:00:00', locationId: 'loc1', name: 'Incident 1', priority: 1 as Priority },
        { id: 2, datetime: '2026-01-19T11:00:00', locationId: 'loc2', name: 'Incident 2', priority: 3 as Priority },
    ];

    test('renders mocked DataGrid with correct number of rows', () => {
        render(<IncidentsTable incidents={incidents} />);
        const table = screen.getByTestId('mock-datagrid');
        expect(table).toBeInTheDocument();

        const rows = table.querySelectorAll('tbody tr');
        expect(rows.length).toBe(incidents.length);
    });

    test('renders priority icons', () => {
        render(<IncidentsTable incidents={incidents} />);
        incidents.forEach((incident) => {
            const icon = screen.getByAltText(priorityName[incident.priority]);
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('src', priorityIcon[incident.priority]);
        });
    });

    test('renders formatted datetime, location, and name', () => {
        render(<IncidentsTable incidents={incidents} />);
        incidents.forEach((incident) => {
            expect(screen.getByText(`Formatted:${incident.datetime}`)).toBeInTheDocument();
            expect(screen.getByText(`Location:${incident.locationId}`)).toBeInTheDocument();
            expect(screen.getByText(incident.name)).toBeInTheDocument();
        });
    });
});
