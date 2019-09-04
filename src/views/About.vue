<template>
  <v-layout wrap>
    <v-flex xs12 lg6>
      <div v-ripple="{ center: true }">
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              label="From To"
              v-model="date"
              :prefix="fromDate"
              prepend-icon="event"
              x-larg="true"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data: () => ({
    fromDate: dayjs(new Date())
      .add(-13, 'day')
      .format('YYYY-MM-DD'),

    date: dayjs(new Date()).format('YYYY-MM-DD'),
    modal: false
  }),
  computed: {},
  watch: {
    date: function(value) {
      this.fromDate = dayjs(value)
        .add(-13, 'day')
        .format('YYYY-MM-DD')
    }
  }
}
</script>
