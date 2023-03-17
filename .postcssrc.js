module.exports = (ctx) => {
    const options = ctx.options ?? {}
    return {
        plugins: {
            'autoprefixer': { cascade: false },
            'postcss-csso': options.run?.css.minify ? { forceMediaMerge: false } : false,
        }
    }
}
