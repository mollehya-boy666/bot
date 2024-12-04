const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const { MessageMedia } = require('whatsapp-web.js');

async function convertVideoCommand(msg) {
    if (!msg.hasMedia) {
        msg.reply('Please send a video with the command "!convert".');
        return;
    }

    try {
        // تنزيل الوسائط
        const media = await msg.downloadMedia();
        if (!media || !media.mimetype) {
            msg.reply('Failed to download the media. Please try again.');
            return;
        }

        if (media.mimetype.startsWith('video/')) {
            const videoBuffer = Buffer.from(media.data, 'base64');
            const videoPath = './temp_video.mp4';
            const audioPath = './output_audio.mp3';

            // حفظ الفيديو مؤقتًا
            fs.writeFileSync(videoPath, videoBuffer);

            // تحويل الفيديو إلى صوت
            ffmpeg(videoPath)
                .output(audioPath)
                .on('end', async () => {
                    console.log('Audio conversion completed.');
                    const audioBase64 = fs.readFileSync(audioPath, { encoding: 'base64' });

                    // إرسال ملف الصوت إلى المستخدم
                    msg.reply('Conversion completed. Sending audio...');
                    msg.reply(new MessageMedia('audio/mp3', audioBase64, 'output_audio.mp3'));

                    // حذف الملفات المؤقتة
                    fs.unlinkSync(videoPath);
                    fs.unlinkSync(audioPath);
                })
                .on('error', (err) => {
                    console.error('Error during conversion:', err.message);
                    msg.reply('An error occurred during the conversion process.');
                    fs.unlinkSync(videoPath);
                })
                .run();
        } else {
            msg.reply('The file you sent is not a video. Please send a valid video file.');
        }
    } catch (error) {
        console.error('Error downloading media:', error);
        msg.reply('An error occurred while processing your request. Please try again.');
    }
}

module.exports = convertVideoCommand;
