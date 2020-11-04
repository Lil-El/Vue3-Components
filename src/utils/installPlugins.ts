import {Plugin, App} from 'vue'

export function installPlugins<T extends { name: string }>(
    Component: T,
    plugins?: Plugin[],
) {
    return {
        ...Component,
        install(app: App) {
            app.component(Component.name, Component);
            !!plugins && (plugins.forEach(app.use))
        },
    }
}