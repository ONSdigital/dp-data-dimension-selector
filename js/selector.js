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
            "1000001":true,
            "1000002":true,
            "1000003":true,
            "1000004":true,
            "1000005":true,
            "1000006":true,
            "1000007":true,
            "1000008":true,
            "1000009":true,
            "1000010":true,
            "1000011":true,
            "1000012":true,
            "1000013":true,
            "1000014":true,
            "1000015":true,
            "1000016":true,
            "1000017":true,
            "1000018":true,
            "1000019":true,
            "1000020":true,
            "1000021":true,
            "1000022":true,
            "1000023":true,
            "1000024":true,
            "1000025":true,
            "1000026":true,
            "1000028":true,
            "1000029":true,
            "1000030":true,
            "1000031":true,
            "1000032":true,
            "1000033":true,
            "1000039":true,
            "1000041":true,
            "1000043":true,
            "1000049":true,
            "1000050":true,
            "1000051":true,
            "1000052":true,
            "1000053":true,
            "1000054":true,
            "1000055":true,
            "1000056":true,
            "1000057":true,
            "1000058":true,
            "1000059":true,
            "1000060":true,
            "1000061":true,
            "1000062":true,
            "1000063":true,
            "1000064":true,
            "1000065":true,
            "1000066":true,
            "1000067":true,
            "1000068":true,
            "1000070":true,
            "1000071":true,
            "1000072":true,
            "1000074":true,
            "1000075":true,
            "1000076":true,
            "1000077":true,
            "1000078":true,
            "1000079":true,
            "1000080":true,
            "1000081":true,
            "1000082":true,
            "1000083":true,
            "1000084":true,
            "1000085":true,
            "1000087":true,
            "1000088":true,
            "1000093":true,
            "1000098":true,
            "1000101":true,
            "1000105":true,
            "1000106":true,
            "1000107":true,
            "1000108":true,
            "1000109":true,
            "1000110":true,
            "1000113":true,
            "1000115":true,
            "1000116":true,
            "1000118":true,
            "1000119":true,
            "1000120":true,
            "1000122":true,
            "1000123":true,
            "1000125":true,
            "1000126":true,
            "1000127":true,
            "1000128":true,
            "1000131":true,
            "1000132":true,
            "1000134":true,
            "1000138":true,
            "1000139":true,
            "1000140":true,
            "1000146":true,
            "1000148":true,
            "1000149":true,
            "1000150":true,
            "1000151":true,
            "1000152":true,
            "1000153":true,
            "1000154":true,
            "1000155":true,
            "1000160":true,
            "1000161":true,
            "1000162":true,
            "1000163":true,
            "1000164":true,
            "1000165":true,
            "1000171":true,
            "1000177":true,
            "1000181":true,
            "1000185":true,
            "1000188":true,
            "1000189":true,
            "1000191":true,
            "1000192":true,
            "1000193":true,
            "1000194":true,
            "1000195":true,
            "1000196":true,
            "1000197":true,
            "1000198":true,
            "1000199":true,
            "1000200":true,
            "1000201":true,
            "1000207":true,
            "1000208":true,
            "1000209":true,
            "1000212":true,
            "1000214":true,
            "1000216":true,
            "1000218":true,
            "1000219":true,
            "1000222":true,
            "1000223":true,
            "1000228":true,
            "1000231":true,
            "1000233":true,
            "1000234":true,
            "1000235":true,
            "1000236":true,
            "1000237":true,
            "1000240":true,
            "1000241":true,
            "1000242":true,
            "1000244":true,
            "1000245":true,
            "1000246":true,
            "1000247":true,
            "1000249":true,
            "1000250":true,
            "1000256":true,
            "1000257":true,
            "1000258":true,
            "1000259":true,
            "1000260":true,
            "1000261":true,
            "1000262":true,
            "1000263":true,
            "1000264":true,
            "1000265":true,
            "1000266":true,
            "1000267":true,
            "1000268":true,
            "1000270":true,
            "1000272":true,
            "1000274":true,
            "1000276":true,
            "1000279":true,
            "1000280":true,
            "1000281":true,
            "1000282":true,
            "1000283":true,
            "1000286":true,
            "1000291":true,
            "1000293":true,
            "1000294":true,
            "1000296":true,
            "1000297":true,
            "1000302":true,
            "1000303":true,
            "1000304":true,
            "1000305":true,
            "1000306":true,
            "1000307":true,
            "1000308":true,
            "1000309":true,
            "1000310":true,
            "1000311":true,
            "1000313":true,
            "1000314":true,
            "1000315":true,
            "1000316":true,
            "1000317":true,
            "1000318":true,
            "1000319":true,
            "1000321":true,
            "1000323":true,
            "1000324":true,
            "1000325":true,
            "1000326":true,
            "1000327":true,
            "1000328":true,
            "1000329":true,
            "1000330":true,
            "1000331":true,
            "1000332":true,
            "1000333":true,
            "1000334":true,
            "1000335":true,
            "1000336":true,
            "1000337":true,
            "1000339":true,
            "1000340":true,
            "1000341":true,
            "1000342":true,
            "1000343":true,
            "1000344":true,
            "1000346":true,
            "1000347":true,
            "1000348":true,
            "1000349":true,
            "1000350":true,
            "1000351":true,
            "1000352":true,
            "1000353":true,
            "1000354":true,
            "1000357":true,
            "1000358":true,
            "1000359":true
        }
    };

    var locationList = [];

    fetchLocations(function () {
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