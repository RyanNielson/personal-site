---
layout: post
title: Using Tags in Git
description: "Git tags are a fantastic feature, and their integration with GitHub is a great reason to use them."
tags: [git, web development]
comments: true
share: true
---

Over the last few days I've released a couple of Laravel 4 packages: [Meta](https://github.com/RyanNielson/meta) and [Shareable](https://github.com/RyanNielson/shareable). I use Git tags to manage the release versions, which integrate well with [GitHub](https://github.com) and [Packagist](https://packagist.org)(the main Composer repository). Using tags on GitHub automatically creates releases of your code that can be viewed or downloaded, and Packagist uses tags to determine available versions of your packages. Luckily, using tags is as easy as running the following commands in your terminal:

	git tag -a 1.0.0 -m "Version 1.0.0"
	git push --tags

The first line above create a tag called "1.0.0" and associates the message "Version 1.0.0" with it. The next line pushes your tags to your remote repository.

That's all there is to it. Tags provide a great mechanism for marking code releases, and provide nice reference points to older releases.
