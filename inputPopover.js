(function ($) {

    var privateMethods = {
        getUID: function (prefix) {
            prefix += ~~(Math.random() * 1000000)
            return prefix
        }
    }
    var methods = {
        init: function (settings) {
            return this.each(function () {

                var $this = $(this),
                    data = $this.data('inputPopover')

                if (!data) {

                    var popoverID = privateMethods.getUID('popover')
                    // $this.attr('data-popover-id', popoverID)
                    $this.data('inputPopover', {
                        target: $this,
                        id: popoverID,
                        created: false,
                        shown: false
                    });
                    //автоскрытие при потери фокуса
                    if (settings.focusOut) {
                        $(document).on('click', function (event) {

                            var data = $this.data('inputPopover'),
                                popoverId = '#' + data.id;
                            if (!data.shown) return;
                            if ($(event.target).closest(popoverId).length || $(event.target).is($this)) return;
                            methods.hide.call($this);
                            event.stopPropagation();
                        })
                    }
                }
            });
        },
        update: function (settings, content) {
            var data = this.data('inputPopover'),
                popoverId = '#' + data.id;
            $(popoverId).html(content);
        },
        show: function (settings, content) {

            var data = this.data('inputPopover'),
                popoverId = '#' + data.id;
            var width = this.outerWidth(),
                left,
                top;
            //сбор информации для позиционирования
            if (!settings.container) {
                left = this.position().left;
                top = this.position().top + this.outerHeight();
            } else {
                left = this.offset().left;
                top = this.offset().top + this.outerHeight();
            }
            //если не создан поповер - создать
            if (!data.created) {
                var popover = $('<div/>', {
                    id: data.id,
                    class: settings.class
                });
                if (!settings.container) {
                    this.parent().append(popover);
                } else {
                    $(settings.container).append(popover);
                }
                this.data('inputPopover').created = true;
            }

            // если есть контент - передать
            if (!!content.length) {
                $(popoverId).html(content);
            }
            $(popoverId).show();
            this.data('inputPopover').shown = true;
            $(popoverId).css({top: top, left: left, width: width});

        },

        hide: function () {
            var popoverId = '#' + this.data('inputPopover').id;
            $(popoverId).hide();
            this.data('inputPopover').shown = false;
        },
        remove: function () {
            var popoverId = '#' + this.data('inputPopover').id;
            $(popoverId).remove();
            this.data('inputPopover').shown = false;
            this.data('inputPopover').created = false;
        }
    }


    $.fn.inputPopover = function (method) {

        var DEFAULTS = {
            container: false,
            class: 'search-popover',
            focusOut: true
        }

        if (typeof method === 'object') {
            var settingsTemp = $.extend(DEFAULTS, method);
            this.data('inputPopoverSettings', settingsTemp)
        }

        var settings = this.data('inputPopoverSettings') || DEFAULTS;

        if (methods[method]) {
            // return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            return methods[method].call(this, settings, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.call(this, settings);

        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.searchPopover');
        }
    }

})(jQuery);

// ** example
// $(function () {
//     // $('.search__input').searchPopover({container: 'body'})
//     $('.search__input').searchPopover()
//
//     $('.search__input').keyup(function () {
//         var text = $(this).val()
//         if (text.length > 2) {
//             $('.search__input').searchPopover('show', '<div>' + text + ' <a href="#" class="btn btn-primary">Кнопка</a></div>')
//         }
//
//     })
// })