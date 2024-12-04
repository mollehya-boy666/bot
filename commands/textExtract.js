const Tesseract = require('tesseract.js');
const fs = require('fs');

async function textExtractCommand(msg) {
    if (!msg.hasMedia) {
        msg.reply('Please send an image with the command "!txt".');
        return;
    }

    const media = await msg.downloadMedia();
    if (media) {
        const buffer = Buffer.from(media.data, 'base64');
        const imagePath = './temp_image.png';

        // حفظ الصورة مؤقتًا
        fs.writeFileSync(imagePath, buffer);

        // استخراج النص
        Tesseract.recognize(imagePath, 'eng')
            .then(({ data: { text } }) => {
                msg.reply('Extracted Text:\n' + text);
                fs.unlinkSync(imagePath); // حذف الصورة المؤقتة
            })
            .catch(err => {
                msg.reply('Error extracting text: ' + err.message);
                fs.unlinkSync(imagePath);
            });
    }
}

module.exports = textExtractCommand;
