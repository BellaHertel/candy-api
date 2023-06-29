const swiper = document.querySelector(".swiper-wrapper")
const arrayApi = []

let cardList = document.querySelector('.card-list');

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
 
  console.log("Atualizando Itens \n Itens do array: \n" + arrayApi.length)
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
          <div class="slide-buttons">
            <button onclick="edit('${arrayApi[i].id}')">Editar</button>
            <button onclick="remove('${arrayApi[i].id}')">Excluir</button>
          </div>
          </div>
      `;
    } 
      img.onerror = () => { 
        divCard.innerHTML = `
        <div class="tranding-slide-img">
          <h3 class="slide-name">${arrayApi[i].name}</h3>
          <h6 class="slide-dsc">${arrayApi[i].dsc}</h6>
          <img src="./assets/dish.jpg" alt="Tranding">
          <div class="slide-buttons">
            <button onclick="edit('${arrayApi[i].id}')">Editar</button>
            <button onclick="remove('${arrayApi[i].id}')">Excluir</button>
          </div>
          </div>
      `;
      }

    

    swiper.appendChild(divCard);
  }
}

// Adicionar Doce
const add = () => {
  console.log('click')

  let modal = document.getElementsByClassName("modal")[0];
  let editBtn = document.querySelector(".edit-btn");
  let closeBtn = document.querySelector(".close");
  editBtn.textContent = "Adicionar Doce"

  let inputName = document.querySelector(".input-edit-name")
  let inputDesc = document.querySelector(".input-edit-desc")
  let inputImage = document.querySelector(".input-edit-img")
  let dessertImage = document.querySelector(".dessert-img")
  let imgElement = document.createElement("img"); 

  modal.style.display = "flex";

  

  editBtn.removeEventListener('click', editBtn);
  editBtn.addEventListener('click', () => {
    
    const dessert = {
      name:  inputName.value,
      desc: inputDesc.value,
      img: inputImage.value 
    }

    arrayApi.push(dessert)


    modal.style.display = "none";
    dessertImage.innerHTML = ''
    champFromLocalStorage = ''
    id = ''
    atualizaItens(arrayApi)

  }, { once: true });  

 

}

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

// Deletar 
const remove = (id) => {

  console.log("Removendo Item " + id);

  let foundIndex = -1;
  arrayApi.forEach((dessert, index) => {
    if (dessert.id === id) {
      foundIndex = index;
    }
  });

  if (foundIndex !== -1) {
    arrayApi.splice(foundIndex, 1);
    atualizaItens(arrayApi)
  }
};




// -------------------------------


// Books 
const sortearCafe = async () => {
  const response = await fetch('https://wolnelektury.pl/api/daisy/?format=json');
  const data = await response.json();
  const bookArray = []
  data.forEach((book) => {
    bookArray.push(book);
  });

  const books = document.querySelector('.books') 
  const arr = pegarItensAleatorios(bookArray)

  for(let i = 0; i < arr.length; i++) {

    let book = document.createElement('div')

    book.innerHTML = `
    <div class="book">
      <div class='book-title'>
        <h3 class="slide-name">${arr[i].title}</h3>
      </div>
      <div class="book-img">
        <img src="${arr[i].simple_thumb}">
      </div>
    </div>
`;
  books.appendChild(book);
  }

  const imagem = document.querySelector('.book');

  imagem.onmouseover = function() {
  imagem.classList.add('hover');
  };

  imagem.onmouseout = function() {
  imagem.classList.remove('hover');
  };
};









// Livros aleatórios
function pegarItensAleatorios(array) {
  const quantidadeItens = 5;
  const arrayAleatorio = [];

  // Verificar se a quantidade de itens desejada é maior que o tamanho do array original
  if (quantidadeItens > array.length) {
    console.log('A quantidade de itens desejada é maior do que o tamanho do array original.');
    return array;
  }

  // Gerar índices aleatórios únicos
  const indicesAleatorios = [];
  while (indicesAleatorios.length < quantidadeItens) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    if (!indicesAleatorios.includes(indiceAleatorio)) {
      indicesAleatorios.push(indiceAleatorio);
    }
  }

  // Construir o novo array com os itens aleatórios
  for (let i = 0; i < quantidadeItens; i++) {
    const indice = indicesAleatorios[i];
    arrayAleatorio.push(array[indice]);
  }

  return arrayAleatorio;
}

// Carousel
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
sortearCafe();