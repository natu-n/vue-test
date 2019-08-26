<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    lb: []
  },
  data() {
    return {
      chartData: {
        labels: this.lb,
        datasets: [
          {
            label: 'systolic',
            borderColor: 'red',
            lineTension: 0,
            data: [
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
            fill: false
          },
          {
            label: 'diastolic',
            borderColor: 'indigo',
            lineTension: 0,
            data: [89, 85, 84, 82, 86, 82, 81, 73, 74, 78, 81, 85, 85, 85],
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Line chart'
        },
        legend: {
          display: false
        }
      }
    }
  },
  mounted: function() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
