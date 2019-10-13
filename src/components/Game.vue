<template>
    <div class='box'>
        <tileSet :tileSet="engine.tileSet" :car="engine.car"></tileSet>
        <car :car="engine.car"></car>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Engine } from '../modules/engine'
import Car from './Car.vue'
import TileSet from './TileSet.vue'

export default Vue.extend({
    data() {
        return {
            engine: new Engine()
        }
    },
    components: {
        'car': Car,
        'tileSet': TileSet
    },
    mounted () {
        this.engine.play()
    }
});
</script>

<style lang="css">
@import '../assets/style.css';
</style>
