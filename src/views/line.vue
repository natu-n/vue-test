<template>
  <v-card class="mx-auto mt-4" color="grey lighten-4" max-width="600">
    <section>
      <div v-if="loading">Loading...</div>

      <div v-else-if="fromDate && toDate">{{ customFilter(info.data) }}</div>
    </section>

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
          :prefix="fromDate"
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
import axios, * as axios_1 from 'axios'
import dayjs from 'dayjs'
import LineChart from '@/components/LineChart'

const API_URL =
  'https://script.google.com/macros/s/AKfycbz-Dn3YLNsx4wWJ3zTcgukvEY7LmrZaxSIGgwy_L6M_5b5hLsw/exec'

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
    fromDate: dayjs(new Date())
      .add(-13, 'day')
      .format('YYYY-MM-DD'),
    today: dayjs(new Date()).format('YYYY-MM-DD'),
    datacollection: null,
    info: null,
    loading: true
  }),

  computed: {},
  async created() {
    var _this = this
    let res = await axios
      .get(API_URL)
      .then(response => (this.info = response))
      .finally(() => (this.loading = false))
  },

  watch: {
    toDate: function(val) {
      console.log('toDate')
      console.log(val)
      this.fromDate = dayjs(val)
        .add(-13, 'day')
        .format('YYYY-MM-DD')
    }
  },

  methods: {
    setLb: function(val) {
      return this.lbl.map(function(element, index, array) {
        return dayjs(val)
          .add(-element, 'day')
          .format('M/D')
      })
    },

    customFilter(value) {
      // return value != null
      console.log('customFilter')
      console.log(this.toDate)
      return value
        .map(function(element, index, array) {
          if ('2019-08-19' <= element.date && element.date <= '2019-09-01') {
            console.log(element)
            return element
          }
        })
        .filter(x => x)
    },

    fillData: function() {
      console.log('fillData')
      console.log(this.toDate)
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
