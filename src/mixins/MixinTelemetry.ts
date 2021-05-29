import Vue from 'vue'
import { BinTelemetry } from 'src/store/store'

export default Vue.extend({
  computed: {
    myTelemetry (): BinTelemetry {
      // @ts-ignore
      const stream = this.$store.state.telemetry[this.model.binId]
      if (!stream || stream.length === 0) {
        return null
      }
      return stream[ stream.length - 1 ]
    },
    fullnessValue (): string {
      return this.myTelemetry && this.myTelemetry.fullness.toFixed(2) + '%'
    },
    smokeValue (): string {
      return this.myTelemetry && this.myTelemetry.smoke.toFixed(2) + '%'
    },
    tiltValue (): string {
      return this.myTelemetry && this.myTelemetry.tilt.toFixed(2) + '%'
    },
    alertFull (): boolean {
      return this.myTelemetry && this.myTelemetry.alertFull
    },
    alertFlip (): boolean {
      return this.myTelemetry && this.myTelemetry.alertFlip
    },
    alertFire (): boolean {
      return this.myTelemetry && this.myTelemetry.alertFire
    }
  }
})
