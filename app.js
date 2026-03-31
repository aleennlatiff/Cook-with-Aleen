// =============================================
//  GLOBAL BITES — app.js
// =============================================

// --- HERO SLIDER ---
// Select all slides, dots, and buttons from the page
const slides   = document.querySelectorAll('.slide');
const dots     = document.querySelectorAll('.dot');
const prevBtn  = document.getElementById('prevBtn');
const nextBtn  = document.getElementById('nextBtn');

let currentSlide = 0; // keeps track of the current slide

// Function to show a specific slide
function showSlide(index) {
    slides.forEach(s => s.classList.remove('active')); // remove active from all slides
    dots.forEach(d => d.classList.remove('active'));   // remove active from all dots

    slides[index].classList.add('active'); // show selected slide
    dots[index].classList.add('active');   // activate the correct dot
}

// When clicking next button
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length; // move to next slide
    showSlide(currentSlide);
});

// When clicking previous button
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // move to previous slide
    showSlide(currentSlide);
});

// When clicking on a dot
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.dataset.index); // get index of clicked dot
        showSlide(currentSlide);
    });
});


// --- DARK MODE ---
// Select dark mode elements
const toggleTrack = document.querySelector('.toggle-track');
const toggleBall  = document.querySelector('.toggle-ball');
const body        = document.body;

// Function to apply dark mode
function applyDarkMode(isDark) {
    body.classList.toggle('dark-mode', isDark);       // change body theme
    toggleTrack.classList.toggle('dark-active', isDark);
    toggleBall.classList.toggle('dark-active', isDark);
}

// Check if user saved theme before
const savedTheme = localStorage.getItem('theme');
applyDarkMode(savedTheme === 'dark');

// Change theme when user clicks toggle
toggleTrack.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark-mode');
    applyDarkMode(isDark);

    // save theme in browser storage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// =============================================
//  MOCK DATABASE (Array of Objects)
// =============================================

// This array stores all recipe data
const recipesData = [
    {
        id: 1,
        title: "Chicken Shawarma"s        category: "middle eastern",
        categoryDisplay: "Middle Eastern",
        image: "img/chicken-shawerma.jpg",
        difficulty: "easy",
        time: "40 mins",
        ingredients: 12
    },
    {
        id: 2,
        title: "Beef Carnitas",
        category: "mexican",
        categoryDisplay: "Mexican",
        image: "img/Beef-Carnitas.jpg",
        difficulty: "medium",
        time: "45 mins",
        ingredients: 9
    },
    {
        id: 3,
        title: "Spicy Miso Ramen",
        category: "asian",
        categoryDisplay: "Asian",
        image: "img/SpicyMisoRamen.jpg",
        difficulty: "hard",
        time: "30 mins",
        ingredients: 14
    }
];

const recipeGrid = document.getElementById('recipeGrid');


// Function to display recipes on the webpage
function displayRecipes(menuItems) {

    let displayMenu = menuItems.map(function(item) {

        return `<div class="recipe-card">
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.title}">
                <button class="fav-btn" aria-label="Add to favorites"><i class="far fa-heart"></i></button>
                <span class="cuisine-tag">${item.categoryDisplay}</span>
            </div>

            <div class="card-info">
                <div class="card-meta">
                    <span class="difficulty ${item.difficulty}">
                        ${item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                    </span>
                </div>

                <h3>${item.title}</h3>

                <div class="card-details">
                    <span><i class="far fa-clock"></i> ${item.time}</span>
                    <span><i class="fas fa-list-ul"></i> ${item.ingredients} ingredients</span>
                </div>

                <button class="card-btn">Cook Now</button>
            </div>
        </div>`;
    });

    displayMenu = displayMenu.join("");

    // Insert generated HTML into the page
    recipeGrid.innerHTML = displayMenu;

    // Re-enable favorite buttons for new cards
    attachFavoriteListeners();
}


// Function to handle favorite button clicks
function attachFavoriteListeners() {

    const favBtns = document.querySelectorAll('.fav-btn');

    favBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            const icon = btn.querySelector('i');

            btn.classList.toggle('active'); // highlight favorite
            icon.classList.toggle('far');   // change icon style
            icon.classList.toggle('fas');
        });

    });

}


// =============================================
//  SEARCH & DYNAMIC FILTERING
// =============================================

const searchInput = document.getElementById('searchInput');
const chips = document.querySelectorAll('.chip');


// Show all recipes when page loads
window.addEventListener('DOMContentLoaded', () => {
    displayRecipes(recipesData);
});


// 1. Filter recipes using search input
searchInput.addEventListener('input', (e) => {

    const searchText = e.target.value.toLowerCase();

    // Reset category buttons to "All"
    chips.forEach(c => c.classList.remove('active'));
    chips[0].classList.add('active'); 

    // Filter recipes by title
    const filteredRecipes = recipesData.filter(function(recipe) {

        return recipe.title.toLowerCase().includes(searchText);

    });

    displayRecipes(filteredRecipes);
});


// 2. Filter recipes using category buttons
chips.forEach(chip => {

    chip.addEventListener('click', (e) => {

        // Change active button style
        chips.forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Clear search box
        searchInput.value = '';

        const category = e.currentTarget.dataset.filter;

        // Show all recipes
        if (category === 'all') {

            displayRecipes(recipesData);

        } 
        // Show filtered recipes
        else {

            const filteredRecipes = recipesData.filter(function(recipe) {

                return recipe.category === category;

            });

            displayRecipes(filteredRecipes);
        }
    });

});