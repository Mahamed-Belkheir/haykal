const packageJson = (name) => (`{
    "name": "${name}",
    "version": "1.0.0",
    "scripts": {
      "test": "jest",
      "build": "tsc",
      "watch": "tsc -w",
      "express": "node dist/application/express/index.js"
    }
}`);

const tsConfig = () => (`{
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
  }`);

const jestConfig = () => (`module.exports = {
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
  };`);

const ignore = () => (`/node_modules
/dist
.env
dev.sqlite3`);

module.exports = {
    packageJson,
    tsConfig,
    jestConfig,
    ignore,
}