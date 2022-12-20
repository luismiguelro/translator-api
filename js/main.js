//Consultar lista de lenguajes desde el servidor
const GET_URL = 'https://text-translator2.p.rapidapi.com/getLanguages';

//Encabezados
const OPTIONS={
    method:'get',
    headers: {
        'X-RapidAPI-Key': '6930271f20msh2fab5da401100b2p1c90d9jsn28f3d04b3f89',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
}

//Enviar listado de lenguajes disponibles
//then resolver promesas
fetch(GET_URL,OPTIONS)
   .then(res=>res.json())
   .then(objeto =>console.log(objeto)

      //Codigo necesariio para cargar el select


);