<script setup>
const props = defineProps({
  open: Boolean,
  navItems: Array,
});
const emit = defineEmits(["close"]);

// Function to get the appropriate icon based on the nav item name
const getNavIcon = (name) => {
  switch (name.toLowerCase()) {
    case "courses":
      return "material-symbols:menu-book";
    case "events":
      return "material-symbols:event";
    case "teachers":
      return "material-symbols:groups";
    case "about":
      return "material-symbols:info";
    case "faq":
      return "material-symbols:help";
    default:
      return "material-symbols:circle";
  }
};
</script>

<template>
  <transition name="underline-fade">
    <div
      v-if="open"
      class="fixed inset-0 bg-fifth-near-white z-50 flex flex-col pt-10 px-4 overflow-y-auto"
    >
      <!-- Close button -->
      <button
        class="absolute top-4 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-2xl text-second-green shadow"
        @click="$emit('close')"
        aria-label="Close menu"
      >
        <Icon
          name="material-symbols:close-rounded"
          class="w-7 h-7 text-second-green"
        />
      </button>

      <!-- Scrollable content wrapper -->
      <div
        class="flex flex-col items-center w-full mt-4 min-h-0 overflow-y-auto"
      >
        <router-link
          to="/"
          @click="$emit('close')"
          class="flex flex-col items-center"
        >
          <img
            class="h-20 w-auto mb-2"
            src="/logo/Yana_FLOW_transparent_icon.svg"
            alt="YANA FLOW Logo"
          />
          <h3 class="text-second-green text-2xl font-bold mb-6">YANA FLOW</h3>
        </router-link>
        <div class="w-full flex flex-col items-center mb-24">
          <nuxt-link
            v-for="(item, index) in navItems"
            :key="'mobile-' + index"
            :to="item.path"
            class="block w-full text-center text-gray-700 hover:text-gray-900 py-4 text-xl font-semibold border-b-2 border-second-green/60 last:border-b-0 transition-colors duration-200"
            @click="$emit('close')"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon
                :name="getNavIcon(item.name)"
                class="h-6 w-6 text-second-green"
              />
              {{ item.name }}
            </div>
          </nuxt-link>

          <!-- Contact Button highlighted in mobile menu -->
          <nuxt-link
            to="/contact"
            class="block w-full text-center bg-first-purple text-white hover:bg-second-green py-4 px-6 text-xl font-semibold rounded-md mt-4 transition-colors duration-200"
            @click="$emit('close')"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon name="material-symbols:contact-support" class="h-5 w-5" />
              Contact Us
            </div>
          </nuxt-link>
        </div>
      </div>

      <!-- Quote at the bottom -->
      <div
        class="w-full flex flex-col items-center mt-auto pb-8 pt-4 bg-fifth-near-white sticky bottom-0"
      >
        <blockquote
          class="italic text-lg text-center text-fourth-purple max-w-xs border-l-4 border-fourth-purple pl-4 mx-auto"
        >
          "Yoga is the journey of the self, through the self, to the self."
          <footer class="mt-2 text-sm text-second-green">
            — The Bhagavad Gita
          </footer>
        </blockquote>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.underline-fade-enter-active,
.underline-fade-leave-active {
  transition: opacity 0.3s;
}
.underline-fade-enter-from,
.underline-fade-leave-to {
  opacity: 0;
}
.underline-fade-enter-to,
.underline-fade-leave-from {
  opacity: 1;
}
</style>
