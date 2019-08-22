<template>
    <div class="row valueCard">
        <div class="col align-self-center" style="">
            <div class="valueCard__label">{{label}}</div>
            <div class="valueCard__val" :id="`value-${label}`">{{val}}</div>
        </div>
    </div>
</template>
<script>
import GraphDataManager from '~/components/GraphDataManager.js'

export default {
    name: 'value-card',
    data: function() {
        return {
            endpoint: 'ars',
            ds: {data: []}
        }
    },
    props: [
        'label'
    ],
    computed: {
        val: function () {
            return this.ds.data[0]
        }
    },
    mounted: function() {
        // 一時措置
        GraphDataManager.startManageV(this, this.ds, 'ars', 'replaceAll');
    }
}
</script>
<style lang="scss">
    .valueCard {
        width: 300px;
        height: 300px;
        border: 1px solid #cccccc;
        & * {
            text-align: center;
        }
        &__label, &__val {
            text-align: center;
            width: 100%;
        }
        &__label {
            font-size: 30px;
        }
        &__val {
            font-size: 150px;
        }
    }
</style>