(function() {
    'use strict';

    angular.module('vacondos')
        .factory('condos', CondosService);

    CondosService.$inject = ['$http', '$q'];

    function CondosService($http, $q) {
        var searchResults = [];

        return {
            getAllBuildings: getAllBuildings,
            getAllCondos: getAllCondos,
            getSearchResults: getSearchResults
        };

        /**
         * Get search result data
         * @return {Array}      Search results for
         *                      condos or addresses
         */
        function getSearchResults() {
            return searchResults;
        }

        /**
         * Get all VA approved buildings
         * @return {Promise}    XMLHttpRequest obj that can
         * implement promise methods
         */
        function getAllBuildings() {
            return $http({
                method: 'get',
                url: 'https://arcane-spire-51321.herokuapp.com/buildings.json'
            })
            .then(function(results) {
                searchResults = results.data;
                return results;
            });
        }

        /**
         * Get currently for sale VA approved condo units
         * @param  {Object} paramObj Search inputs
         * @return {Promise}      XMLHttpRequest object that can
         * implement promise methods
         */
        function getAllCondos(paramObj) {
            if (!paramObj) {
                return $q.reject(new Error('You must use our search page to return condo listings'));
            }
            //
            // if (
            //     typeof(paramObj.min_price) !== 'number' ||
            //     typeof(paramObj.max_price) !== 'number' ||
            //     typeof(paramObj.min_bed) !== 'number' ||
            //     typeof(paramObj.max_bed) !== 'number' ||
            //     typeof(paramObj.min_bath) !== 'number' ||
            //     typeof(paramObj.max_bath) !== 'number' ||
            //     typeof(paramObj.zip) !== 'number' ||
            //     paramObj.min_price !== null ||
            //     paramObj.max_price !== null ||
            //     paramObj.min_bed !== null ||
            //     paramObj.max_bed !== null ||
            //     paramObj.min_bath !== null||
            //     paramObj.max_bath !== null ||
            //     paramObj.zip !== null
            // ) {
            //     return $q.reject(new Error('Inputs are invalid'));
            // }

            return $http({
                url: 'https://arcane-spire-51321.herokuapp.com/condos/search.json',
                method: 'get',
                dataType: 'json',
                params: {
                    min_price: paramObj.min_price,
                    max_price: paramObj.max_price,
                    min_bed: paramObj.min_bed,
                    max_bed: paramObj.max_bed,
                    min_bath: paramObj.min_bath,
                    max_bath: paramObj.max_bath,
                    zip: paramObj.zip
                }
            })
            .then(function(results) {
                searchResults = results.data;
                return results;
            });
        }

    }

})();
