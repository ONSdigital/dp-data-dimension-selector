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

    main.innerHTML = `
        <h1 class="margin-top--5 margin-bottom--0"">Loading...</h1>
        <p class="page-intro__content margin-bottom-md--8">Please wait while generate your file.</p>
    `;
    setTimeout(displayDownload, 2000);
});

function displayDownload() {
    main.innerHTML = `
        <h1 class="margin-top--5 margin-bottom--0"">Download options</h1>
      	<p class="page-intro__content margin-top--half margin-bottom--2">These file is available for you to download.</p>
      	<p class="margin-top--0 margin-bottom--0"><a href="files/dataset.xlsx" class="btn btn--primary btn--big btn--thick btn--wide">XLS (481KB)</a></p>
        <p class="margin-top--0 margin-bottom--0"><a href="files/dataset.csv" class="btn btn--primary btn--big btn--thick btn--wide">CSV (10KB)</a></p>
        <!--<a href="files/dataset.json" class="btn btn--primary btn--big btn--thick btn--wide margin-top-md--2">JSON (10KB)</a>-->
		<p class="margin-bottom-md--2 margin-bottom-lg--2">
			<strong>Supporting information</strong><br />
			&middot;&nbsp;<a href="./files/background-notes.pdf" target="_blank">Background notes</a> (PDF, 168KB)
		</p>
		<p><a href="files/dataset.zip" class="btn btn--primary btn--big btn--thick btn--wide margin-top-md--2">Download all as ZIP (ZIP, 163KB)</a></p>
		
    `;
}

$(function () {
    $('.foldable').foldable({
        expanded: false,
        expandable: true
    })
});