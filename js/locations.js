$(function() {

    var vm = {
        locationList: [],
        locationData: null,
        selectedLocations: []
    };

    // initialize

    renderSearchWidget();
    renderSearchInput();
    fetchLocations(function () {
        bindHandlers();
    });


    function bindHandlers() {
        $('#apply-changes').on('click', function (evt) {
            evt.preventDefault();
            storeLocations();

            console.error('Applying changes not implemented yet');
            //redirectToPath('selector.html');
        });

        $('#cancel-changes').on('click', function (evt) {
            evt.preventDefault();
            redirectToPath('selector.html');
        });

        $('#add-location').on('click', function (evt) {
            evt.preventDefault();
            renderSearchInput();
        });
    };

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
    
    function renderSearchInput() {
        var index = vm.selectedLocations.length;
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
                    <input class="location-search">
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
                console.log(vm.selectedLocations)
            }
        });

        $widget.find('.remove-btn').on('click', function (evt) {
            var $widget = $(this).closest('.ui-widget');
            var dataIndex = $widget.data('index');
            vm.selectedLocations.splice(dataIndex, 1);
            $widget.remove();
        })
    }


    function storeLocations() {
        console.error('Storing locations not implemented yet');
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