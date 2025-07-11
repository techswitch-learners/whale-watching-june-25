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


export interface UserSighting {
    id: number;
    description?: string;
    dateOfSighting: string;
    longitude: number;
    latitude: number;
    whaleSpeciesId: number
    whaleSpecies: WhaleSpecies
    userId: string;
    user:{
        username: string;
    }
    imageUrl: string
    status: "approved" | "pending" | "rejected";
    rejectedReason?: string;
}

export interface WhaleSpecies {
    id: number;
    speciesGroup: string,
    species: string;
    latinName: string;
    habitat: string;
    maxLengthMeters: number;
    maxWeightTons: number;
    conservationStatus: string;
    maxAge: number;
    food: string;
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


const geonamesUsername = import.meta.env.VITE_GEONAMES_USERNAMES;
const baseUrl = import.meta.env.VITE === undefined ? import.meta.env.VITE_BACKEND_API_BASE_URL : "";


export async function createWhaleSighting(whaleSighting: WhaleSighting) {
    console.log(whaleSighting);

    const response = await fetch(`sightingreports/create`, {
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

export async function getUserSightings() : Promise<UserSighting[]> {
    const response = await fetch(`${baseUrl}/sightingreports/my-sightings`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    
    })
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch user sightings")
    }
    const data: UserSighting[] = await response.json();
    return data;
}

export async function fetchSpecies(): Promise<Species[]> {

    const response = await fetch(`${baseUrl}/species`);
    return await response.json();
}

export async function fetchSpeciesBySpeciesName(species: string): Promise<Species> {

    const response = await fetch(`http://localhost:5067/species/by-name/${species}`);
    return await response.json();
}

export async function createUser(newUser: NewUser) {
    const response = await fetch(`${baseUrl}/users`, {
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
    const response = await fetch(`sightingreports/all`);
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
export async function login(email: string, password: string): Promise<{isAdmin: boolean}> {

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

     const response = await fetch('${baseUrl}/accounts/login', {
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
    const response = await fetch(`${baseUrl}/sightingreports/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
}

export async function approveWhaleSighting(id: number): Promise<void> {
    const response = await fetch(`${baseUrl}/sightingreports/${id}`, {
        method: "PATCH",
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error(await response.text());
    }
}

export async function editWhaleSpecies(newSpeciesName:string, id: number): Promise<void> {
    const species = await fetchSpeciesBySpeciesName(newSpeciesName);    
    const response = await fetch(`http://localhost:5067/sightingreports/edit/${id}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify({"WhaleSpeciesId": species.id}),
    });
    
    if (!response.ok) {
        throw new Error(await response.text());
    }
}

