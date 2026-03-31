<template>
  <div class="camera-test">
    <h1>QR Scan</h1>
    
    <button @click="startCamera" :disabled="isActive">
      Start Scanning
    </button>
    
    <button @click="stopCamera" :disabled="!isActive">
      Stop Scanning
    </button>
    
    <div class="video-container">
      <video 
        ref="video" 
        autoplay 
        playsinline 
        muted
        class="video-element"
      ></video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      stream: null,
      status: 'Not started',
      videoReady: false,
      videoWidth: 0,
      videoHeight: 0,
      cameraCount: 0
    }
  },
  async mounted() {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const cameras = devices.filter(d => d.kind === 'videoinput')
    this.cameraCount = cameras.length
  },
  beforeDestroy() {
    this.stopCamera()
  },
  methods: {
    async startCamera() {
      this.status = 'Requesting camera...'
      
      const constraints = { video: true }
      
      this.stream = await navigator.mediaDevices.getUserMedia(constraints)
      
      this.status = 'Camera granted!'
      
      const videoEl = this.$refs.video
      
      if (videoEl) {
        videoEl.srcObject = this.stream
        
        videoEl.play()
          .then(() => {
            this.status = 'Video playing'
          })
        
        videoEl.onloadedmetadata = () => {
          this.videoWidth = videoEl.videoWidth
          this.videoHeight = videoEl.videoHeight
          this.videoReady = true
          this.status = `Video ready: ${this.videoWidth}x${this.videoHeight}`
        }
        
        this.isActive = true
      }
    },
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => {
          track.stop()
        })
        this.stream = null
      }
      
      const videoEl = this.$refs.video
      if (videoEl) {
        videoEl.srcObject = null
      }
      
      this.isActive = false
      this.videoReady = false
      this.videoWidth = 0
      this.videoHeight = 0
      this.status = 'Stopped'
    }
  }
}
</script>

<style scoped>
.camera-test {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.video-container {
  margin: 20px 0;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* This prevents expansion while maintaining aspect ratio */
}
</style>