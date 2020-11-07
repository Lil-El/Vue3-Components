module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
    ],
    plugins: [
        [
            'import',
            {
                "libraryName": "v3-components-wsj",
                "customName": (name) => {
                    return `v3-components-wsj/src/packages/${name}/index.ts`;
                }
            }
        ]
    ]
}
