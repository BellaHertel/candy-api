
const swiper = document.querySelector(".swiper-wrapper")
const arrayApi = []

let cardList = document.querySelector('.card-list');

// Inicia Array
// Inicia Array
const start = async () => {
  try {
    const response = await fetch('https://free-food-menus-api-production.up.railway.app/desserts');
    const data = await response.json();

    data.forEach((dessert) => {
      arrayApi.push(dessert);
    });
    atualizaItens(arrayApi);
  } catch (error) {
    console.log('Ocorreu um erro:', error);
  }
};

// Atualiza os Itens do Carrousel
const atualizaItens = (arrayApi) => {
 
  swiper.innerHTML = "";

  console.log("-- Atualizando Itens --")
  for (let i = 0; i < arrayApi.length; i++) {
    let divCard = document.createElement('div');
    divCard.classList.add("swiper-slide", "tranding-slide");

    let img = new Image();
    img.src = arrayApi[i].img;
    img.onload = () => {
      divCard.innerHTML = `
        <div class="tranding-slide-img">
          <h3 class="slide-name">${arrayApi[i].name}</h3>
          <h6 class="slide-dsc">${arrayApi[i].dsc}</h6>
          <img src="${arrayApi[i].img}" alt="Tranding">
          <button onclick="edit('${arrayApi[i].id}')">Editar</button>
          <button onclick="remove('${arrayApi[i].id}')">Excluir</button>
        </div>
      `;
      swiper.appendChild(divCard);
    };
    img.src = arrayApi[i].img;
  }
}

// Atualizar Site 
// const update = () => {
    
//   cardList.innerHTML = "";
//   for (let i = 0; i < arrayApi.length; i++) {
//     const divCard = document.createElement('div');
//     divCard.classList.add("swiper-slide", "tranding-slide");

//     divCard.innerHTML = `
//       <div class="tranding-slide-img">
//         <h3 class="slide-name">${arrayApi[i].name}</h3>
//         <h6 class="slide-dsc">${arrayApi[i].dsc}</h6>
//         <img src="${arrayApi[i].img}" alt="Tranding">
//         <button onclick="edit('${arrayApi[i].id}')">Editar</button>
//         <button onclick="remove('${arrayApi[i].id}')">Excluir</button>
//       </div>
//     `;

//     swiper.appendChild(divCard);
//   }
// }

// Deletar 
const remove = (id) => {
  console.log("Removendo " + id);

  let foundIndex = -1;
  arrayApi.forEach((dessert, index) => {
    if (dessert.id === id) {
      foundIndex = index;
    }
  });

  if (foundIndex !== -1) {
    arrayApi.splice(foundIndex, 1);
    update();

  }
};

// Editar
  const edit = (id) => { 

    let modal = document.getElementsByClassName("modal")[0];
    let editBtn = document.querySelector(".edit-btn");
    let closeBtn = document.querySelector(".close");
    editBtn.textContent = "Editar Doce"

    let inputName = document.querySelector(".input-edit-name")
    let inputDesc = document.querySelector(".input-edit-desc")
    let inputImage = document.querySelector(".input-edit-img")
    let dessertImage = document.querySelector(".dessert-img")
    let imgElement = document.createElement("img"); 

    modal.style.display = "flex";

  // Encontrar item escolhido
    let foundIndex = -1;
    arrayApi.forEach((dessert, index) => {
      if (dessert.id === id) {
        inputName.value = dessert.name;
        inputDesc.value = dessert.dsc
        inputImage.value = dessert.img;
        imgElement.src=`${dessert.img}`
        dessertImage.appendChild(imgElement)
        foundIndex = index
      }
    })

    console.log("Editando o Item: \n " + arrayApi[foundIndex])

  // Fechar modal
    closeBtn.removeEventListener('click', closeBtn);
    closeBtn.addEventListener('click', () => {
      modal.style.display = "none";
      dessertImage.innerHTML = ''
      champFromLocalStorage = ''
      id = ''
    }, { once: true });
  
  // Confirmar Edição
    editBtn.removeEventListener('click', editBtn);
    editBtn.addEventListener('click', () => {

      arrayApi[foundIndex].name = inputName.value
      arrayApi[foundIndex].img = inputImage.value

      modal.style.display = "none";
      dessertImage.innerHTML = ''
      champFromLocalStorage = ''
      id = ''

      atualizaItens(arrayApi);
    }, { once: true });   
  }
  

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

start();
