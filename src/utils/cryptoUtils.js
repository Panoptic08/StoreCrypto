// src/utils/cryptoUtils.js

import nacl from "tweetnacl";
import { encodeBase64, decodeBase64 } from "tweetnacl-util"; // Optional: for encoding/decoding

// Example function to generate a key pair
export const generateKeyPair = () => {
  const keyPair = nacl.box.keyPair();
  return {
    publicKey: encodeBase64(keyPair.publicKey),
    secretKey: encodeBase64(keyPair.secretKey),
  };
};

// Example function to encrypt a message
export const encryptMessage = (message, publicKey, secretKey) => {
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const messageUint8 = new TextEncoder().encode(message);
  const publicKeyUint8 = decodeBase64(publicKey);
  const secretKeyUint8 = decodeBase64(secretKey);
  const encrypted = nacl.box(messageUint8, nonce, publicKeyUint8, secretKeyUint8);
  
  return {
    nonce: encodeBase64(nonce),
    encryptedMessage: encodeBase64(encrypted),
  };
};

// Example function to decrypt a message
export const decryptMessage = (encryptedMessage, nonce, publicKey, secretKey) => {
  const encryptedMessageUint8 = decodeBase64(encryptedMessage);
  const nonceUint8 = decodeBase64(nonce);
  const publicKeyUint8 = decodeBase64(publicKey);
  const secretKeyUint8 = decodeBase64(secretKey);
  const decrypted = nacl.box.open(encryptedMessageUint8, nonceUint8, publicKeyUint8, secretKeyUint8);
  
  return decrypted ? new TextDecoder().decode(decrypted) : null;
};
