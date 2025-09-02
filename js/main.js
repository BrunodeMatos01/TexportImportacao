/* ========================================================
    CÓDIGO DO MENU-BURGUER - VERSÃO FINAL COM ANIMAÇÕES
    ======================================================== */
// Esta parte já estava correta e segura.
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const menuIcon = document.querySelector('.menu-icon');

    if (!menu || !menuIcon) {
        return;
    }

    if (menuIcon.contains(event.target)) {
        menu.classList.toggle('show');
        menuIcon.classList.toggle('active');
        return;
    }

    const clickedLink = event.target.closest('#menu a');
    if (clickedLink) {
        menu.classList.remove('show');
        menuIcon.classList.remove('active');
        return;
    }

    if (menu.classList.contains('show') && !menu.contains(event.target)) {
        menu.classList.remove('show');
        menuIcon.classList.remove('active');
    }
});


/* ========================================================
    FUNÇÃO DE SCROLL PARA PRODUTOS
    ======================================================== */
function scrollToProdutos() {
    // CORREÇÃO: Adicionada verificação para evitar erro se a âncora não existir.
    const telaProdutos = document.querySelector('#telaProdutos');
    if (telaProdutos) {
        telaProdutos.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

/* ========================================================
    LÓGICA DE ANIMAÇÃO COM INTERSECTION OBSERVER
    ======================================================== */
/**
 * Esta função inicializa todos os "vigias" de animação para
 * elementos que devem aparecer com fade-in ao rolar a página.
 */
function iniciarObservadoresDeAnimacao() {

    // --- Observer para a Página de Produtos ---
    // Esta parte já era segura, pois um forEach em uma lista vazia não quebra.
    const elementsToAnimate = document.querySelectorAll('.fundo-dourado, .produto-item, .produtos-cta-container');
    if (elementsToAnimate.length > 0) {
        const productObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elementsToAnimate.forEach(element => productObserver.observe(element));
    }


    // --- Observer para a Página "Sobre Nós" ---
    // Esta parte já estava segura com a verificação .length > 0.
    const sobreNosElements = document.querySelectorAll('#sobreNosSec > h2, .quemSomos, .topicos-quemSomos');
    if (sobreNosElements.length > 0) {
        const sobreNosObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        sobreNosElements.forEach(element => sobreNosObserver.observe(element));
    }

    // --- Observer para a Seção "Chamada de Orçamento" ---
    const orcamentoChamadaElements = document.querySelectorAll('#orcamento-chamada');
    if (orcamentoChamadaElements.length > 0) {
        const orcamentoChamadaObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        orcamentoChamadaElements.forEach(element => orcamentoChamadaObserver.observe(element));
    }

    // --- Observer para a Seção "Formulário de Orçamento" ---
    const orcamentoFormElements = document.querySelectorAll('.container-geral');
    if (orcamentoFormElements.length > 0) {
        const orcamentoFormObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        orcamentoFormElements.forEach(element => orcamentoFormObserver.observe(element));
    }
    
    // --- Observer para a Seção "Segmento" ---
    const segmentoElements = document.querySelectorAll('#segmento');
    if (segmentoElements.length > 0) {
        const segmentoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        segmentoElements.forEach(element => segmentoObserver.observe(element));
    }
}


/* ========================================================
    INICIALIZADOR DE COMPONENTES DE PÁGINA (SLIDESHOW, VÍDEO)
    ======================================================== */
let slideshowInterval = null; // Variável global para o timer

/**
 * Função que busca e inicializa componentes que só existem em páginas específicas.
 */
function inicializarPagina() {
    console.log("Executando inicialização de componentes específicos...");

    // --- INICIALIZADOR DO SLIDESHOW DE FUNDO (SÓ RODA NA HOME) ---
    // Esta parte já estava segura com a verificação if (containerSlide).
    const containerSlide = document.getElementById('Container-inicialHome');
    if (containerSlide) {
        const slidesDeFundo = [
            { imagem: 'url("img/Maquina-Corte-automatico-WEB.png")', posicao: 'center center' },
            { imagem: 'url("img/Maquina-Corte-automatico-1-WEB.png")', posicao: 'center 80%' },
            { imagem: 'url("img/Maquina-Corte-automatico-3-WEB.png")', posicao: 'center center' },
            { imagem: 'url("img/Maquina-Corte-automatico-2-WEB.png")', posicao: 'center 55%' },
            { imagem: 'url("img/Produtos-Textil-de-fundo-Texport-WEB.png")', posicao: 'center center' }
        ];
        const camadasSlide = containerSlide.querySelectorAll('.fundo-slide');
        if (camadasSlide.length > 0) {
            camadasSlide.forEach((camada, index) => {
                if (slidesDeFundo[index]) {
                    camada.style.backgroundImage = slidesDeFundo[index].imagem;
                    camada.style.backgroundPosition = slidesDeFundo[index].posicao;
                }
            });
            let imagemAtual = 0;
            const totalImagens = camadasSlide.length;

            function trocarImagem() {
                camadasSlide.forEach(camada => camada.classList.remove('visivel'));
                camadasSlide[imagemAtual].classList.add('visivel');
                imagemAtual = (imagemAtual + 1) % totalImagens;
            }
            if (slideshowInterval) {
                clearInterval(slideshowInterval);
            }
            trocarImagem();
            slideshowInterval = setInterval(trocarImagem, 5000);
        }
    }

    // --- INICIALIZADOR DO VÍDEO DE FUNDO ---
    // Esta parte já estava segura com a verificação if (video).
    const video = document.getElementById('video-background');
    if (video) {
        video.play().catch(error => {
            console.warn("Aviso: O navegador impediu a tentativa de autoplay do vídeo.", error);
        });
    }
}


/* =========================================================================
   PONTO DE ENTRADA PRINCIPAL - EXECUTA QUANDO O HTML ESTÁ PRONTO
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- INICIALIZAÇÃO DO MODAL DE PRODUTOS E CARROSSEL ---
    // Esta é a seção que causava o erro em outras páginas.
    
    // CORREÇÃO: Primeiro, selecionamos todos os elementos do modal.
    const modal = document.getElementById('modalProdutos');
    const botoesAbrirModal = document.querySelectorAll('.btn-modal');

    // CORREÇÃO: Agora, só executamos o código do modal se o elemento principal (o próprio modal) existir na página.
    if (modal && botoesAbrirModal.length > 0) {
        
        // Seleciona os elementos internos APENAS se o modal existir
        const modalTitulo = document.getElementById('modalTitulo');
        const modalFecharBtn = document.getElementById('modalFecharBtn');
        const carrosselTrack = document.getElementById('carrosselTrack');
        const btnPrev = document.getElementById('carrosselBtnPrev');
        const btnNext = document.getElementById('carrosselBtnNext');
        const paginacaoContainer = document.getElementById('carrosselPaginacao');

        // Dados e variáveis de estado
        const produtosPorCategoria = {
             'Laminas': [
                { marca: 'Lectra', modelo: 'Q50 IX6', nome: 'Lâminas de Corte Compatível Lectra', img: '../img/imgProdutos/Laminas Lectra Q50 IX6.png' },
                { marca: 'Lectra', modelo: 'MH8 MH9 MH88', nome: 'Lâminas de Corte Compatível Lectra', img: '../img/imgProdutos/Laminas Lectra MH8 MH9 MH88.png' },
                { marca: 'Lectra', modelo: 'Q80', nome: 'Lâminas de Corte Compatível Lectra', img: '../img/imgProdutos/Laminas Lectra Q80.png' },
                { marca: 'Gerber', modelo: 'GT7250 XLC7000 Z7 S91', nome: 'Lâminas de Corte Compatível Gerber', img: '../img/imgProdutos/Laminas Gerber GT7250 Z7 S91.png' },
                { marca: 'Bullmer', modelo: '8001 8002 8003 E80', nome: 'Lâminas de Corte Compatível Bullmer', img: '../img/imgProdutos/Laminas Bullmer 8001 8002.png' },
                { marca: 'Yin', nome: 'Lâminas de Corte Compatível Yin', img: '../img/imgProdutos/Laminas Yin.png' },
                { marca: 'Audaces', modelo: 'Cabeça7" 5"', nome: 'Lâminas de Corte Compatível Audaces', img: '../img/imgProdutos/Laminas Audaces.png' },

            ],
            'Lixas': [
                { marca: 'Lectra', modelo: '260*19MM P150', nome: 'Lâminas de Corte Compatível Lectra', img: '../img/imgProdutos/Lixas P150 Lectra.png' },
                { marca: 'Lectra', modelo: '295*12MM P150', nome: 'Lâminas de Corte Compatível Lectra', img: '../img/imgProdutos/Lixas P150 IX100.png' },
                { marca: 'Lectra', modelo: '260*19MM P80', nome: 'Lâminas de Corte Compatível Lectra', img: '../img/imgProdutos/Lixas Lectra P80.png' },
            ],
            'Cerdas': [
                { marca: 'Lectra', nome: 'Cerdas Compatível com Máquina Lectra', img: '../img/imgProdutos/Cerdas Lectra.png' },
                { marca: 'Bullmer', nome: 'Cerdas Compatível com Máquina Bullmer', img: '../img/imgProdutos/Cerdas Bullmer.png' },
            ],
            'Cartuchos': [
                { marca: 'Alys INK', modelo: '703730', nome: 'Cartuchos compatível com ploter Lectra', img: '../img/imgProdutos/Cartuchos Alys INK.png' },
            ],
            'Afiadores': [
                { marca: 'Yin', nome: 'Afiador compatível com Máquina Yin', img: '../img/imgProdutos/Afiador Yin.png' },
                { marca: 'Gerber', modelo: 'GT', nome: 'Afiador compatível com Máquina Gerber', img: '../img/imgProdutos/Afiador rebolo Gerber.png' },
                { marca: 'Bullmer', nome: 'Afiador compatível com Máquina Bullmer', img: '../img/imgProdutos/Afiador rebolo Bullmer.png' },
            ],
            'Correias': [
                { marca: 'Yin', modelo: 'YTB 3*240', nome: 'Correia compatível com Máquina Yin', img: '../img/imgProdutos/Correias Yin.png' },
            ],
            'Teclados': [
                { marca: 'Lectra', modelo: 'Teclado Bolha NGC', nome: 'Teclado compatível com Máquina Lectra', img: '../img/imgProdutos/Teclado Bolha Lectra.png' },
            ],
            'Guia de Lâminas': [
                { marca: 'Guia de Lâmina Lectra', modelo: 'Q50 IX6', nome: 'Compatível com Máquina Lectra', img: '../img/imgProdutos/Afiador-2.png' },
            ],

        };
        let currentIndex = 0, totalItems = 0, itemsVisiveis = 3, currentSnappedPosition = 0;
        let isDragging = false, startX = 0, dragMovement = 0;
        let savedScrollY = 0;

        function abrirModal(categoria) {
            savedScrollY = window.scrollY;
            document.body.classList.add('body-no-scroll');
            document.body.style.top = `-${savedScrollY}px`;
            popularModal(categoria);
            modal.showModal();
        }

        function fecharModal() {
            document.body.classList.remove('body-no-scroll');
            document.body.style.top = '';
            window.scrollTo(0, savedScrollY);
            modal.close();
        }

        function atualizarItemsVisiveis() {
            const larguraTela = window.innerWidth;
            itemsVisiveis = (larguraTela <= 900) ? 1 : (larguraTela <= 1200) ? 2 : 3;
        }

        function popularModal(categoria) {
            atualizarItemsVisiveis();
            const produtos = produtosPorCategoria[categoria] || [];
            totalItems = produtos.length;
            carrosselTrack.innerHTML = '';
            carrosselTrack.style.justifyContent = totalItems <= itemsVisiveis ? 'center' : 'flex-start';
            produtos.forEach(produto => {
                const cardHTML = `
                    <div class="carrossel-item">
                        <div class="item-imagem"><img src="${produto.img}" alt="${produto.nome}"></div>
                        <div class="item-info">
                            <p class="item-marca">${produto.marca || ''}</p>
                            <p class="item-modelo">${produto.modelo || ''}</p>
                            <h3 class="item-nome">${produto.nome || ''}</h3>
                            <p class="item-codigo">${produto.codigo || ''}</p>
                        </div>
                    </div>`;
                carrosselTrack.insertAdjacentHTML('beforeend', cardHTML);
            });
            carrosselTrack.querySelectorAll('img').forEach(img => img.addEventListener('dragstart', (e) => e.preventDefault()));
            if (modalTitulo) modalTitulo.textContent = `Tipos de ${categoria}`;
            resetarCarrossel();
        }

        function moverCarrossel() {
            const carrosselItem = carrosselTrack.querySelector('.carrossel-item');
            if (!carrosselItem) return;
            const itemWidth = carrosselItem.offsetWidth;
            const gap = 20;
            currentSnappedPosition = -(currentIndex * (itemWidth + gap));
            carrosselTrack.style.transform = `translateX(${currentSnappedPosition}px)`;
            atualizarBotoes();
            criarPaginacao();
        }

        function atualizarBotoes() {
            const maxIndex = Math.max(0, totalItems - itemsVisiveis);
            if (btnPrev) btnPrev.style.visibility = (currentIndex === 0 || totalItems <= itemsVisiveis) ? 'hidden' : 'visible';
            if (btnNext) btnNext.style.visibility = (currentIndex >= maxIndex || totalItems <= itemsVisiveis) ? 'hidden' : 'visible';
        }
        
        function criarPaginacao() {
            if (!paginacaoContainer) return;
            paginacaoContainer.innerHTML = '';
            const numeroDeParadas = Math.max(0, totalItems - itemsVisiveis) + 1;
            if (numeroDeParadas <= 1) return;
            for (let i = 0; i < numeroDeParadas; i++) {
                const dot = document.createElement('button');
                dot.classList.add('paginacao-dot');
                if (i === currentIndex) dot.classList.add('_active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    moverCarrossel();
                });
                paginacaoContainer.appendChild(dot);
            }
        }

        function resetarCarrossel() {
            currentIndex = 0;
            requestAnimationFrame(moverCarrossel);
        }

        function dragStart(event) {
            if (totalItems <= itemsVisiveis) return;
            isDragging = true;
            startX = event.type.startsWith('touch') ? event.touches[0].clientX : event.pageX;
            carrosselTrack.style.transition = 'none';
            carrosselTrack.style.cursor = 'grabbing';
        }

        function dragMove(event) {
            if (!isDragging) return;
            const currentX = event.type.startsWith('touch') ? event.touches[0].clientX : event.pageX;
            dragMovement = currentX - startX;
            carrosselTrack.style.transform = `translateX(${currentSnappedPosition + dragMovement}px)`;
        }

        function dragEnd() {
            if (!isDragging) return;
            isDragging = false;
            carrosselTrack.style.transition = 'transform 0.5s ease-out';
            carrosselTrack.style.cursor = 'grab';
            const dragThreshold = 50;
            const maxIndex = Math.max(0, totalItems - itemsVisiveis);
            if (dragMovement < -dragThreshold && currentIndex < maxIndex) {
                currentIndex++;
            } else if (dragMovement > dragThreshold && currentIndex > 0) {
                currentIndex--;
            }
            dragMovement = 0;
            moverCarrossel();
        }

        // Configuração dos Event Listeners (agora dentro de um ambiente seguro)
        botoesAbrirModal.forEach(button => {
            button.addEventListener('click', function() {
                const categoria = this.getAttribute('data-categoria');
                abrirModal(categoria);
            });
        });

        if (modalFecharBtn) modalFecharBtn.addEventListener('click', fecharModal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) fecharModal();
        });

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                const maxIndex = Math.max(0, totalItems - itemsVisiveis);
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    moverCarrossel();
                }
            });
        }
        
        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    moverCarrossel();
                }
            });
        }

        window.addEventListener('resize', () => {
            if (modal.hasAttribute('open')) {
                atualizarItemsVisiveis();
                moverCarrossel();
            }
        });

        if (carrosselTrack) {
            carrosselTrack.addEventListener('mousedown', dragStart);
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseup', dragEnd);
            carrosselTrack.addEventListener('touchstart', dragStart, { passive: true });
            document.addEventListener('touchmove', dragMove, { passive: true });
            document.addEventListener('touchend', dragEnd);
        }
    } // Fim da verificação if (modal)

    // --- CHAMADA DAS OUTRAS FUNÇÕES DE INICIALIZAÇÃO ---
    // Agora centralizamos tudo aqui.
    iniciarObservadoresDeAnimacao();
    inicializarPagina();

}); // Fim do addEventListener DOMContentLoaded