import getRefs from './refs.js'
import '@pnotify/core/dist/BrightTheme.css'
const { alert, notice, info, success, error } = require('@pnotify/core');
const refs = getRefs()
const KEY = '21129448-e17c8b1f4b436f5a4360c1592';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchOn() {
         return fetch(`${refs.BASE_URL}=${this.searchQuery}&page=${this.page}&per_page=${refs.perPage}&key=${KEY}`)
            .then(response => response.json())
             .then(({ hits }) => {
                 if (hits.length === 0) {
                    alert('нет результатов!')
                }
                this.incrementPage();
                 return hits;
             })
            .catch (error => console.log(error));
        
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery
    }

    set query(value) {
        return this.searchQuery = value;
    }

    
}