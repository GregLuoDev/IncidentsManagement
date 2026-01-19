import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { priorityIcon, priorityName } from '../../shared/helper';
import type { Incident, Priority } from '../../shared/type';
import { IncidentsList } from './IncidentsList';

// Mock helper functions for predictable output
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

describe('IncidentsList', () => {
    const incidents: Incident[] = [
        {
            id: 1,
            datetime: '2026-01-19T10:00:00',
            locationId: 'loc1',
            name: 'Incident 1',
            priority: 1 as Priority,
        },
        {
            id: 2,
            datetime: '2026-01-19T11:00:00',
            locationId: 'loc2',
            name: 'Incident 2',
            priority: 3 as Priority,
        },
    ];

    test('renders all list items', () => {
        render(<IncidentsList incidents={incidents} />);
        const listItems = screen.getAllByRole('listitem');
        expect(listItems.length).toBe(incidents.length);
    });

    test('renders priority icons correctly', () => {
        render(<IncidentsList incidents={incidents} />);
        incidents.forEach((incident) => {
            const icon = screen.getByAltText(priorityName[incident.priority]);
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('src', priorityIcon[incident.priority]);
        });
    });

    test('renders formatted datetime, location, and name', () => {
        render(<IncidentsList incidents={incidents} />);
        incidents.forEach((incident) => {
            expect(screen.getByText(`Formatted:${incident.datetime}`)).toBeInTheDocument();
            expect(screen.getByText(`Location:${incident.locationId}`)).toBeInTheDocument();
            expect(screen.getByText(incident.name)).toBeInTheDocument();
        });
    });

    test('renders description for each incident', () => {
        render(<IncidentsList incidents={incidents} />);
        const descriptionText = 'This is description of this incident. This issue is not new.';
        const descriptions = screen.getAllByText(descriptionText);
        expect(descriptions.length).toBe(incidents.length);
    });
});
