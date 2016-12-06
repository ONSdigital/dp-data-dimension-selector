$(function() {

    var selected;
    var locationList = [];

	selected = JSON.parse(localStorage.getItem(config.storageKey)) || config.selected;

	fetchLocations(function (data) {
		locationList = data;
		populateData();
		saveToLocalStorage();
	});


    $('.js-change-sex').click(function () {

        var modalName = $(this).data('modal');
        setCheckBoxesInModal(modalName);
        openModal(modalName);
        setSelectAllButton(modalName);
        onCheckBoxChange(modalName);

        $('#options__sex-save').click(function (e) {
            e.preventDefault();

            $('.selected-' + modalName).empty();
            getCheckBoxesInModal(modalName);
            saveToLocalStorage();

            $('#options__sex-save').off();
            $('.options__sex').hide();
        });

    });

    $('.js-change-age').click(function () {

        var modalName = $(this).data('modal');
        setCheckBoxesInModal(modalName);
        openModal(modalName);
        setSelectAllButton(modalName);
        onCheckBoxChange(modalName);

        $('#options__age-save').click(function (e) {
            e.preventDefault();

            $('.selected-' + modalName).empty();
            getCheckBoxesInModal(modalName);
            saveToLocalStorage();

            $('#options__age-save').off();
            $('.options__age').hide();
        });

    });

    $('.js-change-residence').click(function () {

        var modalName = $(this).data('modal');
        setCheckBoxesInModal(modalName);
        openModal(modalName);
        setSelectAllButton(modalName);
        onCheckBoxChange(modalName);

        $('#options__residence-save').click(function (e) {
            e.preventDefault();

            $('.selected-' + modalName).empty();
            getCheckBoxesInModal(modalName);
            saveToLocalStorage();

            $('#options__residence-save').off();
            $('.options__residence').hide();
        });
    });

    $('.js-close-modal').click(function (e) {
        e.preventDefault();
        var modalName = $(this).data('modal');
        $('.options__' + modalName).hide();
    });


    function populateData() {
        $.each(selected, function (key, data) {

            var selectedList = $('.selected-' + key);
            var counter = 0;
            var limit = 10;
            for(var itemKey in data) {
                counter ++;
                if (data.hasOwnProperty(itemKey)) {
                    var selectedText = '';

                    switch (key) {
                        case 'locations':
                            var location = locationList.find(function (location) {
                                return location.id === itemKey;
                            });
                            selectedText = location.name;
                            break;
                        default:
                            selectedText = $('#' + key + '-' + itemKey).text();
                            break;
                    }

                    if (counter < limit) {
                        selectedList.append(wrapInDiv(selectedText));
                    } else {
                        if (counter === limit) {
                            var $foldableBox = $('<div class="foldable-container"></div>');
                            selectedList.append($foldableBox);
                            $foldableBox.foldable({
                                expanded: false,
                                expandable: true,
                                labelHtml: `<a>All locations</a>`
                            });
                        }
                        $('.foldable-container .foldable').addClass('locations');
                        $('.foldable-container .foldable-body').append(wrapInDiv(selectedText));
                    }

                }
            }


        });
    }

    function fetchDefaults(callback) {
        $.get('data/defaults.json', function (response) {
            callback(response);
        });
    }

    function fetchLocations(callback) {
        $.get('data/locations.json', function (response) {
            var locationList = flattenLocationTree(response);
            callback(locationList);
        });
    }

    function flattenLocationTree(data) {

        var list = [];
        var opts = data.options || [];

        list.push({
            id: data.id,
            name: data.name
        });

        opts.forEach(function (item) {
            list = list.concat(flattenLocationTree(item));
        });

        return list;
    }

    function openModal(modalClass) {
        $('.options__' + modalClass).show();
    }

    function setCheckBoxesInModal(modalClass) {
        $('.options__' + modalClass).find('input').each(function () {
            var option = $(this).data('option');
            var dimension = $(this).data('dimension');
            if (selected[dimension][option]) {
                $(this).prop("checked", true);
            } else {
                $(this).prop("checked", false);
            }

        });
    }

    function getCheckBoxesInModal(modalClass) {
        $('.options__' + modalClass).find('input').each(function () {
            var option = $(this).data('option');
            var dimension = $(this).data('dimension');
            var labelText = $(this).next().text();
            var selectedList = $('.selected-' + modalClass);
            if ($(this).prop("checked")) {
                selected[dimension][option] = true;

                // special case for date selector
                var yearPosixMatch = option.match(/-(\d\d\d\d)$/);
                if (yearPosixMatch && yearPosixMatch.length > 0) {
                    labelText += ', ' + yearPosixMatch[1]
                }

                selectedList.append(wrapInDiv(labelText));
            } else {
                selected[dimension][option] = false;
            }

        });
    }

    function wrapInDiv(text) {
        return $('<div class="selected__item">' + text + '</div>');
    }

    function saveToLocalStorage() {
        localStorage.setItem(config.storageKey, JSON.stringify(selected));
    }

    function setSelectAllButton(modalClass) {
        $('.options__' + modalClass).find('input').each(function () {
            $('.js-select-all').hide();
            $('.js-deselect-all').show();
            if ($(this).prop('checked') != true) {
                $('.js-select-all').show();
                $('.js-deselect-all').hide();
                return false;
            }

        });
    }

    function onCheckBoxChange(modalClass) {
        $('input').on("change", function () {
            setSelectAllButton(modalClass);
        });
    }

    $('.js-select-all').click(function () {
        $(this).siblings('form').find('input').each(function () {
            $(this).prop("checked", true);
        });
        $('.js-select-all').hide();
        $('.js-deselect-all').show();
    });

    $('.js-deselect-all').click(function () {
        $(this).siblings('form').find('input').each(function () {
            $(this).prop("checked", false);
        });
        $('.js-select-all').show();
        $('.js-deselect-all').hide();
    });
});