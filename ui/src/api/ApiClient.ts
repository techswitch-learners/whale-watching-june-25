const geonamesUsername = import.meta.env.VITE_GEONAMES_USERNAMES;

export interface ListResponse<T> {

    items: T[];
}
export interface SightingReport {
    id: number;
    description: string;
    dateOfSighting: Date;
    longitude: number;
    latitude: number;
    species: string;
    userName: string;  
    status: string;
    imageUrl: string;
}

export interface WhaleSighting {
    date: string;
    longitude: number;
    latitude: number;
    description?: string; 
    whaleSpeciesId: number; 
    imageUrl: string;
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

export interface SightingReport {
    id: number;
    description: string;
    dateOfSighting: Date;
    longitude: number;
    latitude: number;
    species: string;
    userId: number;  
    status: string;
}



export async function createWhaleSighting(whaleSighting: WhaleSighting) {
    console.log(whaleSighting);

    const response = await fetch(`http://localhost:5067/sightingreports/create`, {
        method: "POST",
        credentials: "include",
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
    const response = await fetch(`http://localhost:5067/users`, {
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

export async function fetchSightings(): Promise<SightingReport[]> {
    const response = await fetch(`http://localhost:5067/sightingreports/all`);
    const data = await response.json();
    return data;
}



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
export async function login(email: string, password: string): Promise<{isAdmin: boolean, userId: string}> {

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

     const response = await fetch('http://localhost:5067/accounts/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify({email, password})
    })
    
    if (!response.ok) {
        let errorMessage = "Login Failed";
        try {
             const errorData = await response.json();
             errorMessage = errorData.message || errorMessage;
        } catch {
            errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
    }    
    return response.json();
}

export async function deleteWhaleSighting(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5067/sightingreports/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
}

export async function approveWhaleSighting(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5067/sightingreports/${id}`, {
        method: "PATCH"
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
}

