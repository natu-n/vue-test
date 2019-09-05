<template>
  <v-app>
    <v-container>
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

      <v-data-table
        class="elevation-1"
        :dense="true"
        :headers="headers"
        :items="info.data"
        :items-per-page="14"
        search="search"
        :fixed-header="true"
        sort-By="date"
        :sort-Desc="true"
        :custom-filter="customFilter"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
          itemsPerPageOptions: [7, 14, 30]
        }"
        height="450px"
      >
        <template v-slot:item.date="{ item }">
          <td>{{ cvtDate(item.date) }}</td>
        </template>
        <template v-slot:item.systolic="{ item }">
          <v-chip :color="getSystolicColor(item.systolic)" dark small>{{
            item.systolic
          }}</v-chip>
        </template>
        <template v-slot:item.diastolic="{ item }">
          <v-chip :color="getDiastolicColor(item.diastolic)" dark small>{{
            item.diastolic
          }}</v-chip>
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
import axios, * as axios_1 from 'axios'
import dayjs from 'dayjs'

const API_URL =
  'https://script.google.com/macros/s/AKfycbz-Dn3YLNsx4wWJ3zTcgukvEY7LmrZaxSIGgwy_L6M_5b5hLsw/exec'

export default {
  data: () => ({
    headers: [
      { text: 'date', align: 'center', value: 'date', sortable: false },
      { text: 'systolic', align: 'center', value: 'systolic', sortable: false },
      {
        text: 'diastolic',
        align: 'center',
        value: 'diastolic',
        sortable: false
      }
    ],
    info: [],
    page: 1,
    toDate: dayjs(new Date()).format('YYYY-MM-DD'),
    today: dayjs(new Date()).format('YYYY-MM-DD'),
    modal: false
  }),
  async created() {
    var _this = this
    let res = await axios.get(API_URL).then(response => (this.info = response))
  },
  methods: {
    customFilter(value, search, item) {
      // return value != null
      return value >= this.fromDate && value <= this.toDate
    },
    cvtDate(date) {
      return dayjs(date).format('M/D/YYYY')
    },
    getSystolicColor(bp) {
      if (bp > 134) return 'red'
      else if (bp > 129) return 'orange'
      else return 'green'
    },
    getDiastolicColor(bp) {
      if (bp > 84) return 'red'
      else if (bp > 79) return 'orange'
      else return 'green'
    }
  },
  computed: {
    fromDate: function() {
      return dayjs(this.toDate)
        .add(-1, 'month')
        .format('YYYY-MM-DD')
    }
  }
}
</script>

<style>
.v-data-table tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
