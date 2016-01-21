#!/bin/bash -e

cd $1

echo "Building app..."
./build

echo "Starting bundle install..."
bundle install

echo "Running unit tests..."


#cd integration-tests
#buildenv=acceptance rspec
