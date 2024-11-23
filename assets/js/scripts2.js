const changingTexts = ["Kampung Melayu", "Erupsi Merapi", "Pakaian"];
const changingTextElement = document.getElementById("changing-text");
const inputElement = document.getElementById("search-input");
let currentIndex = 0;

function animateChangingText() {
    const tl = gsap.timeline();
    
    tl.to(changingTextElement, { 
        duration: 0.5, 
        opacity: 0, 
        onComplete: () => {
            currentIndex = (currentIndex + 1) % changingTexts.length;
            changingTextElement.textContent = changingTexts[currentIndex];
        } 
    });
    
    tl.to(changingTextElement, { duration: 0.5, opacity: 1 });
}

setInterval(animateChangingText, 3000);

inputElement.addEventListener("input", () => {
    document.getElementById("placeholder").style.display = inputElement.value ? "none" : "block";
});

const categoryItems = document.querySelectorAll('.category-item');
const allCards = document.querySelectorAll('.swiper-slide');

let activeFilter = null;

categoryItems.forEach(item => {
    item.addEventListener('click', function() {
        const categoryClass = this.querySelector('.icon-wrapper').classList[1];
        const category = categoryClass.replace('-bg', '');

        if (activeFilter === category) {
            resetFilter();
            activeFilter = null;
            return;
        }
        
        activeFilter = category;
        
        filterCards(category);

        updateCategoryStyles(this);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    showLoader();
    
    window.addEventListener('load', function() {
        setTimeout(hideLoader, 5000);
    });
});

function filterCards(category) {
    allCards.forEach(card => {
        const cardBadge = card.querySelector('.card-badge');
        if (cardBadge.classList.contains(`${category}-bg`)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    if (window.donationSwiper) {
        window.donationSwiper.update();
    }
}

function resetFilter() {
    allCards.forEach(card => {
        card.style.display = '';
    });
    
    categoryItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = '';
    });
    
    if (window.donationSwiper) {
        window.donationSwiper.update();
    }
}

function updateCategoryStyles(selectedItem) {
    categoryItems.forEach(item => {
        item.style.opacity = '0.5';
        item.style.transform = '';
    });

    selectedItem.style.opacity = '1';
    selectedItem.style.transform = 'scale(1.1)';
}


document.addEventListener('DOMContentLoaded', function() { 
    document.body.classList.add('loading');

    const loader = document.querySelector('.loader-wrapper');

    const video = document.querySelector('.loader-video');
    video.play();
    
    setTimeout(() => {
        loader.classList.add('fade-out');
        
        document.body.classList.remove('loading');
        
        setTimeout(() => {
            loader.remove();
        }, 1000);
    }, 5000);
}); 

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.querySelector('.btn-read-more');
    const shortText = document.querySelector('.short-text');
    const fullText = document.querySelector('.full-text');
    
    readMoreBtn.addEventListener('click', function() {
        if (fullText.style.display === 'none') {
            // Show full text
            shortText.style.display = 'none';
            fullText.style.display = 'inline';
            readMoreBtn.textContent = 'Lihat Lebih Sedikit';
        } else {
            // Show short text
            shortText.style.display = 'inline';
            fullText.style.display = 'none';
            readMoreBtn.textContent = 'Lihat Selengkapnya';
        }
    });
});