<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { useDataLoading } from "~/composables/useDataLoading";
import type { Teacher, Course, Event } from "~/types";

// Use our common loading composable
const { isLoading, dataStore } = useDataLoading();
const route = useRoute();
const teacherParam = route.params.teacher as string;

// Create a reactive reference for the teacher with proper typing
const teacher = ref<Teacher | null>(null);

// Computed property to filter and sort upcoming events
const upcomingEvents = computed(() => {
  if (!teacher.value || !teacher.value.events) return [];
  const now = new Date();
  return teacher.value.events
    .filter((event) => event.starts_at && new Date(event.starts_at) >= now)
    .sort((a, b) => {
      if (a.starts_at && b.starts_at) {
        return (
          new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
        );
      }
      return 0;
    });
});

// Function to find the teacher
const findTeacher = () => {
  const foundTeacher = dataStore.teachers.find(
    (t: any) => t.path === teacherParam
  );
  if (foundTeacher) {
    teacher.value = foundTeacher as Teacher;
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: "Teacher not found",
      fatal: true,
    });
  }
};

// Watch for when data is loaded
watch(isLoading, (loading) => {
  if (!loading && dataStore.isInitialized) {
    findTeacher();
  }
});

// If data is already loaded, find the teacher immediately
onMounted(() => {
  if (!isLoading.value && dataStore.isInitialized) {
    findTeacher();
  }
});
</script>

