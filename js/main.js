/*Para funcionar o menu-burguer que é a navegação de calular*/
const menu = document.getElementById('menu');
  const menuIcon = document.querySelector('.menu-icon');

  function toggleMenu() {
    menu.classList.toggle('show');
  }

  // Fecha o menu ao clicar fora
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnIcon = menuIcon.contains(event.target);

    // Se clicar fora do menu e fora do ícone
    if (!isClickInsideMenu && !isClickOnIcon) {
      menu.classList.remove('show');
    }
  });

  // Fecha o menu ao clicar em um link
  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('show');
    });
  });
/*========================================================*/





/*Para o botão de veja produtos direcionar para produtos*/
  function scrollToProdutos() {
    document.querySelector('#telaProdutos').scrollIntoView({
      behavior: 'smooth'
    });
  }
/*========================================================*/





/*Carrosel de Produtos*/
document.addEventListener('DOMContentLoaded', () => {
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

    let currentIndex = 0;
    let totalItems = 0;
    let itemsVisiveis = 4; // Valor padrão

    function atualizarItemsVisiveis() {
        const larguraTela = window.innerWidth;
        if (larguraTela <= 600) {
            itemsVisiveis = 1;
        } else if (larguraTela <= 900) {
            itemsVisiveis = 2;
        } else if (larguraTela <= 1200) {
            itemsVisiveis = 3;
        } else {
            itemsVisiveis = 4;
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

        // ===== NOVO: Impede o comportamento padrão de arrastar imagens =====
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
        
        carrosselTrack.style.transform = `translateX(-${totalMove}px)`;
        atualizarBotoes();
        criarPaginacao();
    }

    function atualizarBotoes() {
        const maxIndex = Math.max(0, totalItems - itemsVisiveis);
        btnPrev.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        btnNext.style.visibility = currentIndex >= maxIndex ? 'hidden' : 'visible';
        if (totalItems <= itemsVisiveis) {
            btnPrev.style.visibility = 'hidden';
            btnNext.style.visibility = 'hidden';
        }
    }
    
    function criarPaginacao() {
        if (!paginacaoContainer) return;
        paginacaoContainer.innerHTML = '';
        
        const numeroDeParadas = Math.max(0, totalItems - itemsVisiveis) + 1;
        
        if (numeroDeParadas <= 1) return;

        for (let i = 0; i < numeroDeParadas; i++) {
            const dot = document.createElement('button');
            dot.classList.add('paginacao-dot');
            if (i === currentIndex) {
                dot.classList.add('_active');
            }
            dot.addEventListener('click', () => {
                currentIndex = i;
                moverCarrossel();
            });
            paginacaoContainer.appendChild(dot);
        }
    }

    function resetarCarrossel() {
        currentIndex = 0;
        setTimeout(moverCarrossel, 100);
    }

    botoesAbrirModal.forEach(botao => {
        botao.addEventListener('click', () => {
            popularModal(botao.getAttribute('data-categoria'));
        });
    });

    document.querySelectorAll('.btn-modal').forEach(button => {
        button.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria');
            popularModal(categoria);
            modal.showModal();
        });
    });

    modalFecharBtn.addEventListener('click', () => modal.close());

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

    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.close();
    });

    window.addEventListener('resize', () => {
        if (modal.hasAttribute('open')) {
            atualizarItemsVisiveis();
            moverCarrossel();
        }
    });

    // ==============================================================
    // ===== NOVO: LÓGICA DE ARRASTAR (SWIPE) PARA O CARROSSEL =====
    // ==============================================================
    let isDragging = false;
    let startX;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    function dragStart(event) {
        if (totalItems <= itemsVisiveis) return; // Não arrasta se não houver para onde
        isDragging = true;
        // Pega a posição inicial do clique/toque
        startX = event.type.startsWith('touch') ? event.touches[0].clientX : event.pageX;
        // Pega a posição atual do carrossel para continuar o movimento a partir dela
        const transformMatrix = window.getComputedStyle(carrosselTrack).getPropertyValue('transform');
        if (transformMatrix !== 'none') {
            prevTranslate = parseInt(transformMatrix.split(',')[4]);
        } else {
            prevTranslate = 0;
        }
        // Desativa a transição suave durante o arraste para um movimento instantâneo
        carrosselTrack.style.transition = 'none';
        // Usa a animação para um movimento mais fluido
        animationID = requestAnimationFrame(animation);
        carrosselTrack.style.cursor = 'grabbing';
    }

    function dragMove(event) {
        if (isDragging) {
            // Calcula a distância que o dedo/mouse moveu
            const currentPosition = event.type.startsWith('touch') ? event.touches[0].clientX : event.pageX;
            const moveX = currentPosition - startX;
            currentTranslate = prevTranslate + moveX;
        }
    }
    
    function animation() {
        if (isDragging) {
             carrosselTrack.style.transform = `translateX(${currentTranslate}px)`;
             requestAnimationFrame(animation);
        }
    }

    function dragEnd(event) {
        if (!isDragging) return;
        
        isDragging = false;
        cancelAnimationFrame(animationID);
        // Ativa a transição suave novamente para o "snap"
        carrosselTrack.style.transition = 'transform 0.5s ease-out';
        carrosselTrack.style.cursor = 'grab';

        // Calcula o quanto foi arrastado desde o início
        const movedBy = currentTranslate - prevTranslate;
        const maxIndex = Math.max(0, totalItems - itemsVisiveis);

        // Define um "limite" de arraste para mudar de slide (ex: 50 pixels)
        const dragThreshold = 50;

        // Se arrastou para a esquerda o suficiente e não está no final, avança
        if (movedBy < -dragThreshold && currentIndex < maxIndex) {
            currentIndex++;
        }
        // Se arrastou para a direita o suficiente e não está no início, volta
        if (movedBy > dragThreshold && currentIndex > 0) {
            currentIndex--;
        }

        // Chama sua função original para mover o carrossel para a posição correta
        moverCarrossel();
    }

    // Adiciona os listeners para mouse e toque no "track" do carrossel
    carrosselTrack.addEventListener('mousedown', dragStart);
    carrosselTrack.addEventListener('touchstart', dragStart, { passive: true });

    carrosselTrack.addEventListener('mousemove', dragMove);
    carrosselTrack.addEventListener('touchmove', dragMove, { passive: true });

    document.addEventListener('mouseup', dragEnd); // Usar document para 'mouseup'
    carrosselTrack.addEventListener('mouseleave', dragEnd);
    carrosselTrack.addEventListener('touchend', dragEnd);
});