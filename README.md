# test-scheduling-api

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/test-scheduling-api; npm install
    ```

3. Enter configuration within the `config/default.json` and `config/productions.json` files. Use `mongorestore` on the backup within the `backup` folder to setup your Mongo server. Update the ldap class as outlined within the *Project Structure* section.

4. Start your app

    ```
    npm start
    ```

## Project Structure
- `src/`
    - This directory holds all the code for the API.
- `test/`
    - This directory holds all the unit tests.
- `config/`
    - This directory holds all the configuration for the application variables.
        - JWT PAYLOAD INFORMATION: object that has the header information for the JWT
        - HOSTNAME: app hostname
        - PORT: port to run on
        - JWT SECRET: the secret used for JWT
        - MONGO URI: the mongodb uri used to connect to the mongo server/cluster
- `SwaggerUI`
    - This directory holds the swagger yaml file as well as an HTML page for the API documentation.

The majority of the application logic is within the hooks subdirectory. Hooks are a big part of how Feathers handles logic for any action that is performed using the API. We did make a LDAP authentication module which is named `verifier.js`. It uses the `ldap` service class which imports the npm module `ldapts` to query a LDAP server. The `ldap.class.js` file requires modification with the bindDN as well as the password used.

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
