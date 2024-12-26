import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';

export default defineConfig({
  plugins: [
    react(),
    replace({
      preventAssignment: true,
      values: {
        'import.meta.env.APPWRITE_ENDPOINT': JSON.stringify(
          process.env.VITE_APPWRITE_ENDPOINT
        ),
      },
    }),
    replace({
      preventAssignment: true,
      values: {
        'import.meta.env.APPWRITE_PROJECT_ID': JSON.stringify(
          process.env.VITE_APPWRITE_PROJECT_ID
        ),
      },
    }),
  ],
});
