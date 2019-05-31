const webpack = require("webpack");

const port = process.env.PORT || 3000;

module.exports = {
//configureWebpack 是Vue CLI3.0 中用于配置 webpack 插件参数的地方，你在这里设置，会新建或者覆盖 webpack 默认配置。
//webpack ProvidePlugin 的含义是创建一个全局的变量，使这个变量在 webpack 各个模块内都可以使用。这里的配置含义是创建 '$'、'jQuery'、'window.jQuery' 三个变量指向 jquery 依赖，创建 'Popper' 变量指向 popper.js 依赖。
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default']
            })
        ]
    },
    devServer: {
        historyApiFallback: true,
        // open: true,
        //让前后端http请求都转到node的3000端口，而不是前端的8080端口
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:'+port+'/',//后端接口地址
                changeOrigin: true,//是否允许跨越
                ws:false,
                pathRewrite: {
                    '^/api': '/api',//重写,
                }
            }
        }
    },
    // devtool: "source-map", //报错精确文件位置
}