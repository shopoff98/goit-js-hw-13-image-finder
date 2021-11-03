import './sass/main.scss';
import galleryTempl from './partials/templates/gallery.hbs';
import GalleryService from './partials/js/gallery-service';




const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`
const refsLoadMoreButton = document.querySelector('.load-more-btn ');
const refsSearchForm = document.querySelector('.search-form');
const refsUlGallery = document.querySelector('.gallery');





const galleryService = new GalleryService({
  url: BASE_URL
});



refsSearchForm.addEventListener('submit', onSearch);
refsLoadMoreButton.addEventListener('click', onLoadMore);



async function onSearch(e) {

  
    e.preventDefault();
   galleryService.searchQuery = e.currentTarget.elements.query.value;
    galleryService.resetPage();
    clearGallery();
  galleryService.fetchPictures().then(createGalleryList);
   galleryService.fetchPictures().then(data => {if (data.total < 13) {
    refsLoadMoreButton.classList.toggle('is-hidden');
  }});
    
}




function createGalleryList(data) {
refsLoadMoreButton.classList.remove('is-hidden')
    refsUlGallery.insertAdjacentHTML('beforeend', galleryTempl(data));

}


 function onLoadMore() {
   galleryService.fetchPictures().then(createGalleryList);
  onScroll();
  

}

function clearGallery(){
  refsUlGallery.innerHTML = '';
  refsLoadMoreButton.classList.add('is-hidden')
}



function onScroll() {
  setTimeout(() => {
    refsLoadMoreButton.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  },500
  );
}

