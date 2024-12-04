const translate = require('translate-google');

async function translateCommand(msg, args) {
    const targetLang = args[1];
    const textToTranslate = args.slice(2).join(' ');

    if (!targetLang || !textToTranslate) {
        msg.reply('Usage: !tr <target_language> <text>');
        return;
    }

    try {
        const translatedText = await translate(textToTranslate, { to: targetLang });
        msg.reply(translatedText);
    } catch (err) {
        msg.reply('Error during translation: ' + err.message);
    }
}

module.exports = translateCommand;
