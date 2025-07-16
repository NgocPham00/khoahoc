export function generateToken(length = 20) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * charactersLength))
    ).join('');
  }
  