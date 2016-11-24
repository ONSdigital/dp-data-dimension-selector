(function ( $ ) {

    // dependency: font-awesome
    // <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
    // dynamic css classes added to top level element: `expanded` or `folded`

    $.fn.foldable = function(options) {

        var settings = $.extend({
            expanded: false,
            replace: false,
            label: '',
            labelIsHTML: false,
            content: '',
            contentIsHTML: false,
            template: '\
                <div class="foldable">\
                 <div class="foldable-header"></div>\
                 <div class="foldable-body"></div>\
                </div>\
            '
        }, options );

        var $header = $(settings.headerTpl);
        if (settings.html) {
            $header.html(settings.html)
        } else {
            $header.text(settings.text)
        }

        $foldable = $(settings.template);
        $foldable.find('.foldable-header')[settings.labelIsHTML ? 'html' : 'text'](settings.label);
        $foldable.find('.foldable-body')[settings.contentIsHTML ? 'html' : 'text'](settings.content);

        if (settings.replace) {
            $(this).html($foldable);
        } else {
            $(this).append($foldable);
        }
    };

}( jQuery ));