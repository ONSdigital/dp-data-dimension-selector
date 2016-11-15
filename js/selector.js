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
        "male": true,
        "female": true
    },
    residence: {
        "all": true,
        "household": true,
        "communal": true
    }
};

$('.js-change-sex').click( function() {

    var modalName = $(this).data('modal');
    setCheckBoxesInModal(modalName);
    openModal(modalName);

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

    $('#options__age-save').click(function(e) {
        e.preventDefault();

        $('.selected-' + modalName).empty();

        getCheckBoxesInModal(modalName);

        saveToLocalStorage();

        $('#options__age-save').off();
        $('.options__age').hide();
    });

});

$('.js-change-residence').click( function() {

    var modalName = $(this).data('modal');
    setCheckBoxesInModal(modalName);
    openModal(modalName);

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
                //console.log(selectedText);
                selectedList.append(wrapInDiv(selectedText));
            }
        });
    });
});
