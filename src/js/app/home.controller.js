(function() {
    'use strict';

    angular.module('vacondos')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'condos'];

    function HomeController($state, condos) {
        var that = this;

        this.searchParams = {
            min_price: 0,
            max_price: null,
            min_bed: 0,
            max_bed: null,
            min_bath: 0,
            max_bath: null,
            zip: null
        };

        // this.results = [];
        //
        // this.getCondos = function getCondos() {
        //     condos
        //         .getAllCondos()
        //         .then(function(condosForSale) {
        //             that.results = condosForSale;
        //             console.log('returned condos for sale', that.results);
        //         });
        // };
        //
        // this.getAllApproved = function getAllApprovedAddresses() {
        //     condos
        //         .getAllAddresses()
        //         .then(function(buildings) {
        //             that.results = buildings;
        //             console.log('returned all buildings', that.results);
        //         });
        // };

        this.goToResults = function goToSearchResults() {
            condos.getAllCondos()
                .then(function() {
                    $state.go('search-results', {searchInputs: that.searchParams});
                });
        };
    }

})();
