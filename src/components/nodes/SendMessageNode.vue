<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue'

import { ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { useMainStore } from '../../stores';
import { TextPayload, AttachmentPayload } from '../../types';

const props = defineProps<{
  id: string
  data: {
    name: string
    payload: Array<TextPayload | AttachmentPayload>
  }
}>();

const store = useMainStore()
const themeColor = ref('#3baca1')

const { getConnectedEdges } = useVueFlow()

const connectedEdges = getConnectedEdges(props.id);
const outputEdges = connectedEdges.filter(edge => edge.source === props.id);
for (const edge of outputEdges) {
  edge.style = {
    stroke: themeColor.value
  };
}
</script>

<template>
  <NodeBox
    :title="data.name"
    icon="paper-plane"
    :icon-color="themeColor"
    :border-color="store.activeNodeId === id ? themeColor: ''"
  >
    <template #description>
      <div class="flex flex-col gap-2">
        <div
          v-for="item in data.payload"
        >
          <div>Message:</div>
          <template v-if="item.type === 'text'">
            <div class="italic">{{ item.text }}</div>
          </template>
          <template v-else-if="item.type === 'attachment'">
            <div class="italic">{{ typeof item.attachment === 'string' ? item.attachment : item.attachment.name }}</div>
          </template>
        </div>
      </div>
    </template>
  </NodeBox>
</template>
