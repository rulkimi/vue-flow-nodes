<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMainStore } from '../../stores';

const props = defineProps<{
  modelCommentTitle?: string,
  modelCommentText?: string,
  modelCommentDescription?: string
}>();

const store = useMainStore();

const emit = defineEmits(['update:modelCommentTitle', 'update:modelCommentText', 'update:modelCommentDescription']);

const addCommentTitle = ref(props.modelCommentTitle ?? '');
const addCommentText = ref(props.modelCommentText ?? '');
const addCommentDescription = ref(props.modelCommentDescription ?? store.getNodeDescription('addComment'));

const updateAddCommentTitleValue = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelCommentTitle', input.value);
};

const updateAddCommentTextValue = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelCommentText', input.value);
};

const updateAddCommentDescriptiontValue = (event: Event) => {
  const input = event.target as HTMLTextAreaElement
  emit('update:modelCommentDescription', input.value);
};


watch(
  [() => addCommentTitle.value, () => addCommentText.value, () => addCommentDescription.value],
  () => {
    store.setNewNodeData({ 
      comment: addCommentText.value, 
      title: addCommentTitle.value, 
      type: 'addComment',
      description: addCommentDescription.value
    });
  },
  { deep: true }
);
</script>


<template>
  <label>
    <p class="text-slate-500 mb-1 font-semibold">Title<sup class="text-red-500">*</sup></p>
    <input
      v-model="addCommentTitle"
      id="add-comment-title-drawer"
      type="text"
      placeholder="E.g. Add Comment #1"
      class="border rounded-lg px-2 py-1 w-full"
      @input="updateAddCommentTitleValue"
    >
  </label>
  <label>
    <p class="text-slate-500 mb-1 font-semibold">Description</p>
    <textarea
      v-model="addCommentDescription"
      id="add-comment-description-drawer"
      type="text"
      placeholder="E.g. Comments for more details"
      class="border rounded-lg px-2 py-1 w-full"
      @input="updateAddCommentDescriptiontValue"
    ></textarea>
  </label>
  <label>
    <p class="text-slate-500 mb-1 font-semibold">Comment<sup class="text-red-500">*</sup></p>
    <input
      v-model="addCommentText"
      id="add-comment-text-drawer"
      type="text"
      placeholder="E.g. User message during off hours"
      class="border rounded-lg px-2 py-1 w-full"
      @input="updateAddCommentTextValue"
    >
  </label>
</template>