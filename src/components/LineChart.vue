<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    data1: {
      type: Array
    },
    data2: {
      type: Array
    },
    lb: {
      type: Array
    }
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
      },
      options: {
        title: {
          display: false
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
