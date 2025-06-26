export interface SightingReport {
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