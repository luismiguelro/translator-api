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
let name_source = "Afrikaans"
let name_target = "Afrikaans"






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
        languages.find(function(name){
            if(name.code === source_language){
                name_source= name.name;
            }
        });
    });
    
     // obtener valor del to, para luego mandar a la API
    translateTo.addEventListener('click',()=>{
        //console.log(translateTo.value);
        target_language = translateTo.value;
        languages.find(function(name){
            if(name.code === target_language){
                name_target = name.name;
            }
        });
    });

    // Cambiar
    exchangeIcon.addEventListener('click',()=>{

         // Obtener la opción seleccionada de from
         const opcionFrom = document.querySelector('.select-from  option:checked');
         const opcionTo = document.querySelector('.select-to  option:checked');
         //console.log(opcionSeleccionada1);
         
          // Si no hay opción seleccionada, salir del evento
          if (!opcionFrom || !opcionTo) {
            return;
        }


        // Obtener el valor seleccionado y el íopcionFromdice de la opción en la opcion from
        const valorFrom = opcionFrom.value;
        const indiceFrom = Array.from(translateFrom).indexOf(opcionFrom);
        const innerFrom = opcionFrom.innerHTML;

        // Obtener el valor seleccionado y el íopcionFromdice de la opción en la opcion from
        const valorTo = opcionTo.value;
        const indiceTo = Array.from(translateTo).indexOf(opcionTo);
        const innerTo = opcionTo.innerHTML;
        
        
          // Intercambiar opciones
            translateFrom[indiceFrom].value = translateTo[indiceTo].value;
            translateTo[indiceTo].value = valorFrom;

            translateFrom[indiceFrom].innerHTML= translateTo[indiceTo].innerHTML
            translateTo[indiceTo].innerHTML =  innerFrom;

            let tempText = fromText.value;
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
               utterance.lang = name_source;
            } else{
                utterance = new SpeechSynthesisUtterance(ToText.value);
                utterance.lang = name_target
            }
            speechSynthesis.speak(utterance)
        }
    })
})