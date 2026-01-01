<script setup>
import { defineProps } from "vue";
const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
  activeSlide: {
    type: Boolean,
    default: true,
  },
});

// Helper function to get the appropriate level icon
const getLevelIcon = (level) => {
  switch (level?.toLowerCase()) {
    case "beginner":
      return "carbon:skill-level-basic";
    case "intermediate":
      return "carbon:skill-level-intermediate";
    case "advanced":
      return "carbon:skill-level-advanced";
    default:
      return "carbon:skill-level";
  }
};
</script>

<template>
  <nuxt-link
    class="text-white mx-2 mb-4 block transition-transform duration-300 ease-in-out hover:scale-105 focus:scale-105"
    :to="'/courses/' + course.path"
    :aria-label="`Course: ${course.title}, Level: ${course.level}`"
  >
    <div
      class="flex items-center justify-center w-full aspect-video min-h-32 max-h-64 relative transition-opacity duration-300 bg-black rounded-lg border-2 border-second-green"
      :class="{
        'opacity-100': activeSlide,
        'opacity-75': !activeSlide,
      }"
    >
      <img
        :src="course.preview_image_url"
        :alt="`${course.title} course image`"
        class="object-cover w-full aspect-video h-full shadow-lg mask-b-from-80% mask-b-to-100% aspect-video rounded-lg"
      />
      <!-- Trending icon in top right -->
      <div
        v-if="course.trending"
        class="absolute top-2 right-2 px-2 py-1 bg-second-green rounded-full text-xs whitespace-nowrap flex items-center text-white"
        aria-label="Trending course"
      >
        <Icon
          name="material-symbols:trending-up"
          class="mr-1 h-4 w-4"
          aria-hidden="true"
        />
        Trending
      </div>
      <!-- Bottom left text: Level with icon -->
      <div
        class="absolute bottom-0 left-2 px-3 py-1 rounded text-xs whitespace-nowrap flex items-center text-white"
      >
        <Icon
          :name="getLevelIcon(course.level)"
          class="mr-1 h-4 w-4"
          aria-hidden="true"
        />
        {{ course.level }}
      </div>
      <!-- Bottom right text: Teachers -->
      <div
        v-if="course.teachers && course.teachers.length"
        class="absolute bottom-0 right-2 px-3 py-1 rounded text-xs whitespace-nowrap text-white"
      >
        <template v-for="(teacher, idx) in course.teachers" :key="teacher.id">
          {{ teacher.first_name
          }}<span v-if="idx < course.teachers.length - 1">, </span>
        </template>
      </div>
    </div>
    <div class="mt-2 mx-2 mb-2">
      <h1 class="text-base text-second-green">
        {{ course.title }}
      </h1>
      <div class="flex justify-between mt-0 text-xs text-fourth-purple">
        <div v-if="course.start_date">
          Starting at: {{ new Date(course.start_date).toLocaleDateString() }}
        </div>
        <div>
          for {{ course.courseDuration }} {{ course.courseDurationUnit }}
        </div>
      </div>
    </div>
    <!-- Rating - commented out for now -->
    <!-- 
    <p class="ms-2 text-right">
      Rating:
      <span>
        <span v-for="n in 5" :key="n">
          <span
            v-if="n <= Math.round(course.rating)"
            class="text-yellow-400 text-xl"
            >★
          </span>
          <span v-else class="text-yellow-400 text-xl">☆</span>
        </span>
      </span>
    </p>
    -->
  </nuxt-link>
</template>
