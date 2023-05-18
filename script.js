const containerElement = document.querySelector('.container');
const jokeText = document.createElement('p');
const categoryForm = document.querySelector('#category-form');
const queryForm = document.querySelector('#query-form');
const selectElement = categoryForm.querySelector('#category');
containerElement.append(jokeText)

function getJoke(category) {
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then(res => res.json())
        .then(jokeData => {
            jokeText.textContent = jokeData.value;
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
            const jokeSumbintButtonElement = categoryForm.querySelector('#joke-submit');
            jokeSumbintButtonElement.removeAttribute('disabled');
        })
}

doJokeCategory()

categoryForm.addEventListener('submit', event => {
    event.preventDefault()

    const category = event.target.category.value;
    getJoke(category)
})

function queryJoke() {
    queryForm.addEventListener('submit', event => {
        event.preventDefault()
        const queryInput = event.target.query.value;
            fetch(`https://api.chucknorris.io/jokes/search?query=${queryInput}`)
            .then(res => {
                if (res.ok) {
                   return res.json();
                } else {
                    jokeText.textContent = 'Wrong input!!!'
                    throw new Error(res.status)
                }
            })
            .then(jokeObj => {
                if (jokeObj.total !== 0) {
                    function getRandomInt(max) {
                        return Math.floor(Math.random() * max);
                    }
                    jokeText.textContent = jokeObj.result[getRandomInt(jokeObj.total)].value;
                } else {
                    jokeText.textContent = 'No match!!!'
                }
            })
            .catch(error => console.error(error))
    })
}

queryJoke()