window.history.scrollRestoration = 'manual';
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

const snowCanvas = document.getElementById('snow-canvas');
const snowCtx = snowCanvas.getContext('2d');
snowCanvas.width = window.innerWidth;
snowCanvas.height = window.innerHeight;
let snowParticles = [];
const snowParticleCount = 150;

function createSnowParticles() {
    snowParticles = [];
    for (let i = 0; i < snowParticleCount; i++) {
        snowParticles.push({
            x: Math.random() * snowCanvas.width,
            y: Math.random() * snowCanvas.height,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 1 + 0.5
        });
    }
}

function drawSnowParticles() {
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    snowCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    snowCtx.beginPath();
    for (let i = 0; i < snowParticles.length; i++) {
        const p = snowParticles[i];
        snowCtx.moveTo(p.x, p.y);
        snowCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    }
    snowCtx.fill();
    updateSnowParticles();
}

function updateSnowParticles() {
    for (let i = 0; i < snowParticles.length; i++) {
        let p = snowParticles[i];
        p.y += p.speed;
        if (p.y > snowCanvas.height) {
            p.y = 0 - p.radius;
            p.x = Math.random() * snowCanvas.width;
        }
    }
}

function animateSnow() {
    drawSnowParticles();
    requestAnimationFrame(animateSnow);
}

const bgCanvas = document.getElementById('background-animation-canvas');
const bgCtx = bgCanvas.getContext('2d');
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];

const STAR_COUNT = (bgCanvas.width * bgCanvas.height) / 4000;
const SHOOTING_STAR_COUNT = 2;

class Star {
    constructor() {
        this.x = Math.random() * bgCanvas.width;
        this.y = Math.random() * bgCanvas.height;
        this.size = Math.floor(Math.random() * 2) + 1;
        this.speed = (Math.random() * 0.2) + 0.1 + (this.size - 1) * 0.2;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.alphaDirection = 1;
    }
    update() {
        this.y += this.speed;
        if (this.y > bgCanvas.height) {
            this.y = 0;
            this.x = Math.random() * bgCanvas.width;
        }
        this.alpha += 0.005 * this.alphaDirection;
        if (this.alpha <= 0.2 || this.alpha >= 1) {
            this.alphaDirection *= -1;
        }
    }
    draw() {
        bgCtx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        bgCtx.fillRect(this.x, this.y, this.size, this.size);
    }
}

class ShootingStar {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * bgCanvas.width;
        this.y = 0;
        this.len = (Math.random() * 80) + 10;
        this.speed = (Math.random() * 10) + 6;
        this.active = false;
        setTimeout(() => { this.active = true; }, Math.random() * 5000 + 2000);
    }
    update() {
        if (this.active) {
            this.x += this.speed;
            this.y += this.speed / 2;
            if (this.x > bgCanvas.width || this.y > bgCanvas.height) {
                this.reset();
            }
        }
    }
    draw() {
        if (this.active) {
            bgCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            bgCtx.lineWidth = 2;
            bgCtx.beginPath();
            bgCtx.moveTo(this.x, this.y);
            bgCtx.lineTo(this.x - this.len, this.y - this.len / 2);
            bgCtx.stroke();
        }
    }
}

function initStarfield() {
    stars = [];
    shootingStars = [];
    for (let i = 0; i < STAR_COUNT; i++) { stars.push(new Star()); }
    for (let i = 0; i < SHOOTING_STAR_COUNT; i++) { shootingStars.push(new ShootingStar()); }
}

function animateBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    stars.forEach(star => { star.update(); star.draw(); });
    shootingStars.forEach(star => { star.update(); star.draw(); });
    requestAnimationFrame(animateBg);
}

window.addEventListener('resize', () => {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
    createSnowParticles();
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    initStarfield();
});

createSnowParticles();
animateSnow();
initStarfield();
animateBg();

