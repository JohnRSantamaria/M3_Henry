"use strict";

const { blue } = require("./utils");
let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  // callback version
  // exerciseUtils.readFile("poem-two/stanza-01.txt", function (err, stanza) {
  //   exerciseUtils.blue(stanza);
  // });
  // exerciseUtils.readFile("poem-two/stanza-02.txt", function (err, stanza) {
  //   exerciseUtils.blue(stanza);
  // });

  // promise version
  // Tu código acá:
  
  //Codigo normal
  exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt")
  .then(
    (stanza)=>{
      exerciseUtils.blue(stanza)
    }
  )

  exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
  .then(
    (stanza)=>{
      exerciseUtils.blue(stanza)
    }
  )
  // Promise.all([
  //   exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt"),
  //   exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
  // ])
  // .then((stanzas)=>{
  //   stanzas.forEach(element => {
  //     exerciseUtils.blue(element);
  //   });
  // })
  
}

function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  // filenames.forEach((filename) => {
  //   exerciseUtils.readFile(filename, function (err, stanza) {
  //     exerciseUtils.blue(stanza);
  //   });
  // });

  // promise version
  // Tu código acá:

  filenames.forEach((filename)=> {
    exerciseUtils.promisifiedReadFile(filename)
    .then((stanza)=>{exerciseUtils.blue(stanza)})
  })

  console.log('done');

  //WITH promice all 
  // Promise.all([
  //   exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt"),
  //   exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt"),
  //   exerciseUtils.promisifiedReadFile("poem-two/stanza-03.txt"),
  //   exerciseUtils.promisifiedReadFile("poem-two/stanza-04.txt"),
  //   exerciseUtils.promisifiedReadFile("poem-two/stanza-05.txt"),
  //   exerciseUtils.promisifiedReadFile("poem-two/stanza-06.txt"),
  //   exerciseUtils.promisifiedReadFile("poem-two/stanza-07.txt"),
  //   exerciseUtils.promisifiedReadFile("poem-two/stanza-08.txt"),
  // ])
  // .then((stanzas)=> {
  //   stanzas.forEach((el)=> exerciseUtils.blue(el))
  //   console.log('done');
  // })
}

function problemC() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  // filenames.forEach((filename) => {
  //   exerciseUtils.readFile(filename, function (err, stanza) {
  //     exerciseUtils.blue(stanza);
  //     if (err) exerciseUtils.magenta(new Error(err));
  //   });
  // });

  // promise version
  // Tu código acá:
  filenames.forEach((filename)=> {
    exerciseUtils.promisifiedReadFile(filename)
    .then(
      (stanza)=>{
        exerciseUtils.blue(stanza)
      },
      (err)=>{
        exerciseUtils.magenta(new Error(err))
      } 
    )
  }) 
}

function problemD() {
  let fs = require("fs");
  function promisifiedWriteFile(filename, str) {
    // tu código acá:
  }
}
