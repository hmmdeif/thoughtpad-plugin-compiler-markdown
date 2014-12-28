var markdown = require('marked');

var init = function (thoughtpad) {
    thoughtpad.subscribe("html-compile-request", compile);
},

compile = function *(obj) {
    if (obj.ext !== "md") return;

    // The user can override this using the eventData config variable
    var data = {};

    if (obj.thoughtpad.config && obj.thoughtpad.config.eventData && obj.thoughtpad.config.eventData['html-compile']) {
        data = obj.thoughtpad.config.eventData['html-compile'];
    }

    yield obj.thoughtpad.notify("html-compile-complete", { contents: markdown(obj.contents, data), name: obj.name });
};

module.exports = {
    init: init
};