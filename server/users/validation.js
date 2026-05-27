export function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateRegisterInput(input) {
  const errors = {};

  if (!input?.name || input.name.trim().length < 2) {
    errors.name = 'O nome deve ter pelo menos 2 caracteres.';
  }

  if (!isValidEmail(input?.email || '')) {
    errors.email = 'Introduza um email valido.';
  }

  if (!input?.password || input.password.length < 8) {
    errors.password = 'A password deve ter pelo menos 8 caracteres.';
  }

  return errors;
}

export function validateLoginInput(input) {
  const errors = {};

  if (!isValidEmail(input?.email || '')) {
    errors.email = 'Introduza um email valido.';
  }

  if (!input?.password) {
    errors.password = 'A password e obrigatoria.';
  }

  return errors;
}

export function validateProfileInput(input) {
  const errors = {};

  if (input?.name !== undefined && input.name.trim().length < 2) {
    errors.name = 'O nome deve ter pelo menos 2 caracteres.';
  }

  if (input?.email !== undefined && !isValidEmail(input.email)) {
    errors.email = 'Introduza um email valido.';
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
