<script setup lang="ts">
import { computed } from "vue";
import type { Teacher } from "~/types";

const props = defineProps({
  teacher: {
    type: Object as PropType<Teacher>,
    required: true,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  imagePosition: {
    type: String as PropType<"left" | "right">,
    default: "left",
    validator: (value: string) => ["left", "right"].includes(value),
  },
  maxBioLength: {
    type: Number,
    default: 150,
  },
});

// Compute a truncated bio if needed
const truncatedBio = computed(() => {
  if (!props.teacher.bio) return "";
  if (props.teacher.bio.length <= props.maxBioLength) return props.teacher.bio;

  return props.teacher.bio.substring(0, props.maxBioLength) + "...";
});
</script>

<template>
  <div
    v-if="fullWidth"
    class="block bg-third-tan rounded-2xl w-full shadow-md p-8 transition-transform duration-300 ease-in-out hover:scale-105 focus:scale-105 relative"
  >
    <div
      :class="[
        'flex flex-col md:flex-row items-center justify-between gap-8',
        imagePosition === 'right' ? 'md:flex-row-reverse' : '',
      ]"
    >
      <img
        :src="teacher.image_url"
        alt="Teacher photo"
        class="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-2 border-first-purple hover:border-fourth-purple transition-colors"
        @error="(e) => { 
          const target = e.target as HTMLImageElement;
          if (target) target.src = '/images/covers/cover_1.jpg';
        }"
      />
      <div class="flex flex-col w-full max-w-4xl">
        <h2
          class="text-3xl sm:text-4xl font-bold text-fourth-purple border-b-1 border-black pb-1 mb-2"
        >
          {{ teacher.first_name }} {{ teacher.last_name }}
        </h2>
        <h3 class="text-xl text-first-purple mb-4">
          {{ teacher.origin_country }}
        </h3>
        <p class="text-lg leading-relaxed" v-if="teacher.bio">
          {{ truncatedBio }}
        </p>
        <nuxt-link
          :to="'/teachers/' + teacher.path"
          class="text-fourth-purple font-bold hover:underline flex items-center gap-1 group mt-4 hover:text-second-green transition-colors"
        >
          Read more about {{ teacher.first_name }}
          <Icon
            name="material-symbols:arrow-forward-rounded"
            class="h-5 w-5 group-hover:translate-x-1 transition-transform"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
  <nuxt-link
    v-else
    class="bg-third-tan rounded-2xl flex flex-col md:flex-row items-center p-8 w-full md:w-80 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 focus:scale-105 hover:bg-third-tan/90 relative group"
    :to="'/teachers/' + teacher.path"
  >
    <img
      :src="teacher.image_url"
      alt="Teacher photo"
      class="w-32 h-32 rounded-full object-cover border-2 border-first-purple mb-4 md:mb-0 md:mr-8 group-hover:border-fourth-purple transition-colors"
      @error="(e) => { 
        const target = e.target as HTMLImageElement;
        if (target) target.src = '/images/covers/cover_1.jpg';
      }"
    />
    <div
      class="flex flex-col justify-center items-center md:items-start w-full"
    >
      <div class="flex flex-col w-full">
        <span
          class="text-2xl sm:text-3xl font-bold text-fourth-purple border-b-1 border-black pb-1 mb-2 w-full"
          >{{ teacher.first_name }} {{ teacher.last_name }}</span
        >
        <span class="text-lg text-first-purple mb-2 w-full">{{
          teacher.origin_country
        }}</span>
      </div>
    </div>
  </nuxt-link>
</template>
