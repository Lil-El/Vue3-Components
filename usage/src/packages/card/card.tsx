import {designComponent} from 'v3-components-wsj/src/use/designComponent'
import {computed} from 'vue'
import './card.scss'

export default designComponent({
    name: 'pl-my-card',
    props: {
        status: {type: String, default: 'priamry'},
    },
    setup(props) {

        const classes = computed(() => [
            'pl-my-card',
            `pl-my-card-status-${props.status}`
        ])

        return {
            render: () => (
                <div class={classes.value}>
                    <div class="pl-my-card-header">
                        card header
                    </div>
                    <div class="pl-my-card-content">
                        card body
                    </div>
                </div>
            )
        }
    },
})