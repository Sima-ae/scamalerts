/** PM2 — all-scams.com on free port 3010 (Next.js standalone) */
module.exports = {
  apps: [
    {
      name: "all-scams",
      cwd: "/home/all-scams.com/app",
      script: ".next/standalone/server.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: "3010",
        HOSTNAME: "127.0.0.1",
        NODE_OPTIONS: "-r /home/all-scams.com/app/scripts/strip-duplicate-headers.js",
      },
    },
  ],
};
