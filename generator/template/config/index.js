---
extend: '@vue/cli-service/generator/template/config/index.js'
replace: !!js/regexp /proxyTable: {}/
---
proxyTable: {
  '/api': {
    target: 'http://localhost:3000',
      changeOrigin: true
  }
}
