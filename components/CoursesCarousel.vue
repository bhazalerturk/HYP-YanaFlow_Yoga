<script setup>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/carousel.css";
import { useDataLoading } from "~/composables/useDataLoading";

const { dataStore } = useDataLoading();

const courseCarousel = ref(null);
const courseCarouselConfig = {
  itemsToShow: 1.5,
  wrapAround: true,
  gap: 5,
  snapAlign: "center",

  // 'carousel' - breakpoints are based on the carousel width
  breakpointMode: "carousel",

  // Breakpoints are mobile-first
  // Any settings not specified will fall back to the carousel's default settings
  breakpoints: {
    768: {
      itemsToShow: 2,
      snapAlign: "center",
    },
    1024: {
      itemsToShow: 3,
      snapAlign: "start",
    },
    1440: {
      itemsToShow: 5,
      snapAlign: "start",
    },
  },
};
</script>

<template>
  <div class="relative">
    <Carousel v-bind="courseCarouselConfig" ref="courseCarousel">
      <Slide v-for="(course, idx) in dataStore.courses" :key="course.id">
        <CourseCard
          :course="course"
          :active-slide="
            (() => {
              const items = courseCarousel?.config.itemsToShow;
              return (
                (courseCarousel?.currentSlide +
                  Math.max(0, Math.floor((items - 1) / 2))) %
                  dataStore.courses.length ===
                idx
              );
            })()
          "
        />
      </Slide>

      <template #addons>
        <button
          @click="courseCarousel?.prev()"
          class="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-transparent hover:ring-0 focus:ring-0 hover:ring-offset-0 focus:ring-offset-0 p-2 cursor-pointer"
          style="transform: translateY(-50%)"
          aria-label="Previous Course"
        >
          <Icon
            name="material-symbols:arrow-circle-left-outline-rounded"
            class="text-5xl text-white hover:text-first-purple transition-colors duration-300"
          />
        </button>
        <button
          @click="courseCarousel?.next()"
          class="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-transparent hover:ring-0 focus:ring-0 hover:ring-offset-0 focus:ring-offset-0 p-2 cursor-pointer"
          style="transform: translateY(-50%)"
          aria-label="Next Course"
        >
          <Icon
            name="material-symbols:arrow-circle-right-outline-rounded"
            class="text-5xl text-white hover:text-first-purple transition-colors duration-300"
          />
        </button>
      </template>
    </Carousel>
  </div>
</template>