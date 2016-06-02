(function() {
    'use strict';

    angular
        .module('food')
        .service('TruckService', TruckService);

    /** @ngInject */
    function TruckService($q, $http) {
        var baseUrl = "http://www.pilsnerd.com:8183/foodtruckapi/";

        this.getTrucks = getTrucks;
        this.createTruck = createTruck;
        this.updateTruck = updateTruck;

        function getTrucks(){
            var deferred = $q.defer();

            $http.get(baseUrl + "trucks", null)
                .then(function (resp) {
                    deferred.resolve(resp.data);
                }, function () {
                    deferred.reject();
                });

            return deferred.promise;
        }

        function createTruck(truck){
            var deferred = $q.defer();

            $http.post(baseUrl + "trucks", truck)
                .then(function (resp) {
                    deferred.resolve(resp);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function updateTruck(truck) {
            var deferred = $q.defer();

            $http.post(baseUrl + "trucks/" + truck.TruckId, truck)
                .then(function (resp) {
                    deferred.resolve(resp);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

    }

})();
