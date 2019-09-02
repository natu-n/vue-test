<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'LineChart',
  mixins: [reactiveProp],
  extends: Line,
  data: () => ({
    options: {
      title: {
        display: false
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            display: true,
            stacked: false,
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              drawBorder: false
            }
          }
        ]
      }
    }
  }),

  mounted: function() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
