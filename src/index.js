import './styles.css';
import ApiService from'./apiService.js';
import getRefs from './refs.js'
import cartTemplate from './galeryList.hbs';
const refs = getRefs();
const galleryApiService = new ApiService();
// const basicLightbox = require('basiclightbox')


    
refs.inputForm.addEventListener('submit', search)
refs.showMore.addEventListener('click', showMorePics)

function search(e) {
    e.preventDefault()
    
    galleryApiService.query = e.currentTarget.elements.query.value
    galleryApiService.resetPage();
    galleryApiService.fetchOn().then(pics => {
        clearMarkup();
        appendPicMarkup(pics);
    });
}
    
function showMorePics() {
    galleryApiService.fetchOn().then(appendPicMarkup)
    
    const cordinates = refs.showMore.offsetTop;
    console.log(cordinates)
    
    
    
    function scrollToBottom() {
        window.scrollTo({
        top: cordinates - 10,
        behavior: 'smooth',
    })
    }

    setTimeout(scrollToBottom, 700)
    
}

function appendPicMarkup(pictures) {
    refs.galeryUl.insertAdjacentHTML('beforeend', cartTemplate(pictures))
};
    
function clearMarkup() {
    refs.galeryUl.innerHTML = '';
    refs.showMore.classList.remove('is-hidden');
}


import * as basicLightbox from 'basiclightbox';
document.addEventListener('click', toModal)

function toModal(e) {
    console.dir(e.target)
    console.log(e.target.alt)
    if (e.target.nodeName === "IMG") {
        return basicLightbox.create(`
    <img src="${e.target.alt}" width="800" height="600">
`).show()

        
    
    }
}

