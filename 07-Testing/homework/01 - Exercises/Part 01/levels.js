const levelOne = (a, b) => a + b;

const levelTwo = (letras) => {
  const l = letras.length;
  return l < 2
    ? letras
    : l === 2
    ? letras.slice(0, 1)
    : letras
        .split("")
        .filter((e, i) => (i % 2 === 0 ? e : null))
        .join("");
};

const levelThree = (a, b) => a.concat(b).sort();

const levelFour = (num) => {
  let original = num+"";
  let reverse = ""

  original = original.split("").reduce((a,b)=> parseInt(a)+parseInt(b));
  
  reverse = original+reverse
  reverse = reverse.split("").reverse().join("")

  return original*reverse === num
};

module.exports = { levelOne, levelTwo, levelThree, levelFour };

