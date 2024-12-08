<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '../../stores';

const props = defineProps<{
  modelCommentTitle?: string,
  modelCommentText?: string,
  modelCommentDescription?: string
}>();

const store = useMainStore();

const emit = defineEmits(['update:modelCommentTitle', 'update:modelCommentText', 'update:modelCommentDescription']);

const addCommentTitle = ref(props.modelCommentTitle || '');
const addCommentText = ref(props.modelCommentText || '');
const addCommentDescription = ref(props.modelCommentDescription || store.getNodeDescription('addComment'));

const updateAddCommentTitleValue = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelCommentTitle', input.value);
};

const updateAddCommentTextValue = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelCommentText', input.value);
};

const updateAddCommentDescriptiontValue = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelCommentDescription', input.value);
};
</script>


<template>
  <label>
    <p class="text-slate-500 mb-1 font-semibold">Title<sup class="text-red-500">*</sup></p>
    <input
      v-model="addCommentTitle"
      id="add-comment-title-drawer"
      type="text"
      placeholder="E.g. Welcome Message"
      class="border rounded-lg px-2 py-1 w-full"
      @input="updateAddCommentTitleValue"
    >
  </label>
  <label>
    <p class="text-slate-500 mb-1 font-semibold">Description<sup class="text-red-500">*</sup></p>
    <input
      v-model="addCommentDescription"
      id="add-comment-description-drawer"
      type="text"
      placeholder="E.g. Welcome Message"
      class="border rounded-lg px-2 py-1 w-full"
      @input="updateAddCommentDescriptiontValue"
    >
  </label>
  <label>
    <p class="text-slate-500 mb-1 font-semibold">Comment<sup class="text-red-500">*</sup></p>
    <input
      v-model="addCommentText"
      id="add-comment-text-drawer"
      type="text"
      placeholder="E.g. Welcome Message"
      class="border rounded-lg px-2 py-1 w-full"
      @input="updateAddCommentTextValue"
    >
  </label>
</template>