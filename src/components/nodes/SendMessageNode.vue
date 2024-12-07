<script setup lang="ts">
import NodeBox from '../templates/NodeBox.vue'

import { computed, ref } from 'vue'
import { useVueFlow } from '@vue-flow/core'

type TextPayload = { type: 'text'; text: string };
type AttachmentPayload = { type: 'attachment'; attachment: string };

const props = defineProps<{
  id: string
  data: {
    name: string
    payload: Array<TextPayload | AttachmentPayload>
  }
}>();

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
            <div class="italic">{{ item.attachment }}</div>
          </template>
        </div>
      </div>
    </template>
  </NodeBox>
</template>
