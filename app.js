const convert = require('./mods/utilities.js');
// var command = new FfmpegCommand();

async function main() {
    var img_path = '/Users/daisonlowe/Projects/vinyl/images/il_570xN.1845557469_8zek.png';

    var img = await convert.imgToCircle(img_path);

    var results = await convert.imgToVideo(img,233);

    var audio_path = 'audio/Housecall.m4a' ;

    var finaloutput = await convert.mergeall(audio_path,results);

  }

main();
