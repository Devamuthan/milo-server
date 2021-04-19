const crypto = require('crypto-js')

class Crypto{
    constructor (key) {
        this.key = key
    }
    encrypt(data){
        let ciphertext = crypto.AES.encrypt(data, this.key).toString();

        return ciphertext
    }
    decrypt(data){
        let bytes  = crypto.AES.decrypt(data, this.key);
        let originalText = bytes.toString(crypto.enc.Utf8);

        return originalText
    }
}

module.exports = Crypto