<template>
  <DoughnutChart v-bind="doughnutChartProps"></DoughnutChart>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
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

    backgroundColor: {
      type: Array as PropType<string[]>,
      required: true,
    },

    hoverBackgroundColor: {
      type: Array as PropType<string[]>,
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
          backgroundColor: props.backgroundColor,
          hoverOffset: 3,
          borderColor: 'transparent',
          hoverBackgroundColor: props.hoverBackgroundColor,
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
