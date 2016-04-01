# [bvblogic] Navizor's HTML build with Grunt.

This is an example of our HTML coding (Slicing, PSD to HTML, Layout creation, etc.) and it was created with the goal to get 100 points on Google Pagespeed. So we know that injected **CSS** is not a good idea, but pagespeed really likes it, we used **inline SVG** as well, and trully says i don't like it, but this how pagespeed works.

### Tech

This project uses a number of open source projects to work properly:

* [node.js](http://nodejs.org/) - evented I/O for the backend
* [Grunt](http://gruntjs.com/) - the JavaScript Task Runner

### Installation

Make sure that you have already installed [node.js](https://nodejs.org/) and [Grunt](http://gruntjs.com/)'s CLI
To install **Node.js** - just follow  [this link](https://nodejs.org/)
To install Grunt CLI - please do next:

Open your favorite Terminal and run these commands.
```sh
$ cd PATH_TO_PROJECT_ROOT_FOLDER
$ npm install -g grunt-cli
```
Now open your terminal and run 
```sh
$ cd PATH_TO_PROJECT_ROOT_FOLDER
$ npm install
```

On success - you'll get 1 new folder in project's root:  **node_modules**. Make sure that this folder is listed in  `.gitignore`

### Build
I changed `grunt-combo-html-css-js` module to make development more understandable. To continue development on this project you need to add small changes in `/node_modules/grunt-combo-html-css-js/tasks/combo_html_css_js.js` 
Find lines with
```sh
var cssHrefPattern = /<link(?:[^>]*) href="(.+)"(?:[^>]*)>/g;
var jsSrcPattern = /<script(?:[^>]*) src="(.+)"(?:[^>]*)>/g;
```
and just replace'em with 

```sh
var cssHrefPattern = /<link(?:[^>]*) href="(.+)"(?:[^>]*) data-combo="true">/g;
var jsSrcPattern = /<script(?:[^>]*) src="(.+)"(?:[^>]*) data-combo="true">/g;
```

Now you can build this project easily, just run 
```sh
$ grunt
```
On success - you'll get another new folder in project's root:  **dist**. Make sure that this folder is listed in  `.gitignore` as well

`dist` folder contains all files for further development. Use files just from this folder. 
Each HTML file in this folder has its own copy with `.min.html` end. It's the same HTML but minified with `htmlmin` and created just for pagespeed testing, so use for development non minified version. Don't try to change files in `dist`. These files are created with Grunt so every change in `css/` folder or `js/` folder wil rewrite these files with new one, and your changes will be lost.

### Development

Want to contribute? Great!

Make sure that your installation and build were successful.

Open your favorite Terminal and run


```sh
$ cd PATH_TO_PROJECT_ROOT_FOLDER
$ grunt serve
```

You'll see something like:

```sh
Running "watch" task
Waiting...
```
It works!

Now you can go to desired `css` or  `js` and write your changes.
### Attention!
Don't try to change files in `dist`. These files are created with Grunt so every change in `css/` folder or `js/` folder wil rewrite these files with new one, and your changes will be lost.


### How to add new css or js to project?

Stop all watch tasks by pressing `ctrl + C` in your Terminal

Open `Gruntfile.js` in project's root.

Find `concat: js:` or `concat: css:` and add new files path.

```sh
concat: {
    js: {
        src: ['js/bootstrap.min.js',
              'new_JS_file_path',
              'js/main.js'],
        dest: 'dist/js/build.js'
    },
    css: {
        src: ['css/bootstrap.min.css',
              'new_CSS_file_path',
              'css/main.css'],
        dest: 'dist/css/build.css'
    }
}
```
Save this file

Open your favorite Terminal and run:

```sh
$ grunt serve
```

You'll see something like:

```sh
$ grunt watch
Running "watch" task
Waiting...
```

It works again.
