var test = $('body').data('test');
console.log ('Viewing test: ', test);

var selected = JSON.parse(localStorage.getItem(test + '-selected')) || {
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
    time: {
        "all": true,
        "jan-1996": true,
        "feb-1996": true,
        "mar-1996": true,
        "jan-1997": true,
        "apr-1997": true,
        "jun-1997": true,
        "dec-1997": true,
        "jan-1998": true,
        "feb-1998": true
    }
};

$('.js-change-sex').click( function() {

    var modalName = $(this).data('modal');
    setCheckBoxesInModal(modalName);
    openModal(modalName);
    setSelectAllButton(modalName);
    onCheckBoxChange(modalName);

    $('#options__sex-save').click(function(e) {
        e.preventDefault();

        $('.selected-' + modalName).empty();

        getCheckBoxesInModal(modalName);

        saveToLocalStorage();

        $('#options__sex-save').off();
        $('.options__sex').hide();
    });

});

$('.js-change-age').click( function() {

    var modalName = $(this).data('modal');
    setCheckBoxesInModal(modalName);
    openModal(modalName);
    setSelectAllButton(modalName);
    onCheckBoxChange(modalName);

    $('#options__age-save').click(function(e) {
        e.preventDefault();

        $('.selected-' + modalName).empty();

        getCheckBoxesInModal(modalName);

        saveToLocalStorage();

        $('#options__age-save').off();
        $('.options__age').hide();
    });

});

$('.js-change-time').click( function() {

    var modalName = $(this).data('modal');
    setCheckBoxesInModal(modalName);
    openModal(modalName);
    setSelectAllButton(modalName);
    onCheckBoxChange(modalName);

    $('#options__time-save').click(function(e) {
        e.preventDefault();

        $('.selected-' + modalName).empty();

        getCheckBoxesInModal(modalName);

        saveToLocalStorage();

        $('#options__time-save').off();
        $('.options__time').hide();
    });

});

$('.js-change-residence').click( function() {

    var modalName = $(this).data('modal');
    setCheckBoxesInModal(modalName);
    openModal(modalName);
    setSelectAllButton(modalName);
    onCheckBoxChange(modalName);

    $('#options__residence-save').click(function(e) {
        e.preventDefault();

        $('.selected-' + modalName).empty();

        getCheckBoxesInModal(modalName);

        saveToLocalStorage();

        $('#options__residence-save').off();
        $('.options__residence').hide();
    });

});

$('.js-close-modal').click(function(e) {
    e.preventDefault();
    var modalName = $(this).data('modal');
    $('.options__' + modalName).hide();
});

function openModal(modalClass) {
    $('.options__' + modalClass).show();
}

function setCheckBoxesInModal(modalClass) {
    $('.options__' + modalClass).find('input').each( function() {
        var option = $(this).data('option');
        var dimension = $(this).data('dimension');
        if (selected[dimension][option]) {
            $(this).prop( "checked", true )
        } else {
            $(this).prop( "checked", false )
        }

    });
}

function getCheckBoxesInModal(modalClass) {
    $('.options__' + modalClass).find('input').each( function() {
        var option = $(this).data('option');
        var dimension = $(this).data('dimension');
        var labelText = $(this).next().text();
        var selectedList = $('.selected-' + modalClass);
        if ($(this).prop( "checked" )) {
            selected[dimension][option] = true;

            //edge case for time with year
            var yearPosixMatch = option.match(/-(\d\d\d\d)$/)
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
    localStorage.setItem(test + '-selected', JSON.stringify(selected));
}


$(function(){
    $.each(selected, function(key, value) {
        //console.log(key, value);
        var selectedList = $('.selected-' + key);
        $.each(value, function(childKey, childValue) {
            //console.log(childKey, childValue);
            if (childValue) {
                var selectedText = $('#' + key + '-' + childKey).text();

                //edge case for time with year
                var yearPosixMatch = childKey.match(/-(\d\d\d\d)$/)
                if (yearPosixMatch && yearPosixMatch.length > 0) {
                    selectedText += ', ' + yearPosixMatch[1]
                }

                //console.log(selectedText);
                selectedList.append(wrapInDiv(selectedText));
            }
        });
    });
});

function setSelectAllButton(modalClass) {
    $('.options__' + modalClass).find('input').each( function() {
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
    $('input').on( "change", function() {
        //alert( "Handler for .change() called." );
        setSelectAllButton(modalClass)
    });
}

$('.js-select-all').click(function() {
    $(this).siblings('form').find('input').each( function() {
        $(this).prop( "checked", true );
    });
    $('.js-select-all').hide();
    $('.js-deselect-all').show();
});

$('.js-deselect-all').click(function() {
    $(this).siblings('form').find('input').each( function() {
        $(this).prop( "checked", false );
    });
    $('.js-select-all').show();
    $('.js-deselect-all').hide();
});
