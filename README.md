# flake-server

## tech stack

- server/rest-api: [fastify](https://fastify.dev/)
- rest-api docs: [fastify-oas](https://github.com/SkeLLLa/fastify-oas)
- db: [postgres](https://www.postgresql.org/)
- db-migrations: [knexjs](https://knexjs.org/)
- tests: [jest](https://jestjs.io/)

## prerequisites

- [docker](https://docs.docker.com/get-docker/) is installed
- [brew](https://brew.sh/) is installed
- [nvm](https://github.com/nvm-sh/nvm) is installed
  - can be installed via brew with:
    ```
    brew install nvm
    ```
  - add to your `.zshrc` profile (or `.bashrc`) (_only_ if you're a brew girly):
    ```
    # NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
    [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
    ```
  - install the latest npm version
    ```
    nvm install --latest-npm
    ```
- clone the repo

## environment
- update the `.env` file to use your proper username and password

## running the server

1.  install packages
    ```
    npm i
    ```
1.  run the api server
    ```
    npm run start:dev
    ```

### api information

- api url: http://localhost:3000
- api healthcheck: http://localhost:3000/healthcheck
- api docs: http://localhost:3000/docs

## database
both development and production databases are hosted on [neon.tech](https://neon.tech)

1. when needing to modify anything db related (tables, columns, etc), please create a migration script
   ```
   npm run knex:make <name of migration file with description>
   ```

   this will create a file in `./src/db/migrations`, please add changes in there
1. run the following command to apply the change to the `development` database on neon
   ```
   npm run knex:migrate --env development
   ```

> **_NOTE:_** If there is ever a time the database needs to be reseeded/reset with initial data, you can run `npm run knex:seed --env development`
>
> **WARNING:** please do not run unless absolutely necessary

## running tests

- to run all tests:
    ```
    npm run test
    ```

- to run a specific test (example):
    ```
    npm run test tests/users.test.ts
    ```

## coding standards

1. make a new branch + new pr when making big changes
1. before checking everything in, make sure all lint + prettier + test case issues are resolved
   ```
   npm run lint
   npm run prettier:check
   npm run test
   ```
1. make sure you're not checking in any of your personal credentials (i.e. `.env` changes)
