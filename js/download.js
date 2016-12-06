var main = document.getElementById('main'),
    downloadBody = document.getElementById('download-body'),
    form = document.getElementById('download-form'),
    formInnerHTML = form.innerHTML,
    loadingIcon = document.getElementById('loading-icon'),
    loadingText = document.getElementById('loading-text'),
    continueButton = document.getElementById('continue'),
    checkboxes = document.querySelectorAll('#download-form__options input'),
    formError = document.getElementById('download-form__error'),
    checkedFormats = [],
    i;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate one of checkboxes is selected
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedFormats.push(checkboxes[i].getAttribute('name'));
        }
    }
    if (checkedFormats.length === 0) {
        formError.innerHTML = 'Please select at least one file format';
        return false;
    }
    formError.innerHTML = '';

    // Disable checkboxes during file generate
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = true;
    }

    var selectedFiles = {}
	$(event.target).find('[type=checkbox]').each(function (i, el) {
		selectedFiles[el.name] = el.checked;
	});

	showPanel('download-loader');
    setTimeout(function () {
		showPanel('download-links');
		$('#download-links').find('[data-format]').each(function (index, element) {
			var $el = $(element);
			$el.toggleClass('hidden', !selectedFiles[$el.data('format')]);

		})
	}, 2000);
});

function showPanel(panelId) {
	var ids = ['download-form', 'download-loader', 'download-links'];
	ids.forEach(function (id) {
		$('#' + id).toggleClass('hidden', panelId !== id);
	})
}

$(function () {
    $('.foldable').foldable({
        expanded: false,
        expandable: true
    })
});