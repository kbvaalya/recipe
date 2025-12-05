const API_KEY = 'yMp+yeIeXs32fNeHR5MO2w==5wZ2SMuwFzNMnFqO';
const API_URL = 'https://api.api-ninjas.com/v2/recipe';

const recipes = [
    { title: 'Lentil Soup',            image: 'img/lentil-soup.jpg' },
    { title: 'Chicken Curry',          image: 'img/chicken-curry.jpg' },
    { title: 'Caesar Salad',           image: 'img/caesar-salad.jpg' },
    { title: 'Spaghetti Carbonara',    image: 'img/spaghetti-carbonara.jpg' },
    { title: 'Beef Tacos',             image: 'img/beef-tacos.jpg' },
    { title: 'Vegetable Stir Fry',     image: 'img/vegetable-stir-fry.jpg' },
    { title: 'Chocolate Cake',         image: 'img/chocolate-cake.jpg' },
    { title: 'Greek Salad',            image: 'img/greek-salad.jpg' },
    { title: 'Pancakes',               image: 'img/pancakes.jpg' },
    { title: 'Tomato Soup',            image: 'img/tomato-soup.jpg' },
    { title: 'Grilled Salmon',         image: 'img/grilled-salmon.jpg' },
    { title: 'Mashed Potatoes',        image: 'img/mashed-potatoes.jpg' },
    { title: 'Omelette',               image: 'img/omelette.jpg' },
    { title: 'Banana Bread',           image: 'img/banana-bread.jpg' },
    { title: 'Fried Rice',             image: 'img/fried-rice.jpg' },
    { title: 'Chicken Noodle Soup',    image: 'img/chicken-noodle-soup.jpg' }
];

async function loadRecipeCards() {
    const grid = document.getElementById('recipeGrid');
    grid.innerHTML = '<p class="loading">Loading recipes...</p>';

    let html = '';

    for (const r of recipes) {
        html += `
            <div class="recipe-card" onclick="openRecipe('${r.title.replace(/'/g, "\\'")}')">
                <img 
                    src="${r.image}" 
                    alt="${r.title}" 
                    class="recipe-image"
                    onerror="this.src='img/placeholder.jpg'"
                >
                <div class="recipe-name">${r.title}</div>
            </div>
        `;
    }

    grid.innerHTML = html;
}

async function openRecipe(recipeName) {
    const modal = document.getElementById('recipeModal');
    const modalBody = document.getElementById('modalBody');

    modal.classList.add('active');
    modalBody.innerHTML = '<div class="loading">Loading recipe...</div>';

    try {
        const response = await fetch(`${API_URL}?title=${encodeURIComponent(recipeName)}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to fetch recipe');

        const data = await response.json();

        if (data && data.length > 0) {
            displayRecipe(data[0]);
        } else {
            modalBody.innerHTML = `
                <div class="error">Recipe not found. Try another!</div>
            `;
        }
    } catch (err) {
        console.error(err);
        modalBody.innerHTML = `
            <div class="error">Failed to load recipe. Try again.</div>
        `;
    }
}

function displayRecipe(recipe) {
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="recipe-section">
            <h3>${recipe.title || 'Recipe'}</h3>
        </div>

        <div class="recipe-section">
            <h3>Ingredients</h3>
            <p>${recipe.ingredients || 'No data'}</p>
        </div>

        <div class="recipe-section">
            <h3>Servings</h3>
            <p>${recipe.servings || 'N/A'}</p>
        </div>

        <div class="recipe-section">
            <h3>Instructions</h3>
            <p>${recipe.instructions || 'No instructions'}</p>
        </div>
    `;
}

function closeModal() {
    const modal = document.getElementById('recipeModal');
    modal.classList.remove('active');
}

document.getElementById('recipeModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

loadRecipeCards();
