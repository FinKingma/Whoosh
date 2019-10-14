<template>
    <table class="tileSet" v-bind:style="{ 'margin-top': (-car.topPos) + 'px', 'margin-left': (-car.leftPos) + 'px', }">
        <tr v-for="tileRow in tileSet.tileData.tiles" v-bind:key="tileRow.id">
            <td v-for="tile in tileRow" v-bind:key="tile.id">
                <div class="tile" v-bind:class=[tile.tileName] />
            </td>
        </tr>
    </table>
</template>

<script lang='ts'>
import Vue from 'vue';
import { TileSet } from '../modules/tileSet'
import { Car } from '../modules/car'

export default Vue.extend({
    data () {
        return {
            
        }
    },
    props: {
        tileSet: {
            type: TileSet
        },
        car: {
            type: Car
        }
    }
})

</script>