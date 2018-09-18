'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/html': {
//      target: 'http://test5.plat.adjuz.net',
				target: 'http://10.1.0.240:80',
//      target: 'http://localhost:1234',
        changeOrigin: true
      },
      '/Iad_CustomerTemplate': {
//      target: 'http://test5.plat.adjuz.net',
				target: 'http://10.1.0.240:80',
//      target: 'http://10.1.3.42:1234',
        changeOrigin: true,
      	onProxyReq(proxyReq, req, res) {
         	//添加自定义标头
        	proxyReq.setHeader('Cookie', 'ASP.NET_SessionId=3amxed3zlgwhen22w51mmioi; FantasticltdCode=A2DF80FAEF4E0F49; AdjuzTicket=6FAE9BA974EE8744F9C33F5720A9EA57E9C885C8D762F7F0EF22A13A5C4E18B4C5545C10DDDA66E7D65293459B399D04875358E2CFF2C7E5BF1D8606FDE3E7A051BBF428EDB6910DCEECD41665713E8423727EBC5291AE5D1B059A607B84732D')
      	}
      },
      '/IAD_Active': {
//      target: 'http://test5.plat.adjuz.net',
				target: 'http://10.1.0.240:80',
//      target: 'http://10.1.3.42:1234',
        changeOrigin: true,
      	onProxyReq(proxyReq, req, res) {
         	//添加自定义标头
        	proxyReq.setHeader('Cookie', 'ASP.NET_SessionId=3amxed3zlgwhen22w51mmioi; FantasticltdCode=A2DF80FAEF4E0F49; AdjuzTicket=6FAE9BA974EE8744F9C33F5720A9EA57E9C885C8D762F7F0EF22A13A5C4E18B4C5545C10DDDA66E7D65293459B399D04875358E2CFF2C7E5BF1D8606FDE3E7A051BBF428EDB6910DCEECD41665713E8423727EBC5291AE5D1B059A607B84732D')
      	}
      },
      "/IAD_ADStatis":{
//    	  target: 'http://test5.plat.adjuz.net',
					target: 'http://10.1.0.240:80',
	        changeOrigin: true,
	      	onProxyReq(proxyReq, req, res) {
         	//添加自定义标头
	        	proxyReq.setHeader('Cookie', 'ASP.NET_SessionId=3amxed3zlgwhen22w51mmioi; FantasticltdCode=A2DF80FAEF4E0F49; AdjuzTicket=6FAE9BA974EE8744F9C33F5720A9EA57E9C885C8D762F7F0EF22A13A5C4E18B4C5545C10DDDA66E7D65293459B399D04875358E2CFF2C7E5BF1D8606FDE3E7A051BBF428EDB6910DCEECD41665713E8423727EBC5291AE5D1B059A607B84732D')
	      	}
      }
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
//  port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
//  assetsSubDirectory: './',
//  assetsPublicPath: '',
		assetsSubDirectory: 'static',
		assetsPublicPath: 'http://static.adjuz.com/backstage/',
    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
