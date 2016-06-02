(function() {
  'use strict';

  angular
      .module('food')
      .filter('jsonDate', jsonDate);

  /** @ngInject */
  function jsonDate($filter) {
    function dateFilter(input, format) {
      return (input) ? $filter('date')(parseInt(input.substr(6)), format) : '';
    }
    return dateFilter;
  }

  angular
    .module('food')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(TruckService, FoodItemService, $modal) {
    var vm = this;
    vm.modalHandler = $modal;

    vm.loadingTrucks = true;
    vm.trucks = [];
    vm.truckFilterText = '';
    vm.truckSort = '-AverageRating';
    vm.selectedTruckId = 0;
    vm.addingTruck = false;
    vm.editorTruck = {Name: '', ImageUrl: ''};
    vm.loadingItems = false;
    vm.items = [];
    vm.addingItem = false;
    vm.editorItem = {Date: '', FoodName: '', PersonName: '', Rating: 0, Comments: ''};
    vm.statusMessage = '';

    vm.addTruck = addTruck;
    vm.editTruck = editTruck;
    vm.initializeNewTruck = initializeNewTruck;
    vm.refreshTrucks = refreshTrucks;
    //vm.createTruck = createTruck;
    vm.refreshItems = refreshItems;
    vm.addFoodItem = addFoodItem;
    vm.editFoodItem = editFoodItem;
    vm.initializeNewFoodItem = initializeNewFoodItem;
    //vm.changeRatingValue = changeRatingValue;
    //vm.createFoodItem = createFoodItem;
    vm.deleteFoodItem = deleteFoodItem;

    activate();

    function activate() {
      refreshTrucks();
    }

    function refreshTrucks() {
      TruckService.getTrucks()
          .then(function (response){
            vm.trucks = response;
          })
          .finally(function () {
            vm.loadingTrucks = false;
          })
      refreshItems(vm.selectedTruckId);
    }

    function initializeNewTruck() {
      vm.addingTruck = false;
      vm.editorTruck.Name = '';
      vm.editorTruck.ImageUrl = '';
    }

    function addTruck() {
      //vm.addingTruck = true;
      //refreshItems(0);

      var modalInstance = openTruckModal({});

      modalInstance.result.then(function () {
        refreshTrucks();
      }, function () {
        refreshTrucks();
      });
    }

    function editTruck(truck) {
      var modalInstance = openTruckModal(truck);

      modalInstance.result.then(function () {
        refreshTrucks();
      }, function () {
        refreshTrucks();
      });
    }

    function openTruckModal(truck) {
      return vm.modalHandler.open({
        templateUrl: 'app/editTruck/edit-truck.html',
        controller: 'EditTruckController as ctrl',
        resolve: {
          truck: truck
        }
      });
    }

    //function createTruck() {
    //  TruckService.createTruck(vm.editorTruck)
    //      .then(function () {
    //        //vm.trucks.push(truck);
    //        refreshTrucks();
    //        initializeNewTruck();
    //      }
    //      , function (error){
    //        vm.statusMessage = error.data.ResponseStatus.Message;
    //      })
    //}

    //function updateTruck() {
    //  TruckService.updateTruck(vm.editorTruck)
    //      .then(function () {
    //        refreshTrucks();
    //      }
    //      , function (error){
    //        vm.statusMessage = error.data.ResponseStatus.Message;
    //      })
    //}


    function refreshItems(truckId) {
      vm.selectedTruckId = truckId;
      if (vm.selectedTruckId > 0) {
        //vm.loadingItems = true;
        initializeNewTruck();
        FoodItemService.getFoodItems(truckId)
            .then(function (response){
              vm.items = response;
              vm.loadingItems = false;
            })
            .finally(function () {
              vm.loadingItems = false;
            })
      }
      else {
        vm.items = [];
      }
      initializeNewFoodItem();
    }

    function initializeNewFoodItem() {
      vm.addingItem = false;
      vm.editorItem.Date= '';
      vm.editorItem.FoodName = '';
      vm.editorItem.PersonName = '';
      vm.editorItem.Rating = 0;
      vm.editorItem.Comments = '';
      vm.editorItem.Rating = 0;
    }

    //function changeRatingValue(increment) {
    //  if ((vm.editorItem.Rating*1) + increment <= 10 && (vm.editorItem.Rating*1) + increment >= 0)
    //  {
    //    vm.editorItem.Rating = (vm.editorItem.Rating*1) + increment;
    //  }
    //}

    function addFoodItem() {
      var modalInstance = openFoodItemModal(vm.selectedTruckId, {});

      modalInstance.result.then(function () {
        refreshTrucks();
      }, function () {
        refreshTrucks();
      });
    }

    function editFoodItem(item) {
      var modalInstance = openFoodItemModal(vm.selectedTruckId, item);

      modalInstance.result.then(function () {
        refreshTrucks();
      }, function () {
        refreshTrucks();
      });
    }

    function openFoodItemModal(truckId, foodItem) {
      return vm.modalHandler.open({
        templateUrl: 'app/editFoodItem/edit-fooditem.html',
        controller: 'EditFoodItemController as ctrl',
        resolve: {
          truckId: truckId,
          foodItem: foodItem
        }
      });
    }

    //function createFoodItem() {
    //  FoodItemService.createFoodItem(vm.selectedTruckId, vm.editorItem)
    //      .then(function () {
    //        refreshTrucks();
    //        //refreshItems(vm.selectedTruckId);
    //        initializeNewFoodItem();
    //      }
    //      , function (error) {
    //            vm.statusMessage = error.data.ResponseStatus.Message;
    //          })
    //}

    function deleteFoodItem(foodItemId) {
      FoodItemService.deleteFoodItem(foodItemId)
          .then(function () {
                refreshTrucks();
                //refreshItems(vm.selectedTruckId);
                initializeNewFoodItem();
              }
              , function (error) {
                vm.statusMessage = error.data.ResponseStatus.Message;
              })
    }


  }
})();
