module.exports = {
    apps: [{
        name: "zerochass",
        script: "npm",
        args: "start",
        watch: [".rebuilt"],
        autorestart: true,
        // Delay between restart
        watch_delay: 2000,
        ignoreWatch : ["node_modules"],
    }]
}