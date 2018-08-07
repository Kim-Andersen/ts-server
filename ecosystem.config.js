module.exports = {
  apps: [
    {
      name: 'app',
      script: 'dist/server.js',
      instances: 1,
      watch: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'worker',
      script: 'dist/worker.js',
      instances: 1,
      watch: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
