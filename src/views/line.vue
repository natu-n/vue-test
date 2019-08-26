<template>
  <v-card class="mx-auto mt-4" color="grey lighten-4" max-width="600">
    <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="computedDateFormatted"
          prepend-icon="event"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        @input="menu2 = false"
      ></v-date-picker>
    </v-menu>
    <div>
      <line-chart
        class="chart"
        :lb="[
          '7/12',
          '7/13',
          '7/14',
          '7/15',
          '7/16',
          '7/17',
          '7/18',
          '7/19',
          '7/20',
          '7/21',
          '7/22',
          '7/23',
          '7/24',
          '7/25'
        ]"
      />
    </div>
  </v-card>
</template>

<script>
import LineChart from '@/components/LineChart'

export default {
  components: { LineChart },
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style>
.chart {
  width: 500px;
  height: 500px;
}
</style>
