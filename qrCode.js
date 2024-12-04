const qrcode = require('qrcode-terminal');

function generateQR(qr) {
    console.log('QR Code Source: ' + qr); // طباعة النص المصدر
    qrcode.generate(qr, { small: true }); // طباعة كود QR في الطرفية
}

module.exports = { generateQR };
