const { exec } = require('child_process');

function ffmpegInstall(msg) {
    exec('ffmpeg -version', (error, stdout, stderr) => {
        if (error) {
            msg.reply('FFmpeg is not installed. Please install it first.');
            msg.reply('Visit https://ffmpeg.org/download.html to download and install FFmpeg.');
        } else {
            msg.reply('FFmpeg is already installed: ' + stdout.split('\n')[0]);
        }
    });
}

module.exports = ffmpegInstall;
