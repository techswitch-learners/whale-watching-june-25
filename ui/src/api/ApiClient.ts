export type coordinates = {
    latitude: number;
    longitude: number;
}

export interface WhaleSighting {
    date: Date;
    location: coordinates;
    description: string; 
    species: string;   
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