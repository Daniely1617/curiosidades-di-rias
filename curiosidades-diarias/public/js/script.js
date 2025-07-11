const curiosidadesContainer = document.getElementById('curiosidades');
const carregarBtn = document.getElementById('carregar');
const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

async function carregarCuriosidade() {
    try {
        const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=pt');
        const data = await res.json();
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${data.text}</h3>
            <button onclick="favoritar('${data.text}')">Favoritar</button>
        `;
        curiosidadesContainer.appendChild(card);
    } catch (error) {
        console.error('Erro ao carregar curiosidade:', error);
    }
}

function favoritar(texto) {
    if (!favoritos.includes(texto)) {
        favoritos.push(texto);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        alert('Curiosidade favorita!');
    } else {
        alert('Essa curiosidade já está nos favoritos!');
    }
}

for (let i = 0; i < 3; i++) {
    carregarCuriosidade();
}

carregarBtn.addEventListener('click', () => {
    for (let i = 0; i < 3; i++) {
        carregarCuriosidade();
    }
});