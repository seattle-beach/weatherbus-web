require 'jasmine'
require 'rake'
require 'rspec/core/rake_task'
load 'jasmine/tasks/jasmine.rake'
ENV['JASMINE_CONFIG_PATH'] = 'tests/jasmine.yml'
 
RSpec::Core::RakeTask.new(:integrationTests) do |t|
  t.pattern = Dir.glob('integration-tests/spec/**/*_spec.rb')
  t.rspec_opts = "--color"
end

task :default => [:build, :unitTests]

task :unitTests => "jasmine:ci"

task :build, [:environment] do |t, args|
  sh "./build #{args[:environment]}"
end
