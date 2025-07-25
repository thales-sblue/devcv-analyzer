<template>
  <div class="min-h-screen bg-[#0b0b0e] flex items-center justify-center p-6">
    <div class="bg-gradient-to-br from-[#1a1a1d] to-[#121214] border border-[#2c2c30] shadow-2xl rounded-xl p-10 w-full max-w-2xl relative overflow-hidden">
      <div class="absolute -inset-1 bg-gradient-to-r from-purple-700/10 via-purple-800/5 to-transparent rounded-xl blur-xl opacity-30 z-0"></div>

      <div class="relative z-10 space-y-8">
        <h1 class="text-4xl font-bold text-white text-center tracking-wide">
          DevCV Analyzer
        </h1>

        <p class="text-center text-gray-400 text-sm">
          Envie seu currículo em <span class="text-purple-400 font-medium">PDF</span> ou <span class="text-purple-400 font-medium">DOCX</span> e receba insights técnicos.
        </p>

        <Upload @file-loaded="processFile" />

        <div v-if="text && !error" class="text-center">
          <button
            @click="analisarTexto"
            class="mt-4 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Analisar Currículo
          </button>
        </div>

        <Result v-if="relatorio.length" :relatorio="relatorio" />
        <Score v-if="relatorio.length" :nota="notaTecnica" :faltando="tecnologiasFaltando" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Upload from '../components/Upload.vue'
import Result from '../components/Result.vue'
import { extractTextFromFile } from '../utils/extractText.js'
import Score from '../components/Score.vue'

const text = ref('')
const relatorio = ref([])
const error = ref(false)

const tecnologias = [
  'Java', 'PHP', 'Node.js', 'JavaScript', 'React', 'Vue', 'Angular',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Git', 'Docker', 'Kubernetes',
  'Linux', 'HTML', 'CSS', 'TypeScript'
]

const processFile = async (file) => {
  text.value = ''
  relatorio.value = []
  error.value = false

  try {
    const conteudo = await extractTextFromFile(file)
    text.value = conteudo || ''
  } catch (err) {
    console.error('Erro ao extrair texto:', err)
    text.value = ''
    error.value = true
  }
}

const analisarTexto = () => {
  const lowerText = text.value.toLowerCase()
  relatorio.value = tecnologias.filter((tech) =>
    lowerText.includes(tech.toLowerCase())
  )
}

const notaTecnica = computed(() => {
  const total = tecnologias.length
  const encontradas = relatorio.value.length
  return Math.round((encontradas / total) * 100)
})

const tecnologiasFaltando = computed(() =>
  tecnologias.filter((tech) => !relatorio.value.includes(tech))
)
</script>
