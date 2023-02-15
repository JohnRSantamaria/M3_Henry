"use strict";

const { forEach } = require("async");
const { blue, promisifiedReadFile } = require("./utils");
let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC,
  problemDx: problemD,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

async function problemA() {
  // callback version
  exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });

  // async await version
  // Tu código acá:
  const stanza = await exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt")
  exerciseUtils.blue(stanza)

  const stanza2 = await exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
  exerciseUtils.blue(stanza2)
}

async function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });
  // async await version
  // Tu código acá:
  filenames.forEach(filename => {
    exerciseUtils.promisifiedReadFile(filename)
    .then(file=>exerciseUtils.blue(file))
  })
}

async function problemC() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  });

  // async await version
  // Tu código acá:
  filenames.forEach(filename => {
    exerciseUtils.promisifiedReadFile(filename)
    .then(file=>exerciseUtils.blue(file))
  })
}

async function problemD() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
      if (err) exerciseUtils.magenta(new Error(err));
    });
  });

  // async await version
  // Tu código acá:
  try {
    for(const file of filenames){
      const stanza = await exerciseUtils.promisifiedReadFile(file);
      exerciseUtils.blue(stanza)
    }  
  } catch (error) {
    exerciseUtils.magenta(error)
  }
  
  
}
