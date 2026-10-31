/* ============================================
   DTN – Data North · Main JS
   Nav toggle · scroll reveal · form→WhatsApp · footer year
   ============================================ */

(function () {
  'use strict';
  document.documentElement.classList.add('js');

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

  /* ── 3. Form → WhatsApp (todas as forms da página) ── */
  document.querySelectorAll('.contact-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nome      = (data.get('nome')      || '').toString().trim();
      var empresa   = (data.get('empresa')   || '').toString().trim();
      var email     = (data.get('email')     || '').toString().trim();
      var whatsapp  = (data.get('whatsapp')  || '').toString().trim();
      var interesse = (data.get('interesse') || '').toString().trim();
      var mensagem  = (data.get('mensagem')  || '').toString().trim();

      var nomeInput = form.querySelector('[name="nome"]');
      if (nomeInput && !nome) { nomeInput.focus(); return; }
      if (!nomeInput && !email) {
        var emailInput = form.querySelector('[name="email"]');
        if (emailInput) emailInput.focus();
        return;
      }

      var lines = [nome ? 'Olá! Meu nome é ' + nome + '.' : 'Olá! Quero receber o material gratuito.'];
      if (empresa)   lines.push('Empresa: ' + empresa);
      if (email)     lines.push('E-mail: ' + email);
      if (whatsapp)  lines.push('WhatsApp: ' + whatsapp);
      if (interesse) lines.push('Interesse: ' + interesse);
      if (mensagem)  lines.push('', 'Mensagem: ' + mensagem);

      var text = encodeURIComponent(lines.join('\n'));
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
  });

  /* ── 3b. Ementa: abrir/fechar todos os módulos ── */
  var sylToggle = document.querySelector('.syllabus-toggle');
  if (sylToggle) {
    sylToggle.addEventListener('click', function () {
      var mods = document.querySelectorAll('.syllabus .module');
      var anyClosed = Array.prototype.some.call(mods, function (m) { return !m.open; });
      mods.forEach(function (m) { m.open = anyClosed; });
      sylToggle.textContent = anyClosed ? 'Recolher todos' : 'Expandir todos';
      sylToggle.setAttribute('aria-expanded', String(anyClosed));
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
