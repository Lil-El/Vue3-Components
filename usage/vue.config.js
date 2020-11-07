module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "src/style/global-import.scss";`
            },
        }
    },
}