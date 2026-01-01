<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";

// Global SEO defaults for the entire site
useHead({
  titleTemplate: "%s - YANA FLOW Yoga Center",
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charset: "utf-8" },
    { name: "format-detection", content: "telephone=no" },
    { name: "theme-color", content: "#6b46c1" }, // First-purple color
    { property: "og:site_name", content: "YANA FLOW Yoga Center" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const navItems = [
  { name: "Courses", path: "/courses" },
  { name: "Events", path: "/events" },
  { name: "Teachers", path: "/teachers" },
  { name: "About", path: "/about" },
  { name: "FAQ", path: "/faq" },
];

// --- Underline logic ---
const navRefs = ref([]);
const underline = ref({ left: 0, width: 0 });
const route = useRoute();

// Correct ref assignment for v-for
function setNavRef(el, idx) {
  // If el is a Vue component (NuxtLink), get its $el
  if (el && el.$el) {
    navRefs.value[idx] = el.$el;
  } else if (el) {
    navRefs.value[idx] = el;
  } else {
    navRefs.value[idx] = null;
  }
}

const updateUnderline = () => {
  nextTick(() => {
    const idx = navItems.findIndex((item) => item.path === route.path);
    const el = navRefs.value[idx];
    if (idx !== -1 && el && typeof el.getBoundingClientRect === "function") {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement.getBoundingClientRect();
      underline.value = {
        left: rect.left - parentRect.left,
        width: rect.width,
      };
    } else {
      underline.value = { left: 0, width: 0 };
    }
  });
};

const isMobileMenuOpen = ref(false);
const windowWidth = ref(
  typeof window !== "undefined" ? window.innerWidth : 1024
);
const showScrollTop = ref(false);

function handleScroll() {
  showScrollTop.value = window.scrollY > 200;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  updateUnderline();
  window.addEventListener("resize", updateUnderline);
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
  });
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
watch(() => route.path, updateUnderline);

// Prevent body scroll when mobile nav is open
watch(isMobileMenuOpen, (open) => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <nav class="bg-fifth-near-white sticky top-0 z-100">
    <div class="mx-auto px-2 sm:px-6 lg:px-8 overflow-x-hidden">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Logo on the left -->
        <div
          class="flex items-center cursor-pointer"
          @click="$router.push('/')"
        >
          <img
            class="h-12 w-auto sm:h-16"
            src="/logo/Yana_FLOW_transparent_icon.svg"
            alt="YANA FLOW"
          />
          <h3 class="text-second-green ms-2 text-lg sm:text-xl">YANA FLOW</h3>
        </div>

        <!-- Hamburger for mobile -->
        <button
          class="md:hidden flex items-center px-3 py-2 border rounded text-white border-second-green ml-auto"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <!-- Navigation Points flush to the right (desktop) -->
        <div
          class="relative items-center space-x-4 ml-auto hidden md:flex"
          style="min-width: 0"
        >
          <!-- Navigation Links -->
          <div
            class="relative flex-1 flex items-center overflow-x-hidden"
            style="min-width: 0"
          >
            <div class="flex space-x-4 relative" style="min-width: 0">
              <template
                v-for="(item, index) in navItems"
                :key="'navgroup-' + index"
              >
                <nuxt-link
                  :to="item.path"
                  :ref="(el) => setNavRef(el, index)"
                  class="text-gray-700 hover:text-gray-900 px-1 pb-2 transition-colors duration-200 text-base sm:text-lg"
                  :class="{
                    'font-bold text-gray-900': $route.path === item.path,
                  }"
                  style="position: relative; z-index: 10"
                >
                  {{ item.name }}
                </nuxt-link>
              </template>
              <!-- Base underline -->
              <div
                class="absolute left-0 right-0 bottom-0 h-[2px] bg-gray-300 z-0"
              />
              <!-- Active underline with fade-out transition when going to home -->
              <transition name="underline-fade" mode="out-in">
                <div
                  v-if="underline.width > 0"
                  class="absolute bottom-0 h-[4px] bg-second-green rounded transition-all duration-300 z-20"
                  :style="{
                    left: underline.left + 'px',
                    width: underline.width + 'px',
                  }"
                  key="active-underline"
                />
              </transition>
            </div>
          </div>

          <!-- Contact Button - outside the underline area -->
          <nuxt-link to="/contact" class="">
            <button
              class="bg-first-purple hover:bg-second-green text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
            >
              Contact
            </button>
          </nuxt-link>
        </div>
      </div>
      <!-- Mobile menu as component -->
      <MobileNav
        v-if="isMobileMenuOpen && windowWidth < 768"
        :open="isMobileMenuOpen"
        :nav-items="navItems"
        @close="isMobileMenuOpen = false"
      />
    </div>
  </nav>
  <div class="min-h-[calc(65dvh)]">
    <slot />
  </div>
  <div class="bg-fifth-near-white text-fourth-purple pb-6">
    <!-- Top section: 3 columns with different order on mobile -->
    <div
      class="max-w-screen-xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <!-- Column 1: Links (first on mobile) -->
      <div
        class="grid grid-cols-2 gap-4 order-1 lg:order-3 border-0 lg:border-l border-gray-300 pt-6 lg:pt-0 lg:pl-6"
      >
        <div class="space-y-2 text-right lg:text-left">
          <nuxt-link
            to="/about"
            class="block font-bold hover:underline text-fourth-purple hover:text-first-purple"
            >Our Mission</nuxt-link
          >
          <nuxt-link
            to="/teachers"
            class="block font-bold hover:underline text-fourth-purple hover:text-first-purple"
            >Our Teachers</nuxt-link
          >
          <nuxt-link
            to="/faq"
            class="block font-bold hover:underline text-fourth-purple hover:text-first-purple"
            >Help &amp; FAQs</nuxt-link
          >
          <nuxt-link
            to="/contact"
            class="block font-bold hover:underline text-fourth-purple hover:text-first-purple"
            >Contact Us</nuxt-link
          >
        </div>
        <div class="space-y-2 text-left">
          <nuxt-link
            to="/courses"
            class="block font-bold hover:underline text-fourth-purple hover:text-first-purple"
            >All Courses</nuxt-link
          >
          <nuxt-link
            to="/events"
            class="block font-bold hover:underline text-fourth-purple hover:text-first-purple"
            >Events</nuxt-link
          >
          <nuxt-link
            to="/jobs"
            class="block font-bold hover:underline text-fourth-purple hover:text-first-purple"
            >Jobs</nuxt-link
          >
          <nuxt-link
            to="/newsletter"
            class="block font-bold hover:underline text-fourth-purple hover:text-first-purple"
            >Newsletter</nuxt-link
          >
        </div>
      </div>

      <!-- Column 2: Call to action (second on mobile) -->
      <div
        class="order-2 text-center lg:text-left space-y-4 border-t lg:border-t-0 lg:border-l border-gray-300 pt-6 lg:pt-0 lg:pl-6"
      >
        <span class="font-semibold text-lg text-fourth-purple">
          Ready to get started?
        </span>
        <p class="mt-1 mb-2 text-sm leading-relaxed text-fourth-purple">
          Let yoga flow into your life:<br />
          whoever you are<br />
          whenever you are<br />
          wherever you are.
        </p>
      </div>

      <!-- Column 3: Logo, socials (last on mobile) -->
      <div
        class="space-y-6 flex flex-col items-center lg:items-start order-3 lg:order-1 border-t lg:border-t-0 border-gray-300 pt-6 lg:pt-0"
      >
        <nuxt-link
          to="/"
          class="flex items-center justify-center lg:justify-start w-full mb-3"
        >
          <img
            src="/logo/Yana_FLOW_transparent_icon.svg"
            alt="Yana Flow Logo"
            class="h-20 w-auto"
          />
          <span class="text-second-green font-medium text-3xl ml-3"
            >Yana Flow</span
          >
        </nuxt-link>
        <div class="flex gap-6">
          <a
            href="https://instagram.com/yana-flow"
            target="_blank"
            aria-label="Follow us on Instagram"
            class="bg-first-purple hover:bg-second-green text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300"
          >
            <Icon name="mdi:instagram" class="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com/yana-flow"
            target="_blank"
            aria-label="Follow us on Facebook"
            class="bg-first-purple hover:bg-second-green text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300"
          >
            <Icon name="mdi:facebook" class="h-5 w-5" />
          </a>
          <a
            href="https://x.com/yana-flow"
            target="_blank"
            aria-label="Follow us on X (formerly Twitter)"
            class="bg-first-purple hover:bg-second-green text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300"
          >
            <Icon name="line-md:twitter-x" class="h-5 w-5" />
          </a>
          <a
            href="https://youtube.com/yana-flow"
            target="_blank"
            aria-label="Subscribe to our YouTube channel"
            class="bg-first-purple hover:bg-second-green text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300"
          >
            <Icon name="mdi:youtube" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom: Privacy & Terms right-aligned -->
    <div
      class="absolute h-0 border-b border border-gray-300 left-0 right-0"
    ></div>
    <div class="pt-4 mt-3">
      <div
        class="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center"
      >
        <!-- Top row on mobile, distributed row on desktop -->
        <div class="flex justify-between w-full sm:w-auto mb-2 sm:mb-0">
          <div class="text-sm text-fourth-purple">© 2025 YanaFlow</div>
          <div class="sm:hidden flex space-x-6 text-sm">
            <nuxt-link
              to="/privacy-policy"
              class="text-fourth-purple hover:text-first-purple hover:underline"
              >Privacy Policy</nuxt-link
            >
          </div>
        </div>

        <!-- Middle on both mobile and desktop -->
        <div class="mb-2 sm:mb-0">
          <span class="font-medium text-first-purple">Move with your breath</span>
        </div>

        <!-- Only visible on desktop -->
        <div class="hidden sm:flex space-x-6 text-sm">
          <nuxt-link
            to="/privacy-policy"
            class="text-fourth-purple hover:text-first-purple hover:underline"
            >Privacy Policy</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
  <transition name="slide-fade">
    <button
      v-if="showScrollTop"
      @click="scrollToTop"
      class="fixed right-0 bottom-4 md:bottom-auto top-auto md:top-3/4 md:-translate-y-1/2 z-[200] bg-second-green text-white rounded-l-full rounded-r-none shadow-lg p-4 hover:bg-first-purple transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-fourth-purple flex items-center"
      aria-label="Scroll to top"
    >
      <Icon
        name="material-symbols:arrow-back-ios-new-rounded"
        class="transform rotate-90"
      />
    </button>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.slide-fade-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
