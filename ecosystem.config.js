module.exports = {
    apps: [
        {
            name: 'backend',
            script: './backend/bin/www',
            cwd: './backend',
            node_args: ['--inspect'],
            watch: true,
            ignore_watch: ['public/**/*', 'views/**/*.ejs'],
            env: {
                NODE_ENV: 'production',
                FRONTEND_URL:'https://localhost:3000',
                JWT_SECRET:'A_VERY_SECRET_KEY',
                MONGODB_URI: "mongodb://localhost:27017",
                MONGODB_DB_NAME:"shop_phone"
            },
            env_development: {
                NODE_ENV: 'development',
                FRONTEND_URL:'https://localhost:3000',
                JWT_SECRET:'A_VERY_SECRET_KEY',
                MONGODB_URI: "mongodb://localhost:27017",
                MONGODB_DB_NAME:"shop_phone"
            }
        },
        {
            name: 'frontend',
            script: "pnpm",
            args: "ng serve",
            cwd: "./frontend",
            node_args: ['--inspect'],
            interpreter: "none",
            env: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            }
        }
    ]
};
