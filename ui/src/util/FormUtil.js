import isEmail from 'isemail';

export const validateEmail = email => isEmail.validate(email);