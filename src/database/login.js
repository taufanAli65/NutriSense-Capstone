

async function login(email, password) {
    require('dotenv').config();
    const apiKey = process.env.FIREBASE_API_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        })
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    const data = await response.json();
    const idToken = data.idToken;
    return idToken;
}

module.exports = { login }