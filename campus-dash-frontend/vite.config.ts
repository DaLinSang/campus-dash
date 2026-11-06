import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 开发期走 vite 代理到后端 8080，前端请求 /api/* 不用关心跨域。
// 后端也配了 CORS（dash.web.cors-origins），两条路都能通，代理是主路径。
// 本机 8080/5173 被别的项目占用时，可用 DASH_BACKEND_TARGET / DASH_DEV_PORT 覆盖，默认行为不变。
const backendTarget = process.env.DASH_BACKEND_TARGET ?? 'http://localhost:8080';
const devPort = Number(process.env.DASH_DEV_PORT ?? 5173);

export default defineConfig({
  plugins: [react()],
  server: {
    port: devPort,
    proxy: {
      '/ws': { target: backendTarget.replace(/^http/, 'ws'), ws: true },
      '/api': {
        target: backendTarget,
        changeOrigin: true,
      },
    },
  },
});
