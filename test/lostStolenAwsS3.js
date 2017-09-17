// Imports for Test
var MasterCardAPI = require('../index');
var S3FS = require('s3fs');
var Promise = require("bluebird");

// variables Amazon Web Service S3
var bucketPath = 'kt-key-store';
var p12Path = '/mastercard/mcapi_sandbox_key.p12';
var s3Options = {
  region: 'us-west-2'
};

var s3p12loader = function(callback)  {
    var fsImpl = new S3FS(bucketPath, s3Options);

    return new Promise(function (resolve, reject) {
        fsImpl.readFile(p12Path, null, function (err, data) {
            if (err) return reject(err);
            //console.log('from AWS S3 read! ' + data.length + ' bytes');
            
            // convert UInt18Array data from AWS S3 to string
            var dataInString = String.fromCharCode.apply(null, data);
    
            if (typeof callback === 'function') {
                callback(dataInString);
            }
    
            resolve(dataInString);        
        });
    })    
}

// variables for test
var clientId = "L5BsiPgaF-O3qA36znUATgQXwJB6MRoMSdhjd7wt50c97279!50596e52466e3966546d434b7354584c4975693238513d3d";
var alias = "test";
var password = "password";

var operationConfig = new MasterCardAPI.OperationConfig("/fraud/loststolen/v1/account-inquiry", "update", [""], [""]);
var operationMetaData = new MasterCardAPI.OperationMetaData("1.0.0", "https://sandbox.api.mastercard.com");

describe('lostStolen, with AWS S3', function() {

    beforeEach( function() {
        var authentication = new MasterCardAPI.OAuth(clientId, s3p12loader, alias, password);

        MasterCardAPI.init({
            sandbox: true,
            authentication: authentication
        });
    });

    afterEach( function() {
        MasterCardAPI.setProxy(null);
    });

    it('send valid request, with AWS S3', function(done){
        

        var request = {
            "AccountInquiry": {
                "AccountNumber": "5343434343434343"
            }
        };

        MasterCardAPI.execute({
            operationConfig: operationConfig,
            operationMetaData: operationMetaData,
            params: request
        },
        function (error, data) {
            data.Account.Status.should.equal(true);
            data.Account.Listed.should.equal(true);
            data.Account.ReasonCode.should.equal("S");
            data.Account.Reason.should.equal("STOLEN");
            done();
        });

    });


    // it('send valid request with proxy, with AWS S3', function(done){
        
    //     MasterCardAPI.setProxy("http://127.0.0.1:9999");

    //     var request = {
    //         "AccountInquiry": {
    //             "AccountNumber": "5343434343434343"
    //         }
    //     };

    //     MasterCardAPI.execute({
    //         operationConfig: operationConfig,
    //         operationMetaData: operationMetaData,
    //         params: request
    //     },
    //     function (error, data) {
    //         data.Account.Status.should.equal(true);
    //         data.Account.Listed.should.equal(true);
    //         data.Account.ReasonCode.should.equal("S");
    //         data.Account.Reason.should.equal("STOLEN");
    //         done();
    //     });

    // });

    it('send valid request, with AWS S3', function(done){

        var request = {
            "AccountInquiry": {
                "AccountNumber": "5343434343434343"
            }
        };

        MasterCardAPI.execute({
            operationConfig: operationConfig,
            operationMetaData: operationMetaData,
            params: request
        },
        function (error, data) {
            data.Account.Status.should.equal(true);
            data.Account.Listed.should.equal(true);
            data.Account.ReasonCode.should.equal("S");
            data.Account.Reason.should.equal("STOLEN");
            done();
        });

    });

    it('send error request, with AWS S3', function(done){


        var request = {
            "AccountInquiry": {
                "AccountNumber": "1111222233334444"
            }
        };

        MasterCardAPI.execute({
            operationConfig: operationConfig,
            operationMetaData: operationMetaData,
            params: request
        },
        function (error, data) {
            error.getHttpStatus().should.equal(400);
            error.getMessage().should.equal("Unknown Error");
            error.getReasonCode().should.equal("SYSTEM_ERROR");
            error.getSource().should.equal("System");
            
            done();
        });

    });

});