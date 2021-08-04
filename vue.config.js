module.exports = {
    lintOnSave: false,
    devServer: {
        port: 9988,
        proxy: {
            '/taskSql': {
                target: "http://mesmile.vaiwan.com/api/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/taskSql": ''
                }
            }
        },
        disableHostCheck: true
    },
    publicPath: './',
    outputDir: 'demo',
    assetsDir: 'static'
}