<template>
  <div>
    <transition
      appear
      enter-active-class="animate__animated animate__fadeIn "
      leave-active-class="animate__animated animate__fadeOut"
      tag="div"
    >
      <LineChart style="cursor: pointer" v-bind="lineChartProps"></LineChart>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { LineChart, useLineChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Sentiment } from '@/types/Sentiment';
import 'chartjs-adapter-moment';

Chart.register(...registerables);

export default defineComponent({
  name: 'EvaluateLineChart',

  props: {
    title: {
      type: String,
      required: false,
    },
    values: {
      type: Array as PropType<Array<Sentiment>>,
      required: true,
    },
  },

  components: { LineChart },

  emits: ['clickPoint'],

  setup(props, { emit }) {
    const data = computed<ChartData<'line'>>(() => ({
      labels: props.values.map((val) => new Date(val.publishedAt || '')),
      datasets: [
        {
          label: 'Video score',
          data: props.values.map((val) =>
            val.avg.compound ? parseFloat(val.avg.compound.toFixed(3)) : 0
          ),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          borderWidth: 3,
          hoverBackgroundColor: 'rgb(24, 114, 114)',
          hoverBorderColor: 'rgb(24, 114, 114)',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: 'rgb(48, 136, 136)',
          pointBorderColor: 'rgb(48, 136, 136)',
          drawActiveElementsOnTop: true,
          datalabels: {
            display: false,
          },
          pointHoverRadius: 9,
        },
      ],
    }));

    const options = computed<ChartOptions<'line'>>(() => ({
      plugins: {
        title: {
          display: true,
          text: props.title,
          color: 'white',
          font: {
            size: 16,
          },
        },
        legend: {
          labels: {
            color: '#e0e0e0',

            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const index = context.dataIndex;
              const label = ' ' + context.dataset.data[index]?.toString() || '';

              return label;
            },
            title: function (context) {
              const index = context[0].dataIndex;
              return 'VideoId: ' + props.values[index]?.videoId || '';
            },
          },
        },
      },

      scales: {
        x: {
          type: 'timeseries',
          time: {
            unit: 'day',
          },
          ticks: {
            source: 'data',
            color: '#ccc',
          },
          grid: {
            borderColor: '#ccc',
          },
        },
        y: {
          min: -1,
          max: 1,
          ticks: {
            color: '#ccc',
          },
          grid: {
            borderColor: '#ccc',
          },
        },
      },

      onClick(_, activeElements) {
        emit('clickPoint', activeElements[0].index);
      },
    }));

    const { lineChartProps } = useLineChart({
      chartData: data,
      options,
    });

    return {
      lineChartProps,
    };
  },
});
</script>

<style scoped></style>
