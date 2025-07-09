// Aguarda o conteúdo da página ser totalmente carregado para executar o script
document.addEventListener('DOMContentLoaded', function () {

    // 1. INICIALIZAÇÃO DO EMAILJS
    // Substitua 'SEU_USER_ID' pelo seu "Public Key" que você encontra no painel do EmailJS em Account.
    emailjs.init('tvprxa42kv6DuKqdj');
  
    // Seleciona o formulário pela sua classe
    const contactForm = document.querySelector('.contact-form');
  
    // Adiciona um "escutador" para o evento de 'submit' do formulário
    contactForm.addEventListener('submit', function (event) {
      // Previne o comportamento padrão do formulário (que seria recarregar a página)
      event.preventDefault();
  
      // 2. CAPTURA DOS DADOS DO FORMULÁRIO
      // Pega os valores dos campos do formulário pelos seus IDs
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      const mensagem = document.getElementById('mensagem').value; // Este valor será a 'descricao' no e-mail
  
      // 3. VALIDAÇÃO SIMPLES
      // Verifica se algum campo essencial está vazio
      if (!nome || !email || !telefone || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return; // Para a execução da função se a validação falhar
      }
  
      // 4. PREPARAÇÃO DOS PARÂMETROS PARA O E-MAIL
      // Cria um objeto com os dados que o seu template no EmailJS espera
      const templateParams = {
        nome: nome,
        gmail: email,
        telefone: telefone,
        descricao: mensagem
      };
  
      // Seleciona o botão de envio para dar feedback visual
      const submitButton = contactForm.querySelector('.btn-enviar');
      submitButton.disabled = true; // Desabilita o botão para evitar múltiplos envios
      submitButton.textContent = 'Enviando...'; // Muda o texto do botão
  
      // 5. ENVIO DO E-MAIL VIA EMAILJS
      // Substitua 'SEU_SERVICE_ID' e 'SEU_TEMPLATE_ID' pelos IDs do seu serviço e template no EmailJS
      emailjs.send('service_956840h', 'template_5e103md', templateParams)
        .then(function (response) {
          // Executa se o e-mail for enviado com SUCESSO
          console.log('SUCESSO!', response.status, response.text);
          alert('Mensagem enviada com sucesso!');
          contactForm.reset(); // Limpa os campos do formulário
          submitButton.disabled = false; // Habilita o botão novamente
          submitButton.textContent = 'Enviar Mensagem'; // Restaura o texto original do botão
        })
        .catch(function (error) {
          // Executa se ocorrer um ERRO no envio
          console.log('ERRO...', error);
          alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
          submitButton.disabled = false; // Habilita o botão novamente
          submitButton.textContent = 'Enviar Mensagem'; // Restaura o texto original do botão
        });
    });
  });