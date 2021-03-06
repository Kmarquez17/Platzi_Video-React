import React, {Component} from 'react'
import VideoPlayerLayout from '../components/video-player-layout'
import Video from '../components/video'
import Title from '../components/title'
import PlayPause from '../components/play-pause'
import Timer from '../components/timer'
import Controls from '../components/video-player-controls'
import FormateTime from '../components/formateTime'
import ProgressBar from '../components/progress-bar'
import Spinner from '../components/spinner'
import Volumen from '../components/volumen'
import FullScreen from '../components/fullscreen'

class VideoPlayer extends Component {
state={
  pause:true,
  duration:0,
  durationF:0,
  currentTime:0,
  currentTimeF:0,
  loading:false,
}
  togglePlay = (event) => {
    this.setState({
      pause: !this.state.pause
    })
  }
  componentDidMount() {
    this.setState({
      pause: (!this.props.autoplay)
    })
  }

  handleLoadedMetadata = event =>{
    this.video = event.target
    this.setState({
      duration:FormateTime(this.video.duration),
      durationF:this.video.duration
    })
  }

  handleTimeUpdate  = event =>{
    // console.log(this.video.currentTime)
    this.setState({
      currentTime: FormateTime(this.video.currentTime),
      currentTimeF: this.video.currentTime
    })
}
handleProgressChange = event =>{
  this.video.currentTime = event.target.value
}

handleSeeking = event =>{
  this.setState({
    loading:true
  })
}

handleSeeked = event =>{
  this.setState({
    loading:false
  })
}

handleVolumenChange = event => {
  this.video.volume = event.target.value
}

handleFullScreenClick = event => {
    if (!document.webkitIsFullScreen) {
      // mando a full screen
      this.player.webkitRequestFullscreen()
    } else {
      document.webkitExitFullscreen();
      // salgo del full screen
    }
  }

setRef = element => {
  this.player = element
}
  render(){
    return(
      <VideoPlayerLayout
          setRef={this.setRef}
      >
        <Title
          title={this.props.title}
        />
        <Controls>
          <PlayPause
            pause={this.state.pause}
            handleClick={this.togglePlay}
          />
          <Timer
            duration={this.state.duration}
            currentTime={this.state.currentTime}
          />
          <ProgressBar
            durationF={this.state.durationF}
            value={this.state.currentTimeF}
            handleProgressChange={this.handleProgressChange}
          />
          <Volumen
            handleVolumenChange={this.handleVolumenChange}
          />
          <FullScreen
            handleFullScreenClick={this.handleFullScreenClick}
          />
        </Controls>
        <Spinner
            active={this.state.loading}
        />
        <Video
          autoplay={this.props.autoplay}
          pause={this.state.pause}
          handleLoadedMetadata={this.handleLoadedMetadata}
          handleTimeUpdate={this.handleTimeUpdate}
          handleSeeking={this.handleSeeking}
          handleSeeked={this.handleSeeked}
          src={this.props.src}
       />
    </VideoPlayerLayout>
    )
  }
}


export default VideoPlayer
