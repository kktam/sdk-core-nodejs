/*
 * Copyright (c) 2013 - 2016, MasterCard International Incorporated
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of 
 * conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * Neither the name of the MasterCard International Incorporated nor the names of its 
 * contributors may be used to endorse or promote products derived from this software 
 * without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
 * SUCH DAMAGE.
 *
 */

var MasterCardAPI = require('../../index');
var SdkConfig = require('./sdk-config');
var MultiplePathUserPost = {};
var operationConfigs = {};

/**
 * Initialize MultiplePathUserPost
 * @private
 */
var _init = function() {
    operationConfigs["6d3652d3-c91a-4452-86b8-fc3e939d86e1"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users/{user_id}/post/{post_id}", "list", [""], [""]);
    operationConfigs["0b633454-4888-44f0-a80d-1b6955f990da"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users/{user_id}/post/{post_id}", "update", ["testQuery"], [""]);
    operationConfigs["d97b9be8-902e-48b6-9236-08b1781a8441"] = new MasterCardAPI.OperationConfig("/mock_crud_server/users/{user_id}/post/{post_id}", "delete", [""], [""]);
    
};

_init();

/**
 * Private function to get operation config
 * @returns Object operation config
 * @private
 */
var _getOperationConfig = function(operationUUID) {
    var operationConfig = operationConfigs[operationUUID];

    if(!MasterCardAPI.isSet(operationConfig)) {
        throw new MasterCardAPI.MasterCardError.SDKError("Invalid operationUUID supplied: " + operationUUID);
    }

    return operationConfig;
};

var _getOperationMetaData = function() {
    return new MasterCardAPI.OperationMetaData(SdkConfig.getVersion(), SdkConfig.getHost());
};

    
/**
 * Function to retrieve a list MultiplePathUserPost objects.
 *
 * @method list
 * @param {Object} params - A map of parameters in which to define the MultiplePathUserPost list from.
 * @param {Function} callback A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
MultiplePathUserPost.list = function(params, callback) {
    var params = MasterCardAPI.isSet(params) ? params : {};

    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("6d3652d3-c91a-4452-86b8-fc3e939d86e1"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};

    
/**
 * Function to update a MultiplePathUserPost object.
 *
 * @method update
 * @param {Object} params - A map of parameters on which to update the MultiplePathUserPost object.
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
MultiplePathUserPost.update = function(params, callback) {
    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("0b633454-4888-44f0-a80d-1b6955f990da"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};

    
/**
 * Function to delete a MultiplePathUserPost object.
 *
 * @method delete
 * @param {String} id - A string ID of the MultiplePathUserPost to delete.
 * @param {Object} map - a map of additional parameters
 * @param {Function} callback - A function to handle success/error responses from the API.<br/>
 * The function takes 2 parameters, the first is an error object. This is null if no error occurs. The second parameter is the response data. This is null if an error occurs.
 */
MultiplePathUserPost.delete = function(id, map, callback) {
    var params = MasterCardAPI.isSet(map) ? map : {};
    if (id) {
        params.id = id;
    }


    try {
        MasterCardAPI.execute({
            operationConfig: _getOperationConfig("d97b9be8-902e-48b6-9236-08b1781a8441"),
            operationMetaData: _getOperationMetaData(),
            params: params
        }, callback);
    }
    catch (e) {
        callback(e, null);
    }

};

module.exports = MultiplePathUserPost;