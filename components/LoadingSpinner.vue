<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: "Loading...",
  },
});
</script>

<template>
  <div
    class="min-h-[calc(100vh-64px)] flex items-center justify-center bg-near-white-tan"
    role="alert"
    aria-live="assertive"
    aria-busy="true"
  >
    <div class="text-center">
      <div
        class="w-16 h-16 border-4 border-first-purple border-t-transparent rounded-full mx-auto animate-spin"
        aria-hidden="true"
      ></div>
      <p class="mt-4 text-lg text-fourth-purple" id="loading-message">
        {{ message }}
      </p>
    </div>
  </div>
</template>
