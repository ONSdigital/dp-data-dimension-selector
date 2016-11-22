$(function() {
    var vm = {
        locationList: [],
        locationData: null
    };

    fetchLocations(function () {
        initAutocomplete();
    });

    function initAutocomplete() {
        $('input.location-search').autocomplete({
            source: vm.locationList
        });
    }

    function fetchLocations(callback) {
        $.get('data/locations.json', function(response) {
            vm.locationData = response;
            vm.locationList = flattenLocationTree(response);
            callback();
        });
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