<template>
  <v-card class="mx-auto mt-4" color="grey lighten-4" max-width="600">
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="toDate"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="toDate"
          :prefix="fromDate(toDate)"
          prepend-icon="event"
          x-larg="true"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="toDate" :max="today" scrollable>
        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.dialog.save(toDate)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>

    <line-chart :chart-data="fillData()" :width="480" :height="200" />
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
    data2: [89, 85, 84, 82, 86, 82, 81, 73, 74, 78, 81, 85, 85, 85],
    toDate: dayjs(new Date()).format('YYYY-MM-DD'),
    today: dayjs(new Date()).format('YYYY-MM-DD'),
    datacollection: null
  }),
  computed: {},
  methods: {
    setLb: function(val) {
      return this.lbl.map(function(element, index, array) {
        return dayjs(val)
          .add(-element, 'day')
          .format('M/D')
      })
    },
    fromDate: function(val) {
      return dayjs(val)
        .add(-29, 'day')
        .format('YYYY-MM-DD')
    },
    fillData: function() {
      console.log('fillData')
      return {
        labels: this.setLb(this.toDate),
        datasets: [
          {
            title: {
              display: false
            },
            legend: {
              display: false
            }
          },
          {
            label: 'systolic',
            borderColor: 'red',
            lineTension: 0,
            data: this.data1,
            fill: false
          },
          {
            label: 'diastolic',
            borderColor: 'indigo',
            lineTension: 0,
            data: this.data2,
            fill: false
          }
        ]
      }
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
