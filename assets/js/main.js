/* ============================================
   DTN – Data North · Main JS
   Nav toggle · scroll reveal · form→WhatsApp · footer year
   ============================================ */

(function () {
  'use strict';

  /* ── 1. Nav toggle (mobile) ────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    // Close on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }

  /* ── 2. Scroll reveal ──────────────────── */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── 3. Form → WhatsApp ─────────────────── */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nome      = (data.get('nome')      || '').toString().trim();
      var empresa   = (data.get('empresa')   || '').toString().trim();
      var email     = (data.get('email')     || '').toString().trim();
      var whatsapp  = (data.get('whatsapp')  || '').toString().trim();
      var interesse = (data.get('interesse') || '').toString().trim();
      var mensagem  = (data.get('mensagem')  || '').toString().trim();

      if (!nome) {
        var nomeInput = form.querySelector('[name="nome"]');
        if (nomeInput) nomeInput.focus();
        return;
      }

      var lines = ['Olá! Meu nome é ' + nome + '.'];
      if (empresa)   lines.push('Empresa: ' + empresa);
      if (email)     lines.push('E-mail: ' + email);
      if (whatsapp)  lines.push('WhatsApp: ' + whatsapp);
      if (interesse) lines.push('Interesse: ' + interesse);
      if (mensagem)  lines.push('', 'Mensagem: ' + mensagem);

      var text = lines.join('%0A');
      var number = form.dataset.wa || '5511947350715';
      window.open('https://wa.me/' + number + '?text=' + text, '_blank');

      var btn = form.querySelector('.form-submit');
      if (btn) {
        var original = btn.textContent;
        btn.textContent = '✓ Abrindo WhatsApp…';
        btn.disabled = true;
        setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 2500);
      }
    });
  }

  /* ── 4. Footer year ─────────────────────── */
  var yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── 5. Active nav link highlight ───────── */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

})();
