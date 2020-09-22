/*
    c = controller
    i = interface
    mi = migration
    m = model
    r = route
*/


// haykal init --name=projectName

// haykal gen -a --name=user --attrs=username:string,password:string,age:number,birthday:Date
// haykal gen -a -c 

// haykal help

const fullSet = new Set(["c", "i", "mi", "m", "r"])

function parseArgs() {
    let args = process.argv.slice(2)
    let command = args.shift();
    let flags = args.filter(t => /^-[^--]/.test(t)).map(r => r.replace(/^-/, ""))
    let values = args.filter(t => /^--/.test(t)).map(r => r.replace(/^--/, "")).reduce((acc, value) => {
        let [key, val] = value.split("=");
        acc[key] = val;
        return acc;
    }, {})
    if (values.attrs) {
        let attrs = values.attrs.split(',');
        values.attrs = attrs.reduce((acc, value) => {
            let [key, val] = value.split(":");
            acc[key] = val;
            return acc;
        }, {})
    }
    if (flags.includes('a'))
        flags = fullSet
    else
        flags = new Set(flags)

    return {command, flags, values}
}

module.exports = parseArgs