# SpinningVinylRecord
Merges an audio file with an image that produces a video output of spinning vinyl record.

This is a NodeJs implementation of combining an audio file with a image and have it produce a video of a spinning vinyl. 

Edit the following variables in app.js

1. Change the img_path variable to the location of the image file.
.
2. convert.imgToVideo('Path',233) -> Second prameter controls the duration of the spinning effect in seconds.

3. Change the audio_path variable to the location of the audio file. 

Run npm install and then node app.js. 

It converts and places the final output inside merge_outputs directory. 
