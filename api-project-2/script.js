fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(dogData => {
        console.log(dogData.message)
        const dogBreedsList = dogData.message;
        const dogSelectorElement = document.querySelector('#dog-list');
        for (const dogBreed in dogBreedsList) {
            const dogBreedElement = document.createElement('option');
            const capDogBreed = dogBreed.charAt(0).toUpperCase() + dogBreed.slice(1)
            if (dogBreedsList[dogBreed].length === 0) {
                dogBreedElement.textContent = `${capDogBreed}`;
                dogBreedElement.dataset.breed = dogBreed;
            } else {
                dogBreedsList[dogBreed].forEach(subBreed => {
                    const capSubBreed = subBreed.charAt(0).toUpperCase() + dogBreed.slice(1)
                    dogBreedElement.textContent = `${capDogBreed}: ${capSubBreed}`;
                    dogBreedElement.dataset.breed = dogBreed;
                    dogBreedElement.dataset.subBreed = subBreed;
                })
            }
            dogSelectorElement.append(dogBreedElement)
        }
    })