let isScrollLocked = true;
const keysToBlock = ['ArrowUp', 'ArrowDown', ' ', 'PageUp', 'PageDown', 'Home', 'End'];
function preventDefault(e) { if (isScrollLocked) e.preventDefault(); }
function preventDefaultForKeys(e) { if (isScrollLocked && keysToBlock.includes(e.key)) e.preventDefault(); }
window.addEventListener('wheel', preventDefault, { passive: false });
window.addEventListener('keydown', preventDefaultForKeys);
function unlockScroll() {
    if (isScrollLocked) {
        isScrollLocked = false;
        window.removeEventListener('wheel', preventDefault);
        window.removeEventListener('keydown', preventDefaultForKeys);
    }
}

function smoothScrollTo(targetSelector, duration) {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    let startTime = null;
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}

const scrollLinks = [
    { buttonSelector: '.info-container .info-box:nth-child(2)', targetId: '#sobre' },
    { buttonSelector: '.info-container .info-box:nth-child(3)', targetId: '#projetos' }
];
scrollLinks.forEach(link => {
    const button = document.querySelector(link.buttonSelector);
    if (button) {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            smoothScrollTo(link.targetId, 1000);
            unlockScroll();
        });
    }
});

const projectData = {
    proj1: {
        title: "Plataforma de Correção de Códigos",
        description: "Este foi um projeto acadêmico desenvolvido em grupo com o objetivo de criar uma plataforma interativa e gamificada para estudantes de programação. A ideia central era fornecer um ambiente onde os usuários pudessem submeter seus códigos para desafios, receber feedback automático e competir em um ranking, simulando um ambiente real de desenvolvimento e incentivando a prática constante.",
        images: ['../assets/img/placeholder-1.png', '../assets/img/placeholder-2.png']
    },
    proj2: {
        title: "Website Full-Stack",
        description: "Desenvolvimento de um website completo, abordando tanto o front-end quanto o back-end. Utilizando Java para a lógica do servidor e o SGBD DBeaver para o gerenciamento do banco de dados, o projeto foi uma excelente oportunidade para praticar a integração entre a interface do usuário e a persistência de dados, solidificando conceitos de desenvolvimento web de ponta a ponta.",
        images: ['../assets/img/placeholder-2.png']
    },
    proj3: {
        title: "Futuro Projeto Incrível",
        description: "Este é um espaço reservado para documentar minha próxima jornada de aprendizado e desenvolvimento. O objetivo é explorar novas tecnologias, aprofundar meus conhecimentos e construir algo que seja tanto desafiador quanto útil, aplicando as habilidades que venho adquirindo ao longo do meu curso.",
        images: ['../assets/img/placeholder-3.png']
    }
};

const modalBackdrop = document.getElementById('project-modal-backdrop');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalCarouselImages = document.getElementById('modal-carousel-images');
const closeModalButton = document.getElementById('modal-close-button');
const detailsButtons = document.querySelectorAll('.details-button');
const prevButton = document.getElementById('carousel-prev-button');
const nextButton = document.getElementById('carousel-next-button');
let currentImageIndex = 0;
let currentImages = [];

function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    currentImages = data.images;
    currentImageIndex = 0;
    updateCarousel();

    modalBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
}

function updateCarousel() {
    modalCarouselImages.innerHTML = '';
    currentImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = modalTitle.textContent;
        modalCarouselImages.appendChild(img);
    });
    modalCarouselImages.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    prevButton.style.display = currentImages.length > 1 ? 'block' : 'none';
    nextButton.style.display = currentImages.length > 1 ? 'block' : 'none';
}

detailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project-id');
        openModal(projectId);
    });
});

closeModalButton.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
        closeModal();
    }
});

prevButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : currentImages.length - 1;
    modalCarouselImages.style.transform = `translateX(-${currentImageIndex * 100}%)`;
});

nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex < currentImages.length - 1) ? currentImageIndex + 1 : 0;
    modalCarouselImages.style.transform = `translateX(-${currentImageIndex * 100}%)`;
});

