(function () {
    'use strict';

    angular
        .module('food')
        .controller('EditTruckController', EditTruckController);

    function EditTruckController(TruckService, truck, $modalInstance) {
        var vm = this;
        vm.modalInstance = $modalInstance;
        vm.editTruck = truck;

        vm.saveTruck = saveTruck;
        vm.cancelEdit = cancelEdit;

        vm.statusMessage = '';

        activate();

        function activate() {
        }

        function cancelEdit() {
            vm.modalInstance.close(false);
        }

        function saveTruck() {
            if (angular.isDefined(vm.editTruck.TruckId) && vm.editTruck.TruckId > 0) {
                updateTruck();
            }
            else {
                createTruck();
            }
        }

        function updateTruck() {
          TruckService.updateTruck(vm.editTruck)
              .then(function () {
                  vm.modalInstance.close(false);
              }
              , function (error){
                vm.statusMessage = error.data.ResponseStatus.Message;
              })
        }

        function createTruck() {
            TruckService.createTruck(vm.editTruck)
                .then(function () {
                        vm.modalInstance.close(false);
                    }
                    , function (error){
                        vm.statusMessage = error.data.ResponseStatus.Message;
                    })
        }

    }

})();
