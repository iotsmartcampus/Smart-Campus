/* Autogenerated with Kurento Idl */

/*
 * (C) Copyright 2013-2015 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var inherits = require('inherits');

var kurentoClient = require('kurento-client');

var disguise = kurentoClient.disguise;

var checkType      = kurentoClient.checkType;
var ChecktypeError = checkType.ChecktypeError;


var Transaction = kurentoClient.TransactionsManager.Transaction;

var OpenCVFilter = kurentoClient.register.abstracts.OpenCVFilter;


function noop(error, result) {
  if (error) console.trace(error);

  return result
};


/**
 * Create an element
 *
 * @classdesc
 *  FaceRecognition interface. Documentation about the module
 *
 * @extends module:filters/abstracts.OpenCVFilter
 *
 * @constructor module:facerecognition.FaceRecognition
 */
function FaceRecognition(){
  FaceRecognition.super_.call(this);
};
inherits(FaceRecognition, OpenCVFilter);


//
// Public methods
//

/**
 * Set config
 *
 * @alias module:facerecognition.FaceRecognition.setConfig
 *
 * @param {external:String} path
 *  path diretory
 *
 * @param {external:Integer} opFilter
 *  Option of filter
 *
 * @param {external:String} newPerson
 *  New person
 *
 * @param {module:facerecognition.FaceRecognition~setConfigCallback} [callback]
 *
 * @return {external:Promise}
 */
FaceRecognition.prototype.setConfig = function(path, opFilter, newPerson, callback){
  var transaction = (arguments[0] instanceof Transaction)
                  ? Array.prototype.shift.apply(arguments)
                  : undefined;

  //  
  // checkType('String', 'path', path, {required: true});
  //  
  // checkType('int', 'opFilter', opFilter, {required: true});
  //  
  // checkType('String', 'newPerson', newPerson, {required: true});
  //  

  var params = {
    path: path,
    opFilter: opFilter,
    newPerson: newPerson
  };

  callback = (callback || noop).bind(this)

  return disguise(this._invoke(transaction, 'setConfig', params, callback), this)
};
/**
 * @callback module:facerecognition.FaceRecognition~setConfigCallback
 * @param {external:Error} error
 */


/**
 * @alias module:facerecognition.FaceRecognition.constructorParams
 *
 * @property {module:core.MediaPipeline} mediaPipeline
 *  the parent {@link module:core.MediaPipeline MediaPipeline}
 */
FaceRecognition.constructorParams = {
  mediaPipeline: {
    type: 'kurento.MediaPipeline',
    required: true
  }
};

/**
 * @alias module:facerecognition.FaceRecognition.events
 *
 * @extends module:filters/abstracts.OpenCVFilter.events
 */
FaceRecognition.events = OpenCVFilter.events;


/**
 * Checker for {@link module:facerecognition.FaceRecognition}
 *
 * @memberof module:facerecognition
 *
 * @param {external:String} key
 * @param {module:facerecognition.FaceRecognition} value
 */
function checkFaceRecognition(key, value)
{
  if(!(value instanceof FaceRecognition))
    throw ChecktypeError(key, FaceRecognition, value);
};


module.exports = FaceRecognition;

FaceRecognition.check = checkFaceRecognition;