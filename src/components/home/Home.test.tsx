
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useIncidentsContext } from '../../hooks/useIncidentsContext';
import { Home } from './Home';

// Mock MUI useMediaQuery
jest.mock('@mui/material', () => {
    const actual = jest.requireActual('@mui/material');
    return {
        ...actual,
        useMediaQuery: jest.fn(),
    };
});

import { useMediaQuery } from '@mui/material';

// Mock child components
jest.mock('../location-select/LocationSelect', () => ({
    LocationSelect: () => <div data-testid="location-select">LocationSelect</div>,
}));
jest.mock('../incidents-list/IncidentsList', () => ({
    IncidentsList: () => <div data-testid="incidents-list">IncidentsList</div>,
}));
jest.mock('../incidents-table/IncidentsTable', () => ({
    IncidentsTable: () => <div data-testid="incidents-table">IncidentsTable</div>,
}));

jest.mock('../../hooks/useIncidentsContext', () => ({
    useIncidentsContext: jest.fn(),
}));

describe('Home component', () => {
    const mockContext = {
        locations: [{ id: 'loc1', name: 'Location 1' }],
        selectedLocation: 'loc1',
        setSelectedLocation: jest.fn(),
        incidents: [
            { id: 1, name: 'Incident 1', datetime: '2026-01-19', locationId: 'loc1', priority: 1 },
        ],
    };

    beforeEach(() => {
        (useIncidentsContext as jest.Mock).mockReturnValue(mockContext);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders title and LocationSelect', () => {
        (useMediaQuery as jest.Mock).mockReturnValue(false);
        render(<Home />);
        expect(screen.getByText('Incidents')).toBeInTheDocument();
        expect(screen.getByTestId('location-select')).toBeInTheDocument();
    });

    test('renders IncidentsList on mobile', () => {
        (useMediaQuery as jest.Mock).mockReturnValue(true);
        render(<Home />);
        expect(screen.getByTestId('incidents-list')).toBeInTheDocument();
        expect(screen.queryByTestId('incidents-table')).not.toBeInTheDocument();
    });

    test('renders IncidentsTable on desktop', () => {
        (useMediaQuery as jest.Mock).mockReturnValue(false);
        render(<Home />);
        expect(screen.getByTestId('incidents-table')).toBeInTheDocument();
        expect(screen.queryByTestId('incidents-list')).not.toBeInTheDocument();
    });
});
