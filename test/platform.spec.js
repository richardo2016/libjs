/* global describe, it, before */
const test = require('test');
test.setup();

const path = require('path');

describe(`fibjs`, () => {
  const fibjsPath = require('../lib/cjs/platform/fibjs/path')

  it('path: homeDir', () => {
    assert.isFunction(fibjsPath.homeDir)

    assert.equal(fibjsPath.homeDir(), process.env.HOME)
  })

  it('path: applicationHomeDirectory', () => {
    assert.isFunction(fibjsPath.applicationHomeDirectory)

    const t = Date.now() + ''
    assert.equal(
      fibjsPath.applicationHomeDirectory(t),
      path.join(fibjsPath.homeDir(), t)
    )
  })
});

test.run(console.DEBUG);
