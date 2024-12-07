<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  nodeId: string
}>()

const week = ref([
  { day: 'Mon' },
  { day: 'Tue' },
  { day: 'Wed' },
  { day: 'Thu' },
  { day: 'Fri' },
  { day: 'Sat' },
  { day: 'Sun' },
])
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-4">
      <font-awesome-icon style="color: #f9511e" :icon="['far', 'calendar-days']" size="xl" />
      <h2 class="text-2xl font-bold">Business Hours</h2>
    </div>
    <div class="border-b pb-2">
      <span>
        Allows a branch to be created based on date & time conditions.
        Use it to set business hours or date range conditions.
      </span>
    </div>
    <div class="grid grid-cols-12 py-4">
      <div class="col-span-3 ml-6">
        <font-awesome-icon class="mr-1" :icon="['far', 'calendar']" />
        <span>Day</span>
      </div>
      <div class="col-span-9">
        <font-awesome-icon class="mr-1" :icon="['far', 'clock']" />
        <span>Time</span>
      </div>
    </div>
    <div class="flex flex-col gap-2 mb-12">
      <div
        v-for="item in week"
        :key="item.day"
        class="grid grid-cols-12"
      >
        <span class="col-span-1"></span>
        <span class="col-span-2 text-start font-bold">{{ item.day }}</span>
        <div class="col-span-3 flex items-center gap-4">
          <input class="border rounded-lg p-1 w-16 text-center" value="09:00" />
          <font-awesome-icon :icon="['far', 'clock']" />
        </div>
        <span class="col-span-1">to</span>
        <div class="col-span-3 flex items-center gap-4">
          <input class="border rounded-lg p-1 w-16 text-center" value="17:00" />
          <font-awesome-icon :icon="['far', 'clock']" />
        </div>
      </div>
    </div>
    <label>
      <p class="text-slate-500 mb-1">Time Zone</p>
      <select class="border rounded-lg p-1 w-full">
        <option disabled>Select Time Zone</option>
        <option value="UTC" selected>(GMT+00:00) UTC</option>
      </select>
    </label>
  </div>
</template>