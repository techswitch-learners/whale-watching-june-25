export async function login(email: string, password: string) {

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

     const response = await fetch('http://localhost:5067/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify( {email, password})
    })
    
    if (!response.ok) {
        var errorMessage = "Login Failed";

        console.log("response is ok");

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




