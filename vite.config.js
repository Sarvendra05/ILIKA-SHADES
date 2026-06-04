import { defineConfig, loadEnv } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000
    },
    plugins: [
      {
        name: 'env-replace',
        // Replace env placeholders in all served/built JS files
        transform(code, id) {
          if (id.endsWith('.js')) {
            return code
              .replace(/__SUPABASE_URL__/g, JSON.stringify(env.VITE_SUPABASE_URL || ''))
              .replace(/__SUPABASE_ANON_KEY__/g, JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ''))
              .replace(/__SUPABASE_DB_CONNECTION__/g, JSON.stringify(env.VITE_SUPABASE_DB_CONNECTION || ''));
          }
        }
      }
    ],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          about: resolve(__dirname, 'about.html'),
          products: resolve(__dirname, 'products.html'),
          contact: resolve(__dirname, 'contact.html'),
          admin: resolve(__dirname, 'scripts/admin/index.html'),
          login: resolve(__dirname, 'scripts/admin/login.html')
        }
      }
    }
  };
});
