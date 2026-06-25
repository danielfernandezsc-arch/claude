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

  // --- Formularios de suscripción ---
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var input = form.querySelector('input[type="email"]');

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
      showToast('¡Revisa tu inbox para confirmar!');
    });

    if (input) {
      input.addEventListener('input', function () {
        input.classList.remove('is-invalid');
      });
    }
  });

  // --- Botón Gran Maestro (pro) ---
  document.querySelectorAll('[data-action="pro"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showToast('Plan Gran Maestro: te llevamos al pago seguro.');
    });
  });
})();
