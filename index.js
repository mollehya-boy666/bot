const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('./qrCode');

// استيراد الأوامر
const translateCommand = require('./commands/translate');
const textExtractCommand = require('./commands/textExtract');
const quranCommand = require('./commands/quran');
const convertVideoCommand = require('./commands/convertVideo');  // إضافة أمر التحويل

const client = new Client({
    authStrategy: new LocalAuth()  // استخدام الجلسة للحفاظ على الاتصال بين الجلسات
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
    if (command === '!tr') translateCommand(msg, args);  // أمر الترجمة
    else if (command === '!txt') textExtractCommand(msg);  // أمر استخراج النص
    else if (command === '!quran') quranCommand(msg, args);  // أمر القرآن
    else if (command === '!convert') convertVideoCommand(msg);  // إضافة أمر التحويل
});

client.initialize();
