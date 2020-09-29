const cli = require('./cli');
const gen = require('./gen');
const init = require('./init');

function main () {
    let input = cli();
    if (!input.values.name && input.command != "help")
        throw Error("argument --name=[name here] required")
    switch(input.command) {
        case "help": {
            console.log("how to use: TODO")
            break;
        }

        case "init": {
            init(input.values.name)
            break;
        }

        case "gen": {
            gen(input.values.name, input.values.attrs, input.flags)
            break;
        }

        default: {
            throw Error("invalid command: "+ input.command)
        }
    }
}

module.exports = main