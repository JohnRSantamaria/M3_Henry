const fulfil1 = new Promise((resolve, reject)=>{
  resolve("Resuelto 1");
})
const fulfil2 = new Promise((resolve, reject)=>{
  resolve("Resuelto 2");
})
const fulfil3 = new Promise((resolve, reject)=>{
  reject("Rechazado 1");
})
const fulfil4 = new Promise((resolve, reject)=>{
  reject("Rechazado 2");
})

// caso 1



