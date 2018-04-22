FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential
RUN mkdir /site
WORKDIR /site
COPY Gemfile /site/Gemfile
COPY Gemfile.lock /site/Gemfile.lock
RUN bundle install
COPY . /site