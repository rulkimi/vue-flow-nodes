<template>
  <div class="relative flex w-full h-full">
    <div class="flex-grow">
      <slot name="canvas"></slot>
    </div>
    <div class="bg-white top-0 right-0 bottom-0 p-4 pb-24 shadow-lg w-[500px] overflow-y-scroll">
      <slot name="drawer"></slot>
    </div>
  </div>
</template>