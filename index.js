const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('./qrCode');

// استيراد الأوامر
const translateCommand = require('./commands/translate');
const textExtractCommand = require('./commands/textExtract');
const quranCommand = require('./commands/quran');

const client = new Client({
    authStrategy: new LocalAuth()
});

// عرض كود QR
client.on('qr', (qr) => {
    qrcode.generateQR(qr);
});

client.on('ready', () => {
    console.log('WhatsApp Bot is ready!');
});

// التعامل مع الرسائل
client.on('message', async (msg) => {
    const args = msg.body.split(' ');
    const command = args[0].toLowerCase();

    // التعامل مع الأوامر بناءً على النوع
    if (command === '!tr') translateCommand(msg, args);
    else if (command === '!txt') textExtractCommand(msg);
    else if (command === '!quran') quranCommand(msg, args);
});

client.initialize();
