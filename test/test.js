var should = require('should'),
    app = require('./../src/main'),
    co = require('co'),
    man = require('thoughtpad-plugin-manager'),
    thoughtpad;

describe("markdown compilation plugin", function () {
    it("should register correctly to events", function (done) {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.true;
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "md", contents: "" });
            done();
        }).catch(done);
    });

    it("should ignore anything other than markdown", function (done) {
        thoughtpad = man.registerPlugins([app]);

        thoughtpad.subscribe("html-compile-complete", function *() {
            true.should.be.false; // Should never hit here because the extension is not markdown
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "html" });
            done();
        }).catch(done);
    });

    it("should compile markdown", function (done) {
        thoughtpad = man.registerPlugins([app]),
        contents = "",
        name = "";

        thoughtpad.config = {
            eventData: {
                'html-compile': {}
            }
        };

        thoughtpad.subscribe("html-compile-complete", function *(res) {
            contents = res.contents;
            name = res.name;
        });

        co(function *() {
            yield thoughtpad.notify("html-compile-request", { ext: "md", name: 'hello', contents: "### Heading\n\nSome text\n\nSome more text" });
            contents.should.equal("<h3 id=\"heading\">Heading</h3>\n<p>Some text</p>\n<p>Some more text</p>\n");
            name.should.equal('hello');
            done();
        }).catch(done);
    });
});