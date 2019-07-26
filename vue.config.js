module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://music.qiny.top:3001/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}