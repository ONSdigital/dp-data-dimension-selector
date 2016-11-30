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
        console.log('Please select at least one file format');
        formError.innerHTML = 'Please select at least one file format';
        return false;
    }
    formError.innerHTML = '';

    // Disable checkboxes during file generate
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = true;
    }

    downloadBody.innerHTML = `
        <h1 class="margin-top--5 margin-bottom--0"">Loading...</h1>
        <p class="page-intro__content margin-bottom-md--8">Please wait while generate your file.</p>
    `;
    setTimeout(displayDownload, 2000);
});

function displayDownload() {
    downloadBody.innerHTML = `
        <h1 class="margin-top--5 margin-bottom--0"">Download file</h1>
        <a href="files/dataset.zip" class="btn btn--primary btn--big btn--thick btn--wide margin-top-md--2 margin-bottom-md--8">Download dataset (ZIP, 2MB)</a>
    `;
}

$(function () {
    $('.foldable').foldable({
        expanded: false,
        expandable: true
    })
});