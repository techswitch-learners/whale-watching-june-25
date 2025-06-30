export interface SightingReport {
    id: number;
    description: string;
    dateOfSighting: Date;
    longitude: number;
    latitude: number;
    speciesId: number;
    userId: number;  
    status: string;
}

export async function fetchSightings(): Promise<SightingReport[]> {
    const response = await fetch(`http://localhost:5067/sightingreports/all`);
    const data = await response.json();
    return data;
}

const geonamesUsername = import.meta.env.VITE_GEONAMES_USERNAMES;

export async function fetchSeaLocation(latitude: number, longitude:number){
    const response = await fetch(`http://api.geonames.org/oceanJSON?lat=${latitude}&lng=${longitude}&username=${geonamesUsername}`);
        if (response.ok)
        {
            const data = await response.json();
            return data?.ocean?.name || "Unknown";
        } else {
            return "Unknown";
        }
}