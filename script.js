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