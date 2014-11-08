var should = require('should'),
    app = require('./../src/main'),
    co = require('co'),
    man = require('thoughtpad-plugin-manager'),
    thoughtpad;

describe("markdown compilation plugin", function () {
    it("should register correctly to events", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.true;
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "md", contents: "" });
        })();
    });

    it("should ignore anything other than markdown", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.false; // Should never hit here because the extension is not markdown
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "html" });
        })();
    });

    it("should compile markdown", function (done) {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *(contents) {
            contents.should.equal("<h3>Heading</h3>\n\n<p>Some text</p>\n\n<p>Some more text</p>");
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "md", contents: "### Heading\n\nSome text\n\nSome more text" });
            done();
        })();
    });
});