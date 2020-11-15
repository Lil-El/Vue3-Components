import { designComponent } from "../../../../src/use/designComponent";
import { DemoUseEventTable, DemoUseEventTablePart } from "./DemoUseEventTable";
import { onBeforeUnmount, ref } from 'vue';

export const DemoUseEventTableBody = designComponent({
    setup() {

        const wrapperEl = ref(null as null | HTMLDivElement)
        const table = DemoUseEventTable.use.inject()

        const handler = {
            scroll: (e: Event, part: DemoUseEventTablePart) => {
                console.log('body:scroll:', part);
                if (part === DemoUseEventTablePart.head) {
                    wrapperEl.value!.scrollLeft = (e.target as HTMLDivElement).scrollLeft
                }
            },
            wrapperScroll: (e: Event) => {
                console.log('body:wrapperScroll');
                if (table.state.hoverPart === DemoUseEventTablePart.body) {
                    /**
                     * 因为table.event监听了handler的scroll；所以，
                     * 这里会触发head和body的handler的scroll执行，并且useEvent当中，
                     * 会执行ctx.emit('scroll')，所以demo-use-event.vue的onScroll也会执行
                     */
                    table.event.emit.scroll(e, DemoUseEventTablePart.body)
                }
            },
            mousewheel: (e: MouseWheelEvent) => {
                console.log('body:mousewheel');
                if (e.altKey) {
                    wrapperEl.value!.scrollLeft = wrapperEl.value!.scrollLeft + e.deltaY
                    e.preventDefault()
                    e.stopPropagation()
                }
            }
        }

        table.event.on.scroll(handler.scroll)
        onBeforeUnmount(() => table.event.off.scroll(handler.scroll))

        return {
            render: () => (
                <div class="demo-use-event-table-body"
                    ref={wrapperEl}
                    onScroll={handler.wrapperScroll}
                    {...{ onMousewheel: handler.mousewheel }}>
                    <div class="demo-use-event-table-body-inner">
                        table <br /> body
                    </div>
                </div>
            )
        }
    },
})