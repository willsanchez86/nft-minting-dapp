const {aliasWebpack, aliasJest, defaultOptions, expandResolveAlias, expandRulesInclude, expandPluginsScope} = require('react-app-alias')
const webpack = require('webpack');
const path = require('path')
const paths = require('react-scripts/config/paths')

const options = {} // default is empty for most cases

function isOutsideOfRoot(targ) {
    const rel = path.relative(paths.appPath, targ)
    return rel.startsWith('..') || path.isAbsolute(rel)
  }

function checkOutside(aliasMap) {
    const outside = Object.keys(aliasMap).reduce( (a, i) => {
      if(isOutsideOfRoot(aliasMap[i])) {
        console.error(
          `alias '${i}' is outside of root - supported only by react-app-alias-ex`
        )
        return true
      }
      return a
    }, false)
    if(outside) {
      console.error(
        `https://github.com/oklas/react-app-alias#outside-of-root`
      )
      process.exit(-1)
    }
  }


module.exports = aliasWebpack(options)
module.exports.jest = aliasJest(options)

module.exports = function override(config) {
    const {aliasMap, baseUrl} = defaultOptions(options)
    checkOutside(aliasMap)
    const aliasLocal = Object.keys(aliasMap).reduce( (a,i) => {
      a[i] = path.resolve(paths.appPath, baseUrl, aliasMap[i])
      return a
    }, {})

    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.ignoreWarnings = [/Failed to parse source map/];
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    expandResolveAlias(config.resolve, aliasLocal)
    expandRulesInclude(config.module.rules, Object.values(aliasLocal))
    expandPluginsScope(config.resolve.plugins, Object.values(aliasLocal), Object.values(aliasLocal))
    return config;
}
