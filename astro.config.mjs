import { defineConfig } from 'astro/config';
export default defineConfig({site:'https://www.themandatum.org',output:'static',trailingSlash:'never',build:{inlineStylesheets:'always'},devToolbar:{enabled:false}});
