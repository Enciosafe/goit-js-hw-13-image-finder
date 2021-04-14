import './styles.css';
import ApiService from'./apiService.js';
import getRefs from './refs.js'
import cartTemplate from './galeryList.hbs';
const refs = getRefs();
const galleryApiService = new ApiService();

    
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

}

function appendPicMarkup(pictures) {
    refs.galeryUl.insertAdjacentHTML('beforeend', cartTemplate(pictures))
};
    
function clearMarkup() {
    refs.galeryUl.innerHTML = '';
}