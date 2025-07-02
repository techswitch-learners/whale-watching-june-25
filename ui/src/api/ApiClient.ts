export interface ListResponse<T> {

    items: T[];
}


export interface WhaleSighting {
    date: string;
    longitude: number;
    latitude: number;
    description?: string; 
    whaleSpeciesId: number; 
    imageUrl: string;
    userId: string;  
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

export async function fetchSpecies(): Promise<Species[]> {

    const response = await fetch(`http://localhost:5067/species`);
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
