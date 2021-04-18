import './styles.css';
import ApiService from'./apiService.js';
import getRefs from './refs.js'
import cartTemplate from './galeryList.hbs';
const refs = getRefs();
const galleryApiService = new ApiService();
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';




///РЕНДЕР ПО ПОИСКУ
    
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
 
/// РЕАЛИЗАЦИЯ КНОПКИ SHOW MORE с последующим авто-скролом на экран
function showMorePics() {
    galleryApiService.fetchOn().then(appendPicMarkup)
    
    const cordinates = refs.showMore.offsetTop;
    
    function scrollToBottom() {
        window.scrollTo({
        top: cordinates - 10,
        behavior: 'smooth',
    })
    }
    setTimeout(scrollToBottom, 700)
    }

/// Бесконечный скролл
    const options = {
        rootMargin: '50px',
        threshold: 0.5,
};

    const onEntry = (entries, observer) => {
        entries.forEach(entry => {
            galleryApiService.fetchOn().then(appendPicMarkup)
            checkBoxScrolling()
  });
};

const observer = new IntersectionObserver(onEntry, options);



/// рендер
function appendPicMarkup(pictures) {
    refs.galeryUl.insertAdjacentHTML('beforeend', cartTemplate(pictures))
};
    
function clearMarkup() {
    refs.galeryUl.innerHTML = '';
    refs.showMore.classList.remove('is-hidden');
}

/// реализация модального окна
import * as basicLightbox from 'basiclightbox';
document.addEventListener('click', toModal)

function toModal(e) {
    
    if (e.target.dataset.source) {
        basicLightbox.create(`<img src="${e.target.dataset.source}">`)            
            .show();
    }
}

console.dir(refs.checkBox)


/// проверка на чекбокс и активация бесконечного скролла
function checkBoxScrolling() {
    if (refs.checkBox.checked) {
        refs.showMore.classList.add('is-hidden')
        observer.observe(refs.showMore);
    } else {
        refs.showMore.classList.remove('is-hidden');
    }
        
}

refs.checkBox.addEventListener('change', checkBoxScrolling)



