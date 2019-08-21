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
              v-model="date"
              :label="date2"
              prepend-icon="event"
              x-larg="true"
              readonly
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
    date: new Date().toISOString().substr(0, 10),
    modal: false
  }),
  computed: {
    date2: function() {
      return dayjs(this.date)
        .add(-6, 'day')
        .format('YYYY-MM-DD')
    }
  }
}
</script>
