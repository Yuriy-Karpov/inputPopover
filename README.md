# inputPopover
This jQ plugin creates a popover under the input tag on which it is called

## settings
 Option | Type | Default | Description
 ------ | --------------- | ------ | -----------
 container |  string \| false | false | Appends the popover to a specific element. Example: container: 'body'. <br/>This option is particularly useful in that it allows you to position the popover <br/> in the flow of the document near the triggering element - which will prevent <br/> the popover from floating away from the triggering element during a window resize.
 class | string | 'search-popover' |  class add popover
 focusOut  |  boolean  |  true  |  close when losing focus
 parentWidth  |  string \| false  | false  |  uses the width of the specified element, defaults to the width of the input

## Methods
```
var content = '<div> </div>'
$($0).inputPopover('show', content)
```

## example
```
$(function () {
    $('.search__input').inputPopover()

  // simply initialize the plugin or initialize the settings $($0).inputPopover({container: 'body'})


  // now can cause Popover and give him the content

    $('.search__input').keyup(function () {
        var text = $(this).val()
        if (text.length > 2) {
            $('.search__input').inputPopover('show', '<div>' + text + ' <a href="#" class="btn btn-primary">search</a></div>')
        }

    })
})
```
