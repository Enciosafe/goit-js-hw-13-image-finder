import getRefs from './refs.js'
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
            .then(({hits}) => {
                this.incrementPage();
                
                return hits;
            });
        
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