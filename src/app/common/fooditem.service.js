(function() {
    'use strict';

    angular
        .module('food')
        .service('FoodItemService', FoodItemService);

    /** @ngInject */
    function FoodItemService($q, $http) {
        var baseUrl = "http://www.pilsnerd.com:8183/foodtruckapi/";

        this.getFoodItems = getFoodItems;
        this.createFoodItem = createFoodItem;
        this.deleteFoodItem = deleteFoodItem;
        this.updateFoodItem = updateFoodItem;

        function getFoodItems(truckId){
            var deferred = $q.defer();

            $http.get(baseUrl + "trucks/" + truckId + "/fooditems", null)
                .then(function (resp) {
                    deferred.resolve(resp.data);
                }, function () {
                    deferred.reject();
                });

            return deferred.promise;
        }

        function createFoodItem(truckId, foodItem){
            var deferred = $q.defer();

            $http.post(baseUrl + "trucks/" + truckId + "/fooditems", foodItem)
                .then(function (resp) {
                    deferred.resolve(resp);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function deleteFoodItem(foodItemId) {
            var deferred = $q.defer();

            $http.delete(baseUrl + "fooditems/" + foodItemId, null)
                .then(function (resp) {
                    deferred.resolve(resp);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function updateFoodItem(foodItem) {
            var deferred = $q.defer();

            $http.post(baseUrl + "fooditems/" + foodItem.FoodItemId, foodItem)
                .then(function (resp) {
                    deferred.resolve(resp);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

    }

})();
