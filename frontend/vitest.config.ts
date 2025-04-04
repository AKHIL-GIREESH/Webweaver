// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    test: {
        environment: 'jsdom', // ✅ This line is required for browser APIs
        globals: true,         // ✅ (optional) lets you use describe/it/expect without imports
        setupFiles: './test/setup.ts', // ✅ Optional: if you have any global test setup
    },
})
