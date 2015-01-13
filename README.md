thoughtpad-plugin-compiler-markdown
=================================

[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

A thoughtpad plugin that responds to HTML compile events. Markdown will be compiled to HTML for use in the browser.

## Usage

The plugin should be loaded using the [thoughtpad-plugin-manager](https://github.com/thoughtpad/thoughtpad-plugin-manager). Once this has been done then the plugin will respond to events. To use standalone:

```JavaScript
var man = require('thoughtpad-plugin-manager'),
    markdown = require('thoughtpad-plugin-compiler-markdown');

var thoughtpad = man.registerPlugins([markdown]);
thoughtpad.subscribe("html-compile-complete", function (data) {
    console.log("HTML is returned here"); 
});
yield thoughtpad.notify("html-compile-request", { ext: "md", contents: "your markdown code here", name: "name of the file" });
```

## Tests

Ensure you have globally installed mocha - `npm -g install mocha`. Then you can run:

`mocha --harmony-generators`

Alternatively if you are in a *NIX environment `npm test` will run the tests plus coverage data.

## License

The code is available under the [MIT license](http://deif.mit-license.org/).

[travis-image]: https://img.shields.io/travis/thoughtpad/thoughtpad-plugin-compiler-markdown/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/thoughtpad/thoughtpad-plugin-compiler-markdown
[coveralls-image]: https://img.shields.io/coveralls/thoughtpad/thoughtpad-plugin-compiler-markdown/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/thoughtpad/thoughtpad-plugin-compiler-markdown?branch=master
