<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useMainStore } from '../../stores';
import { TextPayload, AttachmentPayload } from '../../types';

import SendMessageDetails from '../../components/templates/SendMessageDetails.vue';
import DateTimeDetails from '../../components/templates/DateTimeDetails.vue';
import AddCommentDetails from '../../components/templates/AddCommentDetails.vue';
import DrawerLayout from '../../layouts/DrawerLayout.vue';

const props = defineProps<{
  edgeId: string
}>();

const store = useMainStore();

onMounted(() => {
  store.setActiveEdgeId(props.edgeId)
});

const nodeTypes = ref([
  { 
    value: 'sendMessage', 
    label: 'Send Message', 
    description: 'Send a message, including text or attachment.',
    icon: 'paper-plane',
    color: '#3baca1'
  },
  { 
    value: 'addComment', 
    label: 'Add Comment', 
    description: 'Remark for more explanation.',
    icon: 'comment-dots',
    color: '#8b93d0'
  },
  { 
    value: 'businessHours', 
    label: 'Business Hours', 
    description: ' Allows a branch to be created based on date & time conditions.',
    icon: 'calendar-days',
    color: '#f9511e',
  }
]);
const selectedNodeType = ref();

const messages = ref<Array<TextPayload | AttachmentPayload>>([
  { id: Date.now().toString(), type: 'text', text: '' }
]);
const sendMessageTitle = ref();
const sendMessageDescription = ref('');

const addCommentTitle = ref();
const addCommentText = ref();
const addCommentDescription = ref()

const businessHourNode = ref({
  type: 'dateTime',
  data: {
    times: [
      { day: 'mon', startTime: '09:00', endTime: '17:00' },
      { day: 'tue', startTime: '09:00', endTime: '17:00' },
      { day: 'wed', startTime: '09:00', endTime: '17:00' },
      { day: 'thu', startTime: '09:00', endTime: '17:00' },
      { day: 'fri', startTime: '09:00', endTime: '17:00' },
      { day: 'sat', startTime: '09:00', endTime: '17:00' },
      { day: 'sun', startTime: '09:00', endTime: '17:00' },
    ],
    timezone: 'UTC'
  }
});
const businessHoursTitle = ref('Business Hours');
const businessHoursDescription = ref('');

watch(
  () => selectedNodeType.value,
  (newType) => {
    store.setNewNodeData({});

    if (newType === 'sendMessage') {
      store.setNewNodeData({ type: 'sendMessage' })
      messages.value = [{ id: Date.now().toString(), type: 'text', text: '' }];
      sendMessageTitle.value = '';
      sendMessageDescription.value = '';
    }

    if (newType === 'addComment') {
      addCommentTitle.value = '';
      addCommentText.value = '';
      addCommentDescription.value = '';
    }

    if (newType === 'businessHours') {
      businessHoursTitle.value = '';
      businessHoursDescription.value = '';
      businessHourNode.value = {
        type: 'dateTime',
        data: {
          times: [
            { day: 'mon', startTime: '09:00', endTime: '17:00' },
            { day: 'tue', startTime: '09:00', endTime: '17:00' },
            { day: 'wed', startTime: '09:00', endTime: '17:00' },
            { day: 'thu', startTime: '09:00', endTime: '17:00' },
            { day: 'fri', startTime: '09:00', endTime: '17:00' },
            { day: 'sat', startTime: '09:00', endTime: '17:00' },
            { day: 'sun', startTime: '09:00', endTime: '17:00' },
          ],
          timezone: 'UTC',
        },
      };
    }
  }
);

watch(
  [
    () => businessHourNode.value, 
    () => selectedNodeType.value, 
    () => businessHoursDescription.value, 
    () => businessHoursTitle.value
  ],
  () => {
    if (selectedNodeType.value === 'businessHours') {
      store.setNewNodeData({
        action: 'businessHours',
        title: businessHoursTitle.value,
        description: businessHoursDescription.value,
        type: 'dateTime',
        times: businessHourNode.value.data.times,
        timezone: businessHourNode.value.data.timezone
      });
    }
  },
  { deep: true }
);

watch(
  [() => addCommentTitle.value, () => addCommentText.value],
  () => {
    if (selectedNodeType.value === 'addComment') {
      store.setNewNodeData({ 
        comment: addCommentText.value, 
        title: addCommentTitle.value, 
        type: selectedNodeType.value,
        description: addCommentDescription.value
      });
    }
  },
  { deep: true }
);

const getDrawerDescription = () => {
  const target = store.nodes.find(node => node.id === store.edges.find(edge => edge.id === props.edgeId)?.target)?.name
  let source = store.nodes.find(node => node.id === store.edges.find(edge => edge.id === props.edgeId)?.source)?.name
  if (!source) source = 'Trigger';
  if (!target) return `Adding node from <strong>${source}</strong>`
  return `Adding node between <strong>${source}</strong> and <strong>${target}</strong>`
}
</script>

<template>
  <DrawerLayout
    color="#8b93d0"
    icon="square-plus"
    title="Add Node"
  >
    <template #description>
      <div v-html="getDrawerDescription()"></div>
    </template>
    <template #top-content>
      <p class="text-slate-500 mb-2 font-semibold">Select Node Type</p>
      <div class="flex flex-col space-y-2">
        <label
          v-for="type in nodeTypes"
          :key="type.value"
          class="cursor-pointer flex items-center justify-center border rounded-lg p-4 w-full h-16 transition-all duration-200"
          :class="selectedNodeType === type.value ? 'bg-blue-500/10 border-blue-500' : 'hover:bg-gray-100'"
        >
          <div class="w-full grid grid-cols-12">
            <div class="col-span-2 flex items-center justify-start">
              <font-awesome-icon
                :style="{ color: type.color }"
                :icon="['far', type.icon]"
                size="xl"
              />
            </div>
            <div class="col-span-8 ">
              <div class="text-start text-sm text-slate-700 font-bold">
                {{ type.label }}
              </div>
              <div class="text-xs">{{ type.description }}</div>
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
    </template>
    <template #content>
      <div v-if="selectedNodeType === 'sendMessage'">
        <div class="font-bold">Send Messages</div>

        <div class="flex flex-col gap-4 mt-4">
          <SendMessageDetails
            v-model:model-messages="messages"
            v-model:model-send-message-title="sendMessageTitle"   
            v-model:model-description="sendMessageDescription"        
          />
        </div>

      </div>
      <div v-else-if="selectedNodeType === 'addComment'">
        <div class="font-bold">Add Comment</div>

        <div class="flex flex-col gap-4 mt-4">
          <AddCommentDetails
            v-model:model-comment-title="addCommentTitle"
            v-model:model-comment-text="addCommentText"
            v-model:model-comment-description="addCommentDescription"
          />
        </div>

      </div>

      <div v-else-if="selectedNodeType === 'businessHours'">
        <div class="flex flex-col gap-2 mt-4">
          <div class="font-bold">Business Hours</div>
          <DateTimeDetails
            v-model:model-node="businessHourNode"
            v-model:model-date-time-title="businessHoursTitle"
            v-model:model-date-time-description="businessHoursDescription"
          />
        </div>
      </div>
    </template>
  </DrawerLayout>
</template>
