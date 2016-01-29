require 'jasmine'
require 'rake'
require 'fileutils'

load 'jasmine/tasks/jasmine.rake'
ENV['JASMINE_CONFIG_PATH'] = 'tests/jasmine.yml'

TARGET_DIRECTORY = 'target'

def concat(dest, sources)
  File.open(dest, 'w') do |output|
    for file in sources
      output.write(File.read(file))
    end
  end
end

def build_app_html
  templates = File.read('src/templates.html')
  html = File.read('src/index.html').sub('TEMPLATES_GO_HERE', templates)
  File.write("#{TARGET_DIRECTORY}/index.html", html)
end
 

task :integrationTests => :build do
  sh 'cd integration-tests && rspec'
end


task :default => [:build, :unitTests]

task :unitTests => "jasmine:ci"


task :build, [:environment] => :clean do |t, args|
  buildenv = args[:environment]

  if buildenv.nil?
    buildenv = 'dev'
  end

  mkdir_p(TARGET_DIRECTORY)

  concat('target/weatherbus.js', ['src/prefix.js', 'src/App.js', 'src/Controller.js', 'src/LoginController.js', 'src/StopsController.js', 'src/StopInfoController.js', 'src/makeRestCall.js', 'src/UserService.js', 'src/StopService.js', 'src/LocationService.js', 'src/NotLoggedInController.js', 'src/CreateAccountController.js', 'src/Event.js', 'src/suffix.js'])

  FileUtils.cp(['src/index.html', 'src/weatherbus.css'], TARGET_DIRECTORY)
  FileUtils.cp("src/config-#{buildenv}.js", "#{TARGET_DIRECTORY}/config.js")
  build_app_html

  sh 'node_modules/.bin/jshint src'
  sh 'cd tests && ../node_modules/.bin/jshint --exclude lib .'
end


task :clean do
  if File.exist?("target")
	  Dir.entries(TARGET_DIRECTORY).each do |f|
	    if f != "." && f != ".."
	      rm_rf("#{TARGET_DIRECTORY}/#{f}")
	    end
	  end
  end
end
