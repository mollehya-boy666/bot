const fs = require('fs');
const path = require('path');

function quranCommand(msg, args) {
    const quranFolder = './Quran';
    const readerArg = args[1];
    const surahArg = args[2];
    const option = args[3];

    if (!fs.existsSync(quranFolder)) {
        msg.reply('Quran folder not found.');
        return;
    }

    const readers = fs.readdirSync(quranFolder).filter(file => file.endsWith('.json'));
    const readerList = readers.map(reader => path.basename(reader, '.json'));

    if (readerArg === 'list') {
        msg.reply('Available Readers:\n' + readerList.join('\n'));
        return;
    }

    const readerIndex = isNaN(readerArg) ? readerList.indexOf(readerArg) : parseInt(readerArg) - 1;
    if (readerIndex < 0 || readerIndex >= readers.length) {
        msg.reply('Invalid reader. Use !quran list to see available readers.');
        return;
    }

    const readerFile = path.join(quranFolder, readers[readerIndex]);
    const readerData = JSON.parse(fs.readFileSync(readerFile, 'utf-8'));

    if (surahArg === 'list') {
        const surahList = Object.keys(readerData).map((surah, index) => `${index + 1}. ${surah}`);
        msg.reply('Available Surahs:\n' + surahList.join('\n'));
    } else {
        const surahIndex = isNaN(surahArg) ? Object.keys(readerData).indexOf(surahArg) : parseInt(surahArg) - 1;
        const surahName = Object.keys(readerData)[surahIndex];

        if (surahIndex < 0 || surahIndex >= Object.keys(readerData).length) {
            msg.reply('Invalid surah. Use !quran <reader> list to see available surahs.');
            return;
        }

        const surahUrl = readerData[surahName];
        msg.reply(`Playing ${surahName}:\n${surahUrl}`);
    }
}

module.exports = quranCommand;
