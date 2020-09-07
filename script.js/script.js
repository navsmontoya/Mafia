/// Globales /////////////////////////////////////////////////////////

const url = 'https://busqueda-tesoro-api.herokuapp.com';
const sospechosos = [];
const cementerio = [];
const noVoto = [];
const key = 'aSqicm3nWB';

/// DOMs ////////////////////////////////////////////////////////////

const main = document.getElementById('main');
const contVotantes = document.getElementById('contenedorVotantes');
const textoNoVotantes = document.getElementById('noVotantesTexto');
const contNoVotantes = document.getElementById('contenedorNoVotantes');

/// Fetch Principal ////////////////////////////////////////////////

fetch(url + '/participantes/' + key)
.then (res => res.json())
.then (async function(data){
                        try { 
                            const z = await traerSospechosos(data);
                            
                        } catch (err){
                            console.log(err);
                        }
                    })
.then (tabla(sospechosos))

/// Tabla ///////////////////////////////////////////////////////////
function tabla(suspects){
    let div = document.createElement('div');
    div.innerHTML = `
        <p>${JSON.stringify (suspects)}</p>
    `
    contVotantes.appendChild(div);
}

/// Funciones //////////////////////////////////////////////////////

//.. Fns para Fetch

function traerSospechosos(data){
    for (let x of data){
        let sospe = {
            nombre: x.nombre,
            votó: ' ',
            votoPor: ' '
        }
        fetch(url + '/aquienvoto/' + key + '/' + x.nombre)
        .then(res => res.text())
        .then(voters => {
            let name = test(voters);
            if (name == 'aún'){
                sospe.votó = false;
                sospe.votoPor = 'Aun no ha votado...';
            } else {
                sospe.votó = true;
                sospe.votoPor = name;
            }
            
        });

        if (x.nombre !== 'DIOS' && x.vive == true){
            sospechosos.push(sospe);
            } else if (x.nombre !== 'DIOS' && x.vive == false){
                cementerio.push(sospe);
            }
        
    }

    

}

function test(words) {
    var n = words.split(' ');
    return n[n.length - 1];

}

//.. Fns para Tabla

