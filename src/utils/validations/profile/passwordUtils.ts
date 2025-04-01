// utils/passwordUtils.ts
export const isLongEnough = (password: string) => password.length >= 8;

export const containsNumberOrSymbol = (password: string) => /[\d\W]/.test(password);

export const doesNotContainEmailUsername = (password: string, email: string) => {
    const emailUsername = email.split("@")[0].toLowerCase();
    return !password.toLowerCase().includes(emailUsername);
};
