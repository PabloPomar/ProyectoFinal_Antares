import jwtDecode from "jwt-decode";


export function getUserFromToken(token) {
    let data = jwtDecode(token)
    return data.userName
}