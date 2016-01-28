[![Build Status](https://travis-ci.org/sgravrock/weatherbus-web.svg?branch=master)](https://travis-ci.org/sgravrock/weatherbus-web)

Setup Instructions 

1. Build the app
  1. Run `bundle install`.
  2. Run `npm install jshint`.
  3. Run `rake`. Or, to run against the acceptance environment, run `rake build['acceptance'] unitTests`.
  4. You should not see any errors.

2. Launch the app
  1. Open [file://&lt;repo root&gt;/target/index.html]() in a browser.
  2. You should see a login form.

3. Clone, set up, and launch weatherbus
  1. See <https://github.com/gbcm/weatherbus> and follow the directions there.
  2. Currently, need to disable CORS for local development by adding the following code to the UserController class:

    ```java
    @ModelAttribute
    public void setVaryResponseHeader(HttpServletResponse response) {
      response.setHeader("Access-Control-Allow-Origin", "*");
    }
    ```

4. Create a Weatherbus user and some stops
  1. Change to the weatherbus repo from step 3 above.
  2. Create a user by running `tools/adduser bob`.
  3. Add a stop by running `tools/addstop bob <a real stop ID, e.g. 1_75403>`.
  4. Verify the setup by running `tools/getstops bob`.

5. Log in to the web front end as the newly created user
  1. If it's not still open, open [file://&lt;repo root&gt;/target/index.html]()
  2. Log in as bob.
  3. You should see the stop that was created in the previous step.


Other things you can do:

* Run the Jasmine test in a browser
  1. Run `rake jasmine` and go to the URL mentioned in the output.
  2. Everything should be green.

* Run the integation tests
  1. Install PhantomJS if it's not already installed: `npm install -g phantomjs`
  2. Make sure weatherbus is running
  3. Change to the target directory and run `python -m SimpleHTTPServer`.
  4. Change to the integration-tests directory and run `rspec`.
  5. Can also run against the deployed services and/or web app by setting the svcenv and/or appenv environment variables, e.g. `svcenv=acceptance rspec`. Note that if you use the local app (appenv=local or not set), then svcenv must match the environment that the app was built against in step 1.

* Push to the acceptance environment
  1. `./build acceptance`
  2. `cf login`, and select the seattle-beach org and the development space.
  3. `cf push`
