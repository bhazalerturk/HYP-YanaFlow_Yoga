<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
    // Each image can be a string or an object:
    // { src, pretitle, title, subtitle, link }
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
});

const current = ref(0);
let timer = null;
const isPlaying = ref(props.autoplay);

function next() {
  current.value = (current.value + 1) % props.images.length;
  stopAutoplayOnUser();
}
function prev() {
  current.value =
    (current.value - 1 + props.images.length) % props.images.length;
  stopAutoplayOnUser();
}
function goTo(idx) {
  current.value = idx;
  stopAutoplayOnUser();
}

function stopAutoplayOnUser() {
  isPlaying.value = false;
  if (timer) clearInterval(timer);
}

function resetTimer() {
  if (!isPlaying.value) return;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    current.value = (current.value + 1) % props.images.length;
  }, 7000);
}

function getImage(idx) {
  const img = props.images[idx];
  if (typeof img === "string") return { src: img, text: "" };
  return img;
}

onMounted(() => {
  if (props.autoplay) {
    timer = setInterval(() => {
      current.value = (current.value + 1) % props.images.length;
    }, 7000);
  }
});
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
watch(
  () => props.autoplay,
  (val) => {
    if (val) {
      resetTimer();
    } else if (timer) {
      clearInterval(timer);
    }
  }
);

// Toggle play/pause
function togglePlay() {
  if (!isPlaying.value) {
    // If resuming, go to next item immediately
    current.value = (current.value + 1) % props.images.length;
    isPlaying.value = true;
    resetTimer();
  } else {
    isPlaying.value = false;
    if (timer) clearInterval(timer);
  }
}

// Update autoplay based on isPlaying
watch(isPlaying, (val) => {
  if (val) {
    resetTimer();
  } else if (timer) {
    clearInterval(timer);
  }
});
</script>

<template>
  <div
    class="relative w-full h-full select-none"
    role="region"
    aria-label="Featured content carousel"
  >
    <transition-group name="carousel-fade" tag="div">
      <img
        v-for="(img, idx) in props.images"
        v-show="idx === current"
        :key="typeof img === 'string' ? img : img.src"
        :src="getImage(idx).src"
        class="w-full h-full object-cover object-center filter contrast-50 transition-opacity duration-700 absolute inset-0"
        :alt="`${getImage(idx).pretitle || ''} - ${
          getImage(idx).title || 'Carousel image'
        }`"
        draggable="false"
      />
    </transition-group>
    <!-- Centered Text Overlay with animation -->
    <transition-group name="carousel-fade" tag="div">
      <div
        v-if="
          getImage(current).pretitle ||
          getImage(current).title ||
          getImage(current).subtitle
        "
        :key="'text-' + current"
        class="absolute inset-0 flex items-center justify-center z-30"
      >
        <div
          class="text-white px-24 sm:px-16 md:px-8 py-4 rounded-lg text-center max-w-2xl flex flex-col items-center"
        >
          <nuxt-link
            v-if="getImage(current).link"
            :to="getImage(current).link"
            class="no-underline hover:opacity-90 transition-opacity duration-300 p-4 rounded-lg hover:bg-first-purple/50"
            :aria-label="`${getImage(current).pretitle || ''} ${
              getImage(current).title || ''
            } ${getImage(current).subtitle || ''}`"
          >
            <span
              v-if="getImage(current).pretitle"
              class="text-base md:text-lg font-medium mb-1 block"
            >
              {{ getImage(current).pretitle }}
            </span>
            <span
              v-if="getImage(current).title"
              class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 break-words whitespace-pre-line block"
            >
              {{ getImage(current).title }}
            </span>
            <span
              v-if="getImage(current).subtitle"
              class="text-base md:text-lg font-medium mt-1 block"
            >
              {{ getImage(current).subtitle }}
            </span>
          </nuxt-link>

          <template v-else>
            <span
              v-if="getImage(current).pretitle"
              class="text-base md:text-lg font-medium mb-1 block"
            >
              {{ getImage(current).pretitle }}
            </span>
            <span
              v-if="getImage(current).title"
              class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 break-words whitespace-pre-line block"
            >
              {{ getImage(current).title }}
            </span>
            <span
              v-if="getImage(current).subtitle"
              class="text-base md:text-lg font-medium mt-1 block"
            >
              {{ getImage(current).subtitle }}
            </span>
          </template>
        </div>
      </div>
    </transition-group>
    <!-- Left/Right Buttons -->
    <button
      @click="prev"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent focus:ring-0 focus:ring-offset-0 hover:ring-offset- hover:ring-0 p-2 z-50"
      aria-label="Previous slide"
    >
      <Icon
        name="material-symbols:arrow-circle-left-rounded"
        class="text-5xl text-white hover:text-first-purple transition-colors duration-300"
      />
    </button>
    <button
      @click="next"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent focus:ring-0 focus:ring-offset-0 hover:ring-offset-0 hover:ring-0 p-2 z-50"
      aria-label="Next slide"
    >
      <Icon
        name="material-symbols:arrow-circle-right-rounded"
        class="text-5xl text-white hover:text-first-purple transition-colors duration-300"
      />
    </button>
    <!-- Dots -->
    <div
      class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50 bg-near-white-tan rounded-full px-4 py-2 shadow-lg items-center"
    >
      <button
        v-for="(img, idx) in props.images"
        :key="'dot-' + idx"
        @click="idx !== current && goTo(idx)"
        :class="[
          'transition-all duration-300 ring-0 focus:ring-0',
          idx === current
            ? 'w-6 h-3 rounded-full bg-fourth-purple'
            : 'w-3 h-3 rounded-full bg-first-purple',
        ]"
        :aria-label="idx === current ? 'Current slide' : 'Go to slide'"
      />
      <!-- Play/Pause Button -->
      <button
        @click="togglePlay"
        class="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-fourth-purple text-white hover:bg-first-purple transition-colors duration-200 shadow"
        :aria-label="isPlaying ? 'Pause carousel' : 'Play carousel'"
      >
        <Icon v-if="isPlaying" name="material-symbols:pause" class="text-2xl" />
        <Icon v-else name="material-symbols:play-arrow" class="text-2xl" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 0.7s;
}
.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
}
.dot-fade-enter-active,
.dot-fade-leave-active {
  transition: opacity 0.3s;
}
.dot-fade-enter-from,
.dot-fade-leave-to {
  opacity: 0;
}
.dot-fade-enter-to,
.dot-fade-leave-from {
  opacity: 1;
}
</style>
