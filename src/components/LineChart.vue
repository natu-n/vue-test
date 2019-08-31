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
      }
    }
  }),

  mounted: function() {
    console.log(this.options)
    this.renderChart(this.chartData, this.options)
  }
}
</script>
