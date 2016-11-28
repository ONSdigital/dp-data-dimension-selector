$(function() {

    var SCREEN = {
        BROWSE: 'browse',
        SEARCH: 'search'
    };
    var dataset = $('body').data('dataset');
    var vm = {
        locationList: [],
        locationData: null,
        selectedLocations: [],
        storedData: localStorage.getItem(dataset + '-selected'),
        currentScreen: SCREEN.BROWSE
    };

    vm.selectedLocations = vm.storedData ? Object.keys(JSON.parse(vm.storedData).locations) : ["K04000001"];

    (function init() {
        bindTopLevelHandlers();
        fetchLocations(function () {
            renderScreen();
        });
    })();

    function bindTopLevelHandlers() {
        $('#apply-changes').on('click', function (evt) {
            evt.preventDefault();
            saveToLocalStorage();
            redirectToPath('selector.html');
        });

        $('#cancel-changes').on('click', function (evt) {
            evt.preventDefault();
            redirectToPath('selector.html');
        });

        $('a.search-locations').on('click', function (evt) {
            evt.preventDefault();
            renderSearchWidget();
        });

        $('a.browse-locations').on('click', function (evt) {
            evt.preventDefault();
            renderBrowseWidget();
        });

        $('.select-all').on('click', function () {
            toggleSelectAll(true);
            updateLocationCount();
            updateSelectAllButtons();
        });

        $('.deselect-all').on('click', function () {
            !toggleSelectAll(false);
            updateLocationCount();
            updateSelectAllButtons();
        });
    }

    function renderScreen() {
        switch (vm.currentScreen) {
            case SCREEN.SEARCH:
                renderSearchWidget();
                break;
            case SCREEN.BROWSE:
                renderBrowseWidget();
                break;
        }
    }
    function renderSearchWidget() {
        vm.currentScreen = SCREEN.SEARCH;
        var widget = $('#widget').replaceWith(`
            <div id="widget" class="widget-search wrapper">
                <!-- dynamic search inputs -->
                <div class="col margin-top--double widget-footer">                
                    <a id="add-location">Add another location</a>
                </div>
            </div>
        `);

        vm.selectedLocations.forEach(function (locationId) {
            renderSearchInput(vm.locationList.find(function (location) {
                return location.id === locationId
            }));
        });

        $('#add-location').on('click', function (evt) {
            evt.preventDefault();
            renderSearchInput();
        });

        $('a.search-locations').toggleClass('hidden', true);
        $('a.browse-locations').toggleClass('hidden', false);

        updateLocationCount();
        updateSelectAllButtons();
    }

    function renderSearchInput(location) {

        var locationName = location ? location.value : '';
        var index = location ? vm.selectedLocations.indexOf(location.id) : vm.selectedLocations.length;
        var $widget = $('#widget');

        $locationInput = $(`
            <div class="wrapper margin-top--half ui-widget" data-index="${index}">
                <div class="col">
                    <label class="font-size--17 margin-right--double">Location name</label>                
                    <a class="remove-btn">Remove</a>
                </div>
                <div class="col margin-bottom--half">
                    <input class="location-search col--md-15 col--lg-15" value="${locationName}">
                </div>                
            </div>        
        `);

        $widget.find('> .widget-footer:last-child').before($locationInput);
        updateRemoveBtnsVisibility();

        $locationInput.find('input.location-search').autocomplete({
            source: function (request, response) {
                response(vm.locationList.filter(function (item) {
                    var notSelected = vm.selectedLocations.indexOf(item.id) === -1;
                    var containsTerm = item.value.indexOf(request.term) > -1;
                    return notSelected && containsTerm;
                }))
            },
            select: function( event, ui ) {
                var dataIndex = $(this).closest('.ui-widget').data("index");
                vm.selectedLocations[dataIndex] = ui.item.id;
                updateLocationCount();
            }
        });

        $locationInput.find('.remove-btn').on('click', function (evt) {
            var $widget = $(this).closest('.ui-widget');
            var dataIndex = $widget.data('index');

            vm.selectedLocations.splice(dataIndex, 1);
            $widget.remove();

            // reindex ui-widgets
            $('#widget.widget-search').find('.ui-widget').each(function (index, widget) {
                $(widget).data('index', index);
            });

            updateLocationCount();
            saveToLocalStorage();
            updateRemoveBtnsVisibility();
        });
    }

    function renderBrowseWidget() {
        vm.currentScreen = SCREEN.BROWSE;
        $('#widget').replaceWith(`
            <div id="widget" class="widget-browse wrapper">  
            <!-- dynamic foldable selectors -->
            </div>
        `);

        vm.locationData.forEach(function (location) {
            renderFoldableSearchSelector(location, $('#widget'));
        });

        $('a.search-locations').toggleClass('hidden', false);
        $('a.browse-locations').toggleClass('hidden', true);

        $('[id*="location-"]').on('change', function(evt) {
            var $checkbox = $(this);
            updateChildrenCheckBoxes($checkbox);
            updateSelectAllCheckBoxes();
            updateSelectedLocations();
            updateSelectAllButtons();
            updateLocationCount();
        });

        restoreSelectedLocations();
        updateSelectedLocations();
        updateLocationCount();
        updateSelectAllButtons();
    }

    function renderFoldableSearchSelector(location, $node, depth) {
        var depth = depth !== undefined ? depth :  0;
        var $selector = $('<div class="foldable-container"></div>');
        var isParent = location.options !== undefined && location.options.length > 0;

        $selector.foldable({
            labelHtml: depth === 0 ? null : generateLocationHeader(location, depth),
            contentHtml: null,
            replace: true,
            //expandable: isParent,
            expanded: depth === 0
        });
        $node.append($selector);


        var $body = $selector.find('.foldable-body');

        // generate body header buttons
        var headerCheckBoxes = [];
        headerCheckBoxes.push(generateLocationCheckBoxItem(location));
        if (location.options && location.options.length > 0) {
            headerCheckBoxes.push(generateLocationCheckBoxItem({
                name: 'All locations in ' + location.name,
                id: location.id + '-select-all-children'
            }));
        }

        if (depth === 0) {
            $body
                .append('<a class="show-all float-right margin-top--half" data-toggle="true">Show all</a>')
                .append('<a class="hide-all float-right margin-top--half hidden" data-toggle="false">Hide all</a>')
                .append($('<div class="margin-bottom"></div>').append(headerCheckBoxes));

            $('.show-all,.hide-all').on('click', function () {
                toggleExpandAll($(this).data('toggle'));
            });

        } else {
            $body.append($('<div class="margin-bottom--double"></div>').append(headerCheckBoxes));
        }

        // generate body
        depth ++;
        if (!isParent) return;
        location.options.forEach(function (locObj) {
            if (depth < 3) {
                renderFoldableSearchSelector(locObj, $body, depth);
            } else {
                var columnCheckBoxes = $('<div class="col-wrap"></div>')
                    .append(generateLocationCheckBoxColumn(locObj));
                $body.append(columnCheckBoxes);
            }
        });
    }

    function updateChildrenCheckBoxes($checkbox) {
        var isChecked = $checkbox.prop('checked');
        var isParent = /-select-all-children$/.test($checkbox.prop('id'));
        var allChecked = true;

        if (!isParent) {
            $checkbox
                .closest('.foldable')
                .find('input[id*="location-"]:gt(1)')
                .each(function (index, input) {
                    if (!$(input).prop('checked')) {
                        allChecked = false;
                    }
                });
        }

        if (isParent || (!isParent && allChecked)) {
            var checked = isParent ? isChecked : allChecked === true;
            $checkbox
                .closest('.foldable')
                .find('input[id*="location-"]:not(:first)')
                .prop('checked', checked);
        }
    }

    function updateSelectAllCheckBoxes() {
        $('input[id*="-select-all-children"]').each(function (parentIndex, parent) {
            var allSelected = true;
            var $parent = $(parent);
            var children = $parent
                .closest('.foldable')
                .find('input[id*="location-"]:gt(0)');

            var index = 0;
            while (allSelected && index < children.length - 1) {
                $location = $(children[index]);
                if (!/-select-all-children$/.test($location.prop('id'))) {
                    allSelected = $location.prop('checked');
                }
                index ++;
            }

            $parent.prop('checked', allSelected);
        });
    }

    function toggleExpandAll(expanded) {
        if (expanded === undefined) {
            expanded = false;
        }

        $('.foldable:gt(0)').toggleClass('expanded', expanded);
        $('.show-all').toggleClass('hidden', expanded);
        $('.hide-all').toggleClass('hidden', !expanded);
    }

    function toggleSelectAll(enabled) {
        if (enabled === undefined) {
            enabled = false;
        }

        if (enabled) {
            vm.selectedLocations = vm.locationList.map(function (location) {
                return location.id;
            })
        } else {
            vm.selectedLocations = [];
        }

        switch (vm.currentScreen) {
            case SCREEN.SEARCH:
                renderSearchWidget();
                renderSearchInput();
                break;
            case SCREEN.BROWSE:
                updateLocationCheckboxes();
                updateSelectAllCheckBoxes();
                updateSelectAllButtons();
                break;
        }
    }

    function restoreSelectedLocations() {
        vm.selectedLocations.forEach(function (locationId) {
            var $checkbox = $('input#location-' + locationId);
            $checkbox.prop('checked', true);
            updateSelectAllCheckBoxes();
        });
    }

    function updateLocationCheckboxes() {
        $('input[id*="location-"]').each(function(index, input) {
            var $input = $(input);
            var id = $input.data('value').toString();
            $input.prop('checked', vm.selectedLocations.indexOf(id) > -1);
        });
    }

    function updateSelectAllButtons() {
        var allSelected = vm.selectedLocations.length === vm.locationList.length;
        $('.select-all').toggleClass('hidden', allSelected);
        $('.deselect-all').toggleClass('hidden', !allSelected);
    }

    function updateSelectedLocations() {

        var selectedLocations = [];
        $('input[type="checkbox"]').each(function (index, input) {
            var $input = $(input);

            if (/-select-all-children$/.test($input.attr('id'))) {
                return;
            }

            if ($input.prop('checked')) {
                selectedLocations.push($input.data('value').toString());
            }
        });
        vm.selectedLocations = selectedLocations;
    }

    function updateLocationCount() {
        $('.locations-total').text(vm.locationList.length);
        $('.locations-selected').text(vm.selectedLocations.length);
    }

    function generateLocationHeader(location, depth) {
        var $element = null;
        switch (depth) {

            case 1:
                $element = $('<h2></h2>');
                break;
            case 2:
                $element = $('<h3></h3>').addClass('font-size--21');
                break;
        }

        if ($element) {
            $element
                .append('<strong>' + location.name + '</strong>')
                .addClass('not-selectable strong');
        }

        return [
            $('<span class="icon icon-arrow-up--dark float-right"></span>'),
            $('<span class="icon icon-arrow-down--dark float-right"></span>'),
            $element
        ];
    }

    function generateLocationCheckBoxItem(location) {
        return $el = $(`            
            <div class="checkbox inline-block margin-right--half flush-top">
                <input id="location-${location.id}" data-value="${location.id}" type="checkbox">
                <label for="location-${location.id}">${location.name}</label>
            </div>            
        `);
    }

    function generateLocationCheckBoxColumn(location) {
        return $(`
            <div class="col col--md-one-third col--lg-one-third margin-bottom--half">
                <div class="checkbox inline-block">
                    <input id="location-${location.id}" data-value="${location.id}" type="checkbox">
                    <label for="location-${location.id}">${location.name}</label>
                </div>
            </div>
        `);
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
            vm.locationData = response.options;
            vm.locationList = flattenLocationTree(vm.locationData);
            callback();
        });
    }

    function flattenLocationTree(data) {

        var list = [];
        var opts = data instanceof Array ? data : [data];

        opts.forEach(function(location) {
            list.push({
                id: location.id,
                value: location.name
            });
            if (location.options instanceof  Array && location.options.length > 0) {
                list = list.concat(flattenLocationTree(location.options));
            }
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

    function updateRemoveBtnsVisibility() {
        $btns = $('.ui-widget .remove-btn');
        $btns.toggleClass('hidden', $btns.length === 1);
    }
});