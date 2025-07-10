document.addEventListener('DOMContentLoaded', function () {

    emailjs.init('tvprxa42kv6DuKqdj');
  

    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // 2. CAPTURA DOS DADOS DO FORMULÁRIO
      // Pega os valores dos campos do formulário pelos seus IDs
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      const mensagem = document.getElementById('mensagem').value; 
  
      if (!nome || !email || !telefone || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
  

      const templateParams = {
        nome: nome,
        gmail: email,
        telefone: telefone,
        descricao: mensagem
      };
  
      const submitButton = contactForm.querySelector('.btn-enviar');
      submitButton.disabled = true; 
      submitButton.textContent = 'Enviando...'; 

      emailjs.send('service_956840h', 'template_5e103md', templateParams)
        .then(function (response) {
          console.log('SUCESSO!', response.status, response.text);
          alert('Mensagem enviada com sucesso!');
          contactForm.reset(); 
          submitButton.disabled = false; 
          submitButton.textContent = 'Enviar Mensagem'; 
        })
        .catch(function (error) {
          console.log('ERRO...', error);
          alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
          submitButton.disabled = false; 
          submitButton.textContent = 'Enviar Mensagem'; 
        });
    });
  });