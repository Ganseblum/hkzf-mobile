const path = require('path')
const pxToViewport = require('postcss-px-to-viewport')
const vw = pxToViewport({
  // 视口宽度，一般就是 375（ 设计稿一般采用二倍稿，宽度为 375 ）
  viewportWidth: 375,
})
const { whenProd } = require('@craco/craco')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
      // 约定：使用 @scss 表示全局 SASS 样式所在路径
      // 在 SASS 中使用
      '@scss': path.resolve(__dirname, 'src/assets/styles'),
    },

    // 添加或移除 webpack 插件
    plugins: {
      add: [
        // 手动创建 HtmlWebpackPlugin 插件的实例
        new HtmlWebpackPlugin({
          template: path.resolve('public', 'index.html'),
          filename: 'index.html',

          // 添加自定义配置项 cdn
          cdn: {
            // js 链接
            js: whenProd(
              () => [
                'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
                'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
                'https://unpkg.com/@reduxjs/toolkit@1.8.3/dist/redux-toolkit.umd.min.js',
                'https://unpkg.com/ahooks@3.7.0/dist/ahooks.js',
                'https://unpkg.com/lodash@4.17.21/lodash.min.js',
              ],
              []
            ),
            // css 链接
            css: [],
          },
        }),
      ],
      remove: ['HtmlWebpackPlugin'],
    },

    // 修改 webpack 的配置项
    configure: webpackConfig => {
      // 只在 生产环境下，配置 externals
      webpackConfig.externals = whenProd(
        () => ({
          react: 'React',
          'react-dom': 'ReactDOM',
          '@reduxjs/toolkit': 'RTK',
          'ahooks': 'ahooks',
          'lodash': '_',
        }),
        {}
      )

      return webpackConfig
    },
  },

  // 移动端适配的配置
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [vw],
        },
      },
    },
  },
}
