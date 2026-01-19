import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { type Incident, type LocationId } from '../shared/type';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fakeApi from '../API/fake-api';

const initialContext = {
  locations: [],
  selectedLocation: '',
  setSelectedLocation: () => { },
  incidents: []
};

type IncidentsContextType = {
  locations: LocationId[];
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
  incidents: Incident[];
};

const IncidentsContext = createContext<IncidentsContextType>(initialContext);

export function IncidentsContextProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<LocationId[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    (async () => {
      const data: LocationId[] = await fakeApi.getLocations();
      setLocations(data);
      if (data.length > 0) {
        setSelectedLocation(data[0].id);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedLocation) return;

    (async () => {
      const incidents: Incident[] =
        await fakeApi.getIncidentsByLocationId(selectedLocation);

      const uniqueIncidents = [
        ...new Map(incidents.map(i => [i.id, i])).values(),
      ];

      const sortedIncidents = uniqueIncidents.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return (
          new Date(b.datetime).getTime() -
          new Date(a.datetime).getTime()
        );
      });

      setIncidents(sortedIncidents);
    })();
  }, [selectedLocation]);

  const contextValue = { locations, selectedLocation, setSelectedLocation, incidents };

  return <IncidentsContext.Provider value={contextValue}>{children}</IncidentsContext.Provider>;
}

export function useIncidentsContext() {
  const context = useContext(IncidentsContext);
  if (!context) {
    throw new Error(
      'useIncidentsContext must be used within IncidentsProvider'
    );
  }
  return context;
}
