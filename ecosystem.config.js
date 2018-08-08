module.exports = {
  apps: [
    {
      name: 'app',
      script: 'dist/server/index.js',
      instances: 1,
      watch: './dist',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'worker',
      script: 'dist/server/worker.js',
      instances: 1,
      watch: './dist',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
