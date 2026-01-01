<script setup>
import { defineProps } from "vue";
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  fullWidth: {
    type: Boolean,
    default: true,
  },
  activeSlide: {
    type: Boolean,
    default: true,
  },
});

// Format date nicely
const formatDate = (dateString) => {
  if (!dateString) return "Date TBA";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Format date components for styled display
const formatDateParts = (dateString) => {
  if (!dateString) return { day: "TBA", month: "Date", year: "" };

  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleDateString("en-US", { month: "short" }),
    year: date.getFullYear(),
  };
};

// Format time
const formatTime = (timeString) => {
  if (!timeString) return "";

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

// Create a formatted time range
const timeRange = (start, end) => {
  if (!start) return "Time TBA";
  if (!end) return formatTime(start);
  return `${formatTime(start)} - ${formatTime(end)}`;
};

// Generate a fallback image path
const getFallbackImage = (eventTitle) => {
  return `/images/covers/cover_${Math.floor(Math.random() * 13) + 1}.jpg`;
};

// Check if event is in the past
const isPastEvent = (dateString) => {
  if (!dateString) return false;
  const eventDate = new Date(dateString);
  const today = new Date();
  return eventDate < today;
};
</script>

<template>
  <div
    v-if="fullWidth"
    class="block transition-transform duration-300 ease-in-out hover:scale-105 focus:scale-105"
  >
    <div
      class="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col"
      :class="{ 'opacity-75': isPastEvent(event.starts_at) }"
      :aria-label="`Event: ${event.title}, Date: ${formatDate(
        event.starts_at
      )}`"
    >
      <!-- Event image -->
      <nuxt-link
        :to="'/events/' + event.path"
        class="h-48 relative overflow-hidden"
        :aria-label="`View details for ${event.title} event`"
      >
        <img
          :src="event.image_url || getFallbackImage(event.title)"
          :alt="`${event.title} event image`"
          class="w-full h-full object-cover"
          @error="
            (e) => {
              const target = e.target;
              if (target) target.src = getFallbackImage(event.title);
            }
          "
        />

        <!-- Most Liked label -->
        <div
          v-if="event.most_liked"
          class="absolute top-2 right-2 px-2 py-1 bg-second-green rounded-full text-xs whitespace-nowrap flex items-center text-white"
          aria-label="Most liked event"
        >
          <Icon name="mdi:thumb-up" class="mr-1 h-4 w-4" aria-hidden="true" />
          <span>Most liked</span>
        </div>
        <!-- Date badge -->
        <div
          v-if="event.starts_at"
          class="absolute top-10 left-10 transform -translate-x-1/2 -translate-y-1/2 w-15 h-15 bg-white bg-opacity-90 rounded-lg flex flex-col items-center justify-center shadow-md z-10"
        >
          <span class="text-second-green text-xs font-bold">{{
            formatDateParts(event.starts_at).month
          }}</span>
          <span class="text-fourth-purple text-xl font-bold leading-tight">{{
            formatDateParts(event.starts_at).day
          }}</span>
        </div>

        <!-- Past event overlay -->
        <div
          v-if="isPastEvent(event.starts_at)"
          class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <span
            class="text-white font-bold px-3 py-1 bg-fourth-purple bg-opacity-80 rounded"
            >Past Event</span
          >
        </div>
      </nuxt-link>

      <!-- Event details -->
      <div class="p-4 flex-grow flex flex-col">
        <h3 class="text-lg font-bold text-fourth-purple mb-2 line-clamp-2">
          {{ event.title }}
        </h3>
        <!-- Date and time -->
        <div class="mb-3 text-sm text-gray-600 flex items-center">
          <Icon name="mdi:calendar" class="mr-1 h-4 w-4 text-first-purple" />
          <span>{{ formatDate(event.starts_at) }}</span>
        </div>

        <div class="mb-3 text-sm text-gray-600 flex items-center">
          <Icon
            name="mdi:clock-outline"
            class="mr-1 h-4 w-4 text-first-purple"
          />
          <span>{{ timeRange(event.starts_at, event.ends_at) }}</span>
        </div>

        <!-- Location -->
        <div class="mb-3 text-sm text-gray-600 flex items-center">
          <Icon name="mdi:map-marker" class="mr-1 h-4 w-4 text-first-purple" />
          <span>{{ event.location }}</span>
        </div>

        <!-- Description snippet -->
        <p
          class="text-sm text-gray-700 mb-4 line-clamp-3 border-t border-gray-100 pt-4"
        >
          {{ event.short_description || event.description }}
        </p>
        <!-- Teacher avatars with names -->
        <div
          v-if="event.teachers && event.teachers.length > 0"
          class="mt-auto border-t border-gray-100 pt-4"
        >
          <p class="text-xs text-gray-500 mb-2">With:</p>
          <div class="space-y-2">
            <div
              v-for="(teacher, index) in event.teachers.slice(0, 3)"
              :key="index"
              class="flex items-center"
            >
              <div
                class="h-8 w-8 rounded-full ring-2 ring-white mr-2 flex-shrink-0"
              >
                <img
                  :src="
                    teacher.image_url || `/images/covers/cover_${index + 1}.jpg`
                  "
                  :alt="`${teacher.first_name} ${teacher.last_name}`"
                  class="h-full w-full object-cover rounded-full"
                  @error="
                    (e) => {
                      const target = e.target;
                      if (target)
                        target.src = `/images/covers/cover_${index + 1}.jpg`;
                    }
                  "
                />
              </div>
              <span class="text-sm text-gray-700 truncate"
                >{{ teacher.first_name }} {{ teacher.last_name }}</span
              >
            </div>
            <div
              v-if="event.teachers.length > 3"
              class="text-xs text-gray-600 italic"
            >
              + {{ event.teachers.length - 3 }} more instructor{{
                event.teachers.length - 3 > 1 ? "s" : ""
              }}
            </div>
          </div>
        </div>

        <!-- Learn more link -->
        <nuxt-link
          :to="'/events/' + event.path"
          class="mt-4 text-sm font-bold text-fourth-purple flex items-center gap-1 group hover:text-second-green transition-colors hover:underline"
        >
          Learn more
          <Icon
            name="material-symbols:arrow-forward-rounded"
            class="h-5 w-5 group-hover:translate-x-1 transition-transform"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
  <div
    v-else
    class="block transition-transform duration-300 ease-in-out hover:scale-105 focus:scale-105 h-full transition-opacity duration-300"
    :class="activeSlide ? 'opacity-100' : 'opacity-75'"
  >
    <div
      class="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col"
      :class="{ 'opacity-75': isPastEvent(event.starts_at) }"
    >
      <!-- Event image -->
      <nuxt-link
        :to="'/events/' + event.path"
        class="h-48 relative overflow-hidden"
      >
        <img
          :src="event.image_url || getFallbackImage(event.title)"
          :alt="event.title"
          class="w-full h-full object-cover"
          @error="
            (e) => {
              const target = e.target;
              if (target) target.src = getFallbackImage(event.title);
            }
          "
        />

        <!-- Most Liked label -->
        <div
          v-if="event.most_liked"
          class="absolute top-2 right-2 px-2 py-1 bg-second-green rounded-full text-xs whitespace-nowrap flex items-center text-white"
        >
          <Icon name="mdi:thumb-up" class="mr-1 h-4 w-4" />
          <span>Most liked</span>
        </div>
        <!-- Date badge -->
        <div
          v-if="event.starts_at"
          class="absolute top-10 left-10 transform -translate-x-1/2 -translate-y-1/2 w-15 h-15 bg-white bg-opacity-90 rounded-lg flex flex-col items-center justify-center shadow-md z-10"
        >
          <span class="text-second-green text-xs font-bold">{{
            formatDateParts(event.starts_at).month
          }}</span>
          <span class="text-fourth-purple text-xl font-bold leading-tight">{{
            formatDateParts(event.starts_at).day
          }}</span>
        </div>

        <!-- Past event overlay -->
        <div
          v-if="isPastEvent(event.starts_at)"
          class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <span
            class="text-white font-bold px-3 py-1 bg-fourth-purple bg-opacity-80 rounded"
            >Past Event</span
          >
        </div>
      </nuxt-link>

      <!-- Event details -->
      <div class="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-fourth-purple mb-2 line-clamp-2">
            {{ event.title }}
          </h3>
          <!-- Date and time -->

          <div class="mb-3 text-sm text-gray-600 flex items-center">
            <Icon
              name="mdi:clock-outline"
              class="mr-1 h-4 w-4 text-first-purple"
            />
            <span>{{ timeRange(event.starts_at, event.ends_at) }}</span>
          </div>

          <!-- Location -->
          <div class="mb-3 text-sm text-gray-600 flex items-center">
            <Icon
              name="mdi:map-marker"
              class="mr-1 h-4 w-4 text-first-purple"
            />
            <span>{{ event.location }}</span>
          </div>
        </div>

        <!-- Learn more link -->
        <nuxt-link
          :to="'/events/' + event.path"
          class="text-sm font-bold text-fourth-purple flex items-center gap-1 group hover:text-second-green transition-colors hover:underline mt-auto"
        >
          Learn more
          <Icon
            name="material-symbols:arrow-forward-rounded"
            class="h-5 w-5 group-hover:translate-x-1 transition-transform"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
