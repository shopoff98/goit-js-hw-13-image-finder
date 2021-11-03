export default class GalleryService{
    constructor({url}) {
        this.searchQuery = '';
        this.pageNumber = 1;
        this.url = url;
    }

    async fetchPictures() {
        try {
            const url = `${this.url}&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=24039882-fb287519b383d41b18511437f`;
    const response = await fetch(url);
    const data = await response.json();
    this.pageNumber += 1;
        return data
        } catch (error) {
            console.log(error)
        } 
        
    }

   

    resetPage(){
        this.pageNumber = 1;
    }
    
    get query() {
        return this.searchQuery
    }

    set query(newQuery){
return newQuery
    }

   
    
}