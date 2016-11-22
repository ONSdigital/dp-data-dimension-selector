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

    function bindHandlers() {
        $('#apply-changes').on('click', function (evt) {
            evt.preventDefault();
            storeLocations();
            console.log('applying');
            throw new Error('Not implemented yet');
            //redirectToPath('selector.html');
        });

        $('#cancel-changes').on('click', function (evt) {
            evt.preventDefault();
            redirectToPath('selector.html');
        })
    }

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

    function storeLocations() {

    }

    function redirectToPath(path) {
        var parts = window.location.href.split("/");
        if (parts[parts.length - 1].length < 1) {
            parts = parts.splice(parts.length - 1, 1);
        }
        parts[parts.length - 1] = path;
        var href = parts.join("/");
        window.location.href = href;
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