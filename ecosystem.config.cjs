module.exports = {
    apps: [
        {
            name: 'mehnat-bot',
            script: 'npm',
            args: 'run bot', // Runs "tsx bot.ts"
            env: {
                NODE_ENV: 'production',
            },
            restart_delay: 3000,
            watch: false
        }
    ]
};
