// Audio disabled per user request
class SoundEngine {
  constructor() {
    this.muted = true
  }

  init() {}
  toggleMute() { return true }
  isMuted() { return true }
  playSlash() {}
  playClick() {}
  playWater() {}
  playThunder() {}
  playFire() {}
}

export const soundEngine = new SoundEngine()
