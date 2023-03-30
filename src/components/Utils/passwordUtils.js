const PASSWORD_LENGTH = 16;
const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";

export const generatePassword = (existingPasswords) => {
  let password = "";
  let isUnique = false;

  while (!isUnique) {
    password = "";
    for (let i = 0; i < PASSWORD_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * CHARSET.length);
      password += CHARSET.charAt(randomIndex);
    }

    isUnique = !existingPasswords.some(
      (passwordEntry) => passwordEntry.password === password
    );
  }

  return password;
};
