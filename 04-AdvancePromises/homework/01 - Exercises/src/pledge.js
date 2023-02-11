'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
  if (typeof executor !== "function")
    throw TypeError("executor must be a function");

  this._state = "pending";
  this._value = undefined;
  this._handlerGroups = [];

  this.callHandlers = (value) => {
    while (this._handlerGroups.length > 0) {
      const currentHandler = this._handlerGroups.shift();
      this._state === "fulfilled" &&
        currentHandler.successCb &&
        currentHandler.successCb(value);
      this._state === "rejected" &&
        currentHandler.errorCb &&
        currentHandler.errorCb(value);
    }
  };

  const resolve = (data) => this._internalResolve(data);
  const reject = (reason) => this._internalReject(reason);

  executor(resolve, reject);

}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._value = data;
    this._state = "fulfilled";
    this.callHandlers(this._value);
  }
};

$Promise.prototype._internalReject = function (reason) {
  if (this._state === "pending") {
    this._value = reason;
    this._state = "rejected";
    this.callHandlers(this._value);
  }
};

$Promise.prototype.then = function (successHandler, succressError) {
  const handerGroup = {
    successCb: typeof successHandler === "function" ? successHandler : false,
    errorCb: typeof succressError === "function" ? succressError : false,
  };

  this._handlerGroups.push(handerGroup);
  this._state !== 'pending' && this.callHandlers(this._value  );
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
