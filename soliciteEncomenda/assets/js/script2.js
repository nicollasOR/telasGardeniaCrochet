document.addEventListener('DOMContentLoaded', () => {
  const selecionarPagamento = document.getElementById('selecionar-Tipo-Trabalho'); // container (deve existir)
  const checkbox = document.getElementById('mostrarTipoPagamento'); //* Conferir depois se continua com ele (checkbox opcional)
  const toggle = document.getElementById('selecionarTrabalho-menu'); // área clicável
  const opcoes = document.getElementById('opcoes'); // UL (irmã do checkbox)
  const pagamentoSelecionado = document.getElementById('trabalhoSelecionado');
  const radios = document.querySelectorAll('.opcao input[type="radio"]');
  //? const que seria das selecoes do droptables

  const referenciaSelecionado = document.querySelector('.referencia');
  const fioConduzidoSelecionado = document.querySelector('.fio-conduzido');

  //! Divs que seriam do droptable, ou seja, 
  //! começam em display none até que seja selecionada alguma


    const fioConduzidoOPT = document.getElementById('opt-fio-conduzido');
    const referenciaOpt = document.getElementById('opt-referencia');

    const optPequeno = document.getElementById('opt-Pequeno');
    const optMedio = document.getElementById('opt-Medio');
    const optGrande = document.getElementById('opt-Grande');

  

  if (selecionarPagamento && !selecionarPagamento.classList.contains('dropdown')) {
    selecionarPagamento.classList.add('dropdown');
  }

  const textoInicial = 'Não selecionado';

  function estaAberto(open) {
    if (!selecionarPagamento) return;
    if (open) {
      selecionarPagamento.classList.add('open');
      if (checkbox) checkbox.checked = true;
      toggle.setAttribute('aria-expanded', 'true');
      const checked = document.querySelector('.opcao input:checked') || radios[0];
      if (checked) checked.focus();
    } else {
      selecionarPagamento.classList.remove('open');
      if (checkbox) checkbox.checked = false;
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  // atualiza visibilidade das 3 divs com base no radio selecionado
  function atualizarSelecao() {
    const fioConduzidoOPT = document.getElementById('opt-fio-conduzido');
    const referenciaOpt = document.getElementById('opt-referencia');


    if (fioConduzidoOPT) fioConduzidoOPT.style.display = 'none';
    if (referenciaOpt) referenciaOpt.style.display = 'none';

    if (fioConduzidoOPT && fioConduzidoOPT.checked) {
      if (fioConduzidoOPT) fioConduzidoOPT.style.display = 'flex';
      if (referenciaOpt) referenciaOpt.style.display = 'none';
    } 
    else if (referenciaOpt && referenciaOpt.checked) 
    {
      if (referenciaOpt) referenciaOpt.style.display = 'flex';
      if (fioConduzidoOPT) fioConduzidoOPT.style.display = 'none';
    }
  }

  function trocarCorSelecionado(opcaoLi) {
    const todas = document.querySelectorAll('.opcao');
    todas.forEach(li => {
      const lbl = li.querySelector('label, .texto-complementar1');
      if (lbl) lbl.style.color = '';
      const img = li.querySelector('.img-svg');
      if (img) {
        img.style.filter = '';
        img.style.pointerEvents = '';
      }
    });
  }

  function limparSelecao() {
    radios.forEach(radio => { radio.checked = false; });
    pagamentoSelecionado.textContent = textoInicial;
    pagamentoSelecionado.style.color = 'var(--marrom)'; //cor basica 👌 //! Atencao
    trocarCorSelecionado(null);
    atualizarSelecao(); // Chamando para esconder todas as divs
  }

  if (!selecionarPagamento || !toggle || !opcoes || !pagamentoSelecionado) {
    // console.error('Dropdown: elemento(s) faltando. IDs esperados: selecionar-Tipo-Pagamento, selecionarPagamento-menu, opcoes, pagamentoSelecionado.');
    return 'Dropdown: elemento(s) faltando. IDs esperados: selecionar-Tipo-Pagamento, selecionarPagamento-menu, opcoes, pagamentoSelecionado.';
  }

  estaAberto(false);
  pagamentoSelecionado.textContent = textoInicial;
  atualizarSelecao(); // voltamos ao estado inicial

  // Aplica efeito visual de focus e desativa pointer events na imagem enquanto focado
  function aplicarEstiloFocus(li) {
    const label = li.querySelector('label, .texto-subtitulo');
    const img = li.querySelector('.img-svg');

    if (label) label.style.color = 'var(--cinza-claro-azulado)';
    if (img) {
      img.style.filter = 'brightness(0) invert(1)';
      img.style.pointerEvents = 'none';
    }
  }

  function removerEstiloFocus(li) {
    const label = li.querySelector('label, .texto-subtitulo');
    const img = li.querySelector('.img-svg');

    if (label) label.style.color = '';
    if (img) {
      img.style.filter = '';
      img.style.pointerEvents = '';
    }
  }


  
  // ============================================================
  //?                     EVENTOS DO DROPTABLE
  // ============================================================


  toggle.addEventListener('click', (variavelAmbiente) => {
    variavelAmbiente.stopPropagation(); // evitar que o clique feche o dropdown imediatamente
    const isOpen = selecionarPagamento.classList.contains('open');
    if (isOpen) {
      limparSelecao();
      estaAberto(false);
    } else {
      estaAberto(true);
    }
  });


  opcoes.addEventListener('click', (variavelAmbiente) => {
    variavelAmbiente.stopPropagation();
  });

  // teclado: Enter/Space abre/fecha; se fechar via toggle, limpa
  toggle.addEventListener('keydown', (variavelAmbiente) => {
    if (variavelAmbiente.key === 'Enter' || variavelAmbiente.key === ' ') {
      variavelAmbiente.preventDefault();
      const isOpen = selecionarPagamento.classList.contains('open');
      if (isOpen) {
        limparSelecao();
        estaAberto(false);
      } else {
        estaAberto(true);
      }
    } else if (variavelAmbiente.key === 'Escape') {
      estaAberto(false);
    }
  });

  // quando muda o radio, atualiza o texto e as divs (sem fechar o droptable)
  radios.forEach(radio => {
    const li = radio.closest('.opcao');

    radio.addEventListener('change', () => {
      const label = radio.dataset.label || radio.value || radio.nextElementSibling?.textContent?.trim();
      if (label) {
        pagamentoSelecionado.textContent = label;
      }
      if(label == `Fio conduzido`)
      {
        fioConduzidoSelecionado.style.display = `grid`;
        referenciaSelecionado.style.display = `none`;
      }
      atualizarSelecao();
    });

    if (li) {
      li.addEventListener('focusin', () => {
        li.classList.add('focus');
        aplicarEstiloFocus(li);
      });

      li.addEventListener('focusout', () => {
        li.classList.remove('focus');
        removerEstiloFocus(li);
      });
    }
  });

  // === Garantir via JS que clicar na imagem .img-svg NÃO altera nada ===
  //! PEDIR AJUDA DA KESSIA (TA DANDO BO)
  const imagens = document.querySelectorAll('.img-svg');
  imagens.forEach(img => {
    img.tabIndex = -1; // não focável por teclado
    ['pointerdown', 'mousedown', 'touchstart', 'click'].forEach(evtName => {
      img.addEventListener(evtName, (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
      }, { capture: true, passive: false });
    });
  });


  // fechar ao clicar fora: se o clique NÃO estiver dentro do container e nem dentro do UL #opcoes
  document.addEventListener('click', () => {
    // quando clicar fora, apenas fechar (não limpar)
    if (selecionarPagamento.classList.contains('open')) {
      estaAberto(false);
    }
  });

  // ESC global: fecha sem limpar
  // bagulho besta inclusive.
  document.addEventListener('keydown', (tecla) => {
    if ((tecla.key === 'Escape' || tecla.key === 'Esc') && selecionarPagamento.classList.contains('open')) {
      estaAberto(false);
    }
  });
});

//Ultimo dia atualizado: 20/11 - 00:00 