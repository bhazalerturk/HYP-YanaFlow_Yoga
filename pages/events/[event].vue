<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useDataLoading } from "~/composables/useDataLoading";
import type { Event } from "~/types";

// Use our common loading composable
const { isLoading, dataStore } = useDataLoading();
const route = useRoute();
const eventParam = route.params.event as string;

// Create a reactive reference for the event
const event = ref<Event | null>(null);

// Create a formatted time range
const timeRange = computed(() => {
  if (!event.value) return "Time TBA";
  if (!event.value.starts_at) return "Time TBA";

  // Check if starts_at/ends_at contains a date or just a time
  const isFullDateTime = (str: string) =>
    str.includes("T") || str.includes("-");

  if (isFullDateTime(event.value.starts_at)) {
    // Handle full date-time strings
    const startDate = new Date(event.value.starts_at);

    const formattedStartTime = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (!event.value.ends_at) return formattedStartTime;

    const endDate = new Date(event.value.ends_at);
    const formattedEndTime = endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedStartTime} - ${formattedEndTime}`;
  } else {
    // Handle time-only strings (HH:MM format)
    const formatTimeString = (timeString: string) => {
      const [hours, minutes] = timeString.split(":");
      const date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));

      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    };

    const formattedStartTime = formatTimeString(event.value.starts_at);

    if (!event.value.ends_at) return formattedStartTime;

    const formattedEndTime = formatTimeString(event.value.ends_at);
    return `${formattedStartTime} - ${formattedEndTime}`;
  }
});

// Format equipment as array
const eventEquipment = computed(() => {
  if (!event.value) return [];

  if (typeof event.value.equipment === "string") {
    try {
      return JSON.parse(event.value.equipment as string);
    } catch (e) {
      return [];
    }
  }

  return event.value.equipment || [];
});

// Check if event is in the past
const isPastEvent = computed(() => {
  if (!event.value?.date && !event.value?.starts_at) return false;

  let eventDate;

  if (event.value.date) {
    eventDate = new Date(event.value.date);
  } else if (event.value.starts_at) {
    // Check if starts_at contains a date or just a time
    if (
      event.value.starts_at.includes("T") ||
      event.value.starts_at.includes("-")
    ) {
      eventDate = new Date(event.value.starts_at);
    } else {
      // If it's just a time, we can't determine if it's past
      return false;
    }
  }

  const today = new Date();
  return eventDate !== undefined && eventDate < today;
});

// Function to find the event
const findEvent = () => {
  if (Array.isArray(dataStore.events)) {
    const foundEvent = dataStore.events.find((e: any) => e.path === eventParam);
    if (foundEvent) {
      event.value = foundEvent;
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: "Event not found",
        fatal: true,
      });
    }
  } else {
    throw createError({
      statusCode: 500,
      statusMessage: "Events data is not available",
      fatal: true,
    });
  }
};

// Function to share the event
const shareEvent = () => {
  if (navigator.share) {
    navigator
      .share({
        title: event.value?.title,
        text: event.value?.short_description,
        url: window.location.href,
      })
      .catch((error) => console.log("Error sharing", error));
  } else {
    // Fallback for browsers that don't support the Web Share API
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("Link copied to clipboard!"))
      .catch(() => alert("Failed to copy link."));
  }
};

// Watch for when data is loaded
watch(isLoading, (loading) => {
  if (!loading && dataStore.isInitialized) {
    findEvent();
  }
});

// If data is already loaded, find the event immediately
onMounted(() => {
  if (!isLoading.value && dataStore.isInitialized) {
    findEvent();
  }
});
</script>

<template>
  <!-- Loading state -->
  <LoadingSpinner v-if="isLoading" message="Loading event details..." />

  <!-- Event details content -->
  <div v-else-if="event" class="bg-near-white-tan min-h-screen">
    <!-- Cover image with title -->
    <CoverImage :title="event.title" />

    <!-- Main content area -->
    <div class="container-xl">
      <!-- Event info section with date, style, trending -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <div class="flex flex-wrap gap-4 items-center">
          <div
            v-if="event.most_liked"
            class="bg-first-purple text-white px-4 py-1 rounded-full flex items-center gap-1"
          >
            <Icon name="mdi:thumb-up" class="mr-1 h-4 w-4" />
            <span>Most liked</span>
          </div>
          <div
            v-if="isPastEvent"
            class="bg-gray-500 text-white px-4 py-1 rounded-full flex items-center gap-1"
          >
            <Icon name="mdi:calendar-remove" class="h-4 w-4" />
            Past Event
          </div>
        </div>
        <div
          v-if="event.starts_at"
          class="mt-4 md:mt-0 bg-fourth-purple/10 px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Icon name="carbon:calendar" class="h-5 w-5 text-fourth-purple" />
          <div>
            <div class="text-sm text-fourth-purple/70">Event Date</div>
            <div class="font-semibold text-fourth-purple">
              {{
                new Date(event.starts_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
              <span
                v-if="
                  event.starts_at &&
                  event.ends_at &&
                  new Date(event.starts_at).toDateString() !==
                    new Date(event.ends_at).toDateString()
                "
              >
                -
                {{
                  new Date(event.ends_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Event image section - full width -->
      <div class="my-8 rounded-xl overflow-hidden shadow-lg relative">
        <img
          :src="event.image_url || `/images/events/${event.path}.jpg`"
          :alt="event.title"
          class="w-full h-full object-cover max-h-[50vh]"
          @error="e => {
            const target = e.target as HTMLImageElement;
            if (target) target.src = '/images/covers/cover_1.jpg';
          }"
        />
      </div>

      <!-- Teachers and share section -->
      <div
        class="flex flex-col md:flex-row justify-between items-center mb-6 relative"
      >
        <div
          v-if="event.teachers && event.teachers.length > 0"
          class="w-full md:w-auto text-center md:text-left"
        >
          <h3 class="text-xl font-semibold text-fourth-purple mb-3">
            Event Instructors:
          </h3>
          <div class="flex flex-wrap gap-4 justify-center md:justify-start">
            <nuxt-link
              v-for="teacher in event.teachers"
              :key="teacher.id"
              :to="`/teachers/${teacher.path}`"
              class="flex items-center gap-2 bg-third-tan p-2 rounded-full shadow-md transition-transform hover:scale-105"
            >
              <img
                :src="teacher.image_url"
                :alt="`${teacher.first_name} ${teacher.last_name}`"
                class="w-10 h-10 rounded-full object-cover"
                @error="e => {
                  const target = e.target as HTMLImageElement;
                  if (target) target.src = '/images/covers/cover_1.jpg';
                }"
              />
              <span class="font-medium text-fourth-purple"
                >{{ teacher.first_name }} {{ teacher.last_name }}</span
              >
            </nuxt-link>
          </div>
        </div>
        <!-- Share button - desktop version -->
        <button
          @click="shareEvent"
          class="mt-4 hidden md:flex bg-first-purple hover:bg-second-green text-white px-4 py-2 rounded-md transition-colors items-center gap-2 md:self-end"
        >
          <Icon name="carbon:share" class="h-5 w-5" />
          Share Event
        </button>

        <!-- Share button - mobile version (fixed at bottom) -->
        <button
          @click="shareEvent"
          class="md:hidden fixed bottom-4 left-0 z-50 rounded-r-full rounded-l-none bg-first-purple hover:bg-second-green text-white px-4 py-4 md:rounded-full shadow-lg transition-colors flex items-center gap-2"
        >
          <Icon name="carbon:share" class="h-5 w-5" />
          <span class="sr-only">Share Event</span>
        </button>
      </div>

      <!-- Dotted divider - full width -->
      <div class="w-full">
        <div
          class="absolute h-0 border-b border-dotted border-gray-400 left-0 right-0"
        ></div>
        <div class="py-4"></div>
      </div>

      <!-- Event description -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']">
          About this Event
        </h2>
        <div class="prose prose-lg max-w-none text-gray-700">
          <p>{{ event.description || event.short_description }}</p>
        </div>
      </div>

      <!-- Dotted divider - full width -->
      <div class="w-full">
        <div
          class="absolute h-0 border-b border-dotted border-gray-400 left-0 right-0"
        ></div>
        <div class="py-4"></div>
      </div>

      <!-- Event details section -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']">
          Event Details
        </h2>
        <div class="bg-white rounded-xl shadow-md p-6">
          <!-- Event time and location -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Added date information -->
            <div
              class="bg-fourth-purple/10 p-4 rounded-lg flex items-start gap-3"
            >
              <Icon
                name="carbon:calendar"
                class="h-6 w-6 text-fourth-purple mt-1"
              />
              <div>
                <h3 class="font-semibold text-fourth-purple">Date</h3>
                <p class="text-gray-700">
                  {{
                    event.starts_at
                      ? new Date(event.starts_at).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Date TBA"
                  }}
                  <span
                    v-if="
                      event.ends_at &&
                      event.starts_at &&
                      new Date(event.starts_at).toDateString() !==
                        new Date(event.ends_at).toDateString()
                    "
                  >
                    -<br />
                    {{
                      new Date(event.ends_at).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    }}
                  </span>
                </p>
              </div>
            </div>

            <div
              class="bg-fourth-purple/10 p-4 rounded-lg flex items-start gap-3"
            >
              <Icon
                name="mdi:clock-outline"
                class="h-6 w-6 text-fourth-purple mt-1"
              />
              <div>
                <h3 class="font-semibold text-fourth-purple">Time</h3>
                <p class="text-gray-700">{{ timeRange }}</p>
              </div>
            </div>

            <div
              class="bg-fourth-purple/10 p-4 rounded-lg flex items-start gap-3"
            >
              <Icon
                name="mdi:map-marker"
                class="h-6 w-6 text-fourth-purple mt-1"
              />
              <div>
                <h3 class="font-semibold text-fourth-purple">Location</h3>
                <p class="text-gray-700">{{ event.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dotted divider - full width -->
      <div class="w-full">
        <div
          class="absolute h-0 border-b border-dotted border-gray-400 left-0 right-0"
        ></div>
        <div class="py-4"></div>
      </div>

      <!-- Additional details section -->
      <h2
        class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']"
        v-if="eventEquipment.length > 0 || event.focus || event.style"
      >
        Additional Information
      </h2>
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        v-if="eventEquipment.length > 0 || event.focus || event.style"
      >
        <!-- Equipment section -->
        <div
          v-if="eventEquipment.length > 0"
          class="bg-white rounded-xl shadow-md p-6 h-full"
        >
          <h3
            class="text-xl font-semibold text-fourth-purple mb-4 flex items-center gap-2"
          >
            <Icon name="carbon:tools" class="h-5 w-5" />
            Equipment Needed
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(item, index) in eventEquipment"
              :key="index"
              class="flex items-center gap-2"
            >
              <span class="w-2 h-2 rounded-full bg-second-green"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Focus section -->
        <div
          v-if="event.focus"
          class="bg-white rounded-xl shadow-md p-6 h-full"
        >
          <h3
            class="text-xl font-semibold text-fourth-purple mb-4 flex items-center gap-2"
          >
            <Icon name="mdi:target" class="h-5 w-5" />
            Focus Area
          </h3>
          <div class="prose">
            <p>{{ event.focus }}</p>
          </div>
        </div>

        <!-- Style section -->
        <div
          v-if="event.style"
          class="bg-white rounded-xl shadow-md p-6 h-full"
        >
          <h3
            class="text-xl font-semibold text-fourth-purple mb-4 flex items-center gap-2"
          >
            <Icon name="mdi:yoga" class="h-5 w-5" />
            Yoga Style
          </h3>
          <div class="prose">
            <p>{{ event.style }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Other events section -->
    <div class="bg-near-white-tan w-full mx-auto">
      <div class="container-xl py-0">
        <h2 class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']">
          Other Events
        </h2>
      </div>
      <EventsCarousel />
    </div>

    <!-- Back to events button -->
    <div class="flex justify-center mt-12 pb-8">
      <button class="rounded">
        <nuxt-link
          to="/events"
          class="bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center gap-2 group"
        >
          <Icon
            name="material-symbols:arrow-back-rounded"
            class="h-5 w-5 group-hover:-translate-x-1 transition-transform"
          />
          Back to all Events
        </nuxt-link>
      </button>
    </div>
  </div>

  <!-- Error state -->
  <div v-else class="container-xl py-20 text-center">
    <h1 class="text-3xl text-gray-700 mb-4">Event not found</h1>
    <p class="text-gray-500 mb-8">
      The event you're looking for doesn't exist or has been removed.
    </p>
    <nuxt-link
      to="/events"
      class="bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors inline-flex items-center gap-2"
    >
      <Icon name="material-symbols:arrow-back-rounded" class="h-5 w-5" />
      View All Events
    </nuxt-link>
  </div>
</template>
