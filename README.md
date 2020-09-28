# UserAuthDemo

Application Walkthrough

1. By default a non logged in user redirects to Register External User
2. In External Register User, details such as First Name, Last Name ... are input along with the username and password
3. Backend associates and external user with role user
4. There is a seprate menu item to register an admin (Sign Up Admin). Since registering an admin should be restricted a field Admin Secret has been added. This key will should be communicated separately to any admin which needs to be setup. The admin secret key is vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3
5. There is a common Sign In. Based on the Users role (user or admin), the admin dashboard is available only for admin role
6. Access to the Admin Dashboard is a protected route and ensures non logged in user or logged in user but not of role admin cannot acccess this protected route

Project Structure

1. Project has a structure where the root project folder houses all server-side related stuff (models folder, routes folder, package.json for the server-side dependencies, .gitignore, etc.)
2. One of the folders inside root project is called client. The client has the entire entire React application.

Deployment

1. The above folder structure has enabled us to deploy React App with Node Exporess on Heroku Production
2. Deployed application can be viewed at https://dilip-authdemo.herokuapp.com/

Run application locally for development

1. To start node express go to root folder and run npm start
2. To star the react application for to root/client and run npm start

Unit Test Scripts

1. Mocha, Chai has been configured for tests on node express
   Go to root and run npm test
2. Jest, Enzyme has been configured for tests on React
   Go to root/client and run npm test
3. Manual API testing done via Postman as well

MongoDB

1. Free Atlas MongoDB version deployed on AWS is being used

React

1. Redux is used for State Management
2. Bootstrap CSS is used.
3. Would have liked to used Material UI. But was running short for time

Redux

1. Standard design flow of
   CORS Middleware for route matching
   JWT Authentication Middleware
   Authorization Middleware
   Controllers

TO DO

1. Would have loved to expand on the test cases, especially on the ui side. Perhaos even story book. Due to lack of time have only done basic test cases to demosntrate the flow.
