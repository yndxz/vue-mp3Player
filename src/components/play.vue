<template>
    <div>
        <div class="media">
            <span class="play" v-show="play" @click="player()"></span>
            <span class="pause" v-show="!play" @click="pause()"></span>
            <span class="name">好久不见</span>
            <time class="time">{{currentTime}}/{{total}}</time>
            <i class="progress" ref="progress" @click="getPoint($event)">
                <em class="current" ref="current"></em>
            </i>
        </div>
        <audio ref="audio" @loadedmetadata="getTotal($event)" @ended=over(); @timeupdate="getCurrentTime()">
            <source src="http://1.lzzyx.applinzi.com/%E5%A5%BD%E4%B9%85%E4%B8%8D%E8%A7%81.mp3" type="audio/mp3">
        </audio>
    </div>
</template>
<style lang="less">
    @import "../assets/css/mix.less";
    @import "../assets/css/base.css";
    video{
        display: none;
    }
    .media{
        position: relative;
        width:384 / @base;
        height: 88 / @base;
        background: #FCFCFC;
        border: 1px  solid #E6E6E6;
        border-radius: 6px;
        margin: 20px auto 0 auto;
    }
    .play,.pause{
        display: block;
        top:25 / @base;
        bottom: 25 / @base;
        left:12 / @base;
        width:38 / @base;
        height: 38 / @base;
    }
    .play{
        background: url("../assets/images/play.png") center ;
        background-size: cover;
    }
    .pause{
        background: url("../assets/images/pause.png") center ;
        background-size: cover;
    }
    .play,.pause,.name,.time,.progress,.current{
        position: absolute;
    }
    .name{
        font-size: 16 / @base;
        color: #666666;
        left:65 / @base
    }
    .time{
        font-size: 14 / @base;
        color: #999999;
        right: 24 / @base;
    }
    .name,.time{
        top:21 / @base;

    }
    .progress,.current{
        bottom: 0;
    }
    .progress{
        height: 1 / @base;
        left:0;
        right:0;
    }
    .current{
        height: 2 / @base;
        background: #FF461F;
    }
</style>
<script>
    export  default {
        data(){
            return {
                total:'00:00',
                duration:'',
                currentTime:'00:00',
                audio:null,
                progress:null,
                current:null,
                play:true,
                overFlag:false,
                loadFlag:false
            }
        },
        mounted(){

        },
        methods:{
            getTotal($event){
                this.loadFlag = true;
                this.audio = $event.currentTarget;
                this.duration = this.audio.duration;
                this.total = this.formatTime(this.duration)
            },
            formatTime(time){
                var minute = '00' + Math.floor(time / 60);
                var second = '00' + Math.floor(time % 60);
                return minute.substr(-2) + ':'  + second.substr(-2);
            },
            getCurrent(){
                this.current = this.$refs.current;
                this.progress = this.$refs.progress;
                var self = this;
                this.timer = setInterval(function () {
                    self.current.style.width = (self.audio.currentTime / self.duration * parseInt(self.progress.offsetWidth) + 'px');

                },100);
            },
            player(){
                if(!this.loadFlag){
                    return;
                }
                this.play = false;
                this.overFlag = false;
                this.audio.play();
                this.getCurrent();
            },
            pause(){
                this.audio.pause();
                this.play = true;
            },
            getPoint($event){
                if(this.overFlag){
                    return;
                }
                this.audio.currentTime = ($event.offsetX / this.progress.offsetWidth * this.duration);
            },
            over(){
                this.current.style.width = '0px';
                this.overFlag = true;
                this.play = true;
                this.currentTime = '00:00';
                clearInterval(this.timer)

            },
            getCurrentTime(){
               this.currentTime = this.formatTime(this.audio.currentTime)
            }
        }
    }
</script>