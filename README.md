** example
```
$(function () {
    // $('.search__input').searchPopover({container: 'body'})
    $('.search__input').searchPopover()

    $('.search__input').keyup(function () {
        var text = $(this).val()
        if (text.length > 2) {
            $('.search__input').searchPopover('show', '<div>' + text + ' <a href="#" class="btn btn-primary">Кнопка</a></div>')
        }

    })
})
```
