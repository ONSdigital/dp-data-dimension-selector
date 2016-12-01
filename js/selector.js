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
            "all": true,
            "female": true,
            "male": true
        },
        residence: {
            "all": true,
            "household": true,
            "communal": true
        },
        locations: {
            "3000001":true,
            "3000002":true,
            "3000003":true,
            "3000004":true,
            "3000005":true,
            "3000006":true,
            "3000007":true,
            "3000008":true,
            "3000009":true,
            "3000010":true,
            "3000011":true,
            "3000012":true,
            "3000013":true,
            "3000014":true,
            "3000015":true,
            "3000016":true,
            "3000017":true,
            "3000018":true,
            "3000019":true,
            "3000020":true,
            "3000021":true,
            "3000022":true,
            "3000023":true,
            "3000024":true,
            "3000025":true,
            "3000026":true,
            "3000027":true,
            "3000028":true,
            "3000029":true,
            "3000030":true,
            "3000031":true,
            "3000032":true,
            "3000033":true,
            "3000034":true,
            "3000035":true,
            "3000036":true,
            "3000037":true,
            "3000038":true,
            "3000039":true,
            "3000040":true,
            "3000041":true,
            "3000042":true,
            "3000043":true,
            "3000044":true,
            "3000045":true,
            "3000046":true,
            "3000047":true,
            "3000048":true,
            "3000049":true,
            "3000050":true,
            "3000051":true,
            "3000052":true,
            "3000053":true,
            "3000054":true,
            "3000055":true,
            "3000056":true,
            "3000057":true,
            "3000058":true,
            "3000059":true,
            "3000060":true,
            "3000061":true,
            "3000062":true,
            "3000063":true,
            "3000064":true,
            "3000065":true,
            "3000066":true,
            "3000067":true,
            "3000068":true,
            "3000069":true,
            "3000070":true,
            "3000071":true,
            "3000072":true,
            "3000073":true,
            "3000074":true,
            "3000075":true,
            "3000076":true,
            "3000077":true,
            "3000078":true,
            "3000079":true,
            "3000080":true,
            "3000081":true,
            "3000082":true,
            "3000083":true,
            "3000084":true,
            "3000085":true,
            "3000086":true,
            "3000087":true,
            "3000088":true,
            "3000089":true,
            "3000090":true,
            "3000091":true,
            "3000092":true,
            "3000093":true,
            "3000094":true,
            "3000095":true,
            "3000096":true,
            "3000097":true,
            "3000098":true,
            "3000099":true,
            "3000100":true,
            "3000101":true,
            "3000102":true,
            "3000103":true,
            "3000104":true,
            "3000105":true,
            "3000106":true,
            "3000107":true,
            "3000108":true,
            "3000109":true,
            "3000110":true,
            "3000111":true,
            "3000112":true,
            "3000113":true,
            "3000114":true,
            "3000115":true,
            "3000116":true,
            "3000117":true,
            "3000118":true,
            "3000119":true,
            "3000120":true,
            "3000121":true,
            "3000122":true,
            "3000123":true,
            "3000124":true,
            "3000125":true,
            "3000126":true,
            "3000127":true,
            "3000128":true,
            "3000129":true,
            "3000130":true,
            "3000131":true,
            "3000132":true,
            "3000133":true,
            "3000134":true,
            "3000135":true,
            "3000136":true,
            "3000137":true,
            "3000138":true,
            "3000139":true,
            "3000140":true,
            "3000141":true,
            "3000142":true,
            "3000143":true,
            "3000144":true,
            "3000145":true,
            "3000146":true,
            "3000147":true,
            "3000148":true,
            "3000149":true,
            "3000150":true,
            "3000151":true,
            "3000152":true,
            "3000153":true,
            "3000154":true,
            "3000155":true,
            "3000156":true,
            "3000157":true,
            "3000158":true,
            "3000159":true,
            "3000160":true,
            "3000161":true,
            "3000162":true,
            "3000163":true,
            "3000164":true,
            "3000165":true,
            "3000166":true,
            "3000167":true,
            "3000168":true,
            "3000169":true,
            "3000170":true,
            "3000171":true,
            "3000172":true,
            "3000173":true,
            "3000174":true,
            "3000175":true,
            "3000176":true,
            "3000177":true,
            "3000178":true,
            "3000179":true,
            "3000180":true,
            "3000181":true,
            "3000182":true,
            "3000183":true,
            "3000184":true,
            "3000185":true,
            "3000186":true,
            "3000187":true,
            "3000188":true,
            "3000189":true,
            "3000190":true,
            "3000191":true,
            "3000192":true,
            "3000193":true,
            "3000194":true,
            "3000195":true,
            "3000196":true,
            "3000197":true,
            "3000198":true,
            "3000199":true,
            "3000200":true,
            "3000201":true,
            "3000202":true,
            "3000203":true,
            "3000204":true,
            "3000205":true,
            "3000206":true,
            "3000207":true,
            "3000208":true,
            "3000209":true,
            "3000210":true,
            "3000211":true,
            "3000212":true,
            "3000213":true,
            "3000214":true,
            "3000215":true,
            "3000216":true,
            "3000217":true,
            "3000218":true,
            "3000219":true,
            "3000220":true,
            "3000221":true,
            "3000222":true,
            "3000223":true,
            "3000224":true,
            "3000225":true,
            "3000226":true,
            "3000227":true,
            "3000228":true,
            "3000229":true,
            "3000230":true
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