export const helperHTTP = () => {
    const customFetch = (endpoint,options) => {
        // manejar objetos json en las peticiones
        const defaultHeader={
            accept:"application/json",
        }

        const controller=new AbortController()
        //manejador de errores
        options.signal=controller.signal 
        // por si no se especifica un metodo pro defecto sera get
        options.method=options.method || "GET" 
        // cabeceras que la peticion tenga
        options.headers=options.headers?{...defaultHeader,...options.headers}:defaultHeader
        // cuando se envian datos en el body
        options.body=JSON.stringify(options.body) || false
        if (!options.body) {
            // eliminando el body porque no lo podemos dejar en falso
            delete options.body
        }

        console.log(options)

        // si despues de tres segundos no hay respuesta de un servidor abortamos
        setTimeout(() => controller.abort(), 3000)

        return fetch(endpoint,options)
            .then((res) => res.ok ? res.json():Promise.reject({
                err: true,
                status: res.status || "00",
                statusText: res.statusText || "ocurrio un error"
            }))
            .catch((err)=>err)
    }

    const get = (url,options={}) => {
        return customFetch(url,options)
    }

    const post = (url,options={}) => {
        options.method="POST"
        return customFetch(url,options)
    }

    const put = (url, options = {}) => {
        options.method = "PUT"
        return customFetch(url, options)
    }

    const del = (url, options = {}) => {
        options.method = "DELETE"
        return customFetch(url, options)
    }

    return{
        get,
        post,
        put,
        del
    }
}