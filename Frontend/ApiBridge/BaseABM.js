export const GetAllElementosBase = async (baseUrl) => {
    let response = await fetch(
        baseUrl
    );
    console.log(response.json());
}

/*export const GetAllElementosBase = (baseUrl) => {
    fetch(baseUrl)
        .then(res => res.json( ))
        .then(res => console.log(res))
}*/

export const GetOneElementosBase= (baseUrl, id, container) => {
    fetch(baseUrl + '?id=' + id)
        .then(res => res.json( ))
        .then(res => container = res)
}


export const PostElemento = (baseUrl, elemento) => {
    fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(elemento)
    })
        .then(res => res.json( ))
        .then(res => console.log(res))
}

export const EditElemento = (baseUrl, elemento) => {
    fetch(baseUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(elemento)
    })
        .then(res => res.json( ))
        .then(res => console.log(res))
}

export const DeleteElemento = (baseUrl, id) => {
    fetch(baseUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    })
        .then(res => res.json( ))
        .then(res => console.log(res))
}