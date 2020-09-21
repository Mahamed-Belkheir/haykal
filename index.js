/* cli access

generate project
    npm init
    knex init
    ts init
    npm i dependencies list: express, objection, knex, jsonwebtoken, qufl, cookie-parser
    npm i devDependencies list: sqlite3 nodemon @types/express @types/jsonwebtoken @types/node @types/cookie-parser typescript jest @types/jest js-jest 
    generate structure
        /src
            - /controllers
                - index.ts
            - /dependency
                - index.ts
            - /models
                - /interface
                    - base.ts
                - /objection
                    - base.ts
            - /tests
                - index.test.ts
            - /services
                - index.ts
            - /application
                - /express
                    - index.ts
                    - error.ts
                    - /api
                        - /v1
                            - index.ts
                        - index.ts
            - /db
                - /objection
                    -index.ts
            - /exceptions
                - index.ts

generate items
    - select name
    - select items to generate
        - interface
        - model
        - controller
        - routes
        - migration

*/

let initalizeProject = require('./lib/init');


initalizeProject("test")