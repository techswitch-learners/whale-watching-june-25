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


export interface UserSighting {
    id: number;
    description?: string;
    dateOfSighting: string;
    longitude: number;
    latitude: number;
    whaleSpeciesId: number
    whaleSpecies: {
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
    userId: string;
    user:{
        username: string;
    }
    imageUrl?: string
    status: "approved" | "pending" | "rejected";
    rejectedReason?: string;
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

export async function getUserSightings() : Promise<UserSighting[]> {
    const response = await fetch(`http://localhost:5067/sightingreports/my-posts`, {
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
    console.log("fetched data:", data)
    return data;
}

export async function fetchSpecies(): Promise<ListResponse<Species>> {

    const response = await fetch(`https://localhost:5067/species`);
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

export async function login(email: string, password: string) {

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

     const response = await fetch('http://localhost:5067/accounts/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify( {email, password})
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
