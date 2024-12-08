<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useMainStore } from '../../stores';

const store = useMainStore()

type TextPayload = { id: string, type: 'text'; text: string };
type AttachmentPayload = { id: string, type: 'attachment'; attachment: File | string };

const props = defineProps<{
  modelSendMessageTitle?: string;
  modelMessages?: Array<TextPayload | AttachmentPayload>
}>()

const sendMessageTitle = ref(props.modelSendMessageTitle || '')
const messages = ref<Array<TextPayload | AttachmentPayload>>(props.modelMessages || [])

const emit = defineEmits(['update:modelSendMessageTitle', 'update:modelMessages'])

watch(
  () => messages.value,
  (newValue) => {
    emit('update:modelMessages', newValue);
    store.setNewNodeData({ messages: messages, title: sendMessageTitle.value, type: 'sendMessage' });
  },
  { deep: true }
);

const updateSendMessageTitleValue = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelSendMessageTitle', input.value);
}

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

const deleteMessage = (index: number) => {
  messages.value.splice(index, 1);
};


const addAttachmentMessage = () => {
  const generatedId = Date.now().toString()
  const newMessage: AttachmentPayload = { id: generatedId, type: 'attachment', attachment: 'No File Chosen' };
  messages.value.push(newMessage);
  nextTick(() => {
    const fileInputElement = document.getElementById(generatedId) as HTMLInputElement;
    fileInputElement?.click();
  });
};

const openImage = (attachment: File) => {
  if (attachment && attachment.type.startsWith('image/')) {
    const imageUrl = URL.createObjectURL(attachment);

    window.open(imageUrl, '_blank');

    setTimeout(() => {
      URL.revokeObjectURL(imageUrl);
    }, 1000); 
  } else {
    alert('Not a valid image');
  }
};

const openUrl = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <label>
      <p class="text-slate-500 mb-1 font-semibold">Title<sup class="text-red-500">*</sup></p>
      <input
        v-model="sendMessageTitle"
        id="send-message-title"
        type="text"
        placeholder="E.g. Welcome Message"
        class="border rounded-lg px-2 py-1 w-full"
        @input="updateSendMessageTitleValue"
      >
    </label>
    <div>
      <p class="text-slate-500 mb-1 font-semibold">Messages<sup class="text-red-500">*</sup></p>
      <transition-group name="messages" tag="ul" class="flex flex-col gap-4">
        <div
          v-for="(message, index) in messages"
          :key="message.id ?? index"
        >
          <div v-if="message.type === 'text'">
            <label>
              <p class="text-slate-500 mb-1 text-sm flex justify-between">
                Message #{{ index + 1 }} - {{ message.type }}
                <font-awesome-icon
                  class="text-red-500 cursor-pointer hover:scale-105 transition-transform duration-300"
                  :icon="['far', 'trash-alt']"
                  @click.prevent="deleteMessage(index)"
                />
              </p>
              <input
                :id="message.id"
                v-model="message.text"
                class="border rounded-lg px-2 py-1 w-full"
              />
            </label>
          </div>
          <div v-else-if="message.type === 'attachment'">
            <label class="cursor-pointer">
              <p class="text-slate-500 mb-1 text-sm flex justify-between">
                <span>
                  Message #{{ index + 1 }} - {{ message.type }}
                  <span v-if="message.attachment !== 'No File Chosen'" class="text-blue-500">・
                    <span
                      class="hover:underline cursor-pointer"
                      @click.prevent="
                        typeof message.attachment === 'string'
                          ? openUrl(message.attachment)
                          : openImage(message.attachment)
                      "
                    >
                      Preview
                    </span>
                  </span>
                </span>
                <font-awesome-icon
                  class="text-red-500 cursor-pointer hover:scale-105 transition-transform duration-300"
                  :icon="['far', 'trash-alt']"
                  @click.prevent="deleteMessage(index)"
                />
              </p>
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
