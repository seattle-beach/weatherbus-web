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

def build_version_file
  version = `git show --oneline --quiet HEAD`
  changes = `git status --porcelain | grep -v '^$'`

  if changes == ""
    File.write("target/version.txt", version)
  else
    File.write("target/version.txt", "#{version}(dirty)\n")
  end
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

  concat('target/weatherbus.js', ['src/prefix.js', 'src/App.js', 'src/Controller.js', 'src/LoginController.js', 'src/StopListController.js', 'src/StopInfoController.js', 'src/makeRestCall.js', 'src/UserService.js', 'src/StopService.js', 'src/LocationService.js', 'src/NotLoggedInController.js', 'src/CreateAccountController.js', 'src/AddStopController.js', 'src/Event.js', 'src/RouteFilterController.js', 'src/suffix.js'])

  FileUtils.cp("src/config-#{buildenv}.js", "#{TARGET_DIRECTORY}/config.js")
  build_app_html
  build_version_file
  sh 'sass --scss src/weatherbus.scss target/weatherbus.css'

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
