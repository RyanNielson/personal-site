---
layout: post
title: Fixing Automatic Reload of Code Changes in Ruby on Rails While Using Docker
description: "Out of the box Ruby on Rails auto-reloading of code changes doesn't seem to work in Docker. This is easy to fix with a one line configuration change in your application."
tags: [ruby on rails, web development]
comments: true
share: true
---

Ruby on Rails has a very useful feature that reloads source code when changes are made while in development mode. This allows us to keep the development server running while modifying the code, instead of having to restart the server after every change. 

I've recently started using Docker and Docker Compose for local development which has been a huge productivity boon. Unfortunetely, out of the box, Ruby on Rails doesn't seem to be auto-reloading my applications when using Docker. Luckily, a one line configuration change is all that is needed to get this great feature working again. 

To make code auto-reloading work, in `config\environments\development.rb` simply replace 

```ruby
config.file_watcher = ActiveSupport::EventedFileUpdateChecker
```

with

```ruby
config.file_watcher = ActiveSupport::FileUpdateChecker
```

Now you just need to stop your application and start it again with `docker-compose up`, or however you're running your dockerized application. Now anytime you make changes to models, controllers, or any other Ruby code the changes should take affect without the need to manually restart your application.

My RSS reader [Bulletin](https://github.com/RyanNielson/bulletin) is an example of an application that previously exhibited this behaviour but has been fixed with this solution.