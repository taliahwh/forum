const validateRegisterInput = (
  username,
  email,
  password,
  confirm_password,
  first_name,
  last_name
) => {
  const errors = {};

  if (first_name.trim() === '') {
    errors.first_name = 'First name must not be empty';
  }

  if (last_name.trim() === '') {
    errors.last_name = 'Last name must not be empty';
  }

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  if (email.trim() === '') {
    errors.username = 'Username must not be empty.';
  } else {
    const validRegEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  //TODO: Password regEx validation
  if (password === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirm_password) {
    errors.confirm_password = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

const validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty.';
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty.';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

export { validateRegisterInput, validateLoginInput };
