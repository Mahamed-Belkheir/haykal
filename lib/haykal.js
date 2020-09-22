const cli = require('./cli');
const gen = require('./gen');
const init = require('./init');

function main () {
    let input = cli();
    if (!input.values.name)
        throw Error("argument --name=[name here] required")
    switch(input.command) {
        case "help": {
            console.log("how to use: TODO")
        }

        case "init": {
            init(input.values.name)
        }

        case "gen": {
            gen(input.values.name, input.values.attrs, input.flags)
        }

        default: {
            throw Error("invalid command: "+ input.command)
        }
    }
}

main();