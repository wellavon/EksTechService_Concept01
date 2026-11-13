/* =========================================================
   Concept 01 — «Индустриальный цех»
   Мобильное меню + валидация демо-формы
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.textContent = open ? '✕' : '☰';
    });

    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.textContent = '☰';
      });
    });
  }

  /* ---------- Demo form validation ---------- */
  const form = document.getElementById('leadForm');
  const msg = document.getElementById('formMsg');
  if (!form) return;

  const fields = {
    name: document.getElementById('f-name'),
    phone: document.getElementById('f-phone'),
    service: document.getElementById('f-service')
  };

  function setInvalid(key, bad) {
    const el = fields[key];
    if (el) el.classList.toggle('invalid', bad);
  }

  function validate() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const digits = phone.replace(/\D/g, '');

    const nameBad = name.length < 2;
    const phoneBad =
      !(digits.length >= 10 && digits.length <= 11) ||
      !/^[+\d\s()-]+$/.test(phone);
    const serviceBad = !service;

    setInvalid('name', nameBad);
    setInvalid('phone', phoneBad);
    setInvalid('service', serviceBad);

    return !nameBad && !phoneBad && !serviceBad;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (msg) {
      msg.classList.remove('ok');
      msg.textContent = '';
    }
    if (!validate()) return;

    if (msg) {
      msg.textContent = 'Заявка отправлена (демо). Свяжемся в рабочее время.';
      msg.classList.add('ok');
    }
    form.reset();
  });

  // Сброс состояния ошибки при вводе
  ['name', 'phone', 'service'].forEach((key) => {
    const input = document.getElementById(key);
    if (!input) return;
    input.addEventListener('input', () => setInvalid(key, false));
    input.addEventListener('change', () => setInvalid(key, false));
  });
})();