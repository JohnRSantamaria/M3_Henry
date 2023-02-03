const { stdout } = require("process");
const process = require("process");
const commands = require("./commands/index.js");

function bash() {
  process.stdout.write("prompt > ");
  process.stdin.on("data", (data) => {
    const args = data.toString().trim().split(' ');// trim elimina los espacios vacios 
    const cmd = args.shift(); // Shift Extrae la primera palabra
    if(commands[cmd]){    // commands[cmd] pregunta si existe esto dentro de el
      commands[cmd](print, args.join(' '));
    }else{
      print(`command not found: ${cmd}`);
    }
  }); // 2 parametro debe ser una funcion que recibe por parametro data
}

function print(output){
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

bash();
module.exports = {
  print,
  bash,
};