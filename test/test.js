var fs = require("fs")
  , test = require("tape")
  , concat = require("concat-stream")
  , genplate = require("../")

var templatesDir = __dirname + "/fixtures/templates"
  , expectationsDir = __dirname + "/fixtures/expectations"

function setupTest (template, data, cb) {
  fs.createReadStream(templatesDir + "/" + template)
    .pipe(genplate(data))
    .pipe(concat({encoding: "string"}, function (actual) {
      fs.readFile(expectationsDir + "/" + template, "utf8", function (er, expected) {
        cb(er, {template: template, actual: actual, expected: expected})
      })
    }))
}

test("variable", function (t) {
  t.plan(2)
  setupTest("variable.html", {title: "Hello World!"}, function (er, data) {
    t.ifError(er, "Error during " + data.template + " setup")
    t.equal(data.actual, data.expected, "Unexpected contents " + data.template)
  })
})

test("variable with whitespace", function (t) {
  t.plan(2)
  setupTest("variable-w-whitespace.html", {title: "Hello World!"}, function (er, data) {
    t.ifError(er, "Error during " + data.template + " setup")
    t.equal(data.actual, data.expected, "Unexpected contents " + data.template)
  })
})


