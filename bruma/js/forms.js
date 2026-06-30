/* ============================================================
   forms.js — validación de email, submit falso, toast
   ============================================================ */
(function () {
  'use strict';

  var toast = document.getElementById('toast');
  var toastText = document.getElementById('toastText');
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 4200);
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isValidEmail(value) {
    return EMAIL_RE.test(String(value).trim());
  }

  var MESSAGES = {
    hero: '¡Gracias! Te escribiremos con el próximo origen.',
    taller: '¡Plaza solicitada! Te confirmamos la fecha por correo.',
    cta: '¡Hecho! Te avisamos de todo lo bueno.'
  };

  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var kind = form.getAttribute('data-form');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!input) return;

      if (!isValidEmail(input.value)) {
        input.classList.add('is-invalid');
        input.focus();
        showToast('Introduce un correo válido para continuar.');
        return;
      }

      input.classList.remove('is-invalid');
      input.value = '';
      input.blur();
      showToast(MESSAGES[kind] || '¡Gracias! Te escribiremos pronto.');
    });

    if (input) {
      input.addEventListener('input', function () {
        input.classList.remove('is-invalid');
      });
    }
  });

  // --- Botón hacerme socio ---
  document.querySelectorAll('[data-action="socio"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showToast('Club Bruma: te llevamos al alta de socio.');
    });
  });
})();
