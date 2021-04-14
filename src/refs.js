export default function getRefs() {
    return {
        BASE_URL: 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q',
        inputForm: document.querySelector("#search-form"),
        galeryUl: document.querySelector(".gallery"),
        showMore: document.querySelector("#show-more"),
        perPage: 12,
    };
  }