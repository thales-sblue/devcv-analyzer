<template>
  <div class="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-6 rounded-lg">
    <label for="file" class="cursor-pointer text-accent hover:underline mb-2">
      Clique para selecionar um currículo (.pdf ou .docx)
    </label>
    <input id="file" type="file" accept=".pdf,.docx" class="hidden" @change="handleFile" />
    <p v-if="fileName" class="text-sm text-gray-300 mt-2">Selecionado: {{ fileName }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['file-loaded'])
const fileName = ref('')

function handleFile(event) {
  const file = event.target.files[0]
  if (file) {
    fileName.value = file.name
    emit('file-loaded', file)
  }
}
</script>
