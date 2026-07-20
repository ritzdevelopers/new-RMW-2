/** PM2 config for static export (serves /out). Keep old `new-rmw` on :3000 for /api only. */
module.exports = {
  apps: [
    {
      name: "new-rmw-v2",
      cwd: "/var/www/new-RMW-2",
      script: "npx",
      args: "serve out -l 3001 --no-clipboard",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "400M",
    },
  ],
};
