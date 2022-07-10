document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollnav();
}

function navegacionFija (){
    const barra = document.querySelector('.header');
    const sobrefestival = document.querySelector('.festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if(sobrefestival.getBoundingClientRect().top <0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else{
            barra.classList.remove('fijo')
            body.classList.remove('body-scroll');
        }
    })
}

//funcion para asignar valor de scrool smooth 
function scrollnav (){
    const enlaces = document.querySelectorAll('.navegacion-principal');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e){
            e.preventDefault();
            const seccionscroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionscroll);
            seccion.scrollIntoView({behavior: "smooth"})
        })
    })
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for( let i = 1;  i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `<img src = "img/thumb/${i}.jpg">`
        galeria.appendChild(imagen);

        imagen.onclick = function(){
            mostrarimagen(i);
        }
    }
}

function mostrarimagen (id){

    const imagen = document.createElement('picture');
    imagen.innerHTML = `<img src = "img/grande/${id}.jpg">`


    // crear el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijaroverlay');
        overlay.remove();
    }

    // boton para cerrar el overlay
    const cerrarover = document.createElement('P');
    cerrarover.textContent = 'X';
    cerrarover.classList.add('btn-cerrar');
    cerrarover.onclick = function (){
        const body = document.querySelector('body');
        body.classList.remove('fijaroverlay');
        overlay.remove();
    }
    overlay.appendChild(cerrarover);

    // AGREGARLO AL HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijaroverlay');
}