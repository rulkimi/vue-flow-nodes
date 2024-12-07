<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

defineProps<{
  title: string
  description?: string
  icon?: string
  iconColor?: string
  borderColor?: string
}>();

const isExpanded = ref(false)
const isOverflowing = ref(false)
const descriptionRef = ref<HTMLElement | null>(null)

const checkOverflow = () => {
  if (descriptionRef.value) {
    isOverflowing.value =
      descriptionRef.value.scrollHeight > descriptionRef.value.clientHeight
  }
}

const toggleDescription = () => {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  checkOverflow()
})

watch(
  () => descriptionRef.value?.innerText,
  () => checkOverflow()
)
</script>

<template>
  <div
    class="bg-white border rounded-2xl shadow-md w-60"
    :style="{ borderColor }"
  >
    <div class="border-b p-3 flex items-center gap-2 font-semibold">
      <font-awesome-icon
        v-if="icon"
        :icon="['far', icon]"
        :style="{ color: iconColor }"
      />
      <div>{{ title }}</div>
    </div>

    <div class="p-3 break-words">
      <div
        ref="descriptionRef"
        class="transition-all duration-300 ease-in-out overflow-hidden"
        :class="{ 'max-h-[500px]': isExpanded, 'max-h-[60px]': !isExpanded }"
      >
        <slot name="description">{{ description }}</slot>
      </div>

      <button
        v-if="isOverflowing"
        class="text-blue-500 hover:text-blue-700 bg-transparent border-none cursor-pointer mt-2 text-sm"
        @click="toggleDescription"
      >
        {{ isExpanded ? 'Show Less' : 'Show More' }}
      </button>
    </div>
  </div>
</template>
