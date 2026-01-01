<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useDataLoading } from "~/composables/useDataLoading";
import type { Course } from "~/types";

// Use our common loading composable
const { isLoading, dataStore } = useDataLoading();
const route = useRoute();
const courseParam = route.params.course as string;

// Create a reactive reference for the course
const course = ref<Course | null>(null);

// Define the weekday order for sorting
const weekdayOrder = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

// Format the schedule days in order
const formattedSchedule = computed(() => {
  if (!course.value?.schedule) return [];

  return course.value.schedule
    .map((schedule) => {
      // Format time without seconds
      const startTime = new Date(`2023-01-01T${schedule.start_time}`);
      const endTime = new Date(`2023-01-01T${schedule.end_time}`);

      const formattedStartTime = startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const formattedEndTime = endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return {
        ...schedule,
        // Add 's' to weekday name (e.g., "Monday" → "Mondays")
        weekday: `${schedule.weekday}s`,
        formattedTime: `${formattedStartTime} - ${formattedEndTime}`,
        order:
          weekdayOrder[schedule.weekday as keyof typeof weekdayOrder] || 999,
      };
    })
    .sort((a, b) => a.order - b.order);
});

// Format equipment as array
const courseEquipment = computed(() => {
  if (!course.value) return [];

  if (typeof course.value.equipment === "string") {
    try {
      return JSON.parse(course.value.equipment);
    } catch (e) {
      return [];
    }
  }

  return course.value.equipment || [];
});

// Function to find the course
const findCourse = () => {
  const foundCourse = dataStore.courses.find(
    (c: any) => c.path === courseParam
  );
  if (foundCourse) {
    course.value = foundCourse;
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: "Course not found",
      fatal: true,
    });
  }
};

