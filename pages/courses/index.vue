<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useDataLoading } from "~/composables/useDataLoading";
import { useRoute } from "vue-router";

// Set SEO metadata for the courses page
useHead({
  title: "Yoga Courses",
  meta: [
    {
      name: "description",
      content:
        "Explore our diverse range of yoga courses for all skill levels. From beginners to advanced practitioners, find the perfect class to enhance your practice.",
    },
    {
      name: "keywords",
      content:
        "yoga courses, yoga classes, hatha yoga, vinyasa flow, yin yoga, meditation, mindfulness, beginner yoga, advanced yoga",
    },
    { property: "og:title", content: "Yoga Courses - YANA FLOW Yoga Center" },
    {
      property: "og:description",
      content:
        "Browse our catalog of yoga courses for all experience levels. Find the perfect class to deepen your practice.",
    },
    { property: "og:type", content: "website" },
  ],
});

// Access the data store with loading state
const { isLoading, dataStore } = useDataLoading();

// Reference to the CourseFilters component
const courseFiltersRef = ref(null);

// Get the route to access query parameters
const route = useRoute();

// Store filtered courses from the component
const filteredCourses = ref([]);

// Check if trending parameter is present
const isTrending = computed(() => {
  return route.query.trending === "true";
});

// Watch for changes in the trending URL parameter
watch(
  () => route.query.trending,
  (newValue) => {
    if (courseFiltersRef.value) {
      // Set trending filter based on URL parameter
      courseFiltersRef.value.showTrendingOnly = newValue === "true";
    }
  },
  { immediate: true }
);

// Update the filtered courses when the component emits changes
const updateFilteredCourses = (courses) => {
  // Make sure to assign a new array to trigger reactivity
  filteredCourses.value = Array.isArray(courses) ? [...courses] : [];
};

// Group courses by start_date month
const groupedCourses = computed(() => {
  const groups = {};

  filteredCourses.value.forEach((course) => {
    if (!course.start_date) {
      if (!groups["No Start Date"]) groups["No Start Date"] = [];
      groups["No Start Date"].push(course);
      return;
    }

    const date = new Date(course.start_date);

    // Format by month and year
    const monthYear = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    // Store the formatted start date with each course for display
    course.formattedStartDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!groups[monthYear]) groups[monthYear] = [];
    groups[monthYear].push(course);
  });

  // Sort the months chronologically
  return Object.entries(groups)
    .sort(([dateA], [dateB]) => {
      if (dateA === "No Start Date") return 1; // No date at the end
      if (dateB === "No Start Date") return -1;

      // Parse month and year for comparison
      const [monthA, yearA] = dateA.split(" ");
      const [monthB, yearB] = dateB.split(" ");

      // Compare years first
      if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);

      // If years are the same, compare months
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months.indexOf(monthA) - months.indexOf(monthB);
    })
    .reduce((acc, [date, courses]) => {
      // Sort courses within each month by actual start date
      acc[date] = courses.sort((a, b) => {
        if (!a.start_date) return 1;
        if (!b.start_date) return -1;
        return new Date(a.start_date) - new Date(b.start_date);
      });
      return acc;
    }, {});
});

// Initialize filtered courses when component is mounted
onMounted(() => {
  // Initialize with all courses
  filteredCourses.value = dataStore.courses;
});

// Watch for the courseFiltersRef to be available and set trending filter if needed
watch(
  courseFiltersRef,
  (newValue) => {
    if (newValue && isTrending.value) {
      // Set the trending filter if the query parameter is present
      courseFiltersRef.value.showTrendingOnly = true;
    }
  },
  { immediate: true }
);

// Clear all filters using the component's exposed method
const clearFilters = () => {
  if (courseFiltersRef.value) {
    courseFiltersRef.value.clearFilters();
    // Also initialize with all courses to ensure immediate UI update
    filteredCourses.value = dataStore.courses;
  }
};
</script>

<template>
  <!-- Loading state -->
  <LoadingSpinner v-if="isLoading" message="Loading courses..." />

  <!-- Courses page content -->
  <div v-else class="relative">
    <CoverImage :title="'Courses'" />

    <!-- Filters section -->
    <div class="container-xl py-6 bg-fifth-near-white">
      <!-- Use the CourseFilters component -->
      <CourseFilters
        ref="courseFiltersRef"
        :courses="dataStore.courses"
        :teachers="dataStore.teachers"
        @update:filteredCourses="updateFilteredCourses"
      />
      <!-- Results counter with clear button -->
      <div class="mb-4 flex items-center justify-between">
        <div class="text-gray-600">
          <template v-if="filteredCourses.length === dataStore.courses.length">
            {{ dataStore.courses.length }} courses found
          </template>
          <template v-else>
            {{ filteredCourses.length }} of {{ dataStore.courses.length }}
            {{ filteredCourses.length === 1 ? "course" : "courses" }} shown
          </template>
          <!-- {{ Object.values(groupedCourses).flat().length }} courses found -->
        </div>
        <button
          @click="clearFilters"
          :class="{
            'px-4 py-2 text-white rounded-md transition-colors text-sm flex items-center gap-1': true,
            'bg-first-purple':
              filteredCourses.length !== dataStore.courses.length,
            'bg-gray-400': filteredCourses.length === dataStore.courses.length,
          }"
        >
          <Icon name="material-symbols:filter-alt-off" class="h-4 w-4" />
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Courses grouped by date -->
    <div class="container-xl py-8 bg-near-white-tan">
      <div
        v-if="Object.keys(groupedCourses).length === 0"
        class="text-center py-12 flex flex-col items-center justify-center"
      >
        <h3 class="text-xl text-gray-600 mb-4">
          No courses match your filters
        </h3>
        <button
          @click="clearFilters"
          class="px-4 py-2 bg-first-purple text-white rounded-md hover:bg-second-green transition-colors text-sm flex items-center gap-1"
        >
          <Icon name="material-symbols:filter-alt-off" class="h-4 w-4" />
          Clear Filters
        </button>
      </div>
      <div v-else>
        <div
          v-for="(courses, monthYear) in groupedCourses"
          :key="monthYear"
          class="mb-10"
        >
          <h3 class="text-xl font-bold text-first-purple mb-4">
            Beginning in {{ monthYear }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="course in courses"
              :key="course.id"
              class="flex flex-col h-full"
            >
              <CourseCard
                :course="course"
                :active-slide="true"
                class="h-full flex-grow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
