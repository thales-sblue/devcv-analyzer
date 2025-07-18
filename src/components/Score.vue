<template>
  <div class="bg-[#1a1a1d] border border-[#2c2c30] rounded-lg p-6 flex flex-col items-center space-y-4">
    <h2 class="text-lg font-semibold text-white">Nota Técnica Geral</h2>

    <Doughnut :data="chartData" :options="chartOptions" />

    <p class="text-2xl font-bold" :class="notaColorClass">{{ nota }} / 100</p>

    <p class="text-sm text-gray-400 italic text-center max-w-xs">
      {{ mensagemNota }}
    </p>

    <div v-if="faltando.length" class="w-full mt-4">
      <h3 class="text-sm text-white mb-2">Tecnologias que você ainda pode adicionar:</h3>
      <ul class="flex flex-wrap gap-2 text-sm text-gray-300">
        <li
          v-for="tech in faltando"
          :key="tech"
          class="bg-[#2c2c30] px-3 py-1 rounded-full"
        >
          {{ tech }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement,
  Legend
} from 'chart.js'

ChartJS.register(Title, Tooltip, ArcElement, Legend)

const props = defineProps({
  nota: Number,
  faltando: {
    type: Array,
    default: () => []
  }
})

const getNotaColor = (nota) => {
  if (nota >= 80) return '#22c55e' // verde
  if (nota >= 50) return '#eab308' // amarelo
  return '#ef4444'                // vermelho
}

const notaColorClass = computed(() => {
  if (props.nota >= 80) return 'text-green-400'
  if (props.nota >= 50) return 'text-yellow-400'
  return 'text-red-400'
})

const chartData = computed(() => ({
  labels: ['Nota', 'Faltando'],
  datasets: [
    {
      backgroundColor: [getNotaColor(props.nota), '#2c2c30'],
      data: [props.nota, 100 - props.nota]
    }
  ]
}))

const chartOptions = {
  responsive: true,
  cutout: '70%',
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (ctx) =>
          ctx.label === 'Nota'
            ? `Nota técnica: ${ctx.raw}`
            : `Pontos não atingidos: ${ctx.raw}`
      }
    }
  }
}

const mensagemNota = computed(() => {
  if (props.nota >= 90) return 'Excelente! Seu currículo cobre muito bem as skills técnicas.'
  if (props.nota >= 70) return 'Muito bom! Mas ainda há espaço para incluir mais tecnologias.'
  if (props.nota >= 50) return 'Você tem uma base sólida. Que tal reforçar com mais habilidades?'
  return 'Seu currículo pode ser melhorado com mais tecnologias relevantes.'
})
</script>
