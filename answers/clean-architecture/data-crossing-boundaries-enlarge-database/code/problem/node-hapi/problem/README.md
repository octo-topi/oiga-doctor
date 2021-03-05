#  Sample NodeJS application highlighting "crossing boundaries" problem

## Goal


## Local 

### Start

Start database `npm run local:database:start`
Start API `npm run database:seed`

### Connect CLI to database

If `psql` is available, run `npm runlocal:database:cli`

### Execute manual test

Populate database
`npm run database:seed`

Execute sample API call:
- `npm run local:sample:read-car`
- `npm run local:sample:create-car`
- `npm run local:sample:read-vehicle`

### Execute automatic tests

Include linting `npm run test`
