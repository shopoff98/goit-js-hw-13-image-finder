import './sass/main.scss';
import galleryTempl from './partials/templates/gallery.hbs';
import GalleryService from './partials/js/gallery-service';




const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`
const refsLoadMoreButton = document.querySelector('.load-more-btn ');
const refsSearchForm = document.querySelector('.search-form');
const refsUlGallery = document.querySelector('.gallery');
const refsSubmitBtn = document.querySelector('.btn');

// refsSubmitBtn.disabled = true;




const galleryService = new GalleryService({
  url: BASE_URL
});



refsSearchForm.addEventListener('submit', onSearch);
refsLoadMoreButton.addEventListener('click', onLoadMore);



function onSearch(e) {
  e.preventDefault();
  galleryService.searchQuery = e.currentTarget.elements.query.value;

 if (galleryService.searchQuery === '' || galleryService.searchQuery === ' ') {
    return
  }
 else {
   
   galleryService.resetPage();
   clearGallery();
   galleryService.fetchPictures().then(createGalleryList);
   disabledBtn(galleryService.searchQuery);
}

  

}




function createGalleryList(data) {
  if (data.total < 13 || data.hits.length < 12) {
   refsLoadMoreButton.classList.remove('visiable')
    refsLoadMoreButton.classList.add('is-hidden');
  }
  else {
    refsLoadMoreButton.classList.remove('is-hidden');
    refsLoadMoreButton.classList.add('visiable');
    
  }
  refsUlGallery.insertAdjacentHTML('beforeend', galleryTempl(data));

}


function onLoadMore() {
  galleryService.fetchPictures().then(createGalleryList);
  onScroll();


}

function clearGallery() {
  refsUlGallery.innerHTML = '';
  refsLoadMoreButton.classList.remove('visiable')
  refsLoadMoreButton.classList.add('is-hidden')
}



function onScroll() {
  setTimeout(() => {
    refsLoadMoreButton.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, 500
  );
}

// function disabledBtn(query) {
//   if (query === '' || query === ' ') {
//     return refsSubmitBtn.disabled = true;
//   }
//   else {
//     return refsSubmitBtn.disabled = false
//   }
// }

// обработать ошибку например пишешь русскими буквами. кнопка disabled.