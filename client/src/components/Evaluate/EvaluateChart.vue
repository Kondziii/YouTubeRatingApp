<template>
  <transition
    appear
    enter-active-class="animate__animated animate__fadeIn animate__delay-3s"
    leave-active-class="animate__animated animate__fadeOut"
    tag="div"
  >
    <DoughnutChart v-bind="doughnutChartProps"></DoughnutChart>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
import { ChartData, ChartOptions, Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

export default defineComponent({
  name: 'EvaluateChart',

  props: {
    values: {
      type: Object,
      required: true,
    },

    title: {
      type: String,
      required: false,
    },

    percentage: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    DoughnutChart,
  },

  setup(props) {
    const data = computed<ChartData<'doughnut'>>(() => ({
      labels: Object.keys(props.values),
      datasets: [
        {
          data: Object.values(props.values),
          backgroundColor: [
            'rgb(18, 155, 41)',
            'rgb(201, 174, 20)',
            'rgb(194, 54, 26)',
          ],
          hoverOffset: 3,
          borderColor: 'transparent',
          hoverBackgroundColor: [
            'rgba(18, 155, 41, 0.9)',
            'rgba(201, 174, 20, 0.9)',
            'rgba(194, 54, 26, 0.9)',
          ],
          datalabels: {
            color: 'white',
            formatter: function (value) {
              return props.percentage ? value + '%' : value;
            },
          },
          cutout: '60%',
        },
      ],
    }));

    const options = computed<ChartOptions<'doughnut'>>(() => ({
      plugins: {
        legend: {
          position: 'top',

          labels: {
            font: {
              size: 14,
              lineHeight: 1.5,
            },
            color: '#e0e0e0',
          },
        },
        title: {
          display: true,
          text: props.title,
          color: '#e0e0e0',
          padding: 10,
          font: {
            size: 16,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const index = context.dataIndex;
              const label = context.label + ': ' + context.dataset.data[index];

              if (props.percentage) {
                return label + '%';
              }

              return label;
            },
          },
        },
      },
    }));

    const { doughnutChartProps } = useDoughnutChart({
      chartData: data,
      options,
    });

    return {
      doughnutChartProps,
    };
  },
});
</script>

<style lang="scss" scoped></style>
