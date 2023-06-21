
const swiper = document.querySelector(".swiper-wrapper")

fetch('https://free-food-menus-api-production.up.railway.app/desserts')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((dessert) => {
      const image = new Image()
      image.src = dessert.img
      image.onload = () => { 

        const divCard = document.createElement('div');
        divCard.classList.add("swiper-slide", "tranding-slide");

        divCard.innerHTML = `
            <div class="tranding-slide-img">
              <h3 class="slide-name">${dessert.name}</h3>
              <h6 class="slide-dsc"> ${dessert.dsc}</h6>
              <img src="${dessert.img}" alt="Tranding">
            </div>

        `;

        swiper.appendChild(divCard)
        }
    });
  });




var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverFlowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});
