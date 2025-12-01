const gallery = document.getElementById('gallery');
const statusText = document.getElementById('status');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const removeBtn = document.getElementById('removeBtn');
const reverseBtn = document.getElementById('reverseBtn');

let page = 1;

const createCard = (img) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="https://picsum.photos/id/${img.id}/400/300" alt="img">
        <div class="info">
            <p>ID: ${img.id}</p>
            <p>Автор: ${img.author}</p>
        </div>
    `;
    return card;
};

const getImages = async () => {
    statusText.style.display = 'block';
    try {
        const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=4`);
        const data = await res.json();
        
        if (data.length) {
            data.forEach(item => gallery.appendChild(createCard(item)));
            page++;
            statusText.style.display = 'none';
        }
    } catch (e) {
        statusText.innerText = 'Помилка';
    }
};

const clearGallery = () => {
    gallery.innerHTML = '';
    page = 1;
};

const removeLast = () => {
    if (gallery.lastChild) gallery.lastChild.remove();
};

const reverseGallery = () => {
    const cards = Array.from(gallery.children);
    gallery.innerHTML = '';
    cards.reverse().forEach(card => gallery.appendChild(card));
};

loadBtn.addEventListener('click', getImages);
clearBtn.addEventListener('click', clearGallery);
removeBtn.addEventListener('click', removeLast);
reverseBtn.addEventListener('click', reverseGallery);

document.addEventListener('DOMContentLoaded', getImages);