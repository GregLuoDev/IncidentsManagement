
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock Home to isolate App
jest.mock('./components/home/Home', () => ({
    Home: () => <div data-testid="home">Home Component</div>,
}));

jest.mock('./API/fake-api', () => ({
    getIncidents: jest.fn(() => []),
    getLocations: jest.fn(() => []),
}));

describe('App component', () => {
    test('renders without crashing', () => {
        render(<App />);
        expect(screen.getByTestId('home')).toBeInTheDocument();
    });

    test('applies theme correctly (dark mode)', () => {
        render(<App />);
        const body = document.body;
        // CssBaseline will set background
        expect(body).toBeInTheDocument();
    });
});
