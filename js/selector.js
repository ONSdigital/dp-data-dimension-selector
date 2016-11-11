var selected = {
    age: {
        "all": true,
        "age-16-and-over": true,
        "age-16-to-24": true,
        "age-25-to-34": true,
        "age-35-to-49": true,
        "age-50-and-over": true
    },
    sex: {
        "male": true,
        "female": true,
        "all": true
    },
    residence: {
        "all": true,
        "lives-in-a-household": true,
        "lives-in-a-communal-establishment": true
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

        $('#options__sex-save').off();
        $('.options__sex').hide();
        console.log(selected);
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
            selectedList.append(wrapInSpan(labelText));
        } else {
            selected[dimension][option] = false;
        }

    });
}

function wrapInSpan(text) {
    return $('<span class="selected__item">' + text + '</span>');
}
