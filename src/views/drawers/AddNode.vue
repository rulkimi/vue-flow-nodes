<script setup lang="ts">
import { useMainStore } from '../../stores';
import { ref } from 'vue';

import { Node } from '../../types'


const store = useMainStore()

const nodeTypes = ref([
  { 
    value: 'sendMessage', 
    label: 'Send Message', 
    icon: 'paper-plane',
    color: '#3baca1',
  },
  { 
    value: 'addComment', 
    label: 'Add Comment', 
    icon: 'comment-dots',
    color: '#8b93d0',
  },
  { 
    value: 'businessHours', 
    label: 'Business Hours', 
    icon: 'calendar-days',
    color: '#f9511e',
  }
]) 
const selectedNodeType = ref()
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-4">
      <font-awesome-icon style="color: #8b93d0" :icon="['far', 'square-plus']" size="xl" />
      <h2 class="text-2xl font-bold">Add Node</h2>
    </div>
    <div class="border-b pb-2">
      <span>
        Remark for more explanation.
      </span>
    </div>

    <div class="mt-4">
      <p class="text-slate-500 mb-2">Select Node Type</p>
      <div class="flex flex-col space-y-2">
        <label
          v-for="type in nodeTypes"
          :key="type.value"
          class="cursor-pointer flex items-center justify-center border rounded-lg p-4 w-full h-16 transition-all duration-200"
          :class="selectedNodeType === type.value ? 'bg-blue-500/10 border-blue-500' : 'hover:bg-gray-100'"
        >
          <div class="w-full grid grid-cols-12">
            <font-awesome-icon
              :style="{ color: type.color }"
              :icon="['far', type.icon]"
              size="xl"
              class="col-span-2"
            />
            <div class="col-span-8 text-center text-sm text-slate-700">
              {{ type.label }}
            </div>
            <div class="col-span-2 flex justify-end items-center">
              <input
                :id="type.value + '-id'"
                type="radio"
                v-model="selectedNodeType"
                :value="type.value"
              />
            </div>
          </div>
        </label>
      </div>
    </div>

  </div>
</template>
