/* ========================================================
   CÓDIGO DO MENU-BURGUER - VERSÃO COM DELEGAÇÃO DE EVENTOS
   (Funciona com HTMX)
   ======================================================== */

// Usamos 'document' como nosso "vigia" de eventos de clique
document.addEventListener('click', function(event) {
    
    // Encontra o menu e o ícone na página ATUALMENTE carregada
    // Fazemos isso dentro do evento para sempre pegar a versão mais recente dos elementos
    const menu = document.getElementById('menu');
    const menuIcon = document.querySelector('.menu-icon');

    // Se não encontrar os elementos (pode acontecer durante a troca de página), não faz nada.
    if (!menu || !menuIcon) {
        return;
    }

    // AÇÃO 1: VERIFICA SE O CLIQUE FOI NO ÍCONE DO MENU
    // Usamos .closest() para pegar o clique mesmo que seja num filho do ícone (ex: um svg)
    if (menuIcon.contains(event.target)) {
        menu.classList.toggle('show');
        return; // Para a execução aqui para não acionar a lógica de "fechar fora"
    }

    // AÇÃO 2: VERIFICA SE O CLIQUE FOI EM UM LINK DENTRO DO MENU
    const clickedLink = event.target.closest('#menu a');
    if (clickedLink) {
        menu.classList.remove('show');
        return; // Apenas fecha o menu, a navegação do link continua normalmente
    }

    // AÇÃO 3: VERIFICA SE O CLIQUE FOI FORA DO MENU
    // Esta lógica só roda se não clicamos no ícone nem num link
    if (!menu.contains(event.target)) {
        menu.classList.remove('show');
    }
});
/* ====================================================== */




/*Para o botão de veja produtos direcionar para produtos*/
  function scrollToProdutos() {
    document.querySelector('#telaProdutos').scrollIntoView({
      behavior: 'smooth'
    });
  }
/*========================================================*/




document.addEventListener('DOMContentLoaded', () => {
    // --- Dados e Seleção de Elementos ---
    const produtosPorCategoria = {
        'Facas': [
            { marca: 'RICHPEACE', modelo: 'RP-KNF1625', nome: 'Faca de Corte Oscilante', codigo: '10.101.001', img: 'https://placehold.co/400x300/e8e8e8/333?text=Faca+1' },
            { marca: 'JUKI', modelo: 'JK-T1310', nome: 'Faca de Corte Digital', codigo: '10.101.002', img: 'https://placehold.co/400x300/e8e8e8/333?text=Faca+2' },
            { marca: 'RICHPEACE', modelo: 'RP-KNF2030', nome: 'Faca Circular Automática', codigo: '10.101.003', img: 'https://placehold.co/400x300/e8e8e8/333?text=Faca+3' },
            { marca: 'JUKI', modelo: 'JK-T1315', nome: 'Faca para Couro', codigo: '10.101.004', img: 'https://placehold.co/400x300/e8e8e8/333?text=Faca+4' },
            { marca: 'EXTRA', modelo: 'EXT-005', nome: 'Faca Extra 5', codigo: '10.101.005', img: 'https://placehold.co/400x300/e8e8e8/333?text=Faca+5' },
            { marca: 'EXTRA', modelo: 'EXT-006', nome: 'Faca Extra 6', codigo: '10.101.006', img: 'https://placehold.co/400x300/e8e8e8/333?text=Faca+6' },
        ],
        'Lixas': [
            { marca: 'NORTON', modelo: 'A275', nome: 'Lixa de Grão Fino 220', codigo: '20.201.001', img: 'https://placehold.co/400x300/f0eade/333?text=Lixa+1' },
            { marca: '3M', modelo: 'Cubitron II', nome: 'Lixa de Grão Grosso 80', codigo: '20.201.002', img: 'https://placehold.co/400x300/f0eade/333?text=Lixa+2' },
        ],
    };

    const modal = document.getElementById('modalProdutos');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalFecharBtn = document.getElementById('modalFecharBtn');
    const carrosselTrack = document.getElementById('carrosselTrack');
    const btnPrev = document.getElementById('carrosselBtnPrev');
    const btnNext = document.getElementById('carrosselBtnNext');
    const botoesAbrirModal = document.querySelectorAll('.btn-modal');
    const paginacaoContainer = document.getElementById('carrosselPaginacao');

    // --- Variáveis de Estado ---
    let currentIndex = 0;
    let totalItems = 0;
    let itemsVisiveis = 3;
    let currentSnappedPosition = 0;
    let isDragging = false;
    let startX = 0;
    let dragMovement = 0;

    // --- Funções de Controle do Modal e Scroll Lock ---
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

    // --- Funções do Carrossel ---
    function atualizarItemsVisiveis() {
        const larguraTela = window.innerWidth;
        if (larguraTela <= 900) {
            itemsVisiveis = 1;
        } else if (larguraTela <= 1200) {
            itemsVisiveis = 2;
        } else {
            itemsVisiveis = 3;
        }
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

        carrosselTrack.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
        
        modalTitulo.textContent = `Tipos de ${categoria}`;
        resetarCarrossel();
    }

    function moverCarrossel() {
        const carrosselItem = carrosselTrack.querySelector('.carrossel-item');
        if (!carrosselItem) return;

        const itemWidth = carrosselItem.offsetWidth;
        const gap = 20;
        const totalMove = currentIndex * (itemWidth + gap);
        
        currentSnappedPosition = -totalMove;
        carrosselTrack.style.transform = `translateX(${currentSnappedPosition}px)`;
        
        atualizarBotoes();
        criarPaginacao();
    }

    function atualizarBotoes() {
        const maxIndex = Math.max(0, totalItems - itemsVisiveis);
        btnPrev.style.visibility = (currentIndex === 0 || totalItems <= itemsVisiveis) ? 'hidden' : 'visible';
        btnNext.style.visibility = (currentIndex >= maxIndex || totalItems <= itemsVisiveis) ? 'hidden' : 'visible';
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
        requestAnimationFrame(() => {
            moverCarrossel();
        });
    }

    // --- Lógica de Arrastar (Swipe) ---
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

    // --- Configuração dos Event Listeners ---
    botoesAbrirModal.forEach(button => {
        button.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria');
            abrirModal(categoria);
        });
    });

    modalFecharBtn.addEventListener('click', fecharModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) fecharModal();
    });

    btnNext.addEventListener('click', () => {
        const maxIndex = Math.max(0, totalItems - itemsVisiveis);
        if (currentIndex < maxIndex) {
            currentIndex++;
            moverCarrossel();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            moverCarrossel();
        }
    });

    window.addEventListener('resize', () => {
        if (modal.hasAttribute('open')) {
            atualizarItemsVisiveis();
            moverCarrossel();
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
        }
    });

    // Event Listeners para o Arraste (Swipe)
    carrosselTrack.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);

    carrosselTrack.addEventListener('touchstart', dragStart, { passive: true });
    document.addEventListener('touchmove', dragMove, { passive: true });
    document.addEventListener('touchend', dragEnd);
});


