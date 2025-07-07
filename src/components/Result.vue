<template>
  <div class="bg-[#1a1a1d] border border-[#2c2c30] rounded-lg p-6">
    <h2 class="text-lg font-semibold text-white mb-4">Tecnologias encontradas</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  relatorio: Array
})

const chartData = {
  labels: props.relatorio,
  datasets: [
    {
      label: 'Ocorrências',
      backgroundColor: '#a855f7',
      data: props.relatorio.map(() => 1)
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: () => 'Detectado no currículo'
      }
    }
  },
  scales: {
    y: {
      ticks: { color: '#e5e5e5' },
      grid: { color: '#2c2c30' }
    },
    x: {
      ticks: { color: '#e5e5e5' },
      grid: { color: '#2c2c30' }
    }
  }
}
</script>
