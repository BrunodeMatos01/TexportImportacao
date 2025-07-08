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


  // Espera o documento HTML ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // DADOS DE EXEMPLO DOS PRODUTOS
  // Em um projeto real, isso viria de um banco de dados ou API.
  // Troque as 'url_da_imagem...' pelas URLs reais das suas imagens.
  // =============================================
  const produtosPorCategoria = {
      'Facas': [
          { nome: 'Faca de Corte Reto', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Reta' },
          { nome: 'Faca de Serra', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Serra' },
          { nome: 'Faca Circular', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Circular' },
          { nome: 'Faca de Precisão', img: 'https://placehold.co/300x300/c0a068/FFF?text=Faca+Precisão' },
          { nome: 'Lâmina Especial', img: 'https://placehold.co/300x300/c0a068/FFF?text=Lâmina' },
      ],
      'Lixas': [
          { nome: 'Lixa Grão Fino', img: 'https://placehold.co/300x300/a47e43/FFF?text=Lixa+Fina' },
          { nome: 'Lixa Grão Grosso', img: 'https://placehold.co/300x300/a47e43/FFF?text=Lixa+Grossa' },
          { nome: 'Lixa D\'água', img: 'https://placehold.co/300x300/a47e43/FFF?text=Lixa+Dágua' },
      ],
      'Cerdas': [
          { nome: 'Cerdas de Nylon', img: 'https://placehold.co/300x300/916c36/FFF?text=Cerdas+Nylon' },
          { nome: 'Cerdas de Aço', img: 'https://placehold.co/300x300/916c36/FFF?text=Cerdas+Aço' },
          { nome: 'Cerdas Naturais', img: 'https://placehold.co/300x300/916c36/FFF?text=Cerdas+Naturais' },
          { nome: 'Cerdas Mistas', img: 'https://placehold.co/300x300/916c36/FFF?text=Cerdas+Mistas' },
      ],
      'Cartuchos': [
          { nome: 'Cartucho de Tinta Preta', img: 'https://placehold.co/300x300/333/FFF?text=Tinta+Preta' },
          { nome: 'Cartucho Colorido', img: 'https://placehold.co/300x300/333/FFF?text=Tinta+Cor' },
      ],
      'Rebolos': [
          { nome: 'Rebolo Cônico', img: 'https://placehold.co/300x300/777/FFF?text=Rebolo+Cônico' },
          { nome: 'Rebolo Reto', img: 'https://placehold.co/300x300/777/FFF?text=Rebolo+Reto' },
          { nome: 'Disco de Desbaste', img: 'https://placehold.co/300x300/777/FFF?text=Desbaste' },
      ],
      'Kits': [
          { nome: 'Kit Iniciante', img: 'https://placehold.co/300x300/8c7e69/FFF?text=Kit+Iniciante' },
          { nome: 'Kit Profissional', img: 'https://placehold.co/300x300/8c7e69/FFF?text=Kit+Pro' },
          { nome: 'Kit Manutenção', img: 'https://placehold.co/300x300/8c7e69/FFF?text=Kit+Manutenção' },
      ]
  };

  // --- Referências aos Elementos do DOM ---
  const modal = document.getElementById('modalProdutos');
  const modalTitulo = document.getElementById('modalTitulo');
  const modalFecharBtn = document.getElementById('modalFecharBtn');
  const carrosselTrack = document.getElementById('carrosselTrack');
  const btnPrev = document.getElementById('carrosselBtnPrev');
  const btnNext = document.getElementById('carrosselBtnNext');
  const botoesAbrirModal = document.querySelectorAll('.btn-modal');

  // --- Variáveis de Estado do Carrossel ---
  let currentIndex = 0;
  let totalItems = 0;
  let itemsVisiveis = 4; // Ajuste este número se mudar no CSS

  // --- Funções ---

  // Preenche o modal com os dados da categoria clicada
  function popularModal(categoria) {
      const produtos = produtosPorCategoria[categoria] || [];
      totalItems = produtos.length;
      carrosselTrack.innerHTML = ''; // Limpa o carrossel antes de adicionar novos itens

      if (totalItems === 0) {
          carrosselTrack.innerHTML = '<p>Nenhum produto encontrado nesta categoria.</p>';
          return;
      }

      produtos.forEach(produto => {
          const itemHTML = `
              <div class="carrossel-item">
                  <img src="${produto.img}" alt="${produto.nome}">
                  <h3>${produto.nome}</h3>
              </div>
          `;
          carrosselTrack.insertAdjacentHTML('beforeend', itemHTML);
      });

      modalTitulo.textContent = `Tipos de ${categoria}`;
      resetarCarrossel();
  }
  
  // Move o trilho do carrossel
  function moverCarrossel() {
      const carrosselItem = carrosselTrack.querySelector('.carrossel-item');
      if (!carrosselItem) return;
      
      const itemWidth = carrosselItem.offsetWidth;
      const gap = 20; // O mesmo valor do 'gap' no CSS
      const totalMove = currentIndex * (itemWidth + gap);
      carrosselTrack.style.transform = `translateX(-${totalMove}px)`;
      
      atualizarBotoes();
  }

  // Mostra ou esconde os botões de navegação
  function atualizarBotoes() {
      // Lógica para esconder o botão "anterior" se estiver no início
      btnPrev.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
      
      // Lógica para esconder o botão "próximo" se os últimos itens já estiverem visíveis
      // Este cálculo pode precisar de ajuste se a responsividade mudar muito o número de itens visíveis
      btnNext.style.visibility = currentIndex >= totalItems - itemsVisiveis ? 'hidden' : 'visible';

      // Esconde ambos os botões se todos os itens couberem na tela
      if (totalItems <= itemsVisiveis) {
          btnPrev.style.visibility = 'hidden';
          btnNext.style.visibility = 'hidden';
      }
  }
  
  // Reseta a posição do carrossel para o início
  function resetarCarrossel() {
      currentIndex = 0;
      // Precisamos de um pequeno delay para o navegador calcular as novas dimensões
      setTimeout(() => {
          moverCarrossel();
      }, 10);
  }

  // --- Event Listeners (Ouvintes de Eventos) ---

  // Adiciona o evento de clique para cada botão de card
  botoesAbrirModal.forEach(botao => {
      botao.addEventListener('click', () => {
          const onclickAttr = botao.getAttribute('onclick');
          // Extrai o nome da categoria de dentro do 'onclick="abrirModal('Facas')"'
          const categoria = onclickAttr.match(/abrirModal\('([^']+)'\)/)[1];
          
          popularModal(categoria);
          modal.showModal(); // Método nativo que abre o <dialog>
      });
  });

  // Evento para fechar o modal
  modalFecharBtn.addEventListener('click', () => {
      modal.close(); // Método nativo que fecha o <dialog>
  });

  // Evento para o botão "Próximo"
  btnNext.addEventListener('click', () => {
      if (currentIndex < totalItems - itemsVisiveis) {
          currentIndex++;
          moverCarrossel();
      }
  });

  // Evento para o botão "Anterior"
  btnPrev.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          moverCarrossel();
      }
  });

  // Opcional: Fechar o modal se clicar fora dele (no ::backdrop)
  modal.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.close();
      }
  });
});