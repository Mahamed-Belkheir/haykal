#!/usr/bin/env node

const haykal = require('./lib/index');

module.exports = haykal


if(require.main == module)
    haykal.parse(process.argv);
