const searchFormElement = document.querySelector('#search-zip');
const containerElement = document.querySelector('.container');
const countryListElement = searchFormElement.querySelector('#country');
const divContentElement = document.createElement('div');

(function countrySelector() {
    fetch('country-list.json')
    .then(res => res.json())
    .then(countryList => {
        for (const country in countryList) {
            const countryOptionElement = document.createElement('option');
            countryOptionElement.textContent = country;
            countryOptionElement.value = countryList[country];
            countryListElement.append(countryOptionElement)
        }
    })
})()

function searchZip(country, zip, statusMessegeElement) {
    fetch(`https://api.zippopotam.us/${country}/${zip}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                statusMessegeElement.textContent = 'No match!';
                throw new Error(res.status)
            }
        })
        .then(jsonRes => {
            console.log(jsonRes)
            statusMessegeElement.textContent = 'Found';
            const places = jsonRes.places;
            places.forEach(place => {
                const placeElement = document.createElement('ul');
                statusMessegeElement.after(placeElement)
                for (const property in place) {
                    const placeLiElement = document.createElement('li');
                    placeElement.append(placeLiElement)
                    placeLiElement.textContent = `${property}: ${place[property]}`
                }
            })
        })
        .catch(error => console.error(error))
    } 
    
    searchFormElement.addEventListener('submit', event => {
        event.preventDefault()
        divContentElement.innerHTML = '';
        const statusMessegeElement = document.createElement('p');
        containerElement.append(divContentElement);
        divContentElement.append(statusMessegeElement);
    const country = event.target.country.value;
    const zip = event.target.zip.value;
    statusMessegeElement.textContent = 'Loading...';
    searchZip(country, zip, statusMessegeElement)
})
