import {makeProject} from '@motion-canvas/core';

import factorTree from './scenes/factorTree?scene';
import test from './scenes/test?scene';
import lcm from './scenes/lcm?scene';
import audio from './audio/voice.mp3';
import hcf from './scenes/hcf?scene';
import intro from './scenes/intro?scene';
import defenitions from './scenes/defenitions?scene';
import ending from './scenes/ending?scene';

export default makeProject({
  scenes: [intro,defenitions,lcm,hcf,factorTree,ending],
  audio: audio,
  background: '#141414',
});

// To render:
// 1. Open terminal in the main folder
// 2. Run this command for no audio
// ffmpeg -framerate 60 -pattern_type glob -i 'output/project/*.png' -c:v libx264 -pix_fmt yuv420p output/output.mp4
//    Or this with audio
// ffmpeg -framerate 60 -pattern_type glob -i 'output/factorsAndMultiples/*.png' -i src/projects/factorsAndMultiples/audio/voice.mp3 -shortest -c:v libx264 -pix_fmt yuv420p output/output.mp4