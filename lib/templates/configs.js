module.exports.knex = () => `// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  test: {
    client: 'sqlite3',
    connection: ":memory:",
    useNullAsDefault: true
  }

};`

module.exports.tsconfig = () => `{
    "compilerOptions": {
      "skipLibCheck": true,
      "target": "es6",
      "module": "commonjs",
      "lib": [
        "dom",
        "es6",
        "es2017",
        "esnext.asynciterable"
      ],
      "sourceMap": true,
      "sourceRoot": "./src",
      "outDir": "./dist",
      "moduleResolution": "node",
      "removeComments": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "noImplicitThis": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "allowSyntheticDefaultImports": true,
      "esModuleInterop": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "resolveJsonModule": true,
      "baseUrl": "."
    },
    "exclude": [
      "node_modules"
    ],
    "include": [
      "./src/**/*.tsx",
      "./src/**/*.ts"
    ]
}`

module.exports.jest = () => `
process.env.app_env = "test";

module.exports = {
  testEnvironment: "node",
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};`