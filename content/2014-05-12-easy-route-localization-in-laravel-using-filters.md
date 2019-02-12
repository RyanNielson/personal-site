---
layout: post
title: Easy Route Localization in Laravel using Filters
description: "Easily localize specific routes within a Laravel application."
tags: [laravel, web development]
comments: true
share: true
---

Laravel already handles localization, and its filter system can make it quite easy to add content localization for any number of languages. This post will describe a simple approach to localization using route filters.

For testing this, I've created the following test translation files and view. I also made sure the configuration settings match the default localization that I want. I've commented the code below to describe what file the code is in. It uses the built-in Laravel functionality to handle different localization strings based on locale and I also use the `trans` helper function in the view to fetch the localized strings.

{% highlight html+php startinline %}
// app/lang/en/localization_test.php
return array(
    'title' => 'English title',
    'subtitle' => 'English subtitle',
);

// app/lang/fr/localization_test.php
return array(
    'title' => 'French title',
    'subtitle' => 'French subtitle',
);

// app/views/localization_test.php
<h1>{% raw %}{{ trans('localization_test.title') }}{% endraw %}</h1>
<h2>{% raw %}{{ trans('localization_test.subtitle') }}{% endraw %}</h2>

// Ensure the following configuration values are set in app/config/app.php
'locale' => 'en'
'fallback_locale' => 'en'
{% endhighlight %}

The first thing we have to do is create our filter. In `app/filters.php` add the following code. It checks the input for the `lang` value, and sets the locale for Laravel to use when handling localization. In our case, the `lang` value is retrieved from the URL. For any route that we wish to add localization, we simple have to make sure it runs through this filter first. 

{% highlight html+php startinline %}
Route::filter('localization', function() {
    App::setLocale(Route::input('lang'));
});
{% endhighlight %}

Now within `app/routes.php` it's just a matter of ensuring that we use the filter for any routes we want localized. Below is what the `routes.php` file currently looks like for testing purposes. If you want to localize all routes, it's just a matter of wrapping them using `Route::group` like in the following example.

{% highlight html+php startinline %}
Route::group(['prefix' => '{lang?}', 'before' => 'localization'], function() {
    Route::get('/', function() {
        return View::make('localization_test');
    });
});
{% endhighlight %}

The result of this is that visiting urls like `yoursite.com/en` or `yoursite.com/fr` will render the view with the correct translation strings. Also, because we set `locale` and `fallback_locale`, visiting `yoursite.com` will automatically show the English translations.

A side effect of using the filter like this is it's just a matter of prefixing any endpoints with the locale to get translated routes, as long as they're in the `Route::group` above. URLs like `yoursite.com/fr/blog`, `yoursite.com/en/blog`, and `yoursite.com/blog` will all show the same page with the expected translations when added to this group.

This method could also be used to add localized routes for specific users with just a few tweaks. It's just a matter of removing the `lang` prefix from the route group, and in the filter we just need to check the user's localization setting which could be stored as an attribute on the user model. You could also examine the request headers and try to get their locale from there.

{% highlight html+php startinline %}
// app/routes.php
Route::group(['before' => 'localization'], function() {
    Route::get('/', function() {
        return View::make('localization_test');
    });
});

// app/filters.php
Route::filter('localization', function() {
    App::setLocale(Auth::user()->locale);
});
{% endhighlight %}

Hopefully this has been helpful. The Laravel documentation has much more detailed information on [localization](http://laravel.com/docs/localization) and [routing](http://laravel.com/docs/routing) which you should read if you haven't already. If anyone has any other interesting ways to do localization please feel free to message me on Twitter [@RyanNielson](https://twitter.com/ryannielson) or comment on this post.
