<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">Today</v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="500" width="800">
        <v-calendar
          ref="calendar"
          v-model="focus"
          :now="today"
          color="indigo"
          :value="today"
          :events="events"
          :event-color="getEventColor"
          type="month"
          @change="updateRange"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<!--
<div
  data-today="2019-08-01"
  data-event="0"
  class="v-event v-event-start v-event-end secondary white--text"
  style="height: 20px; top: 0px; margin-bottom: 1px;"
><div class="pl-1">125</div></div>
-->
<!--
https://script.google.com/macros/s/AKfycbz-Dn3YLNsx4wWJ3zTcgukvEY7LmrZaxSIGgwy_L6M_5b5hLsw/exec
-->
<script>
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    events: [
      {
        name: ' 125',
        start: '2019-08-01',
        color: 'pink'
      },
      {
        name: '  80',
        start: '2019-08-01',
        color: 'indigo'
      },
      {
        name: '128',
        start: '2019-08-02',
        color: 'pink'
      },
      {
        name: '78',
        start: '2019-08-02',
        color: 'indigo'
      },
      {
        name: '116',
        start: '2019-08-15',
        color: 'pink'
      },
      {
        name: '82',
        start: '2019-08-15',
        color: 'indigo'
      }
    ]
  }),
  computed: {
    title() {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const startYear = start.year

      return `${startMonth} ${startYear}`
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC',
        month: 'long'
      })
    }
  },
  methods: {
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = this.today
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start
      this.end = end
    }
  }
}
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
