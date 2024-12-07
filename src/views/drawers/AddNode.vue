<script setup lang="ts">
import { useMainStore } from '../../stores';
import { ref } from 'vue';

import { Node } from '../../types'


const store = useMainStore()

const nodeTypes = ref([
  { 
    value: 'sendMessage', 
    label: 'Send Message', 
    description: 'Send a message, including text or attachment.',
    icon: 'paper-plane',
    color: '#3baca1',
  },
  { 
    value: 'addComment', 
    label: 'Add Comment', 
    description: 'Remark for more explanation.',
    icon: 'comment-dots',
    color: '#8b93d0',
  },
  { 
    value: 'businessHours', 
    label: 'Business Hours', 
    description: ' Allows a branch to be created based on date & time conditions.',
    icon: 'calendar-days',
    color: '#f9511e',
  }
]) 
const selectedNodeType = ref()

type TextPayload = { id: string, type: 'text'; text: string };
type AttachmentPayload = { id: string, type: 'attachment'; attachment: string };

const sendMessageTitle = ref()
const messages = ref<Array<TextPayload | AttachmentPayload>>([])

const onFileChange = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const updatedMessage = { ...messages.value[index], attachment: file.name };
    messages.value.splice(index, 1, updatedMessage);
  }
};

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
          class="cursor-pointer flex items-center justify-center border rounded-lg p-4 w-full h-20 transition-all duration-200"
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
    </div>

    <div class="mt-4">
      <div v-if="selectedNodeType === 'sendMessage'">
        <div class="font-bold">Send Messages</div>

        <div class="flex flex-col gap-2 mt-4">
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
                :key="message.id"
              >
                <div v-if="message.type === 'text'">
                  <label>
                    <p class="text-slate-500 mb-1 text-sm">Message #{{ index + 1 }} - {{ message.type }}</p>
                    <input v-model="message.text" class="border rounded-lg px-2 py-1 w-full"/>
                  </label>
                </div>
                <div v-else-if="message.type === 'attachment'">
                  <label class="cursor-pointer">
                    <p class="text-slate-500 mb-1 text-sm">Message #{{ index + 1 }} - {{ message.type }}</p>
                    <div class="border rounded-lg px-2 py-1 w-full flex items-center gap-2">
                      <div class="px-1 py-0.5 bg-blue-500/10 rounded-full text-sm">Choose File</div>
                      <span>{{ message.attachment || 'No File Chosen' }}</span>
                    </div>
                    <input type="file" class="hidden" @change="onFileChange($event, index)">
                  </label>
                </div>
              </div>
              <!-- add text or attachment -->
              <div key="add-text-attachment" class="bg-blue-500/10 border-2 border-dotted border-blue-500 rounded-lg p-2 flex gap-2">
                <div
                  class="w-full bg-white px-3 py-2 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                  @click="messages.push({ id: Date.now().toString(), type: 'text', text: ''})"
                >
                  <font-awesome-icon class="text-slate-500 mr-1" :icon="['fas', 'quote-right']" /> Add Text
                </div>
                <div
                  class="w-full bg-white p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                  @click="messages.push({ id: Date.now().toString(), type: 'attachment', attachment: ''})"
                >
                  <font-awesome-icon class="text-slate-500 mr-1" :icon="['fas', 'paperclip']" /> Add Attachment
                </div>
              </div>
            </transition-group>
            
          </div>
        </div>

      </div>
      <div v-else-if="selectedNodeType === 'addComment'">
        Add Comment
      </div>
      <div v-else-if="selectedNodeType === 'businessHours'">
        Business Hours
      </div>
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
