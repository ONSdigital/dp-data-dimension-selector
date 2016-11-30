$(function() {
    var dataset = $('body').data('dataset');

    var selected = JSON.parse(localStorage.getItem(dataset + '-selected')) || {
            age: {
                "all": true,
                "16-and-over": true,
                "16-to-24": true,
                "25-to-34": true,
                "35-to-49": true,
                "50-and-over": true
            },
            sex: {
                "female": true,
                "male": true
            },
            residence: {
                "all": true,
                "household": true,
                "communal": true
            },
            locations: {
                "K04000001":true,
                "E92000001":true,
                "E12000001":true,
                "E06000047":true,
                "E06000005":true,
                "E06000001":true,
                "E06000002":true,
                "E06000048":true,
                "E06000003":true,
                "E06000004":true,
                "E08000020":true,
                "E08000021":true,
                "E08000022":true,
                "E08000023":true,
                "E08000024":true,
                "E12000002":true,
                "E12000003":true,
                "E12000004":true,
                "W92000004":true
            }
        };

    var locationList = [];

    fetchLocations(function () {
        populateData();
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
        $.each(selected, function (key, value) {

            var selectedList = $('.selected-' + key);
            $.each(value, function (childKey, childValue) {
                if (childValue) {
                    var selectedText = '';
                    switch (key) {
                        case 'locations':
                            var location = locationList.find(function (location) {
                                return location.id === childKey;
                            });
                            selectedText = location.name;
                            break;
                        default:
                            selectedText = $('#' + key + '-' + childKey).text();
                            break;
                    }
                    selectedList.append(wrapInDiv(selectedText));
                }
            });
        });
        saveToLocalStorage();
    }

    function fetchLocations(callback) {
        $.get('data/locations.json', function (response) {
            locationList = flattenLocationTree(response);
            callback();
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
        localStorage.setItem(dataset + '-selected', JSON.stringify(selected));
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