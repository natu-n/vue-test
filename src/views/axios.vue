<template>
  <v-app>
    <v-container>
      <v-data-table
        class="elevation-1"
        fixed-header="true"
        height="500px"
        :dense="true"
        :headers="headers"
        :items="info.data"
        :items-per-page="14"
        search="search"
        sortBy="date"
        sortDesc="true"
        :custom-filter="customFilter"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
          itemsPerPageOptions: [7, 14, 30, -1]
        }"
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

export default {
  data: () => ({
    headers: [
      { text: 'date', align: 'center', value: 'date' },
      { text: 'systolic', align: 'center', value: 'systolic', sortable: false },
      {
        text: 'diastolic',
        align: 'center',
        value: 'diastolic',
        sortable: false
      }
    ],
    info: void 0
  }),
  mounted: function() {
    var _this = this
    axios
      .get(
        'https://script.google.com/macros/s/AKfycbz-Dn3YLNsx4wWJ3zTcgukvEY7LmrZaxSIGgwy_L6M_5b5hLsw/exec'
      )
      .then(response => (this.info = response))
  },
  methods: {
    customFilter(value, search, item) {
      // return value != null
      return value >= '2019-07-01'
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
  }
}
</script>

<style>
.v-data-table tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
