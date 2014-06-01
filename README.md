# Angular flash messages

This simple little thing provides you with a service and directives that let you
display Rails-like flash messages in your Angular applications. It has no other
dependencies than Angular.js itself, and is super easy to work with.

## Usage

All you really have to do is insert the `flash-messages` element directive into
your DOM somewhere.

```html
<html>
    <head>
        <script src="angular.js"></script>
        <script src="flash.js"></script>
    </head>
    <body ng-app="superheroes">
        <!-- Your flash messages will appear here: -->
        <flash-messages></flash-messages>
    </body>
</html>
```

This does indeed put all your flash messages into that spot, but without any
content, your users won't be able to see anything. So let's go ahead and write
some sweet flash messages. For this, we simply inject the `flash` service:

```javascript
angular.module("superheroes", [])
  .controller("AppCtrl", function(flash) {
    flash.addMessage("winning", "The Flash won!");
  });
```

With that, we'll see the flash message being displayed properly on the page.

### Clearing the messages

You might want to add a button or something on your page that clears all flash
messages. For that purpose, there is an attribute directive called
`flash-clear`, which clears the messages when the element it is put onto is
clicked. Have a look at an example:

```html
<html>
    <head>
        <script src="angular.js"></script>
        <script src="flash.js"></script>
    </head>
    <body ng-app="superheroes">
        <flash-messages></flash-messages>

        <!-- Click this to clear all messages: -->
        <div flash-clear>Clear flash messages!</div>
    </body>
</html>
```

## Configuration

A few things can be customized in the `flash` service to make it fit better into
your application's needs.

### Message types

First off, notice how we're writing the string _“winning”_ before the actual
message in the previous example. This is the type of flash message that is being
added, and it's a required field – at least for the time being. The only thing
it really affects is how the flash message is being presented. Types are
directly connected to CSS classes, and by adding new types, you can add
different styles to your flash messages. As an example, here's how you could
configure the service to use Twitter Bootstrap alert styles:

```javascript
angular.module("test", ["ngRoute", "flash"])
  .config(function(flashProvider) {
    flashProvider.addType("danger", "alert alert-danger");
    flashProvider.addType("info", "alert alert-info");
    flashProvider.addType("success", "alert alert-success");
    flashProvider.addType("warning", "alert alert-warning");
  });
```

Now, every time you add a new message with the type “info”, the DOM element
generated would have the class `.alert.alert-info`. Of course, you can add
whichever types you want, but remember that no types are added by default. This
means that in order to be able to style your flash messages, you must add at
least one type.

### Events that clear the messages

In order to clear off flash messages on your page, you can use the `flash-clear`
directive as mentioned above. However, you might also want to clear away the
messages when an event has fired. Guess what? There's a configuration option for
this!

The most common use case for this functionality is probably when navigating to
other parts of your application, so let's have a look at how you would configure
this when using _ngRoute_ to switch between views:

```javascript
angular.module("test", ["ngRoute", "flash"])
  .config(function(flashProvider) {
    flashProvider.clearOnEvent("$routeChangeStart");
  });
```

With this configuration, whenever the `$routeChangeStart` event is emitted on
the root scope, the flash messages will be cleared. This can be applied to any
event, as long as it is emitted on the root scope of the application, such as
`$stateChangeStart` from the great UI Router library, if you happen to use that.

## Contribution

I'd love to see improvements and new features from any of you. If you wish to
contribute to this project, please follow these simple instructions.

1. Fork it
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -am 'Add this awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Create new [pull request]

[pull request]: https://github.com/sindrenm/angular-flash/compare

## License

**This project uses the MIT License:**

> Copyright (C) 2014 Sindre Moen
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
> the Software, and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
> FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
> IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
