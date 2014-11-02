var markdown = require('markdown').markdown,
    _thoughtpad;

var init = function (thoughtpad) {
    _thoughtpad = thoughtpad;
    _thoughtpad.subscribe("html-compile-request", compile);
},

compile = function *(obj) {
    if (obj.ext !== "md") return;

    _thoughtpad.notify("html-compile-complete", markdown.toHTML(obj.contents));
};

module.exports = {
    init: init
};