export async function login(email: string, password: string) {

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

     const response = await fetch('https://localhost:5067/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify( {email, password})
    })
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login Failed');
    }
    return response.json();
}




