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
console.log("Hola, bienvenido!")
const selectTag = document.querySelectorAll("select"),
    exchangeIcon = document.querySelector('.controls__exchange'),
    translateBtn= document.querySelector("button")
    icons = document.querySelectorAll(".row i");

let fromText = document.querySelector('.from-text'),
    ToText = document.querySelector('.to-text');
    

// elementos dDOM
let translateFrom = document.querySelector('.select-from');
let translateTo = document.querySelector('.select-to');

// Valores predeterminados
let source_language = 'af';
let target_language = 'af';






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

//Enviar listado de lenguajes disponibles - then resolver promesas
let languages;
fetch(GET_URL,OPTIONS)
    .then(res=>res.json())
    .then(objeto =>{
        languages = objeto.data.languages;
        
        loadLanguages(languages)

}).catch(error => console.log(error));

function loadLanguages(languages){

    // cargar lenguajes al from
    let displayLanguajesFrom = languages.map(function(element){
       return `<option value="${element.code}" id="name-from">${element.name}</option>`  
    });
    // cargar lenguajes al to
    let displayLanguajesTo = languages.map(function(element){
        return `<option value="${element.code}" id="name-to">${element.name}</option>`  
    });

    // añadir al html cada una de las opciones (lenguajes)
    translateFrom.innerHTML=displayLanguajesFrom;
    translateTo.innerHTML = displayLanguajesTo;
 

    // obtener valor del from, para luego mandar a la API
    translateFrom.addEventListener('click',()=>{
        //console.log(translateFrom.value);
        source_language = translateFrom.value;
    });
    
     // obtener valor del to, para luego mandar a la API
    translateTo.addEventListener('click',()=>{
        //console.log(translateTo.value);
        target_language = translateTo.value;
        
    });

    // Cambiar
    exchangeIcon.addEventListener('click',()=>{

         // Obtener la opción seleccionada de la lista 1
         const opcionSeleccionada1 = document.querySelector('.select-from  option:checked');
         //console.log(opcionSeleccionada1);
         
          // Si no hay opción seleccionada, salir del evento
          if (!opcionSeleccionada1) {
            return;
        }


        // Obtener el valor seleccionado y el índice de la opción en la lista 1
        const valorSeleccionado = opcionSeleccionada1.value;
        const indiceSeleccionado = Array.from(translateFrom).indexOf(opcionSeleccionada1);

        const innerSeleccionado = opcionSeleccionada1.innerHTML;
        
        
          // Intercambiar opciones
            translateFrom[indiceSeleccionado].value = translateTo[0].value;
            translateTo[0].value = valorSeleccionado;

            translateFrom[indiceSeleccionado].innerHTML= translateTo[0].innerHTML
            translateTo[0].innerHTML =  innerSeleccionado;

            let tempText = fromText.value
            fromText.value = ToText.value
            ToText.value = tempText
            
    });
}

// Realizar solicitud a la API
translateBtn.addEventListener('click',()=>{

    // Textro a traducit
    let text = fromText.value;
    //console.log(text, source_language,target_language,)

    //url API, en el que envia, text : texto a traducit, source_language: lenguaje origen, target_language: lenguaje respuesta

    let URL_API = `https://api.mymemory.translated.net/get?q=${text}&langpair=${source_language}|${target_language}`

    fetch(URL_API).then(res => res.json()).then(data=>{
        // obtener traducción y mandarla al campo
        ToText.value = data.responseData.translatedText;
    })
});

// icons
icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("uil-copy")){
           // si el icono pulsado tiene el id de, copia el valor del FrpmTextarea, si no, copia el valor del Totextarea
            if(target.id == "from"){
                //console.log("From coy icon clicked");
                navigator.clipboard.writeText(fromText.value)
            } else{
                //console.log("To coy icon clicked");
                navigator.clipboard.writeText(ToText.value)

            }
        } else{
            //console.log("Speech icon clicked");
            let utterance;
            if(target.id == "from"){
               utterance = new SpeechSynthesisUtterance(fromText.value);
               utterance.lang = "English"
            } else{
                utterance = new SpeechSynthesisUtterance(ToText.value);
                utterance.lang = "English"
            }
            speechSynthesis.speak(utterance)
        }
    })
})