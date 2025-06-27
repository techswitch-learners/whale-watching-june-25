export interface ListResponse<T> {
    items: T[];
}

export type coordinates = {
    latitude: number;
    longitude: number;
}

export interface WhaleSighting {
    date: Date;
    location: coordinates;
    description?: string; 
    species: string;   
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