// Function to share the course
const shareCourse = () => {
  if (navigator.share) {
    navigator
      .share({
        title: course.value?.title,
        text: course.value?.short_description,
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
    findCourse();
  }
});

// If data is already loaded, find the course immediately
onMounted(() => {
  if (!isLoading.value && dataStore.isInitialized) {
    findCourse();
  }
});
</script>

<template>
  <!-- Loading state -->
  <LoadingSpinner v-if="isLoading" message="Loading course details..." />

  <!-- Course details content -->
  <div v-else-if="course" class="bg-near-white-tan min-h-screen">
    <!-- Cover image with title -->
    <CoverImage :title="course.title" />

    <!-- Main content area -->
    <div class="container-xl py-16">
      <!-- Course info section with level, trending, start date -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <div class="flex flex-wrap gap-4 items-center">
          <div
            v-if="course.level"
            class="bg-second-green text-white px-4 py-1 rounded-full flex items-center gap-1"
          >
            <Icon
              :name="
                course.level?.toLowerCase() === 'beginner'
                  ? 'carbon:skill-level-basic'
                  : course.level?.toLowerCase() === 'intermediate'
                  ? 'carbon:skill-level-intermediate'
                  : course.level?.toLowerCase() === 'advanced'
                  ? 'carbon:skill-level-advanced'
                  : 'carbon:skill-level'
              "
              class="h-4 w-4"
            />
            {{ course.level }}
          </div>
          <div
            v-if="course.trending"
            class="bg-first-purple text-white px-4 py-1 rounded-full flex items-center gap-1"
          >
            <Icon name="material-symbols:trending-up" class="h-4 w-4" />
            Trending
          </div>
        </div>
        <div
          v-if="course.start_date"
          class="mt-4 md:mt-0 bg-fourth-purple/10 px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Icon name="carbon:calendar" class="h-5 w-5 text-fourth-purple" />
          <div>
            <div class="text-sm text-fourth-purple/70">Course Dates</div>
            <div class="font-semibold text-fourth-purple">
              {{
                new Date(course.start_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
              <span v-if="course.end_date">
                -
                {{
                  new Date(course.end_date).toLocaleDateString("en-US", {
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

      <!-- Course image section - full width -->
      <div class="my-8 rounded-xl overflow-hidden shadow-lg">
        <img
          :src="course.image_url || `/images/courses/${course.path}.jpg`"
          :alt="course.title"
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
          v-if="course.teachers && course.teachers.length > 0"
          class="w-full md:w-auto text-center md:text-left"
        >
          <h3 class="text-xl font-semibold text-fourth-purple mb-3">
            Taught by:
          </h3>
          <div class="flex flex-wrap gap-4 justify-center md:justify-start">
            <nuxt-link
              v-for="teacher in course.teachers"
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
          @click="shareCourse"
          class="mt-4 hidden md:flex bg-first-purple hover:bg-second-green text-white px-4 py-2 rounded-md transition-colors items-center gap-2 md:self-end"
        >
          <Icon name="carbon:share" class="h-5 w-5" />
          Share Course
        </button>

        <!-- Share button - mobile version (fixed at bottom) -->
        <button
          @click="shareCourse"
          class="md:hidden fixed bottom-4 left-0 z-50 rounded-r-full rounded-l-none bg-first-purple hover:bg-second-green text-white px-4 py-4 md:rounded-full shadow-lg transition-colors flex items-center gap-2"
        >
          <Icon name="carbon:share" class="h-5 w-5" />
          <span class="sr-only">Share Course</span>
        </button>
      </div>
      <!-- Dotted divider - full width -->
      <div class="w-full">
        <div
          class="absolute h-0 border-b border-dotted border-gray-400 left-0 right-0"
        ></div>
        <div class="py-4"></div>
      </div>
      <!-- Course description -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']">
          About this Course
        </h2>
        <div class="prose prose-lg max-w-none text-gray-700">
          <p>{{ course.description || course.short_description }}</p>
        </div>
      </div>
      <!-- Dotted divider - full width -->
      <div class="w-full">
        <div
          class="absolute h-0 border-b border-dotted border-gray-400 left-0 right-0"
        ></div>
        <div class="py-4"></div>
      </div>
      <!-- Schedule section -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']">
          Schedule
        </h2>
        <div class="bg-white rounded-xl shadow-md p-6">
          <!-- Course duration and dates -->
          <div
            class="mb-6 bg-fourth-purple/10 p-4 rounded-lg flex flex-col md:flex-row justify-between"
          >
            <div class="flex items-center gap-2">
              <Icon name="carbon:calendar" class="h-5 w-5 text-fourth-purple" />
              <span class="font-medium">
                <span v-if="course.start_date && course.end_date">
                  {{
                    new Date(course.start_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                  -
                  {{
                    new Date(course.end_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                </span>
                <span v-else-if="course.start_date">
                  Starts:
                  {{
                    new Date(course.start_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                </span>
              </span>
            </div>
            <div class="flex items-center gap-2 mt-2 md:mt-0">
              <Icon name="carbon:timer" class="h-5 w-5 text-fourth-purple" />
              <span class="font-medium">
                <span>
                  Duration: {{ course.courseDuration }}
                  {{ course.courseDurationUnit }}
                </span>
              </span>
            </div>
          </div>

          <!-- Weekly schedule -->
          <div v-if="formattedSchedule.length > 0">
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-fourth-purple text-white">
                    <th class="py-3 px-4 text-left rounded-tl-lg">Day</th>
                    <th class="py-3 px-4 text-left">Time</th>
                    <th class="py-3 px-4 text-left rounded-tr-lg">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in formattedSchedule"
                    :key="index"
                    :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
                    class="border-b border-gray-200 last:border-b-0"
                  >
                    <td class="py-3 px-4 font-medium">{{ item.weekday }}</td>
                    <td class="py-3 px-4">{{ item.formattedTime }}</td>
                    <td class="py-3 px-4">{{ course.class_length }} minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else class="text-center py-4 text-gray-500 italic">
            Schedule information not available
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
      <h2 class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']">
        Details
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Equipment section -->
        <div
          v-if="courseEquipment.length > 0"
          class="bg-white rounded-xl shadow-md p-6 h-full"
        >
          <h3
            class="text-xl font-semibold text-fourth-purple mb-4 flex items-center gap-2"
          >
            <Icon name="carbon:tools" class="h-5 w-5" />
            Equipment
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(item, index) in courseEquipment"
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
          v-if="course.focus"
          class="bg-white rounded-xl shadow-md p-6 h-full"
        >
          <h3
            class="text-xl font-semibold text-fourth-purple mb-4 flex items-center gap-2"
          >
            <Icon name="mdi:target" class="h-5 w-5" />
            Focus
          </h3>
          <div class="prose">
            <p>{{ course.focus }}</p>
          </div>
        </div>

        <!-- Style section -->
        <div
          v-if="course.style"
          class="bg-white rounded-xl shadow-md p-6 h-full"
        >
          <h3
            class="text-xl font-semibold text-fourth-purple mb-4 flex items-center gap-2"
          >
            <Icon name="mdi:yoga" class="h-5 w-5" />
            Style
          </h3>
          <div class="prose">
            <p>{{ course.style }}</p>
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
    </div>
    <div class="bg-near-white-tan w-full mx-auto">
      <div class="container-xl py-0">
        <h2 class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']">
          Other Courses
        </h2>
      </div>
      <CoursesCarousel />
    </div>
    <!-- Back to courses button -->
    <div class="flex justify-center mt-12 pb-8">
      <button class="rounded">
        <nuxt-link
          to="/courses"
          class="bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center gap-2 group"
        >
          <Icon
            name="material-symbols:arrow-back-rounded"
            class="h-5 w-5 group-hover:-translate-x-1 transition-transform"
          />
          Back to all Courses
        </nuxt-link>
      </button>
    </div>
  </div>

  <!-- Error state -->
  <div v-else class="container-xl py-20 text-center">
    <h1 class="text-3xl text-gray-700 mb-4">Course not found</h1>
    <p class="text-gray-500 mb-8">
      The course you're looking for doesn't exist or has been removed.
    </p>
    <nuxt-link
      to="/courses"
      class="bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors inline-flex items-center gap-2"
    >
      <Icon name="material-symbols:arrow-back-rounded" class="h-5 w-5" />
      View All Courses
    </nuxt-link>
  </div>
</template>
