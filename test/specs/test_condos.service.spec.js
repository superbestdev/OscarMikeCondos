(function() {
    'use strict';

    var assert = chai.assert;

    suite('condos service', function() {
        var $rootScope, $httpBackend, condos;

        setup(module('vacondos'));

        setup(inject(function(_$rootScope_, _$httpBackend_, _condos_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            condos = _condos_;

            $httpBackend
                .whenGET('https://arcane-spire-51321.herokuapp.com/buildings.json')
                .respond([{
                    address: '123 Penn St Washington DC',
                    latitude: 22,
                    longitude: 77
                }]);

            $httpBackend
                .whenGET('/js/templates/home.template.html')
                .respond('<h1>Mock Home Template</h1>');

            $httpBackend
                .whenGET('/js/templates/all-buildings.template.html')
                .respond('<h1>Mock All Buildings Template</h1>');

            $httpBackend
                .when(
                    'GET',
                    'https://arcane-spire-51321.herokuapp.com/condos/search.json?min_bath=0&min_bed=0&min_price=0'
                )
                .respond([
                    {
                        id: 1,
                        formatted_address: '123 Elm St',
                        price: 400,
                        latitude: 31,
                        longitude: 10,
                        parking: true,
                        zipcode: 20003
                    }
                ]);

        }));

        test('condos service functions exist', function() {
            assert.isFunction(condos.getAllBuildings, 'getAllBuildings fn exists');
            assert.isFunction(condos.getAllCondos, 'getAllCondos fn exists');
            assert.isFunction(condos.getSearchResults, 'getSearchResults fn exists');
        });

        test('getAllBuildings successfully returns buildings', function(done) {
            var returnVal = condos.getAllBuildings();
            console.log('getAllBuildings', returnVal);

            assert.isObject(returnVal, 'getAllBuildings returns an object');
            assert.isFunction(returnVal.then, 'result has a then method');
            assert.isFunction(returnVal.catch, 'result has a catch method');

            returnVal
                .then(function(buildings) {
                    assert
                        .isArray(buildings.data, 'the data property of buildings is an array');
                    assert.isObject(buildings.data[0], 'each building is an object');
                    assert
                        .strictEqual(
                            buildings.data[0].address,
                            '123 Penn St Washington DC',
                            'each building has address property'
                        );
                    assert.strictEqual(buildings.data[0].latitude, 22, 'each building has latitude');
                    assert.isNumber(buildings.data[0].latitude);
                    assert.strictEqual(buildings.data[0].longitude, 77, 'each building has longitude');
                    assert.isNumber(buildings.data[0].longitude);
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    assert.isFail('should not be in catch for getAllBuildings');
                    done();
                });

            $httpBackend.flush();
        });

        test('getAllCondos successfully returns condos with default inputs', function(done) {
            var returnVal = condos
                .getAllCondos({
                    min_price: 0,
                    max_price: null,
                    min_bed: 0,
                    max_bed: null,
                    min_bath: 0,
                    max_bath: null,
                    zip: null
                });

            assert.isObject(returnVal, 'getAllCondos returns an object');
            assert.isFunction(returnVal.then, 'result has a then method');
            assert.isFunction(returnVal.catch, 'result has a catch method');

            returnVal
                .then(function(results) {
                    console.log('getAllCondos', returnVal);
                    assert.isArray(results.data, 'getAllCondos returns array of condos');
                    assert.isObject(results.data[0], 'each condo is an object');
                    assert.strictEqual(results.data[0].id, 1, 'each condo has id');
                    assert.strictEqual(results.data[0].formatted_address, '123 Elm St', 'each condo has address');
                    assert.strictEqual(results.data[0].price, 400, 'each condo has price');
                    assert.strictEqual(results.data[0].latitude, 31, 'each condo has latitude');
                    assert.strictEqual(results.data[0].longitude, 10, 'each condo has longitude');
                    assert.isBoolean(results.data[0].parking, 'each condo has parking property');
                    assert.strictEqual(results.data[0].zipcode, 20003, 'each condo has a zip code');
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    assert.isFail('should not be in catch');
                    done();
                });

            $httpBackend.flush();
        });

        test('getAllCondos returns error promise with no argument', function(done) {
            var returnVal = condos.getAllCondos();

            assert.isObject(returnVal, 'getAllCondos returns an object');
            assert.isFunction(returnVal.then, 'result has a then method');
            assert.isFunction(returnVal.catch, 'result has a catch method');

            returnVal
                .then(function(response) {
                    console.log(response);
                    assert.isFail('should not be in then');
                    done();
                })
                .catch(function(err) {
                    assert.instanceOf(err, Error, 'err should be a type of error');
                    done();
                });

            $rootScope.$digest();
        });
    });
})();
