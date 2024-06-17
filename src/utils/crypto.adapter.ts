import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_CRYP_SECRET;

export const cryptoAdapter = {
  encrypt: (data: string) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  },
  decrypt: (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
};
