<template>
  <v-card class="mx-auto" color="grey lighten-4" max-width="600">
    <v-card-title>
      <v-icon
        :color="checking ? 'red lighten-2' : 'indigo'"
        class="mr-12"
        size="64"
        @click="takePulse"
      >
        mdi-heart-pulse
      </v-icon>
      <v-row align="start">
        <div class="caption grey--text text-uppercase">
          Heart rate
        </div>
        <div>
          <span class="display-2 font-weight-black" v-text="avg || '—'"></span>
          <strong v-if="avg">BPM</strong>
        </div>
      </v-row>

      <div class="flex-grow-1"></div>

      <v-btn icon class="align-self-start" size="28">
        <v-icon>mdi-arrow-right-thick</v-icon>
      </v-btn>
    </v-card-title>

    <v-sheet color="transparent">
      <v-sparkline
        :smooth="false"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="1"
        :value="[
          131,
          128,
          132,
          116,
          123,
          124,
          120,
          112,
          111,
          115,
          122,
          123,
          123,
          118
        ]"
        auto-draw
        stroke-linecap="round"
      ></v-sparkline>
      <v-sparkline
        :smooth="false"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="1"
        :value="[89, 85, 84, 82, 86, 82, 81, 73, 74, 78, 81, 85, 85, 85]"
        auto-draw
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
  </v-card>
</template>

<script>
const exhale = ms => new Promise(resolve => setTimeout(resolve, ms))

export default {
  data: () => ({
    checking: false,
    heartbeats: []
  }),

  computed: {
    avg() {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
      const length = this.heartbeats.length

      if (!sum && !length) return 0

      return Math.ceil(sum / length)
    }
  },

  created() {
    this.takePulse(false)
  },

  methods: {
    heartbeat() {
      return Math.ceil(Math.random() * (120 - 80) + 80)
    },
    async takePulse(inhale = true) {
      this.checking = true

      inhale && (await exhale(1000))

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat)

      this.checking = false
    }
  }
}
</script>
