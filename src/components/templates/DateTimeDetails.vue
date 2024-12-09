<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from '../../stores';
import { capitalizeFirstLetter } from '../../utils';

const props = defineProps<{
  modelNode: any,
  modelDateTimeDescription?: string,
  modelDateTimeTitle?: string
}>();

const store = useMainStore();

const title = ref(props.modelDateTimeTitle);
const description = ref(props.modelDateTimeDescription || store.getNodeDescription('dateTime'));

const emit = defineEmits(['update:modelNode', 'update:modelDateTimeDescription', 'update:modelDateTimeTitle'])

function updateNode(newValue: any) {
  emit('update:modelNode', newValue);
}

const updateDescription = (event: Event) => {
  const input = event.target as HTMLTextAreaElement
  emit('update:modelDateTimeDescription', input.value);
};
const updateTitle = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelDateTimeTitle', input.value);
};
</script>

<template>
  <div class="flex flex-col gap-4 border-b pb-6">
    <label>
      <p class="text-slate-500 mb-1 font-semibold">Title<sup class="text-red-500">*</sup></p>
      <input
        v-model="title"
        id="datetime-title-drawer"
        placeholder="E.g. Business Hours"
        class="border rounded-lg px-2 py-1 w-full"
        @input="updateTitle"
      >
    </label>
    <label>
      <p class="text-slate-500 mb-1 font-semibold">Description<sup class="text-red-500">*</sup></p>
      <textarea
        v-model="description"
        id="datetime-description-drawer"
        placeholder="E.g. Allows a branch to be created based on date & time conditions"
        class="border rounded-lg px-2 py-1 w-full"
        @input="updateDescription"
      ></textarea>
    </label>
    <label>
      <p class="text-slate-500 mb-1 font-semibold">Time Zone<sup class="text-red-500">*</sup></p>
      <select
        v-model="props.modelNode.data.timezone"
        id="timezone"
        class="border rounded-lg p-1 w-full"
        @change="updateNode(props.modelNode)"
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
    </label>
  </div>

  <template v-if="props.modelNode">
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
        v-for="item in props.modelNode.data.times"
        :key="item.day"
        class="grid grid-cols-12 items-center gap-4"
      >
        <span class="col-span-1"></span>
        <span class="col-span-2 text-start font-bold">{{ capitalizeFirstLetter(item.day) }}</span>
        
        <!-- Styled Input for start time -->
        <div class="col-span-4 flex items-center gap-4">
          <input
            v-model="item.startTime"
            :id="`${item.day}-starttime`"
            type="time"
            class="border rounded-lg p-1 text-center w-full"
            @change="updateNode(props.modelNode)"
          />
        </div>

        <span class="col-span-1 text-center">to</span>

        <div class="col-span-4 flex items-center gap-4">
          <input
            v-model="item.endTime"
            :id="`${item.day}-endtime`"
            type="time"
            class="border rounded-lg p-1 text-center w-full"
            @change="updateNode(props.modelNode)"
          />
        </div>
      </div>
    </div>

  </template>
</template>
