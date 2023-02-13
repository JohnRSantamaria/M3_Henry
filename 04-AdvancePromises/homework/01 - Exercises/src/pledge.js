'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
// function $Promise(executor) {
//   if (typeof executor !== "function")
//     throw TypeError("executor must be a function");

//   this._state = "pending";
//   this._value = undefined;
//   this._handlerGroups = [];

//   this.callHandlers = (value) => {
//     while (this._handlerGroups.length > 0) {
//       const currentHandler = this._handlerGroups.shift();
//       this._state === "fulfilled" &&
//         currentHandler.successCb &&
//         currentHandler.successCb(value);
//       this._state === "rejected" &&
//         currentHandler.errorCb &&
//         currentHandler.errorCb(value);
//     }
//   };

//   this.catch = (errorHandler)=> {
//     return this.then(null, errorHandler);
//   }

//   const resolve = (data) => this._internalResolve(data);
//   const reject = (reason) => this._internalReject(reason);

//   executor(resolve, reject);

// }

// $Promise.prototype._internalResolve = function (data) {
//   if (this._state === "pending") {
//     this._value = data;
//     this._state = "fulfilled";
//     this.callHandlers(this._value);
//   }
// };

// $Promise.prototype._internalReject = function (reason) {
//   if (this._state === "pending") {
//     this._value = reason;
//     this._state = "rejected";
//     this.callHandlers(this._value);
//   }
// };

// $Promise.prototype.then = function (successHandler, succressError) {
//   const downStreamPrimise = new $Promise(()=>{});
//   const handerGroup = {
//     successCb: typeof successHandler === "function" ? successHandler : false,
//     errorCb: typeof succressError === "function" ? succressError : false,
//     downStreamPrimise,
//   };

//   this._handlerGroups.push(handerGroup);
//   this._state !== 'pending' && this.callHandlers(this._value);
//   return downStreamPrimise;
// };

//Nueva

function $Promise(executor) {
    if(typeof executor !== 'function') throw new TypeError('executor must be a function');
    this._state = 'pending';
    this._handlerGroups = [];
    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function(value){
    if(this._state === 'pending'){
        this._state= 'fulfilled';
        this._value = value;
        this._callHandlers();
    }
};

$Promise.prototype._internalReject = function(value){
    if(this._state === 'pending'){
        this._state= 'rejected';
        this._value = value;
        this._callHandlers();
    }
};

$Promise.prototype.then = function(successCb, errorCb){
    if(typeof successCb !== 'function') successCb = false;
    if(typeof errorCb !== 'function') errorCb = false;
    const downstreamPromise = new $Promise(function(){});
    this._handlerGroups.push({successCb, errorCb, downstreamPromise});
    if(this._state !== 'pending') this._callHandlers();
    return downstreamPromise;
};

$Promise.prototype._callHandlers = function(){
    while(this._handlerGroups.length > 0){
        let actual = this._handlerGroups.shift();
        if(this._state === 'fulfilled'){
            if(!actual.successCb){
                actual.downstreamPromise._internalResolve(this._value);
            } else {
                try {
                    const result = actual.successCb(this._value);
                    if(result instanceof $Promise){
                        result.then(function(value){
                            actual.downstreamPromise._internalResolve(value);
                        }, function(error){
                            actual.downstreamPromise._internalReject(error);
                        })
                    }else {
                        actual.downstreamPromise._internalResolve(result);
                    } 
                } catch(e){
                    actual.downstreamPromise._internalReject(e);
                }
            }
            }else{
                if(!actual.errorCb){
                    actual.downstreamPromise._internalReject(this._value);
                }else{
                    try{
                        const result = actual.errorCb(this._value);
                        if(result instanceof $Promise){
                            result.then(function(value){
                                actual.downstreamPromise._internalResolve(value);
                            }, function(error){
                                actual.downstreamPromise._internalReject(error);
                            })
                        } else {
                            actual.downstreamPromise._internalResolve(result);
                        }
                    }catch(e){
                        actual.downstreamPromise._internalReject(e);
                    }
                   
                  
                }
                
        };
    }
};

$Promise.resolve = function (value) {
  if (value instanceof $Promise) return value;
  return new $Promise((resolve) => resolve(value));
};

$Promise.all = function (array) {
  if (!Array.isArray(array)) {
    throw new TypeError("$Promise.all only accepts arrays");
  }

  return new $Promise(function (res, rej) {
    var resolvedValues = [];
    var cont = 0;
    for (let i = 0; i < array.length; i++) {
      $Promise
        .resolve(array[i])
        .then((val) => {
          resolvedValues[i] = val;
          cont++;
          if (cont === array.length) {
            res(resolvedValues);
          }
        })
        .catch((err) => rej(err));
    }
  });
};

$Promise.prototype.catch = function(errorCb){
    return this.then(null, errorCb)
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
