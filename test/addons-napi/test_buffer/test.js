'use strict';
// Flags: --expose-gc

const common = require('../../common');
const binding = require(`./build/${common.buildType}/test_buffer`);
const assert = require('assert');

assert.strictEqual(binding.newBuffer().toString(), binding.theText,
                   'buffer returned by newBuffer() has wrong contents');
global.gc();

let buffer1 = binding.newExternalBuffer();
assert.strictEqual(buffer1.toString(), binding.theText,
                   'buffer returned by newExternalBuffer() has wrong contents');
buffer1 = null;
global.gc();
assert.strictEqual(binding.getDeleterCallCount(), 1, 'deleter was not called');
assert.strictEqual(binding.copyBuffer().toString(), binding.theText,
                   'buffer returned by copyBuffer() has wrong contents');

let buffer2 = binding.staticBuffer();
assert.strictEqual(binding.bufferHasInstance(buffer2), true,
                   'buffer type checking fails');
assert.strictEqual(binding.bufferInfo(buffer2), true, 'buffer data is accurate');
buffer2 = null;
global.gc();
assert.strictEqual(binding.getDeleterCallCount(), 2, 'deleter was not called');
