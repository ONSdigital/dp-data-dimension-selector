$(function() {
    var vm = {
        locationList: [],
        locationData: null,
        selectedLocations: [],
        selectors: 1
    };


    fetchLocations(function () {
        initAutocomplete();
        bindHandlers();
    });

    function initAutocomplete() {
        $('input.location-search').autocomplete({
            source: function (request, response) {
                response(vm.locationList.filter(function (item) {
                    return vm.selectedLocations.indexOf(item.id) === -1
                }))
            },
            select: function( event, ui ) {
                var dataIndex = $(this).parent('.ui-widget').data("index");
                vm.selectedLocations[dataIndex] = ui.item.id;
                console.log(vm.selectedLocations)
            }
        });
    }

    function fetchLocations(callback) {
        $.get('data/locations.json', function(response) {
            vm.locationData = response;
            vm.locationList = flattenLocationTree(response);
            callback();
        });
    }

    function addSelector() {

    }

    function flattenLocationTree(data) {

        var list = [];
        var opts = data.options || [];

        list.push({
            id: data.id,
            value: data.name
        });

        opts.forEach(function(item) {
            list = list.concat(flattenLocationTree(item))
        });

        return list
    }
});