<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '../../stores';
import { Node } from '../../types'
import { capitalizeFirstLetter } from '../../utils';

const props = defineProps<{
  nodeId: string
}>()

const store = useMainStore()
store.setActiveNode(props.nodeId)

const node = computed(() => {
  return store.nodes.find((node: Node) => node.id === props.nodeId)
})
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
        v-for="item in node.data.times"
        :key="item.day"
        class="grid grid-cols-12"
      >
        <span class="col-span-1"></span>
        <span class="col-span-2 text-start font-bold">{{ capitalizeFirstLetter(item.day) }}</span>
        <div class="col-span-3 flex items-center gap-4">
          <input 
            v-model="item.startTime"
            :id="`${item.day}-starttime`"
            class="border rounded-lg p-1 w-16 text-center"
          />
          <font-awesome-icon :icon="['far', 'clock']" />
        </div>
        <span class="col-span-1">to</span>
        <div class="col-span-3 flex items-center gap-4">
          <input
            v-model="item.endTime"
            :id="`${item.day}-endtime`"
            class="border rounded-lg p-1 w-16 text-center"
          />
          <font-awesome-icon :icon="['far', 'clock']" />
        </div>
      </div>
    </div>
    <label>
      <p class="text-slate-500 mb-1">Time Zone</p>
      <select
        v-model="node.data.timezone"
        id="timezone"
        class="border rounded-lg p-1 w-full"
      >
        <option disabled>Select Time Zone</option>
        <option value="UTC">(GMT+00:00) UTC</option>
      </select>
    </label>
  </div>
</template>