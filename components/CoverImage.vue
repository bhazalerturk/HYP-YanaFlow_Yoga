<script setup>
import { Title } from "#components";
import { ref, onMounted } from "vue";
import { getRandomCoverImage } from "~/composables/useRandomImage";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const coverImagePath = ref("/images/covers/cover_1.jpg"); // Default image for SSR

onMounted(() => {
  coverImagePath.value = getRandomCoverImage();
});
</script>

<template>
  <div class="relative" role="banner">
    <!-- Cover image with overlay -->
    <div class="relative w-full h-[30vh] md:h-[40vh] overflow-hidden">
      <img
        :src="coverImagePath"
        :alt="`Decorative cover image for ${props.title} page`"
        class="w-full h-full object-cover opacity-50"
        aria-hidden="true"
      />
      <div
        class="absolute inset-0 bg-black opacity-30"
        aria-hidden="true"
      ></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <h1
          :class="[
            'text-fourth-purple font-[\'Lora_Italic\'] tracking-wide max-w-[90%] md:max-w-[80%] text-center break-words',
            props.title.length > 20
              ? 'text-3xl md:text-5xl lg:text-6xl'
              : 'text-5xl md:text-6xl lg:text-8xl',
          ]"
        >
          {{ props.title }}
        </h1>
      </div>
    </div>
  </div>
</template>
