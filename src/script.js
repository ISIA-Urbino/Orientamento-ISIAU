let imgs = document.getElementsByClassName("animateImage");
imgs = Array.from(imgs);

const speed = 2.5;

const colors = [
  '#FFFFFF', '#000000'
];

let isWhite = false;

//elenco URL immagini
const imageUrls = [
'img/Progetti_0.jpg',
'img/Progetti_1.jpg',
'img/Progetti_2.jpg',
'img/Progetti_3.jpg',
'img/Progetti_4.jpg',
'img/Progetti_5.jpg',
'img/Progetti_6.jpg',
'img/Progetti_7.jpg',
'img/Progetti_8.jpg',
'img/Progetti_9.jpg',
'img/Progetti_10.jpg',
'img/Progetti_11.jpg',
'img/Progetti_12.jpg',
'img/Progetti_13.jpg',
'img/Progetti_14.jpg',
'img/Progetti_15.jpg',
'img/Progetti_16.jpg',
'img/Progetti_17.jpg',
'img/Progetti_18.jpg',
'img/Progetti_19.jpg',
'img/Progetti_20.jpg',
'img/Progetti_21.jpg',
'img/Progetti_22.jpg',
'img/Progetti_23.jpg',
'img/Progetti_24.jpg',
'img/Progetti_25.jpg',
'img/Progetti_26.jpg',
'img/Progetti_27.jpg',
'img/Progetti_28.jpg',
'img/Progetti_29.jpg',
'img/Progetti_30.jpg',
'img/Progetti_31.jpg',
'img/Progetti_32.jpg',
'img/Progetti_33.jpg',
'img/Progetti_34.jpg',
/*'img/Spazi_0.jpg',
'img/Spazi_1.jpg',
'img/Spazi_2.jpg',
'img/Spazi_3.jpg',
'img/Spazi_4.jpg',
'img/Spazi_5.jpg',
'img/Spazi_6.jpg',
'img/Spazi_7.jpg',
'img/Spazi_8.jpg',
'img/Spazi_9.jpg',
'img/Spazi_10.jpg',
'img/Spazi_11.jpg',
'img/Spazi_12.jpg',
'img/Spazi_13.jpg',
'img/Spazi_14.jpg',
'img/Spazi_15.jpg',
'img/Spazi_16.jpg',
'img/Spazi_17.jpg',
'img/Spazi_18.jpg',
'img/Spazi_19.jpg',
'img/Spazi_20.jpg',
'img/Spazi_21.jpg',
'img/Spazi_22.jpg',
'img/Spazi_23.jpg',
'img/Spazi_24.jpg',
'img/Spazi_25.jpg',
'img/Spazi_26.jpg',
'img/Spazi_27.jpg',
'img/Spazi_28.jpg',
'img/Spazi_29.jpg',
'img/Spazi_30.jpg',
'img/Spazi_31.jpg',*/
'img/Comunicazione_0.jpg',
'img/Comunicazione_1.jpg',
'img/Comunicazione_2.jpg',
'img/Comunicazione_3.jpg',
'img/Comunicazione_4.jpg',
'img/Comunicazione_5.jpg',
'img/Comunicazione_6.jpg',
'img/Comunicazione_7.jpg',
'img/Comunicazione_8.jpg',
'img/Comunicazione_9.jpg',
'img/Comunicazione_10.jpg',
'img/Eventi_0.jpg',
'img/Eventi_1.jpg',
'img/Eventi_2.jpg',
'img/Eventi_3.jpg',
'img/Eventi_4.jpg',
'img/Eventi_5.jpg',
'img/Eventi_6.jpg',
'img/Eventi_7.jpg',
'img/Eventi_8.jpg',
'img/Eventi_9.jpg',
'img/Eventi_10.jpg',
'img/Eventi_11.jpg',
'img/Eventi_12.jpg',
'img/Eventi_13.jpg',
'img/Eventi_14.jpg',
'img/Eventi_15.jpg',
'img/Eventi_16.jpg',
'img/Eventi_17.jpg',
'img/Eventi_18.jpg',
'img/Eventi_19.jpg',
'img/Eventi_20.jpg',
'img/Eventi_21.jpg',];

