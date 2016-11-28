$(function() {

    var dataset = $('body').data('dataset');
    var vm = {
        locationList: [],
        locationData: null,
        selectedLocations: [],
        storedData: localStorage.getItem(dataset + '-selected')
    };

    vm.selectedLocations = vm.storedData ? Object.keys(JSON.parse(vm.storedData).locations) : ["K04000001"];

    // initialize

    renderSearchWidget();
    fetchLocations(function () {
        bindHandlers();
        vm.selectedLocations.forEach(function (locationId) {
           renderSearchInput(vm.locationList.find(function (location) {
               return location.id === locationId
           }));
        });
    });


    function bindHandlers() {
        $('#apply-changes').on('click', function (evt) {
            evt.preventDefault();
            saveToLocalStorage();
            redirectToPath('selector.html');
        });

        $('#cancel-changes').on('click', function (evt) {
            evt.preventDefault();
            redirectToPath('selector.html');
        });

        $('#add-location').on('click', function (evt) {
            evt.preventDefault();
            renderSearchInput();
        });
    }

    function renderSearchWidget() {
        var widget = $('#widget').replaceWith(`
            <div id="widget" class="widget-search wrapper">
                <!-- dynamic search inputs -->
                <div class="col margin-top--double widget-footer">                
                    <a id="add-location">Add another location</a>
                </div>
            </div>
        `)
    }
    
    function renderSearchInput(location) {

        var locationName = location ? location.value : '';
        var index = location ? vm.selectedLocations.indexOf(location.id) : vm.selectedLocations.length;
        var $widget = $('#widget');

        $widget.find('> .widget-footer:last-child').before(`
            <div class="wrapper margin-top--half ui-widget" data-index="${index}">
                <div class="col col--md-one-third col--lg-one-third">
                    <label class="font-size--17">Location name</label>
                </div>
                <div class="col col--md-one-third col--lg-one-third">
                    <a class="remove-btn">Remove</a>
                </div>
                <div class="col">
                    <input class="location-search" value="${locationName}">
                </div>                
            </div>        
        `);

        $widget.find('input.location-search').autocomplete({
            source: function (request, response) {
                response(vm.locationList.filter(function (item) {
                    return vm.selectedLocations.indexOf(item.id) === -1
                }))
            },
            select: function( event, ui ) {
                var dataIndex = $(this).closest('.ui-widget').data("index");
                vm.selectedLocations[dataIndex] = ui.item.id;
            }
        });

        $widget.find('.remove-btn').on('click', function (evt) {
            var $widget = $(this).closest('.ui-widget');
            var dataIndex = $widget.data('index');
            vm.selectedLocations.splice(dataIndex, 1);
            $widget.remove();
            saveToLocalStorage();
        })
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

    function flattenLocationTree(data) {

        var list = [];
        var opts = data.options || [];

        list.push({
            id: data.id,
            value: data.name
        });

        opts.forEach(function(item) {
            list = list.concat(flattenLocationTree(item));
        });

        return list;
    }

    function saveToLocalStorage() {
        var storageKey = dataset + '-selected';
        var data = JSON.parse(localStorage.getItem(storageKey)) || {};
        data.locations = {};
        vm.selectedLocations.forEach(function (code) {
            data.locations[code] = true; // why? check selector.js JQuery onReady block
        });
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

});