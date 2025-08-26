/* ========================================================
   CÓDIGO DO MENU-BURGUER - VERSÃO FINAL COM ANIMAÇÕES
   (Funciona com HTMX)
   ======================================================== */

// Usamos 'document' como nosso "vigia" de eventos de clique
document.addEventListener('click', function(event) {
    
    // Encontra o menu e o ícone na página ATUALMENTE carregada
    const menu = document.getElementById('menu');
    const menuIcon = document.querySelector('.menu-icon');

    // Se não encontrar os elementos, não faz nada.
    if (!menu || !menuIcon) {
        return;
    }

    // AÇÃO 1: VERIFICA SE O CLIQUE FOI NO ÍCONE DO MENU
    if (menuIcon.contains(event.target)) {
        menu.classList.toggle('show');
        menuIcon.classList.toggle('active'); // NOVO: Anima o ícone para "X" e vice-versa
        return; // Para a execução aqui
    }

    // AÇÃO 2: VERIFICA SE O CLIQUE FOI EM UM LINK DENTRO DO MENU
    const clickedLink = event.target.closest('#menu a');
    if (clickedLink) {
        menu.classList.remove('show');
        menuIcon.classList.remove('active'); // NOVO: Garante que o ícone volte ao normal
        return; 
    }

    // AÇÃO 3: VERIFICA SE O CLIQUE FOI FORA DO MENU
    // Esta lógica só roda se o menu estiver aberto e não clicamos nele.
    if (menu.classList.contains('show') && !menu.contains(event.target)) {
        menu.classList.remove('show');
        menuIcon.classList.remove('active'); // NOVO: Garante que o ícone volte ao normal
    }
});




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
            { marca: 'RICHPEACE', modelo: 'RP-KNF1625', nome: 'Faca de Corte Oscilante', codigo: '10.101.001', img: '../img/imgProdutos/facas-1.png' },
            { marca: 'JUKI', modelo: 'JK-T1310', nome: 'Faca de Corte Digital', codigo: '10.101.002', img: '../img/imgProdutos/facas-2.png' },
            { marca: 'RICHPEACE', modelo: 'RP-KNF2030', nome: 'Faca Circular Automática', codigo: '10.101.003', img: '../img/imgProdutos/facas-3.png' },
            { marca: 'JUKI', modelo: 'JK-T1315', nome: 'Faca para Couro', codigo: '10.101.004', img: '../img/imgProdutos/facas-4.png' },
            { marca: 'EXTRA', modelo: 'EXT-005', nome: 'Faca Extra 5', codigo: '10.101.005', img: '../img/imgProdutos/facas-6.png' },
        ],
        'Lixas': [
            { marca: 'NORTON', modelo: 'A275', nome: 'Lixa de Grão Fino 220', codigo: '20.201.001', img: '../img/imgProdutos/Lixas-1.png' },
            { marca: '3M', modelo: 'Cubitron II', nome: 'Lixa de Grão Grosso 80', codigo: '20.201.002', img: '../img/imgProdutos/Lixas-2.png' },
        ],
        'Cerdas': [
            { marca: 'NORTON', modelo: 'A275', nome: 'Lixa de Grão Fino 220', codigo: '20.201.001', img: '../img/imgProdutos/Cerdas-grande.png' },
            { marca: '3M', modelo: 'Cubitron II', nome: 'Lixa de Grão Grosso 80', codigo: '20.201.002', img: '../img/imgProdutos/Cerdas-Pequena.png' },
        ],
        'Cartuchos': [
            { marca: 'NORTON', modelo: 'A275', nome: 'Lixa de Grão Fino 220', codigo: '20.201.001', img: '../img/imgProdutos/Cartuchos.png' },
        ],
        'Afiadores': [
            { marca: 'NORTON', modelo: 'A275', nome: 'Lixa de Grão Fino 220', codigo: '20.201.001', img: '../img/imgProdutos/Afiador-1.png' },
            { marca: 'NORTON', modelo: 'A275', nome: 'Lixa de Grão Fino 220', codigo: '20.201.001', img: '../img/imgProdutos/Afiador-2.png' },
            { marca: 'NORTON', modelo: 'A275', nome: 'Lixa de Grão Fino 220', codigo: '20.201.001', img: '../img/imgProdutos/Rebolos.png' },
            { marca: 'NORTON', modelo: 'A275', nome: 'Lixa de Grão Fino 220', codigo: '20.201.001', img: '../img/imgProdutos/Afiador-3.png' },
        ],
        'Coroas': [
            { marca: 'NORTON', modelo: 'A275', nome: 'Lixa de Grão Fino 220', codigo: '20.201.001', img: '../img/imgProdutos/Coroas.png' },
        ],
        'Teclados': [
            { marca: 'NORTON', modelo: 'A275', nome: 'Lixa de Grão Fino 220', codigo: '20.201.001', img: '../img/imgProdutos/Teclado-Lectra.png' },
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
    
    
    // --- Lógica para a Seção "Segmento" (AGORA PADRONIZADA) ---
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


// --- GATILHOS DE EXECUÇÃO ---

// 1. Executa a função no primeiro carregamento da página.
document.addEventListener('DOMContentLoaded', iniciarObservadoresDeAnimacao);

// 2. Executa a função NOVAMENTE toda vez que o HTMX carregar novo conteúdo.
//    Isso é o que resolve o seu problema de SPA.
document.body.addEventListener('htmx:load', function() {
    iniciarObservadoresDeAnimacao();
});




/* IMAGENS QUE FICAM PASSANDO DE FUNDO NA SECTION HOME */

// Espera a página carregar para executar o script// SEU JAVASCRIPT ATUALIZADO
// Variável global para guardar o ID do timer do slideshow.
// Isso é crucial para evitar timers duplicados ao navegar com HTMX.
let slideshowInterval = null;

/**
 * Função principal que busca e inicializa todos os componentes interativos da página.
 * Ela pode ser chamada a qualquer momento para re-scanear o DOM.
 */
function inicializarPagina() {
  console.log("Executando inicialização de componentes...");

  // --- INICIALIZADOR DO SLIDESHOW DE FUNDO ---
  const containerSlide = document.getElementById('Container-inicialHome');
  
  // Roda o código do slideshow apenas se o container existir na página atual
  if (containerSlide) {
    const slidesDeFundo = [ 
      { imagem: 'url("img/Maquina-Corte-automatico-WEB.png")', posicao: 'center center' },
      { imagem: 'url("img/Maquina-Corte-automatico-1-WEB.png")', posicao: 'center 80%' },
      { imagem: 'url("img/Maquina-Corte-automatico-3-WEB.png")', posicao: 'center center' },
      { imagem: 'url("img/Maquina-Corte-automatico-2-WEB.png")', posicao: 'center 55%' },
      { imagem: 'url("img/Produtos-Textil-de-fundo-Texport-WEB.png")', posicao: 'center center' }
    ];
    
    const camadasSlide = containerSlide.querySelectorAll('.fundo-slide');
    
    // Verifica se existem camadas de slide para manipular
    if (camadasSlide.length > 0) {
      // Aplica as imagens e posições em cada camada
      camadasSlide.forEach((camada, index) => {
        if (slidesDeFundo[index]) {
          camada.style.backgroundImage = slidesDeFundo[index].imagem;
          camada.style.backgroundPosition = slidesDeFundo[index].posicao;
        }
      });

      let imagemAtual = 0;
      const totalImagens = camadasSlide.length;

      function trocarImagem() {
        // Remove a classe 'visivel' de todas as camadas para garantir um estado limpo
        camadasSlide.forEach(camada => camada.classList.remove('visivel'));
        
        // Adiciona a classe 'visivel' apenas na camada do slide atual
        camadasSlide[imagemAtual].classList.add('visivel');
        
        // Prepara o índice da próxima imagem para a próxima chamada
        imagemAtual = (imagemAtual + 1) % totalImagens;
      }

      // **MUITO IMPORTANTE:** Limpa qualquer timer antigo antes de criar um novo.
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
      
      trocarImagem(); // Mostra a primeira imagem imediatamente
      slideshowInterval = setInterval(trocarImagem, 5000); // Inicia o novo timer (5 segundos)
    }
  }

  // --- INICIALIZADOR DO VÍDEO DE FUNDO ---
  const video = document.getElementById('video-background'); // Assumindo que seu vídeo tem este ID
  
  // Roda o código do vídeo apenas se o elemento de vídeo existir na página atual
  if (video) {
    // O navegador deve tocar o vídeo sozinho por causa dos atributos (autoplay, muted, etc).
    // Esta linha é uma garantia extra para tentar dar o "play" caso ele não tenha iniciado.
    video.play().catch(error => {
      // O console.log ajuda a debugar caso o navegador bloqueie o autoplay por algum motivo.
      console.warn("Aviso: O navegador impediu a tentativa de autoplay do vídeo.", error);
    });
  }
}

// --- EVENT LISTENERS ---

// 1. Roda a função quando a página é carregada pela primeira vez.
document.addEventListener('DOMContentLoaded', inicializarPagina);

// 2. Roda a função TODA VEZ que o HTMX terminar de inserir um novo conteúdo na página.
// Isso garante que os componentes da nova página sejam ativados.
document.body.addEventListener('htmx:afterSwap', inicializarPagina);



