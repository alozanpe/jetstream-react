const mix = require('laravel-mix');
const cssImport = require('postcss-import');
const cssNesting = require('postcss-nesting');
const purgecss = require('@fullhuman/postcss-purgecss');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .react()
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ])
    .options({
        postCss: [
            cssImport(),
            cssNesting(),
            tailwindcss('tailwind.config.js'),
            ...(mix.inProduction()
                ? [
                      purgecss({
                          content: ['./resources/views/**/*.blade.php', './resources/js/**/*.jsx'],
                          defaultExtractor: (content) => content.match(/[\w-/:.]+(?<!:)/g) || [],
                          whitelistPatternsChildren: [/nprogress/],
                      }),
                  ]
                : []),
        ],
    })
    .webpackConfig(require('./webpack.config'))
    .sourceMaps();

if (mix.inProduction()) {
    mix.version();
}
