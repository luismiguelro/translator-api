// elementos dDOM
let translateFrom = document.querySelector('#selectLanguagesFrom');
let translateTo = document.querySelector('#selectLanguagesTo');

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
    .then(objeto =>{
        let languages = objeto.data.languages;
        //console.log()
        //Codigo necesario para cargar el select
        languages.forEach(element => {
            translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`
            translateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`
        });
        // tomar valor del translate from
        translateFrom.addEventListener('click',()=>{
                //console.log(translateFrom.value);
                source_language=translateFrom.value;
            });

            // tomar valor del translate to
            translateTo.addEventListener('click',()=>{
                //console.log(translateTo.value);
                target_language = translateTo.value;
            });

        }).catch(error => console.log(error));

        // almacenar valores a traducir
        let source_language;
        let target_language

        //mostrar resultado
        let translateOut = document.querySelector('#output-translate');
        //Obtener datos del input para enviar al servidor
        let translate = document.querySelector('#translate');
        
        translate.addEventListener('click',()=>{

            let inputTranslate = document.querySelector('#input-translate');
            let texToTranslate = inputTranslate.value;

            // pedir la traduccion
            const encodedParams = new URLSearchParams();
            encodedParams.append("source_language", source_language);
            encodedParams.append("target_language", target_language);
            encodedParams.append("text", texToTranslate);

            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '6930271f20msh2fab5da401100b2p1c90d9jsn28f3d04b3f89',
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                },
                body: encodedParams
            };

            fetch('https://text-translator2.p.rapidapi.com/translate', options)
                .then(response => response.json())
                .then(response => translateOut.value=response.data.translatedText)
                .catch(err => console.error(err));
});

    