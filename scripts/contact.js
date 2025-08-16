export function validateForm({ name, email, message }) {
  if (!name || !email || !message) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('contact-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { name: form.name.value, email: form.email.value, message: form.message.value };
    if (!validateForm(data)) {
      status.textContent = 'Por favor completá todos los campos con un email válido.';
      return;
    }
    try {
      const resp = await fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (resp.ok) {
        status.textContent = 'Mensaje enviado!';
        form.reset();
      } else {
        throw new Error('fail');
      }
    } catch (err) {
      status.innerHTML = 'No se pudo enviar. <a href="mailto:matiasjosuepedros@gmail.com">Escribime por mail</a>.';
    }
  });
});
\nif (typeof module !== 'undefined') { module.exports = { validateForm }; }
