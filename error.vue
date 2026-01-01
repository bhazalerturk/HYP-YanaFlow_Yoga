<script setup>
import { computed } from "vue";
import CoverImage from "~/components/CoverImage.vue";

const props = defineProps({
  error: Object,
});

// Set the default title and description for the page
useHead({
  title: "Error",
  meta: [
    {
      name: "description",
      content:
        "Something went wrong. Please try again or navigate to our homepage.",
    },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "Error - YANA FLOW Yoga Center" },
    {
      property: "og:description",
      content:
        "Something went wrong. Please try again or navigate to our homepage.",
    },
  ],
});

// Get error details for display
const errorTitle = computed(() => {
  return props.error?.statusCode === 404
    ? "Page Not Found"
    : "Something Went Wrong";
});

const errorMessage = computed(() => {
  if (props.error?.statusCode === 404) {
    return "We couldn't find the page you're looking for. The page may have been moved, deleted, or never existed.";
  } else {
    return "We're sorry, but something went wrong on our end. Our team has been notified and we're working to fix the issue.";
  }
});

const errorIcon = computed(() => {
  return props.error?.statusCode === 404
    ? "carbon:document-unknown"
    : "carbon:warning-alt";
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="bg-near-white-tan">
      <!-- Cover image with title -->
      <CoverImage :title="errorTitle" />

      <!-- Main content area -->
      <div
        class="container-xl py-16 flex flex-col items-center justify-center px-4"
      >
        <div
          class="bg-near-white-tan min-h-[60vh] flex flex-col justify-center items-center p-6"
        >
          <div
            class="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-xl overflow-hidden w-full"
          >
            <!-- Error illustration -->
            <div
              class="relative py-10 px-6 bg-gradient-to-br from-first-purple/10 to-fourth-purple/20"
            >
              <div
                class="absolute inset-0 opacity-10 bg-[url('/images/covers/cover_10.jpg')] bg-center bg-cover"
              ></div>
              <div class="relative z-10">
                <!-- Error icon -->
                <div class="flex justify-center mb-4">
                  <div class="bg-white p-3 rounded-full shadow-lg">
                    <Icon
                      :name="errorIcon"
                      class="text-5xl text-first-purple"
                    />
                  </div>
                </div>

                <!-- Error code -->
                <h1
                  v-if="props.error?.statusCode"
                  class="text-7xl font-bold text-fourth-purple mb-2 font-['Lora']"
                >
                  {{ props.error?.statusCode || "500" }}
                </h1>

                <!-- Error title -->
                <h2 class="text-2xl font-bold text-fourth-purple mb-1">
                  {{ props.error?.statusMessage || errorTitle }}
                </h2>
              </div>
            </div>

            <!-- Error details -->
            <div class="py-8 px-6">
              <p class="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
                {{ errorMessage }}
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <!-- Home button -->
                <nuxt-link to="/" class="flex justify-center">
                  <button
                    class="bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center gap-2 justify-center"
                  >
                    <Icon name="material-symbols:home" class="h-5 w-5" />
                    Go to Homepage
                  </button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
