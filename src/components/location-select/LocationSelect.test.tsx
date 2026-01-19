import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { LocationSelect } from './LocationSelect';
import type { LocationId } from '../../shared/type';

describe('LocationSelect', () => {
  const locations: LocationId[] = [
    { id: 'loc1', name: 'Location 1' },
    { id: 'loc2', name: 'Location 2' },
  ];

  let selectedLocation = 'loc1';
  const setSelectedLocation = jest.fn((val) => {
    selectedLocation = val;
  });

  test('selecting a new location calls setSelectedLocation', () => {
    render(
      <LocationSelect
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
    );

    const selectInput = screen.getByLabelText('Location');
    fireEvent.mouseDown(selectInput);

    const newOption = screen.getByText('Location 2');
    fireEvent.click(newOption);

    expect(setSelectedLocation).toHaveBeenCalledWith('loc2');
  });

  test('displays the currently selected location', () => {
    render(
      <LocationSelect
        locations={locations}
        selectedLocation="loc2"
        setSelectedLocation={setSelectedLocation}
      />
    );

    // The select should display Location 2
    expect(screen.getByText('Location 2')).toBeInTheDocument();
  });
});
