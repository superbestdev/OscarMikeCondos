(function() {
    'use strict';

    angular.module('vacondos')
        .factory('condos', CondosService);

    CondosService.$inject = ['$http'];

    function CondosService($http) {
        var condosForSale = [];
        var allApprovedBuildings = [];

        return {
            getAllAddresses: getAllAddresses,
            getAllCondos: getAllCondos,
            getCondos: getCondos
        };

        function getCondos() {
            return condosForSale;
        }

        function getAllAddresses() {
            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/addresses.json'
            })
            .then(function(results) {
                allApprovedBuildings = results.data;
                return results;
            });
        }

        function getAllCondos() {
            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/condos.json'
            })
            .then(function(results) {
                condosForSale = results.data;
                return results;
            });
        }

    }

})();

// method: 'get',
// dataType: 'json',
// params: {
//     min_price: paramObj.min_price,
//     max_price: paramObj.max_price,
//     min_bed: paramObj.min_bed,
//     max_bed: paramObj.max_bed,
//     min_bath: paramObj.min_bath,
//     max_bath: paramObj.max_bath,
//     zip: paramObj.zip
