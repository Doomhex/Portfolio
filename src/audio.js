// Web Audio API Synthesizer for Demon Slayer Sound FX (Zero-latency, no external audio files required)

class SoundEngine {
  constructor() {
    this.ctx = null
    this.muted = false
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        this.ctx = new AudioContext()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  toggleMute() {
    this.muted = !this.muted
    return this.muted
  }

  isMuted() {
    return this.muted
  }

  // Katana blade slash sound (metallic sweep + high pass whoosh)
  playSlash() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime

      // Metallic blade resonance
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.25)

      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.3)

      // Whoosh noise
      const bufferSize = this.ctx.sampleRate * 0.2
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3))
      }

      const noise = this.ctx.createBufferSource()
      noise.buffer = buffer
      const filter = this.ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(1800, now)
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.2)

      const noiseGain = this.ctx.createGain()
      noiseGain.gain.setValueAtTime(0.4, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)

      noise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(this.ctx.destination)
      noise.start(now)
    } catch (e) {
      console.warn('Audio play error:', e)
    }
  }

  // Thunder clap / electric shock
  playThunder() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(120, now)
      osc.frequency.setValueAtTime(450, now + 0.05)
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.4)

      gain.gain.setValueAtTime(0.4, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.45)
    } catch (e) {}
  }

  // Water surge / gentle wave
  playWater() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(350, now)
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15)
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.4)

      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.45)
    } catch (e) {}
  }

  // Hinokami Kagura Fire burst
  playFire() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(90, now)
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.1)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.5)

      gain.gain.setValueAtTime(0.35, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.5)
    } catch (e) {}
  }

  // Soft UI click / Sheath click
  playClick() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(980, now)
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.06)
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine()
