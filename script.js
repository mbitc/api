const containerElement = document.querySelector('.container');
const jokeText = document.createElement('p');
const categoryForm = document.querySelector('#category-form');
const selectElement = categoryForm.querySelector('#category');

function getJoke(category) {
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then(res => res.json())
        .then(jokeData => {
            jokeText.textContent = jokeData.value;
            containerElement.append(jokeText)
        })
}

function doJokeCategory() {
    fetch('https://api.chucknorris.io/jokes/categories')
        .then(res => res.json())
        .then(categoryList => {
            categoryList.forEach(category => {
                const categorySelectElement = document.createElement('option');
                const categoryContent = '- ' + category.charAt(0).toUpperCase() + category.slice(1);
                categorySelectElement.textContent = categoryContent;
                categorySelectElement.value = category;
                selectElement.append(categorySelectElement)
            })
        })
        return true;
}

doJokeCategory()

categoryForm.addEventListener('submit', event => {
    event.preventDefault()
    
    const category = event.target.category.value;
    if (doJokeCategory()) {
        getJoke(category)
    }
})
