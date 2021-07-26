const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint, data, method = 'GET') => {
    const url = `${ baseUrl }/${ endpoint }`; // ${ localhost:4000/api } / ${ auth/new }

    if(method === 'GET'){
        // Si es un GET el method, simplemente retornamos el producto de la petición fetch
        return fetch(url);
    
    } else {

        // Si NO entra a el method GET, por lo tanto entra aquí al ser POST, PUT, DELETE, etc
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }) // En los headers, el backend de mi aplicación usa JSON por lo tanto usamos la configuración -> 'Content-type': 'application/json'
    }
}

const fetchConToken = (endpoint, data, method = 'GET') => {
    const url = `${ baseUrl }/${ endpoint }`; // ${ localhost:4000/api } / ${ auth/new }
    const token = localStorage.getItem('token') || ''; 

    if(method === 'GET'){
        // Si es un GET el method, simplemente retornamos el producto de la petición fetch
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    
    } else {

        // Si NO entra a el method GET, por lo tanto entra aquí al ser POST, PUT, DELETE, etc
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        }) // En los headers, el backend de mi aplicación usa JSON por lo tanto usamos la configuración -> 'Content-type': 'application/json'
    }
}


export {
    fetchSinToken,
    fetchConToken
}