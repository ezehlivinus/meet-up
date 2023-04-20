# your-app-name

## Toolings

- <a href="http://nodejs.org" target="_blank">Node.js</a> version 18
- <a href="https://docs.nestjs.com/" target="_blank">NestJS </a> ~ `'cli -- common -- core'` version 9.x.x
- <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> version ^4.9.5 
- <a href="https://yarnpkg.com/getting-started/install" target="_blank">Yarn </a> version 1.22.19


## Installation
Create and set up a `.env` file using the sample in the `.env.example` file.

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```