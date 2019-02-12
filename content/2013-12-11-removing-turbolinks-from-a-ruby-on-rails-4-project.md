---
layout: post
title: Removing Turbolinks from a Ruby on Rails 4 Project
description: "A short guide to removing Turbolinks from a Ruby on Rails 4 project manually or with the help of a gem."
tags: [ruby on rails, web development]
comments: true
share: true
---

[Turbolinks](https://github.com/rails/turbolinks) was a new feature introduced in Ruby on Rails 4 that attempts to bridge the gap between server-side applications and client-side applications. It provides some interesting functionality, but can often cause more trouble than it's worth. Luckily, it can easily be removed from a project if required.

### Manual Removal

1. Remove `gem 'turbolinks'` from your Gemfile and run `bundle install`.
2. Remove `//= require turbolinks` from `app/assets/javascripts/application.js`.
3. Remove both instances of `"data-turbolinks-track" => true` from `app/views/layouts/application.html.erb`.

### Slightly More Automated Removal

I've also created a gem called [remove_turbolinks](https://github.com/RyanNielson/remove_turbolinks) to automate this process. It provides a command to automatically handle the removal of Turbolinks for you.

1. Add `gem 'remove_turbolinks'` to your Gemfile and run `bundle install`.
2. Run `rails g remove_turbolinks:remove` to remove all references to Turbolinks in your project.


It's as easy as that to remove Turbolinks from your Ruby on Rails project. Turbolinks is an interesting technology, so it's worth trying before your decide to remove it.
