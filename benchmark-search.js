const Benchmark = require('benchmark');
const sortedIndexBy = require('lodash').sortedIndexBy;
const fs = require('fs');

const randomNumber = () => Math.floor(Math.random() * 260000);

const getStartLocation = (token) => token.range[0];

const suite = new Benchmark.Suite();

const tokens = JSON.parse(fs.readFileSync('./tokens.json'));

suite
  .add('sortedIndexBy', function () {
    return sortedIndexBy(tokens, { range: [randomNumber()] }, getStartLocation);
  })
  .add('Array#findIndex', function () {
    const index = tokens.findIndex((el) => randomNumber() <= getStartLocation(el));
    return index === -1 ? tokens.length : index;
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .run({ async: true });
