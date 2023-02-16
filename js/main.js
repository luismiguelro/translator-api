/*
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
        let source_language = 'es';
        let target_language = 'af'

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
*/
/*---------------------------------VERSION 2 ---------------*/

// Tags
const selectTag = document.querySelectorAll("select"),
    exchangeIcon = document.querySelector('.controls__exchange'),
    translateBtn= document.querySelector("button");
    let fromText = document.querySelector('.from-text'),
    ToText = document.querySelector('.to-text');

// elementos dDOM
let translateFrom = document.querySelector('.select-from');


let translateTo = document.querySelector('.select-to');

// Valores predeterminados
let source_language = '';
let target_language = '';
let exchange_from = '';
let exchange_to = '';




//Consultar lista de lenguajes desde el servidor
const GET_URL = 'https://text-translator2.p.rapidapi.com/getLanguages';

//Encabezados
const OPTIONS={
    method:'get',
    headers: {
        'X-RapidAPI-Key': '1e3f1bc6bcmshf94728348adc777p101da6jsnfb38bef5f852',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
}

//Enviar listado de lenguajes disponibles
//then resolver promesas
let languages;
fetch(GET_URL,OPTIONS)
    .then(res=>res.json())
    .then(objeto =>{
        languages = objeto.data.languages;
        
        cargarLenguajes(languages)

}).catch(error => console.log(error));

function cargarLenguajes(languages){
    let displayLanguajesFrom = languages.map(function(element){
       return `<option value="${element.code}" id="name-from">${element.name}</option>`  
    });
    let displayLanguajesTo = languages.map(function(element){
        return `<option value="${element.code}" id="name-to">${element.name}</option>`  
    });

    translateFrom.innerHTML=displayLanguajesFrom;
    translateTo.innerHTML = displayLanguajesTo;
    
    translateFrom.addEventListener('click',()=>{
        //console.log(translateFrom.innerHTML);
        source_language = translateFrom.value;
         languages.find(function(language){
         if (language.code===source_language){
            console.log(language.name);
            }
        })
    });

    translateTo.addEventListener('click',()=>{
        //console.log(translateTo.innerHTML);
        target_language = translateTo.value;
    });
    

   



    
  
}
/*
exchangeIcon.addEventListener('click',()=>{
    
    // guardar nombre para del que esta activo
    languages.forEach(item=>{
        
        if(target_language===item.code){
            exchange_to = item.name; 
        }  

    });
    
    let tempText = fromText.value,
        tempLang= nameFrom.innerHTML;
        //tempLangTo = nameTo.innerHTML;
    fromText.value = ToText.value
    ToText.value = tempText
    nameFrom.innerHTML =exchange_to
    nameTo.innerHTML = exchange_from
    console.log(exchange_to);

    /*
    let tempText = fromText.value, 
    tempLang = exchange_from;
        translateFrom.value = translateTo.value,
        translateFrom = exchange_to,
        translateTo.value = tempText,
        translateTo = tempLang

    
        
        console.log({
            tempText,
        tempLang,
        translateFrom ,
        exchange_from,
        ToText ,
        translateTo,
        });
});
*/



 //tomar valor del translate to
translateTo.addEventListener('click',()=>{
    //console.log(translateTo.value);
    target_language = translateTo.value;
});


translateBtn.addEventListener('click',()=>{
    let text = fromText.value;
    console.log(text, target_language,target_language,translateFrom[0].value)

    let URL_API = `https://api.mymemory.translated.net/get?q=${text}&langpair=${source_language}|${target_language}`

    fetch(URL_API).then(res => res.json()).then(data=>{
        ToText.value = data.responseData.translatedText;
    })
});