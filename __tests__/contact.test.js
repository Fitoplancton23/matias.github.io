const { validateForm } = require('../scripts/contact.js');

test('valida formulario correctamente', () => {
  expect(validateForm({ name: '', email: '', message: '' })).toBe(false);
  expect(validateForm({ name: 'A', email: 'correo', message: 'hola' })).toBe(false);
  expect(validateForm({ name: 'A', email: 'a@b.com', message: 'hola' })).toBe(true);
});
