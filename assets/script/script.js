document.addEventListener('DOMContentLoaded', () => {
    const numeroInput = document.getElementById('numeroInput');
    const curiosidade = document.getElementById('curiosidade');


    numeroInput.addEventListener('keypress', (event) => {

        if (event.key === 'Enter') {
            buscarFato();
        }
    });
});

async function buscarFato() {
    const numeroInput = document.getElementById('numeroInput').value;

    if (numeroInput === '') {
        alert('Por favor, digite um número!');
        return;
    }

    const numero = parseInt(numeroInput);


    await fetch(`http://numbersapi.com/${numero}?json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter o fato.');
            }           
            return response.json();
        })
        .then(data => {
            const fato = data.text;
            exibirFato(numero, fato);
        })
        .catch(error => {
            console.error('Erro ao obter fato', error);
            alert('Erro ao obter fato. Por favor, tente novamente.');
        });
}

function exibirFato(numero, fato) {
    const curiosidade = document.getElementById('curiosidade');
    curiosidade.innerHTML = `<p><strong>Curiosidade sobre o número ${numero}</strong></p><p>${fato}</p>`;
}