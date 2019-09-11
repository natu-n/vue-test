<template>
  <v-card class="mx-auto mt-4" color="grey lighten-4" max-width="600">
    <template v-if="$store.state.loading">
      <v-row>
        <v-col></v-col>
        <v-col>
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
                :prefix="fromDate + ' - '"
                prepend-icon="event"
                x-larg="true"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="toDate"
              :max="$store.state.today"
              scrollable
            >
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(toDate)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>

      <line-chart :chart-data="fillData()" :width="480" :height="200" />
    </template>
  </v-card>
</template>

<script>
import axios, * as axios_1 from 'axios'
import dayjs from 'dayjs'
import LineChart from '@/components/LineChart'
import { mapMutations, mapGetters } from 'vuex'

const API_URL =
  'https://script.google.com/macros/s/AKfycbz-Dn3YLNsx4wWJ3zTcgukvEY7LmrZaxSIGgwy_L6M_5b5hLsw/exec'

export default {
  components: { LineChart },
  data: () => ({
    lbl: [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    fromDate: dayjs(new Date())
      .add(-13, 'day')
      .format('YYYY-MM-DD'),
    toDate: dayjs(new Date()).format('YYYY-MM-DD'),
    xLabel: [],
    info: null,
    loading: false,
    modal: false
  }),

  computed: {},

  created: function() {
    // var _this = this
    // let res = await axios
    //   .get(API_URL)
    //   .then(response => (this.info = response))
    //   .finally(() => (this.loading = false))
    console.log('dispatch start')
    this.$store.dispatch('getJSON')
    console.log('dispatch -end-')
    // console.log('data :' + this.data.info)
    // console.log('store:' + this.$store.state.info)
    // this.data.info = this.$store.state.info
    // this.data.loading = this.$store.state.loading
    console.log('return:' + this.data)
    console.log('      :' + this.$store.state.loadingx)
  },

  watch: {
    toDate: function(value) {
      this.fromDate = dayjs(value)
        .add(-13, 'day')
        .format('YYYY-MM-DD')
    }
  },

  methods: {
    setLb: function(value) {
      return this.lbl.map(function(element, index, array) {
        return dayjs(value)
          .add(-element, 'day')
          .format('M/D')
      })
    },

    customFilter(value) {
      var _this = this
      return value
        .map(function(element, index, array) {
          if (_this.fromDate <= element.date && element.date <= _this.toDate) {
            return element
          }
        })
        .filter(x => x)
    },

    setSystolic(value) {
      var _this = this
      return value
        .map(function(element, index, array) {
          if (_this.fromDate <= element.date && element.date <= _this.toDate) {
            return element.systolic
          }
        })
        .filter(x => x)
    },

    setDiastolic(value) {
      var _this = this
      return value
        .map(function(element, index, array) {
          if (_this.fromDate <= element.date && element.date <= _this.toDate) {
            return element.diastolic
          }
        })
        .filter(x => x)
    },

    fillData: function() {
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
            yAxisID: 'first-y-axis',
            label: 'systolic',
            borderColor: 'red',
            lineTension: 0,
            data: this.setSystolic(this.$store.state.info),
            fill: false
          },
          {
            yAxisID: 'second-y-axis',
            label: 'diastolic',
            borderColor: 'indigo',
            lineTension: 0,
            data: this.setDiastolic(this.$store.state.info),
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
