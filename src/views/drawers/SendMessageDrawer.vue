<script setup lang="ts">
import { useMainStore } from '../../stores';
import { computed, ref , watch} from 'vue';
import { Node } from '../../types';

const props = defineProps<{
  nodeId: string;
}>();

const store = useMainStore();

const node = computed(() => {
  if (!store.nodes) return;
  return store.nodes.find((node: Node) => node.id === props.nodeId);
});

const messageTitle = ref(node?.value?.data.name);
const payload = ref(JSON.parse(JSON.stringify(node?.value?.data.payload)));

const update = () => {
  if (!node.value) return;
  store.editNode(node.value.id, {
    data: {
      ...node.value.data,
      name: messageTitle.value,
      payload: payload.value,
    },
  });
};

const selectImage = (index: number) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          payload.value[index].attachment = reader.result.toString();
        }
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
};

watch(() => props.nodeId, (newNodeId) => {
  store.setActiveNodeId(newNodeId);
  const newNode = store.nodes?.find((node: Node) => node.id === newNodeId);
  if (newNode) {
    messageTitle.value = newNode.data.name;
    payload.value = JSON.parse(JSON.stringify(newNode.data.payload));
  }
});
</script>

<template>
  <div v-if="node">
    <div class="flex items-center gap-2 mb-4">
      <font-awesome-icon style="color: #3baca1" :icon="['far', 'paper-plane']" size="xl" />
      <h2 class="text-2xl font-bold">{{ node.name }}</h2>
    </div>
    <div class="border-b pb-2">
      <span>
        Send a message, including text or attachment.
      </span>
    </div>

    <div class="mt-4">
      <div class="flex flex-col gap-2">
        <label>
          <p class="text-slate-500 mb-1">Title</p>
          <input
            v-model="messageTitle"
            id="add-comment-title"
            type="text"
            placeholder="E.g. Welcome Message"
            class="border rounded-lg px-2 py-1 w-full"
          >
        </label>
        <div
          v-for="(item, index) in payload"
          :key="index"
        >
          <div v-if="item.type === 'text'">
            <label>
              <p class="text-slate-500 mb-1">Message #{{ index + 1 }}:</p>
              <input
                v-model="item.text"
                type="text"
                placeholder="E.g. Welcome Message"
                class="border rounded-lg px-2 py-1 w-full"
              >
            </label>
          </div>
          <div v-else-if="item.type === 'attachment'" class="flex items-center gap-2">
            <div class="w-20 h-20 border rounded-lg overflow-hidden">
              <img v-if="item.attachment" :src="item.attachment" alt="" class="w-full h-full object-cover">
            </div>
            <button
              class="px-2 py-1 border border-blue-500/50 text-blue-500 font-bold rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300"
              @click="selectImage(index)"
            >
              {{ item.attachment ? 'Reselect' : 'Select' }} Image
            </button>
          </div>
        </div>
      </div>
      <div class="text-end">
        <button
          class="mt-4 py-1 px-2 border border-blue-500/50 text-blue-500 font-bold rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300"
          @click="update"
        >
          Save
        </button>
      </div>
    </div>

  </div>
</template>
