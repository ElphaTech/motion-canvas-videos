// vite.config.ts
import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import glob from "glob";

export default defineConfig({
  plugins: [
    motionCanvas({
      // Will automatically grab all top-level folders inside `./src/projects/` and 
      // expose them as projects. These folders should contain an `index.ts` file 
      // that exports the project configuration.
      project: glob.sync("./src/projects/*/*.ts"),
    }),
  ],
});