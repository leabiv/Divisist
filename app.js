let formNotas = document.getElementById('formulario');
let listNotas = document.getElementById('notas');


let notas = JSON.parse(localStorage.getItem('notas')) ?? [];

formNotas.addEventListener('submit', (e) => {
    e.preventDefault();
    capturarDatos();
    colorDefinitiva();
    mostrarNotas();
})

function capturarDatos() {

    let nombreMat = document.getElementById('nombre').value;
    let primerNota = document.getElementById('primeraNota').value;
    let segunNota = document.getElementById('segundaNota').value;
    let tercerNota = document.getElementById('terceraNota').value;
    let exameNota = document.getElementById('examenFinal').value;

    validarformulario(nombreMat, primerNota, segunNota, tercerNota, exameNota)
    localStorage.setItem('notas', JSON.stringify(notas))
}

function validarformulario(nombreMat, primerNota, segunNota, tercerNota, exameNota) {
    //Expresion Regular Letras con Espacio
    let ExpRegLetrasEspacio = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
    //Expresion Regular Solo Números y Decimales
    let ExpRegSoloNumeros = /^-{0,1}\d*\.{0,1}\d+$/;

    if (nombreMat.length == 0) {
        alert('Tiene que escribir un nombre de la materia')
        return
    }

    if (nombreMat.match(ExpRegLetrasEspacio) != null && 
        primerNota.match(ExpRegSoloNumeros) != null && 
        segunNota.match(ExpRegSoloNumeros) != null && 
        tercerNota.match(ExpRegSoloNumeros) != null &&
        exameNota.match(ExpRegSoloNumeros) != null) {

        let notaEstudiante = {
            nombreMateria: nombreMat,
            primeraNota: parseFloat(primerNota),
            segundaNota: parseFloat(segunNota),
            terceraNota: parseFloat(tercerNota),
            examenFinal: parseFloat(exameNota),
            definitiva: 0
        }

        calcularPromedio(notaEstudiante);
        //if(notas.some((elem) => elem.nombreMateria == notaEstudiante.nombreMateria)){
        //}
        notas.push(notaEstudiante);
        return
    } else {
        alert('Algun dato no es valido')
    }
}

function calcularPromedio(notaEstudiante){
    let calculo = ((notaEstudiante.primeraNota + notaEstudiante.segundaNota + notaEstudiante.terceraNota) / 3 * 0.7 + (notaEstudiante.examenFinal * 0.3)).toFixed(1);
    notaEstudiante.definitiva = parseFloat(calculo);
}

function mostrarNotas() {
    let cadena = '';
    notas.forEach((elemento) => {
        cadena +=
            `
            <tr>
                <td>${elemento.nombreMateria}</td>
                <td>${elemento.primeraNota}</td>
                <td>${elemento.segundaNota}</td>
                <td>${elemento.terceraNota}</td>
                <td>${elemento.examenFinal}</td>
                <td id="def" style="background-color: ${elemento.color};" >${elemento.definitiva}</td>
            </tr>
        `;
    });
    listNotas.innerHTML = cadena;
}

function colorDefinitiva() {
    notas.forEach((elem) => {
        if (elem.definitiva <= 2.9) {
            elem.color = 'red';
        } else if (elem.definitiva <= 3.9) {
            elem.color = 'orange';
        } else {
            elem.color = 'green';
        }
    })
}
