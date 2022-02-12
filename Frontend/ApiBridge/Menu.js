const baseUrl = "https://localhost:7001/api/v1/Producto";

export const GetMenu = () => {
    fetch(baseUrl + '/Menu')
        .then(res => res.json( ))
        .then(res => console.log(res))
}

export const GetItemMenu = (id) => {
    fetch(baseUrl + '/ItemMenu?id=' + id)
        .then(res => res.json( ))
        .then(res => console.log(res))
}

/*//Asi es la variable
const producto = {
    "id": 0,
    "descripcion": "string",
    "stock": 0,
    "activo": true,
    "nota": "string",
    "imagen": {
        "id": 0,
        "base64Image": "string"
    }
}*/
