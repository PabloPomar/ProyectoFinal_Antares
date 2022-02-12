const baseUrl = "https://localhost:7001/api/v1/Pedido";


export const GetAllPedidos = () => {
    fetch(baseUrl)
        .then(res => res.json( ))
        .then(res => console.log(res))
}

export const GetOnePedido= (id, container) => {
    fetch(baseUrl + '?id=' + id)
        .then(res => res.json( ))
        .then(res => container = res)
}


export const PostPedido = (elemento) => {
    fetch(baseUrl + '/CrearPedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(elemento)
    })
        .then(res => res.json( ))
        .then(res => console.log(res))
}

//Ejemplo Request: 
/*{
    "id": 0,
    "usuario": {
    "id": 0,
        "nombreUsuario": "string",
        "password": "string",
        "tipo": 0,
        "dni": 0,
        "mail": "string",
        "telefono": "string"
},
    "estadoPedido": 0,
    "listaPedido": [
    {
        "id": 0,
        "producto": {
            "id": 0,
            "descripcion": "string",
            "stock": 0,
            "activo": true,
            "nota": "string",
            "imagen": {
                "id": 0,
                "base64Image": "string"
            },
            "precio": 0
        },
        "cantidad": 0
    }
],
    "precioTotal": 0,
    "nota": "string"
}*/

//Devuelve true o false si el usuario ya tiene un pedido en curso
export const PedidoEnCurso = (userId) => {
    fetch(baseUrl + '/PedidoEnCurso' + '?userId=' + userId)
        .then(res => res.json( ))
        .then(res => console.log(res))
}

//Permite Cambiar El estado del pedido
export const cambiarEstadoPedido = (request) => {
    fetch(baseUrl + '/CambiarEstado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
}

//Ejemplo Request: 
/*{
    "pedidoId": 0,
    "newState": 0 
}*/
//Los valores de new state varian de [0 - 5] 

export const EditPedido = (baseUrl, elemento) => {
    fetch(baseUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(elemento)
    })
        .then(res => res.json( ))
        .then(res => console.log(res))
}

export const DeletePedido = (baseUrl, id) => {
    fetch(baseUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    })
        .then(res => res.json( ))
        .then(res => console.log(res))
}