// Preload all images for faster loading
const preloadedImages = new Map();
imageUrls.forEach(url => {
  const img = new Image();
  img.src = url;
  preloadedImages.set(url, img);
});

let activeImages = new Set();

function changeThemeColor() {
  isWhite = !isWhite;
  const color = isWhite ? '#FFFFFF' : '#000000';
  document.querySelector('meta[name="theme-color"]').setAttribute('content', color);
}

function changeImage(img) {
  if (img.src) {
    activeImages.delete(img.src);
  }
  
  let availableImages = imageUrls.filter(url => !activeImages.has(new URL(url, window.location.href).href));
  
  if (availableImages.length === 0) {
    availableImages = imageUrls;
  }
  
  const index = Math.floor(Math.random() * availableImages.length);
  const newUrl = availableImages[index];
  
  // Ritorna una Promise che si risolve quando l'immagine è caricata
  return new Promise((resolve) => {
    img.onload = () => {
      activeImages.add(new URL(newUrl, window.location.href).href);
      resolve();
    };
    img.src = newUrl;
  });
}

function animate(img) {
  let imgWidth = img.offsetWidth; 
  let imgHeight = img.offsetHeight;

  let x = Math.floor(Math.random() * (window.innerWidth - imgWidth)),
      y = Math.floor(Math.random() * (window.innerHeight - imgHeight));

  let angle = Math.random() * 2 * Math.PI;
  let dirX = Math.cos(angle) * speed,
      dirY = Math.sin(angle) * speed;

  // Carica l'immagine iniziale e poi inizia l'animazione
  changeImage(img).then(() => {
    imgWidth = img.offsetWidth;
    imgHeight = img.offsetHeight;
    requestAnimationFrame(move);
  });

  function move() {
    // Aggiorna le dimensioni dell'immagine ad ogni frame
    imgWidth = img.offsetWidth;
    imgHeight = img.offsetHeight;
    
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
  
    let nextY = y + dirY;
    let nextX = x + dirX;
  
    // Controlla collisione con i confini del vport
    if (nextY + imgHeight >= screenHeight) {
      // Rimbalza dal bordo inferiore
      y = screenHeight - imgHeight;
      dirY *= -1;
      // Cambia immagine solo dopo il completamento del caricamento
      changeImage(img).then(() => {
        imgWidth = img.offsetWidth;
        imgHeight = img.offsetHeight;
      });
    } else if (nextY <= 0) {
      // Rimbalza dal bordo superiore
      y = 0;
      dirY *= -1;
      changeImage(img).then(() => {
        imgWidth = img.offsetWidth;
        imgHeight = img.offsetHeight;
      });
      changeThemeColor();
    } else {
      y = nextY;
    }
  
    if (nextX + imgWidth >= screenWidth) {
      // Rimbalza dal bordo destro
      x = screenWidth - imgWidth;
      dirX *= -1;
      changeImage(img).then(() => {
        imgWidth = img.offsetWidth;
        imgHeight = img.offsetHeight;
      });
    } else if (nextX <= 0) {
      // Rimbalza dal bordo sinistro
      x = 0;
      dirX *= -1;
      changeImage(img).then(() => {
        imgWidth = img.offsetWidth;
        imgHeight = img.offsetHeight;
      });
    } else {
      x = nextX;
    }
  
    // Assicurati che l'immagine rimanga sempre all'interno del viewport
    x = Math.max(0, Math.min(x, screenWidth - imgWidth));
    y = Math.max(0, Math.min(y, screenHeight - imgHeight));
    
    img.style.left = x + "px";
    img.style.top = y + "px";
  
    requestAnimationFrame(move);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  imgs.forEach(img => animate(img));
});

// Anno corrente
document.getElementById("year").innerHTML = new Date().getFullYear();