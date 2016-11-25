$(function() {

    var dataset = $('body').data('dataset');
    var vm = {
        locationList: [],
        locationData: null,
        selectedLocations: [],
        storedData: localStorage.getItem(dataset + '-selected')
    };

    vm.selectedLocations = vm.storedData ? Object.keys(JSON.parse(vm.storedData).locations) : ["K04000001"];

    (function init() {
        bindTopLevelHandlers();
        fetchLocations(function () {
            //renderSearchWidget();
            renderBrowseWidget();
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
    }

    function renderSearchWidget() {
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

        updateRemoveBtnsVisibility();

        $widget.find('input.location-search').autocomplete({
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
            }
        });

        $widget.find('.remove-btn').on('click', function (evt) {
            var $widget = $(this).closest('.ui-widget');
            var dataIndex = $widget.data('index');
            vm.selectedLocations.splice(dataIndex, 1);
            $widget.remove();
            saveToLocalStorage();
            updateRemoveBtnsVisibility();
        });
    }

    function renderBrowseWidget() {
        $('#widget').replaceWith(`
            <div id="widget" class="widget-browse wrapper">  
            <!-- dynamic foldable selectors -->
            </div>
        `);

        vm.locationData.options.forEach(function (location) {
            renderFoldableSearchSelector(location, $('#widget'));
        });

        $('a.search-locations').toggleClass('hidden', false);
        $('a.browse-locations').toggleClass('hidden', true);
    }

    function renderFoldableSearchSelector(location, $node, depth) {
        var depth = depth !== undefined ? depth :  0;
        var $selector = $('<div class="foldable-container"></div>');
        var isParent = location.options !== undefined && location.options.length > 0;

        $selector.foldable({
            labelHtml: generateLocationHeader(location, depth),
            contentHtml: "",
            replace: true,
            expandable: isParent
        });
        $node.append($selector);

        if (!isParent) {
            return;
        }

        var $body = $selector.find('.foldable-body');

        depth ++;
        location.options.forEach(function (locObj) {
            if (depth < 3) {
                renderFoldableSearchSelector(locObj, $body, depth);
            } else {
                $body.append($('<div class="col-wrap"></div>').append(generateLocationCheckBox(locObj)));
            }
        });
    }

    function generateLocationHeader(location, depth) {
        var fontClass = '';

        switch (depth) {
            case 0:
                fontClass = 'font-size--24 strong';
                break;
            case 1:
                fontClass ='font-size--21 strong';
                break;
            case 2:
                fontClass ='font-size--17 strong';
                break;
        }

        return [
            $('<span class="icon icon-arrow-up--dark float-right"></span>'),
            $('<span class="icon icon-arrow-down--dark float-right"></span>'),
            $('<h3>' + location.name + '</h3>').addClass(fontClass),
            $('<div class="col-wrap"></div>').append(generateLocationCheckBox(location))
        ];
    }

    function generateLocationCheckBox(location) {
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

    function updateRemoveBtnsVisibility() {
        $btns = $('.ui-widget .remove-btn');
        $btns.toggleClass('hidden', $btns.length === 1);
    }
});