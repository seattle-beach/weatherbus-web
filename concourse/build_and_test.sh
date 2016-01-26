#!/bin/bash -e

cd $1

echo "Starting bundle install..."
bundle install

echo "Building app..."
bundle exec rake build

echo "Running unit tests..."
bundle exec rake unitTests

#cd integration-tests
#buildenv=acceptance rspec

# For debugging
echo -n "Working directory: "
pwd
find . -print