/*EFITOS DA PAGINA DE PRODUTOS*/
// Seleciona TODOS os elementos que você quer animar
  const elementsToAnimate = document.querySelectorAll('.fundo-dourado, .produto-item, .produtos-cta-container');

  // Configurações do Observer (pode ajustar o threshold)
  // threshold: 0.1 significa que a animação dispara quando 10% do elemento está visível
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // Cria o "vigia"
  const observer = new IntersectionObserver((entries, observer) => {
    // Roda para cada elemento que mudar de visibilidade
    entries.forEach(entry => {
      // Se o elemento ESTÁ visível na tela...
      if (entry.isIntersecting) {
        // Adiciona a classe .visible para disparar a animação CSS
        entry.target.classList.add('visible');
        
        // Opcional: Para de observar o elemento depois que a animação já aconteceu
        // Isso melhora a performance.
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Coloca o "vigia" para observar cada um dos seus elementos
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });

/*EFITOS PARA PAGINA DE SOBRENÓS*/
// =========================================================================
// SCRIPT DE ANIMAÇÃO UNIFICADO - COMPATÍVEL COM HTMX
// =========================================================================

/**
 * Esta função contém toda a lógica para encontrar e observar os elementos
 * que devem ser animados em QUALQUER página do seu site.
 */
function iniciarObservadoresDeAnimacao() {

    // --- Lógica para a Seção "Sobre Nós" ---
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


    // --- Lógica para a Seção "Chamada de Orçamento" ---
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


    // --- Lógica para a Seção "Formulário de Orçamento" (Texto e Form) ---
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
    
    // --- Adicione aqui a lógica para outras seções, se houver ---

}


// --- GATILHOS DE EXECUÇÃO ---

// 1. Executa a função no primeiro carregamento da página.
document.addEventListener('DOMContentLoaded', iniciarObservadoresDeAnimacao);

// 2. Executa a função NOVAMENTE toda vez que o HTMX carregar novo conteúdo.
//    Isso é o que resolve o seu problema de SPA.
document.body.addEventListener('htmx:load', function() {
    iniciarObservadoresDeAnimacao();
});




