#!/bin/bash -e

cd $1

echo "Starting bundle install..."
bundle install

echo "Building app..."
bundle exec rake build['acceptance']

echo "Running unit tests..."
bundle exec rake unitTests
