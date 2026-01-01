<script setup>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/carousel.css";
import { useDataLoading } from "~/composables/useDataLoading";
import { useRoute } from "vue-router";

const { dataStore } = useDataLoading();
const route = useRoute();
const currentEventPath = route.params.event;

// Filter out the current event for the carousel
const otherEvents = computed(() => {
  if (!Array.isArray(dataStore.events)) {
    return [];
  }
  return dataStore.events
    .filter((event) => event.path !== currentEventPath)
    .filter((event) => !!event.path); // Ensure events have a path
});

const eventsCarousel = ref(null);
const eventsCarouselConfig = {
  itemsToShow: 1.5,
  wrapAround: true,
  gap: 15,
  snapAlign: "center",

  // 'carousel' - breakpoints are based on the carousel width
  breakpointMode: "carousel",

  // Breakpoints are mobile-first
  // Any settings not specified will fall back to the carousel's default settings
  breakpoints: {
    640: {
      itemsToShow: 2,
      snapAlign: "center",
    },
    768: {
      itemsToShow: 3,
      snapAlign: "center",
    },
    1024: {
      itemsToShow: 5,
      snapAlign: "start",
    },
    1440: {
      itemsToShow: 7,
      snapAlign: "start",
    },
  },
};
</script>

<template>
  <div class="relative" v-if="otherEvents.length > 0">
    <Carousel v-bind="eventsCarouselConfig" ref="eventsCarousel">
      <Slide v-for="(event, idx) in otherEvents" :key="event.id">
        <EventCard
          :event="event"
          :full-width="false"
          :active-slide="
            (() => {
              const items = eventsCarousel?.config.itemsToShow;
              return (
                (eventsCarousel?.currentSlide +
                  Math.max(0, Math.floor((items - 1) / 2))) %
                  otherEvents.length ===
                idx
              );
            })()
          "
        />
      </Slide>

      <template #addons>
        <a
          @click="eventsCarousel?.prev()"
          class="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-none p-2 pointer-events-auto"
          style="transform: translateY(-50%)"
          aria-label="Previous"
        >
          <Icon
            name="material-symbols:arrow-circle-left-outline-rounded"
            class="text-5xl text-white hover:text-first-purple transition-colors duration-300"
          />
        </a>
        <a
          @click="eventsCarousel?.next()"
          class="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-none p-2 pointer-events-auto"
          style="transform: translateY(-50%)"
          aria-label="Next"
        >
          <Icon
            name="material-symbols:arrow-circle-right-outline-rounded"
            class="text-5xl text-white hover:text-first-purple transition-colors duration-300"
          />
        </a>
      </template>
    </Carousel>
  </div>
  <div v-else class="text-center py-4 text-gray-500 italic">
    No other events available at this time.
  </div>
</template>