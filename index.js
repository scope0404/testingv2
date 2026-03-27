const form = document.getElementById('recommendationForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:3000/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        displayRecommendations(result.recommendations);
    } catch (err) {
        console.error(err);
        resultDiv.textContent = 'Error fetching recommendations';
    }
});

function displayRecommendations(movies) {
    resultDiv.innerHTML = '';
    if (!movies || movies.length === 0) {
        resultDiv.textContent = 'No recommendations found.';
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        card.innerHTML = `
            <img src="${movie.title}.png" alt="${movie.title}" class="movie-poster">
            <h3>${movie.title}</h3>
            <p>Genre: ${movie.genre}</p>
            <p>Style: ${movie.art_style}</p>
            <p>Format: ${movie.type}</p>
        `;
        resultDiv.appendChild(card);
    });
}


