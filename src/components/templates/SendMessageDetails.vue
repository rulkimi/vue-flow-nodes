<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useMainStore } from '../../stores';

const store = useMainStore()

type TextPayload = { id: string, type: 'text'; text: string };
type AttachmentPayload = { id: string, type: 'attachment'; attachment: File | null | string };

const props = defineProps<{
  modelSendMessageTitle?: string;
  modelMessages?: Array<TextPayload | AttachmentPayload>
}>()

const sendMessageTitle = ref(props.modelSendMessageTitle || '')
const messages = ref<Array<TextPayload | AttachmentPayload>>(props.modelMessages || [])

const emit = defineEmits(['update:modelSendMessageTitle', 'update:modelMessages'])

watch(
  () => messages.value,
  () => {
    store.setNewNodeData({ messages: messages, title: sendMessageTitle.value, type: 'sendMessage' });
  },
  { deep: true }
);

watch(
  () => sendMessageTitle.value,
  (newValue) => {
    emit('update:modelSendMessageTitle', newValue);
  }
);

watch(
  () => messages.value,
  (newValue) => {
    emit('update:modelMessages', newValue);
  },
  { deep: true }
);

const onFileChange = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const updatedMessage = { ...messages.value[index], attachment: file };
    messages.value.splice(index, 1, updatedMessage);
  }
};

const addTextMessage = () => {
  const generatedId = Date.now().toString()
  const newMessage: TextPayload = { id: generatedId, type: 'text', text: '' };
  messages.value.push(newMessage);
  nextTick(() => {
    const inputElement = document.getElementById(generatedId) as HTMLInputElement;
    inputElement?.focus();
  });
};

const addAttachmentMessage = () => {
  const generatedId = Date.now().toString()
  const newMessage: AttachmentPayload = { id: generatedId, type: 'attachment', attachment: null };
  messages.value.push(newMessage);
  nextTick(() => {
    const fileInputElement = document.getElementById(generatedId) as HTMLInputElement;
    fileInputElement?.click();
  });
};
</script>

<template>
  <label>
    <p class="text-slate-500 mb-1">Title<sup class="text-red-500">*</sup></p>
    <input
      v-model="sendMessageTitle"
      id="send-message-title"
      type="text"
      placeholder="E.g. Welcome Message"
      class="border rounded-lg px-2 py-1 w-full"
    >
  </label>
  <div>
    <p class="text-slate-500 mb-1">Messages<sup class="text-red-500">*</sup></p>
    <transition-group name="messages" tag="ul" class="flex flex-col gap-2">
      <div
        v-for="(message, index) in messages"
        :key="index"
      >
        <div v-if="message.type === 'text'">
          <label>
            <p class="text-slate-500 mb-1 text-sm">Message #{{ index + 1 }} - {{ message.type }}</p>
            <input
              :id="message.id"
              v-model="message.text"
              class="border rounded-lg px-2 py-1 w-full"
            />
          </label>
        </div>
        <div v-else-if="message.type === 'attachment'">
          <label class="cursor-pointer">
            <p class="text-slate-500 mb-1 text-sm">Message #{{ index + 1 }} - {{ message.type }}</p>
            <div class="border rounded-lg px-2 py-1 w-full flex items-center gap-2">
              <div class="px-1 py-0.5 bg-blue-500/10 rounded-full text-sm text-nowrap">Choose File</div>
              <span class="text-nowrap overflow-hidden text-ellipsis" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{
                  typeof message.attachment === 'string'
                    ? message.attachment
                    : message.attachment?.name || 'No File Chosen'
                }}
              </span>
            </div>
            <input
              :id="message.id"
              type="file"
              class="hidden"
              @change="onFileChange($event, index)"
            >
          </label>
        </div>
      </div>
      <div key="add-text-attachment" class="bg-blue-500/10 border-2 border-dotted border-blue-500 rounded-lg p-2 flex gap-2">
        <div
          class="w-full bg-white px-3 py-2 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
          @click="addTextMessage"
        >
          <font-awesome-icon class="text-slate-500 mr-1" :icon="['fas', 'quote-right']" /> Add Text
        </div>
        <div
          class="w-full bg-white p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
          @click="addAttachmentMessage"
        >
          <font-awesome-icon class="text-slate-500 mr-1" :icon="['fas', 'paperclip']" /> Add Attachment
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.messages-enter-from, .messages-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.messages-enter-active, .messages-leave-active {
  transition: all 0.4s ease;
}

.messages-move {
  transition: all 0.3s ease;
}

.messages-leave-active {
  position: absolute;
}
</style>
