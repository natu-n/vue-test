<template>
  <v-card class="mx-auto mt-4" color="grey lighten-4" max-width="600">
    <line-chart
      class="chart"
      :lb="setLb"
      :data1="data1"
      :data2="data2"
      :width="480"
      :height="200"
    />
  </v-card>
</template>

<script>
import dayjs from 'dayjs'
import LineChart from '@/components/LineChart'

export default {
  components: { LineChart },
  data: () => ({
    lbl: [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    data1: [
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
    ],
    data2: [89, 85, 84, 82, 86, 82, 81, 73, 74, 78, 81, 85, 85, 85]
  }),
  computed: {
    setLb: function() {
      return this.lbl.map(function(element, index, array) {
        return dayjs(new Date())
          .add(-element, 'day')
          .format('M/D')
      })
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
