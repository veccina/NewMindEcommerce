
export function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        const decodedString = atob(payload); // base64 decode
        return JSON.parse(decodedString);
    } catch (err) {
        return null;
    }
}
