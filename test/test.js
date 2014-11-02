var should = require('should'),
    app = require('./../src/main'),
    man = require('thoughtpad-plugin-manager'),
    thoughtpad;

describe("markdown compilation plugin", function () {
    it("should register correctly to events", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.true;
        });

        thoughtpad.notify("html-compile-request", { ext: "" });
    });

    it("should ignore anything other than markdown", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.false; // Should never hit here because the extension is not markdown
        });

        thoughtpad.notify("html-compile-request", { ext: "html" });
    });

    it("should compile markdown", function () {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *(contents) {
            contents.should.equal("<h3>Heading</h3>\n\n<p>Some text</p>\n\n<p>Some more text</p>");
        });

        thoughtpad.notify("html-compile-request", { ext: "md", contents: "### Heading\n\nSome text\n\nSome more text" });
    });
});