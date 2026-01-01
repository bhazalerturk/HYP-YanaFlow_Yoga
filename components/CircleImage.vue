<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  label: { type: String, default: "" },
  linkTo: { type: String, default: "" },
});
</script>

<template>
  <div class="flex flex-col items-center">
    <nuxt-link
      :to="linkTo"
      class="cursor-pointer"
      :aria-label="`Navigate to ${label.replace(/<br>/g, ' ')}`"
    >
      <div
        class="rounded-full border-4 border-second-green flex items-center justify-center bg-transparent w-[260px] h-[260px]"
      >
        <img
          :src="src"
          :alt="alt"
          class="rounded-full object-cover transition-all duration-300 w-[235px] h-[235px] hover:w-[255px] hover:h-[255px] p-2"
        />
      </div>
      <div
        class="mt-6 text-center min-h-[3.5em] flex items-start justify-center"
      >
        <h3 class="text-second-green" v-html="label"></h3>
      </div>
    </nuxt-link>
  </div>
</template>
