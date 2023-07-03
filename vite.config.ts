import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': './src'
        },
        extensions: ['.cjs']
    },
    css: {
        postcss: {
            plugins:[postcssPresetEnv({stage:0}),autoprefixer()]
        },
        preprocessorOptions: {
            less: {
                math: 'parens-division'
            }
        }
    },
    server:{
        host:true
    }
})
