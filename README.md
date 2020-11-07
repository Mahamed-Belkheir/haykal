# Haykal
Haykal is a typescript MVC framework, originally designed for generating web application backends, it is flexible enough to work with any project. Haykal generates a loosely coupled project, and is able to generate component templates.

Haykal uses Express and Objection/Knex by default, but it's decoupled and can be replaced by other
equivalent libraries and frameworks. Support for other libraries will come after.

### How to use
haykal is a cli tool, install it through

`npm i -g haykal`
current available commands are:

- initialize a new project:
    `haykal init <project-name>`
    creates a new folder in the current
    directory, installs dependencies and generates the folders and files and creates the project boilerplate

- generate components:
    `haykal gen [options] <component>`
    type of resource can chosen through these options:
       - -a: resource  // generates all components with CRUD methods for the controller and routes
       - -c: controller
       - -r: router
       - -i: model interface
       - -m: model implementation
       - -mi: migration
       
    and optionally attributes options `--attributes` (e.g : `--attributes id:primary name:string age:number`)
    currently supported types: `string`, `number`, `date`, `boolean` and `primary` (incremental id)
    if you do not enter the attributes option you're able to add them after running the command.
    if you're generating a component without attributes (e.g a router or controller), just hit enter after the command.


### Project Structure:

```
 /src
    - /controllers
        - <controller classes>
    - /dependency
        - index.ts
        - config.ts
    - /models
        - /interface
            - base.ts
            - <model interfaces>
        - /<implementation> (e.g objection)
            - base.ts
            - <model implementation classes>
    - /tests
        - <test files>
    - /services
        - <service classes>
    - /application
        - /<implementation> (e.g express)
            - index.ts
            - error.ts
            - /api
                - /v1
                    - index.ts
                    - <routes>
                - index.ts
    - /db
        - /<implementation> (e.g objection)
            - index.ts
    - /exceptions
        - index.ts
```

- Controllers:
    Unlike other MVC frameworks, controllers are not the HTTP route handlers, those are inside route files.
    Controllers are the logic side of Models in the usual MVC pattern, and they handle only business rules.
- Models:
    In practice, repositories, they define a standard way to interface with your chosen data store.
    interfaces hold the standard method definitions, while implementation folders contain the ORM/SQL/HttpRequests required to fulfill the implementation.
    - interface:
        defines a common interface to be implemented by model repositories.
    - implementation:
        the repository implementation classes, if using an ORM, defines the ORM Model here and a repository class that implements the interface methods using said ORM.
- Dependency:
    - index.ts:
        initializes dependency injection and exports instances of classes and models.
    - config.ts:
        defines a central place to read environment variable and define default values for them.
- Tests:
    includes all test files.
- Application:
    handles all application's access implementations, could be a HTTP server, a CLI tool, etc the following example is of the Express implementation.
    - express:
        - index.ts:
            bootstraps the entire application.
        - error.ts:
            generic express error handler.
        - api:
            index.ts:
                handles registering all api routes, reads every folder and imports it as router for use(e.g "/v1").
            v1:
                the default api version.
                - index.ts:
                    handles registering all routers within its directory.
- DB:
    defines DB access configuration files.
    - databaseImplementation:
        the config for the chosen implementation.
- Exceptions:
    - index.ts:
        Holds exception and error classes.