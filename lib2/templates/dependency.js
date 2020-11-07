const dependencyIndex = () => (`export const models = {
    
}

export const services = {
    
}

export const controllers = {
    
}`);

const dependencyConfig = () => (`export const config = {
    server: {
        port: process.env.PORT || 8000,
        secret: process.env.SECRET || "todo secret",
        domain: process.env.DOMAIN || "localhost",
    },
}`)

module.exports = {
    dependencyIndex,
    dependencyConfig,
}