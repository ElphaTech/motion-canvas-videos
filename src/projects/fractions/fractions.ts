import {makeProject} from '@motion-canvas/core/lib';

import division from './scenes/division?scene';
import multiplication from './scenes/multiplication?scene';
import addition from './scenes/addition?scene';
import subtraction from './scenes/subtraction?scene';
import intro from './scenes/intro?scene';
import testing from './scenes/testing?scene';
import audio from './audio/voice.mp3';
import parts from './scenes/parts?scene';
import ending from './scenes/ending?scene';

export default makeProject({
  scenes: [intro,parts,addition,subtraction,multiplication,division,ending],
  audio: audio,
  background: '#141414',
});
