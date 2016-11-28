(function ( $ ) {
    // JQuery foldable
    // Simple JQuery plugin to create foldable blocks.
    // It toggles 'expanded' class name on the top level element

    $.fn.foldable = function(options) {

        var settings = $.extend({
            expanded: false,
            expandable: true,
            replace: false,
            label: '',
            labelHtml: null,
            content: '',
            contentHtml: null,
            template: '\
                <div class="foldable">\
                 <div class="foldable-header"></div>\
                 <div class="foldable-body"></div>\
                </div>\
            '
        }, options);

        var $foldable = $(settings.template);
        var $header = $foldable.children(".foldable-header");

        if (settings.labelHtml) {
            $header.html(settings.labelHtml);
        } else {
            $header.text(settings.label);
        }

        if (settings.expandable) {
            $header.on('click', function () {
                settings.expanded = !settings.expanded;
                $foldable.toggleClass('expanded', settings.expanded);
            }).addClass('expandable');

            if (settings.contentHtml) {
                $foldable.children('.foldable-body').html(settings.contentHtml);
            } else {
                $foldable.children('.foldable-body').text(settings.content);
            }
        }

        $(this).append($foldable);
        $foldable.toggleClass('expanded', settings.expanded);

        // todo: replace element
    };

}( jQuery ));