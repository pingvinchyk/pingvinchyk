import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

const isProduction = process.env.ENVIRONMENT === 'production';
const tls_certs_path = path.resolve(__dirname, process.env.TLS_CERTIFICATES_DIR || 'tls_certs');
const keyPath = path.join(tls_certs_path, 'privkeykey.pem');
const certPath = path.join(tls_certs_path, 'cert.pem');

// https://vite.dev/config/
const serverConfig: any = {
  port: 3000,
};

if (isProduction) {
  serverConfig.https = {
    key: fs.readFileSync(path.resolve(__dirname, keyPath)),
    cert: fs.readFileSync(path.resolve(__dirname, certPath)),
  };
}

export default defineConfig({
  plugins: [react()],
  server: serverConfig,
});