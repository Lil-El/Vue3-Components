import { designComponent } from "../../../../src/use/designComponent";
import { DemoUseEventTable, DemoUseEventTablePart } from "./DemoUseEventTable";
import { onBeforeUnmount, ref } from 'vue';

export const DemoUseEventTableHead = designComponent({
    setup() {

        const wrapperEl = ref(null as null | HTMLDivElement)
        const table = DemoUseEventTable.use.inject()

        const handler = {
            scroll: (e: Event, part: DemoUseEventTablePart) => {
                console.log('head:scroll:', part);
                if (part === DemoUseEventTablePart.body) {
                    wrapperEl.value!.scrollLeft = (e.target as HTMLDivElement).scrollLeft
                }
            },
            wrapperScroll: (e: Event) => {
                console.log('head:wrapperScroll');
                if (table.state.hoverPart === DemoUseEventTablePart.head) {
                    table.event.emit.scroll(e, DemoUseEventTablePart.head)
                }
            },
            mousewheel: (e: MouseWheelEvent) => {
                console.log('head:mousewheel');
                wrapperEl.value!.scrollLeft = wrapperEl.value!.scrollLeft + e.deltaY
            }
        }

        table.event.on.scroll(handler.scroll)
        onBeforeUnmount(() => table.event.off.scroll(handler.scroll))

        return {
            render: () => (
                <div class="demo-use-event-table-head"
                    ref={wrapperEl}
                    onScroll={handler.wrapperScroll}
                    {...{ onMousewheel: handler.mousewheel }}>
                    <div class="demo-use-event-table-head-inner">
                        table head
                    </div>
                </div>
            )
        }
    },
})