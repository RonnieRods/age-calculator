// Since GitHub Pages serves the site from a subfolder
// e.g. https://github.io, Vite needs to know this path so it
// can resolve asset links
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/age-calculator/'
});