//'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', '$modal', '$log',
	function($scope, $http, $modal, $log) {
		$scope.myForm = {};
		$scope.myForm.name = this.name;
		$scope.myForm.car = this.car;

		//click on browse
		$scope.getchange = function() {
			console.log("Change trigger");
			var f = document.getElementById('file').files[0],
				r = new FileReader();
			r.onloadend = function(e) {
				var data = e.target.result;
				console.log("Image uploaded f: ", f);
				$scope.myForm.file = f.name,
					$scope.myForm.size = f.size,
					$scope.myForm.type = f.type,
					$scope.myForm.data = data
					//console.log("$scope.myForm.data is: ", $scope.myForm.data);
			};
			r.readAsDataURL(f);
		};

		//click on submit
		$scope.myForm.submit = function() {
			console.log("--> Submitting form");
			var myForm = {
				name: $scope.myForm.name,
				car: $scope.myForm.car,
				file: $scope.myForm.file,
				size: $scope.myForm.size,
				type: $scope.myForm.type,
				data: $scope.myForm.data
			};
			console.log(myForm);
			$http.post('/myForm/new/create', myForm).success(function(response) {
				//find all objects
				$http.get('/myForm/new/create/').success(function(response) {
					//console.log("get in post response " , response );
					$scope.myForms = response;
				});
			});
		};

		//click on Delete icon
		$scope.remove = function(id) {
			//console.log(id);
			//console.log($scope.myForms.length);
			if (confirm("Are You Sure to Delete?") == true) {
				//Find index function
				function indexOf(array, obj) {
					console.log("Total", array.length);
					//if (array.indexOf) return array.indexOf(obj);
					for (var i = 0; i < array.length; i++) {
						console.log(array[i]);
						if (obj === array[i]._id) {
							array.splice(i, 1);
							return i;
						}
					}
					return -1;
				}

				//Delete function call & DB delete Route
				var index = indexOf($scope.myForms, id);
				console.log("INDEX  ", index);
				$http.delete('/myForm/new/' + id).success(function(data, status) {
					console.log(data);
				});
			}
		};

		//click on Edit icon (Open Modal)
		$scope.open = function(data) {
			$scope.myForm = data;
			console.log("DATS", data);

			var modalInstance = $modal.open({
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceCtrl',
				//data: data,
				resolve: {
					myForm: function() {
						return $scope.myForm;
					}
				}
			});
			/*modalInstance.result.then(function(selectedItem) {
				console.log("modal instance", selectedItem);
				//$scope.myForms = selectedItem;
			}, function() {
				//$log.info('Modal dismissed at: ' + new Date());
			});*/
		};
	}
]);

angular.module('core').controller('ModalInstanceCtrl', function($scope, $http, $modalInstance, myForm) {
	console.log(myForm, "UPDATE MODAL");
	$scope.myForm = myForm;

	//Save updated record on Edit click
	$scope.save = function(data) {
		$scope.myForm = data;
		console.log("data:", $scope.myForm);
		//DB Route to update
		$http.post('/myForm/new/' + $scope.myForm._id, $scope.myForm).success(function(response) {
			console.log("client update called", $scope.myForm._id);
			//find all objects
			$http.get('/myForm/new/create/').success(function(response){  
				console.log("after update, save response " , response );
				$scope.myForms=response;
			});
		});	
		$modalInstance.close($scope.myForms);
	};
	
	$scope.cancel = function() {
		//$modalInstance.close($scope.myForms);
		$modalInstance.dismiss('cancel');
	};
});
