const containerElement = document.querySelector('.container');
const jokeButton = document.createElement('button');
jokeButton.textContent = 'Joke';
containerElement.append(jokeButton)
const jokeText = document.createElement('p');

jokeButton.addEventListener('click', () => getJoke())

function getJoke() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(res => res.json())
        .then(jokeData => {
            jokeText.textContent = jokeData.value;
            containerElement.append(jokeText)
        })
}