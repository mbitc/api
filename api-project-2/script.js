const pictureDivElelemnt = document.querySelector('#picture');
const pictureElelemnt = document.createElement('img');

(function dogBreedSelector() {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
        .then(dogData => {
            const dogBreedsList = dogData.message;
            const dogSelectorElement = document.querySelector('#dog-list');
            for (const dogBreed in dogBreedsList) {
                const capDogBreed = dogBreed.charAt(0).toUpperCase() + dogBreed.slice(1)
                if (dogBreedsList[dogBreed].length === 0) {
                    const dogBreedElement = document.createElement('option');
                    dogBreedElement.textContent = `${capDogBreed}`;
                    dogBreedElement.value = dogBreed;
                    dogSelectorElement.append(dogBreedElement)
                } else {
                    dogBreedsList[dogBreed].forEach(subBreed => {
                        const dogBreedElement = document.createElement('option');
                        const capSubBreed = subBreed.charAt(0).toUpperCase() + subBreed.slice(1)
                        dogBreedElement.textContent = `${capDogBreed}: ${capSubBreed}`;
                        dogBreedElement.value = `${dogBreed}-${subBreed}`;
                        dogSelectorElement.append(dogBreedElement)
                    })
                }
            }
        })
})();

(function dogSearchFormAction() {
    const dogSearchFormElement = document.querySelector('#dog-search')
    dogSearchFormElement.addEventListener('submit', event => {
        event.preventDefault()
        const selectedDogValue = event.target['dog-list'].value;
        getDogPicture(selectedDogValue)

    })
})();

function getDogPicture(selectedDogValue) {
    let fetchAddress;
    if (selectedDogValue.includes('-')) {
        const dogBreedAndSubBreed = selectedDogValue.split('-');
        const breed = dogBreedAndSubBreed[0];
        const subBreed = dogBreedAndSubBreed[1];
        fetchAddress = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`;
    } else {
        fetchAddress = `https://dog.ceo/api/breed/${selectedDogValue}/images/random`;
    }

    fetch(fetchAddress)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then(dogData => {
            console.log(dogData.message)
            console.dir(pictureElelemnt)
            pictureElelemnt.src = dogData.message;
            pictureDivElelemnt.append(pictureElelemnt)
        })
        .catch(error => console.error(error))
}