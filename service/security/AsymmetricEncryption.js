const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Generate key pair
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

// Save private key to file
fs.writeFileSync('./private_key.pem', privateKey);

// Save public key to file
fs.writeFileSync('./public_key.pem', publicKey);

console.log('Keys generated successfully.');

