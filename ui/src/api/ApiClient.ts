export interface SightingReport {
    id: number;
    description: string;
    dateOfSighting: Date;
    longitude: number;
    latitude: number;
    speciesId: number;
    userId: number;  
    status: string;
    imageUrl: string;
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
export interface ListResponse<T> {

    items: T[];
}


export interface WhaleSighting {
    date: string;
    longitude: number;
    latitude: number;
    description?: string; 
    speciesId: number; 
    imageUrl: string;
    userId: number;  
}
export interface Species {
    id: number;
    speciesGroup: string;
    species: string;
    latinName: string;
    habitat: string;
    maxLengthMeters: number;
    maxWeightTons: number;
    conservationStatus: string;
    maxAge: number;
    food: string;
}

export interface NewUser {
    username: string;
    email: string;
    password: string;
}

export async function createWhaleSighting(whaleSighting: WhaleSighting) {
    const response = await fetch(`http://localhost:5067/sightingreports/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(whaleSighting), 
    });
    
    if (!response.ok) {
        throw new Error(await response.json())
    }

}

export async function fetchSpecies(): Promise<ListResponse<Species>> {

    const response = await fetch(`https://localhost:5067/species`);
    return await response.json();
}


export async function createUser(newUser: NewUser) {
    const response = await fetch(`http://localhost:5067/users/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser), 
    });
    
    if (!response.ok) {
        throw new Error(await response.json())
    }
}