<template>
  <!-- Loading state -->
  <LoadingSpinner v-if="isLoading" message="Loading teacher profile..." />
  <!-- Teacher profile content -->
  <div v-else class="relative min-h-screen bg-near-white-tan">
    <div class="relative">
      <!-- Cover image with yoga studio -->
      <div
        class="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-second-tan"
      >
        <img
          src="/images/teachers/CoverImage.jpg"
          alt="Yoga studio"
          class="w-full h-full object-cover"
        />

        <!-- Add a subtle overlay for better contrast -->
        <div class="absolute inset-0 bg-black opacity-10"></div>

        <!-- Instagram tag in bottom right -->
        <div
          v-if="teacher && teacher.insta_tag"
          class="absolute bottom-4 right-8 text-white font-medium py-1 px-3 rounded-full bg-black/40 backdrop-blur-sm"
        >
          {{ teacher.insta_tag }}
        </div>
      </div>

      <!-- Teacher profile picture -->
      <div
        class="absolute -bottom-16 md:-bottom-24 lg:-bottom-24 left-8 md:left-16 z-10"
      >
        <div class="relative">
          <img
            :src="teacher ? teacher.image_url : ''"
            alt="Teacher profile"
            class="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-lg"
            @error="e => { 
              const target = e.target as HTMLImageElement;
              if (target) target.src = '/images/covers/cover_1.jpg';
            }"
          />
        </div>
      </div>
    </div>
    <!-- Teacher name and bio section -->
    <div class="container-xl">
      <div
        class="pt-4 md:pt-16 lg:pt-10 flex flex-col md:flex-row md:items-start md:justify-between gap-10"
      >
        <!-- Left side - Name and quote -->
        <div class="md:w-2/3">
          <h1
            class="text-5xl md:text-7xl font-bold text-fourth-purple mb-8 font-['Lora']"
          >
            {{ teacher ? `${teacher.first_name} ${teacher.last_name}` : "" }}
          </h1>

          <blockquote
            v-if="teacher && teacher.quote"
            class="relative text-lg md:text-xl text-fourth-purple/70 mb-10 pl-8 pr-8 italic"
          >
            <span
              class="absolute left-0 top-0 text-6xl text-fourth-purple opacity-30"
              >"</span
            >
            <span class="relative z-10">
              {{ teacher.quote }}
              <span
                class="text-6xl text-fourth-purple opacity-30 align-bottom ml-2"
                >"</span
              >
            </span>
          </blockquote>

          <p class="text-lg leading-relaxed mb-8 text-gray-700">
            {{ teacher ? teacher.bio : "" }}
          </p>
        </div>
        <!-- Right side - Featured stats -->
        <div class="md:w-1/3 bg-white/90 p-8 rounded-lg shadow-md">
          <div class="text-xl font-bold mb-6 text-fourth-purple">
            Featured In:
          </div>
          <ul class="space-y-6">
            <li
              v-for="(item, index) in teacher && teacher.featured_in
                ? teacher.featured_in
                : []"
              :key="index"
              class="flex items-center"
            >
              <span class="w-2 h-2 rounded-full bg-first-purple mr-3"></span>
              <span class="text-lg text-first-purple">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Courses taught & experiences section -->
    <div
      v-if="teacher && teacher.courses && teacher.courses.length > 0"
      class="bg-third-tan py-16"
    >
      <div class="container-xl pb-0">
        <h2 class="text-4xl font-bold text-fourth-purple mb-10 font-['Lora']">
          Courses taught by {{ teacher.first_name }}
        </h2>
      </div>
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <div
            v-for="course in teacher.courses"
            :key="course.id"
            class="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:scale-105 focus:scale-105"
          >
            <div class="h-48 overflow-hidden">
              <nuxt-link :to="'/courses/' + course.path">
                <img
                  :src="
                    course.image_url || `/images/courses/${course.path}.jpg`
                  "
                  :alt="course.title"
                  class="w-full h-full object-cover"
                  @error="(e) => { 
                    const target = e.target as HTMLImageElement;
                    if (target) target.src = '/images/covers/cover_1.jpg';
                  }"
                />
              </nuxt-link>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-fourth-purple mb-2">
                {{ course.title }}
              </h3>
              <p class="mb-4 text-gray-700 line-clamp-3">
                {{ course.short_description }}
              </p>

              <div class="flex justify-between items-center mt-4">
                <span
                  class="text-sm bg-second-green text-white px-3 py-1 rounded-full flex items-center gap-1"
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
                  {{ course.level || "All levels" }}
                </span>
                <nuxt-link
                  :to="'/courses/' + course.path"
                  class="text-fourth-purple font-bold hover:underline flex items-center gap-1 group hover:text-second-green transition-colors"
                >
                  View Course
                  <Icon
                    name="material-symbols:arrow-forward-rounded"
                    class="h-5 w-5 group-hover:translate-x-1 transition-transform"
                  />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nuxt-link to="/courses" class="flex justify-center mt-10 mb-6">
        <button
          class="bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center gap-2 group"
        >
          View all Courses
          <Icon
            name="material-symbols:arrow-forward-rounded"
            class="h-5 w-5 group-hover:translate-x-1 transition-transform"
          />
        </button>
      </nuxt-link>
    </div>
    <!-- Upcoming Events Section -->
    <div v-if="teacher && teacher.events" class="bg-near-white-tan py-16">
      <div class="container-xl pb-0">
        <h2 class="text-4xl font-bold text-fourth-purple mb-10">
          Upcoming Events with {{ teacher.first_name }}
        </h2>
      </div>
      <div class="container mx-auto px-4">
        <div v-if="upcomingEvents.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EventCard
              v-for="event in upcomingEvents"
              :key="event.id"
              :event="event"
              class="bg-white border border-fourth-purple/20 rounded-xl overflow-hidden shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 focus:scale-105 flex flex-col"
            />
          </div>
          <div class="flex justify-center mt-10 mb-6">
            <nuxt-link to="/events">
              <button
                class="bg-fourth-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center gap-2 group"
              >
                Explore all Events
                <Icon
                  name="material-symbols:arrow-forward-rounded"
                  class="h-5 w-5 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </nuxt-link>
          </div>
        </div>

        <div v-else class="text-center py-8 bg-near-white-tan rounded-xl">
          <Icon
            name="mdi:calendar-blank"
            class="h-16 w-16 text-gray-400 mx-auto mb-4"
          />
          <p class="text-xl text-gray-600">
            No upcoming events with {{ teacher ? teacher.first_name : "" }} at
            this time.
          </p>
          <p class="text-gray-500 mt-2">
            Check back soon for new events or explore our other Events.
          </p>
          <nuxt-link to="/events" class="flex justify-center mt-10 mb-6">
            <button
              class="bg-fourth-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center gap-2 group"
            >
              Explore all Events
              <Icon
                name="material-symbols:arrow-forward-rounded"
                class="h-5 w-5 group-hover:translate-x-1 transition-transform"
              />
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- Other Teachers Section -->
    <div class="bg-second-green py-16">
      <div class="container-xl pb-0">
        <h2 class="text-4xl font-bold text-near-white-tan mb-10 font-['Lora']">
          Meet Our Other Teachers
        </h2>
      </div>
      <div class="container-xl lg:px-16">
        <div
          class="flex flex-row flex-wrap gap-8 justify-center items-stretch px-4 xs:px-8 sm:px-16 md:px-0"
        >
          <TeacherCard
            :teacher="otherTeacher"
            :fullWidth="false"
            v-for="otherTeacher in dataStore.teachers.filter(
              (t) => t.id !== teacher?.id
            )"
          />
        </div>
      </div>
    </div>
  </div>
</template>
