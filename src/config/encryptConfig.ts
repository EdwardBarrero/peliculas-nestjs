import * as bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync();

export function encryptPassword(password: string) {
  return bcrypt.hash(password, salt);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
