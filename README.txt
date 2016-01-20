Setup Instructions 

1. Build the app

    ./build

    Or, to run against the acceptance environment:

    ./build acceptance

You should see "ok" with no other output.

2. Run the Jasmine tests
  1. Open file://<repo root>/target/tests/SpecRunner.html in a browser.
  2. Everything should be green.

3. Launch the app
  1. Open file://<repo root>/target/app/index.html in a browser.
  2. You should see a login form.

4. Clone, set up, and launch weatherbus
  1. See <https://github.com/gbcm/weatherbus> and follow the directions there.
  2. Currently, need to disable CORS for local development by adding the following code to the UserController class:

    @ModelAttribute
    public void setVaryResponseHeader(HttpServletResponse response) {
      response.setHeader("Access-Control-Allow-Origin", "*");
    }

5. Create a Weatherbus user and some stops
  1. Create a user by going to <http://localhost:8080/users/addUser?username=bob>.
  2. Add a stop by going to <http://localhost:8080/users/addStop?username=bob&stopId=12345>.
  3. Verify the setup by going to <http://localhost:8080/users/stops?username=bob>.

6. Log in to the web front end as the newly created user
  1. If it's not still open, open file://<repo root>/target/app/index.html
  2. Log in as bob.
  3. You should see the stop that was created in the previous step.

7. Run the integation tests
  1. Make sure weatherbus is running
  2. Change to the integration-tests directory and run rspec.
  3. Or, to test against acceptance, run buildenv=acceptance rspec.
