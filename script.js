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


  document.addEventListener('DOMContentLoaded', () => {

    const produtosPorCategoria = {
        'Facas': [{ nome: 'Faca de Corte Reto', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Reta' }, { nome: 'Faca de Serra', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Serra' }, { nome: 'Faca Circular', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Circular' }, { nome: 'Faca de Precisão', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Precisão' }, { nome: 'Lâmina Especial', img: 'https://placehold.co/300x300/c0a068/FFF?text=Lâmina' }, { nome: 'Faca de Corte Reto', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Reta' }, { nome: 'Faca de Corte Reto', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Reta' }, { nome: 'Faca de Corte Reto', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Reta' }, { nome: 'Faca de Corte Reto', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Reta' }, { nome: 'Faca de Corte Reto', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Reta' }, { nome: 'Faca de Corte Reto', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Reta' } ],
        'Lixas': [{ nome: 'Lixa Grão Fino', img: 'https://placehold.co/300x300/a47e43/FFF?text=Lixa+Fina' }, { nome: 'Lixa Grão Grosso', img: 'https://placehold.co/300x300/a47e43/FFF?text=Lixa+Grossa' }, { nome: 'Lixa D\'água', img: 'https://placehold.co/300x300/a47e43/FFF?text=Lixa+Dágua' }, ],
        'Cerdas': [{ nome: 'Cerdas de Nylon', img: 'https://placehold.co/300x300/916c36/FFF?text=Cerdas+Nylon' }, { nome: 'Cerdas de Aço', img: 'https://placehold.co/300x300/916c36/FFF?text=Cerdas+Aço' }, { nome: 'Cerdas Naturais', img: 'https://placehold.co/300x300/916c36/FFF?text=Cerdas+Naturais' }, { nome: 'Cerdas Mistas', img: 'https://placehold.co/300x300/916c36/FFF?text=Cerdas+Mistas' }, ],
        'Cartuchos': [{ nome: 'Cartucho de Tinta Preta', img: 'https://placehold.co/300x300/333/FFF?text=Tinta+Preta' }, { nome: 'Cartucho Colorido', img: 'https://placehold.co/300x300/333/FFF?text=Tinta+Cor' }, ],
        'Rebolos': [{ nome: 'Rebolo Cônico', img: 'https://placehold.co/300x300/777/FFF?text=Rebolo+Cônico' }, { nome: 'Rebolo Reto', img: 'https://placehold.co/300x300/777/FFF?text=Rebolo+Reto' }, { nome: 'Disco de Desbaste', img: 'https://placehold.co/300x300/777/FFF?text=Desbaste' }, ],
        'Kits': [{ nome: 'Kit Iniciante', img: 'https://placehold.co/300x300/8c7e69/FFF?text=Kit+Iniciante' }, { nome: 'Kit Profissional', img: 'https://placehold.co/300x300/8c7e69/FFF?text=Kit+Pro' }, { nome: 'Kit Manutenção', img: 'https://placehold.co/300x300/8c7e69/FFF?text=Kit+Manutenção' }, ]
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
    let itemsVisiveis = 4; // Lembre-se de ajustar se o CSS mudar

    function popularModal(categoria) {
        const produtos = produtosPorCategoria[categoria] || [];
        totalItems = produtos.length;
        carrosselTrack.innerHTML = '';
        
        // Centraliza o track se houver menos itens que o espaço visível
        carrosselTrack.style.justifyContent = totalItems < itemsVisiveis ? 'center' : 'flex-start';

        produtos.forEach(produto => {
            const itemHTML = `<div class="carrossel-item"><img src="${produto.img}" alt="${produto.nome}"><h3>${produto.nome}</h3></div>`;
            carrosselTrack.insertAdjacentHTML('beforeend', itemHTML);
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
        criarPaginacao(); // Recria a paginação para atualizar o estado ativo
    }

    function atualizarBotoes() {
        btnPrev.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        const maxIndex = totalItems - itemsVisiveis;
        btnNext.style.visibility = currentIndex >= maxIndex ? 'hidden' : 'visible';
        
        if (totalItems <= itemsVisiveis) {
            btnPrev.style.visibility = 'hidden';
            btnNext.style.visibility = 'hidden';
        }
    }
    
    function criarPaginacao() {
        if (!paginacaoContainer) return;
        paginacaoContainer.innerHTML = '';

        const maxIndex = totalItems - itemsVisiveis;
        if (maxIndex < 1) return; // Não cria bolinhas se não houver rolagem

        // Cria uma bolinha para cada posição possível de início
        for (let i = 0; i <= maxIndex; i++) {
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
        setTimeout(moverCarrossel, 50);
    }

    // --- Event Listeners ---
    botoesAbrirModal.forEach(botao => {
        botao.addEventListener('click', () => {
            const onclickAttr = botao.getAttribute('onclick');
            const categoria = onclickAttr.match(/abrirModal\('([^']+)'\)/)[1];
            popularModal(categoria);
            modal.showModal();
        });
    });

    modalFecharBtn.addEventListener('click', () => modal.close());

    btnNext.addEventListener('click', () => {
        const maxIndex = totalItems - itemsVisiveis;
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
});