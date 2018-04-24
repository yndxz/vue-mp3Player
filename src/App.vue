<template>
    <div>
        <mp3-Player :url="url" :music-name="name"></mp3-Player>
    </div>
</template>

<script>
    import mp3Player from './components/mp3Player';
    export default {
        name: "app",
        data(){
            return{
                url:'http://m10.music.126.net/20180424234854/979a47cdb1ec0bbd222ce59b24d0e00b/ymusic/d8ce/08c3/986c/844405c5672efe9b10076bab25d7bce2.mp3',
                name:'好久不见'
            }
        },
        components:{
            'mp3-Player':mp3Player
        }
    }
</script>

<style scoped>

</style>