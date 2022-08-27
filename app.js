let formNotas = document.getElementById('formulario');
let listNotas = document.getElementById('notas');

let notas = [];

formNotas.addEventListener('submit', (e) => {
    e.preventDefault();
    capturarDatos();
    mostrarNotas();
})

function capturarDatos() {

    let primerNota = document.getElementById('primeraNota').value;
    let segunNota = document.getElementById('segundaNota').value;
    let tercerNota = document.getElementById('terceraNota').value;
    let exameNota = document.getElementById('examenFinal').value;

    let notaEstudiante = {
        primeraNota: parseInt(primerNota),
        segundaNota: parseInt(segunNota),
        terceraNota: parseInt(tercerNota),
        examenFinal: parseInt(exameNota),
        definitiva: 0
    }
    notaEstudiante.definitiva = ((notaEstudiante.primeraNota + notaEstudiante.segundaNota + notaEstudiante.terceraNota) / 3 * 0.7 + (notaEstudiante.examenFinal * 0.3)).toFixed(1);

    notas.push(notaEstudiante);
}

function mostrarNotas() {
    let cadena = '';
    notas.forEach((elemento) => {
        cadena +=
            `
            <tr>
                <td>${elemento.primeraNota}</td>
                <td>${elemento.segundaNota}</td>
                <td>${elemento.terceraNota}</td>
                <td>${elemento.examenFinal}</td>
                <td id="def">${elemento.definitiva}</td>
            </tr>
        `;
    });
    listNotas.innerHTML = cadena;
}

let def = document.getElementById('def');

function colorDefinitiva() {
    notas.forEach((elemento) => {
        if (elemento.definitiva <= 2.9) {
            def.style.background = 'red';
        } else if (elemento.definitiva >= 3.0 || elemento.definitiva <= 3.9) {
            def.style.background = 'oregen'
        } else {
            def.style.background = ''
        }
    })
}
