const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

function dir_check(path){


    const directoryPath = path;

    if (fs.existsSync(directoryPath)) {
    console.log('The directory exists.');
    } else {
    console.log('The directory does not exist.');

    fs.mkdir(directoryPath, { recursive: true }, (err) => {
        if (err) {
        console.error(err);
        } else {
        console.log('Directory created successfully!');
        }
    });
    }


}

async function imgToCircle (img_path) {

const basePath = './output/'

const width = 800,
r = width / 2,
circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" fill="black" /></svg>`);

dir_check(basePath);

var splitpath = img_path.split("/");
var output_path = basePath + 'converted_' + splitpath[splitpath.length - 1];

sharp(img_path)
    .resize(width, width)
    .composite([{
        input: circleShape,
        blend: 'dest-in'
    },
    {
        input: Buffer.from(
          `<svg><circle cx="${r/8}" cy="${r/8}" r="${r/8}"/></svg>`
        ),
        blend: 'dest-out'
      }])
    .png()
    .toFile(output_path, (err, info) => err ?
        console.error(err.message) :
        console.log(info)
    )

    return output_path
  };


async function imgToVideo (img,duration){

    return new Promise((resolve, reject) => {

    const basePath = './video_output/' 

    dir_check(basePath);

    var id  = Math.random().toString(16).slice(2)


    var output_path = basePath + id + '.mp4'


    ffmpeg()
    .input(img)
    .loop(1)
    .videoFilter('rotate=360*(t/1000),format=yuv420p')
    .videoCodec('libx264')
    .outputOptions('-t' + ' ' + duration)
    .output(output_path)

    .on('end', function() {
        console.log('Finished writing video');
        resolve(output_path);

    })
    .on('error', (err) => {
        console.error('Error merging audio and video:', err);
        reject(err);
      })
    .run();

    




});


}


async function mergeall (audioPath, imgVideoPath){

    var id  = Math.random().toString(16).slice(2)


    const basePath = './merge_output/'

    dir_check(basePath);


    var output = basePath + id + '.mp4';

        ffmpeg()
        
        .input(imgVideoPath)
        .input(audioPath)
        .videoCodec('copy')
        .audioCodec('aac')
        .outputOptions('-map 0:v:0')
        .outputOptions('-map 1:a:0')
        .output(output)
        .on('end', function() {
            console.log('Finished merging audio and video',output);
        })
        .run();


  }

  module.exports.imgToCircle = imgToCircle;
  module.exports.imgToVideo = imgToVideo;
  module.exports.mergeall = mergeall;
