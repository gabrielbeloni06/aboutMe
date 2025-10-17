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
    constructor() {
        this.reset();
    }
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
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
    }
    for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
        shootingStars.push(new ShootingStar());
    }
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
        description: "Este foi um projeto acadêmico desenvolvido em grupo com o objetivo de criar uma plataforma online gamificada para estudantes de programação. A ideia central é permitir que os usuários submetam seus códigos para resolver desafios, recebendo feedback automatizado. O sistema inclui um ranking para incentivar a competição saudável e um histórico de submissões para que os alunos possam acompanhar seu progresso. O foco principal foi na robustez do back-end em Java para garantir a segurança e a eficiência na execução e avaliação dos códigos enviados.",
        images: ["../assets/img/placeholder-1.png", "../assets/img/placeholder-2.png", "../assets/img/placeholder-3.png"]
    },
    proj2: {
        title: "Website Full-Stack com Java",
        description: "Desenvolvimento de uma aplicação web completa, construída para aprimorar minhas habilidades tanto no front-end quanto no back-end. Utilizei Java para criar a lógica do servidor e a API, enquanto o front-end foi desenvolvido com tecnologias web padrão. A integração com o banco de dados foi gerenciada com DBeaver, permitindo a manipulação e persistência dos dados. Este projeto foi fundamental para solidificar meu entendimento sobre a arquitetura de aplicações web e o fluxo de dados entre cliente e servidor.",
        images: ["../assets/img/placeholder-2.png", "../assets/img/placeholder-1.png"]
    },
    proj3: {
        title: "Futuro Projeto Incrível",
        description: "Este é um espaço reservado para o meu próximo grande projeto. Estou constantemente buscando novos desafios para expandir meu conhecimento e aplicar o que aprendo. Fique de olho para futuras atualizações!",
        images: ["../assets/img/placeholder-3.png"]
    }
};

const modalBackdrop = document.getElementById('project-modal-backdrop');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalCarouselImages = document.getElementById('modal-carousel-images');
const closeButton = document.getElementById('modal-close-button');
const detailsButtons = document.querySelectorAll('.details-button');

let currentImageIndex = 0;
let projectImages = [];

function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    
    projectImages = data.images;
    currentImageIndex = 0;
    updateCarousel();

    modalBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalBackdrop.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function updateCarousel() {
    modalCarouselImages.innerHTML = '';
    projectImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Imagem do projeto";
        modalCarouselImages.appendChild(img);
    });
    modalCarouselImages.style.transform = `translateX(-${currentImageIndex * 100}%)`;
}

detailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project-id');
        openModal(projectId);
    });
});

closeButton.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
        closeModal();
    }
});

const prevButton = document.getElementById('carousel-prev-button');
const nextButton = document.getElementById('carousel-next-button');

prevButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : projectImages.length - 1;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex < projectImages.length - 1) ? currentImageIndex + 1 : 0;
    updateCarousel();
});

