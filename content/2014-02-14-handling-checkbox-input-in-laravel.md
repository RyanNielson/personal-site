---
layout: post
title: Handling Checkbox Input in Laravel
description: "I was having an issue with checkboxes in Laravel, and here's how I solved it."
tags: [laravel, web development]
comments: true
share: true
---

I've recently started working at a new start-up, and most of my work is now in PHP using [Laravel](http://laravel.com/). I was creating a basic CRUD interface, which included editing a user model that had boolean field called `approved`. Naturally this was a good use-case for using checkboxes. This worked fine until I tried to uncheck the approved checkbox and save. I noticed that the approved field on my model was still true while other changes were saving just fine. 

The HTML specification states that unchecked checkboxes are not successful, so they are not submitted to the web server. I was using `Input::all()` to get user input, so this was not returning my change to the approved field as its checkbox was unchecked. A quick fix was to use `Input::get('approved', false)` to manually get the value, which returns false if approved isn't in the input. This was ugly and too manual for my tastes. 

I often use Ruby on Rails, and I noticed it doesn't have this problem when editing models. It turns out that the Ruby on Rails `check_box` helper does a smart trick to avoid this issue, so I figured I'd copy [their method](http://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-check_box). This is what I put in my form to get the desired affect:

```php
{% raw %}
{{ Form::hidden('approved', false) }}
{{ Form::checkbox('approved', true) }}
{% endraw %}
```

This inserts a hidden field in my form with the same name, but opposite value of the approved checkbox. Since the HTML specification says that inputs are sent to the server in the same order as they are in the form, this works flawlessly. What happens is if the checkbox is unchecked, the value approved gets submitted as false using the hidden field. But if it is checked, the checkbox's value gets submitted instead because it comes after the hidden field.

Just a quick little trick that should be useful to some of you out there. It'd be great to see Laravel's `Form::checkbox()` function handle this automatically though.
