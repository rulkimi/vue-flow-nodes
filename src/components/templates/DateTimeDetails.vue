<script setup lang="ts">
import { capitalizeFirstLetter } from '../../utils';

const props = defineProps<{
  modelValue: any
}>();

const emit = defineEmits(['update:node'])

function updateNode(newValue: any) {
  emit('update:node', newValue);
}
</script>

<template>
  <template v-if="props.modelValue">
    <div class="flex flex-col gap-2 mb-12">
      <div
        v-for="item in props.modelValue.data.times"
        :key="item.day"
        class="grid grid-cols-12 items-center gap-4"
      >
        <span class="col-span-1"></span>
        <span class="col-span-2 text-start font-bold">{{ capitalizeFirstLetter(item.day) }}</span>
        
        <!-- Styled Input for start time -->
        <div class="col-span-4 flex items-center gap-4">
          <input
            type="time"
            v-model="item.startTime"
            :id="`${item.day}-starttime`"
            class="border rounded-lg p-1 text-center w-full"
            @change="updateNode(props.modelValue)"
          />
        </div>

        <span class="col-span-1 text-center">to</span>

        <div class="col-span-4 flex items-center gap-4">
          <input
            type="time"
            v-model="item.endTime"
            :id="`${item.day}-endtime`"
            class="border rounded-lg p-1 text-center w-full"
            @change="updateNode(props.modelValue)"
          />
        </div>
      </div>
    </div>

    <select
      v-model="props.modelValue.data.timezone"
      id="timezone"
      class="border rounded-lg p-1 w-full"
      @change="updateNode(props.modelValue)"
    >
      <option disabled>Select Time Zone</option>
      <option value="UTC">(GMT+00:00) UTC</option>
      <option value="EST">(GMT-05:00) Eastern Time (US & Canada)</option>
      <option value="CST">(GMT-06:00) Central Time (US & Canada)</option>
      <option value="MST">(GMT-07:00) Mountain Time (US & Canada)</option>
      <option value="PST">(GMT-08:00) Pacific Time (US & Canada)</option>
      <option value="GMT">(GMT+00:00) London</option>
      <option value="CET">(GMT+01:00) Berlin</option>
      <option value="JST">(GMT+09:00) Tokyo</option>
      <option value="CST-China">(GMT+08:00) Shanghai</option>
      <option value="GST">(GMT+04:00) Dubai</option>
      <option value="AEDT">(GMT+11:00) Sydney</option>
      <option value="IST">(GMT+05:30) India Standard Time</option>
    </select>

  </template>
</template>
