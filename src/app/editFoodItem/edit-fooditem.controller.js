(function () {
    'use strict';

    angular
        .module('food')
        .controller('EditFoodItemController', EditFoodItemController);

    function EditFoodItemController(FoodItemService, truckId, foodItem, $modalInstance) {
        var vm = this;
        vm.modalInstance = $modalInstance;
        vm.truckId = truckId;
        vm.editFoodItem = foodItem;

        vm.saveFoodItem = saveFoodItem;
        vm.cancelEdit = cancelEdit;
        vm.changeRatingValue = changeRatingValue;

        vm.statusMessage = '';

        activate();

        function activate() {
          // convert the date to something readable
          if (angular.isDefined(vm.editFoodItem.Date)) {
            var d = new Date(parseInt(vm.editFoodItem.Date.substr(6)));
            var s = (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear();
            vm.editFoodItem.TempDate = s;
          }
          else {
            vm.editFoodItem.TempDate = '';
          }
        }

        function cancelEdit() {
            vm.modalInstance.close(false);
        }

        function saveFoodItem() {
          vm.editFoodItem.Date = vm.editFoodItem.TempDate;
          if (angular.isDefined(vm.editFoodItem.FoodItemId) && vm.editFoodItem.FoodItemId > 0) {
              updateFoodItem();
          }
          else {
              createFoodItem();
          }
        }

        function updateFoodItem() {
            FoodItemService.updateFoodItem(vm.editFoodItem)
                .then(function () {
                        vm.modalInstance.close(false);
                    }
                    , function (error) {
                        vm.statusMessage = error.data.ResponseStatus.Message;
                    })
        }

        function createFoodItem() {
            FoodItemService.createFoodItem(vm.truckId, vm.editFoodItem)
                .then(function () {
                        vm.modalInstance.close(false);
                    }
                    , function (error) {
                        vm.statusMessage = error.data.ResponseStatus.Message;
                    })
        }

        function changeRatingValue(increment) {
            if ((vm.editFoodItem.Rating*1) + increment <= 10 && (vm.editFoodItem.Rating*1) + increment >= 0)
            {
                vm.editFoodItem.Rating = (vm.editFoodItem.Rating*1) + increment;
            }
        }

    }

})();
