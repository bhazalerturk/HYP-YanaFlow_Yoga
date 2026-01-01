<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useDataLoading } from "~/composables/useDataLoading";
import { useRoute } from "vue-router";

// Set SEO metadata for the events page
useHead({
  title: "Yoga Events & Workshops",
  meta: [
    {
      name: "description",
      content:
        "Join our special yoga events, workshops, and retreats. Experience unique opportunities to deepen your practice and connect with our community.",
    },
    {
      name: "keywords",
      content:
        "yoga events, yoga workshops, yoga retreats, meditation workshops, yoga community, wellness events",
    },
    {
      property: "og:title",
      content: "Yoga Events & Workshops - YANA FLOW Yoga Center",
    },
    {
      property: "og:description",
      content:
        "Discover upcoming yoga workshops, special events, and community gatherings. Join us for transformative experiences.",
    },
    { property: "og:type", content: "website" },
  ],
});

// Access the data store with loading state
const { isLoading, dataStore } = useDataLoading();

// Get the route to access query parameters
const route = useRoute();

// Filter states
const searchTerm = ref("");
const showLikedOnly = ref(false);

// Store filtered events
const filteredItems = ref([]);

// Check if liked parameter is present
const isMostLiked = computed(() => {
  return route.query.mostLiked === "true";
});

// Apply filters to events
const applyFilters = () => {
  let filtered = [...dataStore.events];

  // Filter by search term
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        event.title.toLowerCase().includes(term) ||
        (event.description && event.description.toLowerCase().includes(term)) ||
        (event.short_description &&
          event.short_description.toLowerCase().includes(term)) ||
        (event.location && event.location.toLowerCase().includes(term))
    );
  }

  // Filter by liked
  if (showLikedOnly.value) {
    filtered = filtered.filter((event) => event.most_liked);
  }

  // Assign the filtered events
  filteredItems.value = filtered;
};

// Watch for changes in the liked URL parameter and search term
watch(
  () => route.query.mostLiked,
  (newValue) => {
    if (newValue === "true") {
      showLikedOnly.value = true;
      applyFilters();
    }
  },
  { immediate: true }
);

// Watch for changes in search term and apply filters
watch(searchTerm, () => {
  applyFilters();
});

// Sort events by date
const sortedEvents = computed(() => {
  return [...filteredItems.value].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });
});

// Initialize filtered events when component is mounted
onMounted(() => {
  // Initialize with all events
  filteredItems.value = dataStore.events;

  // Apply liked filter from URL if present
  if (isMostLiked.value) {
    showLikedOnly.value = true;
    applyFilters();
  }
});

// Clear all filters
const clearFilters = () => {
  searchTerm.value = "";
  showLikedOnly.value = false;
  applyFilters();
};
</script>

<template>
  <!-- Loading state -->
  <LoadingSpinner v-if="isLoading" message="Loading events..." />

  <!-- Events content -->
  <div v-else class="bg-near-white-tan min-h-screen">
    <CoverImage :title="'Events'" />
    <!-- Filters and content layout -->
    <div class="container-xl py-6">
      <!-- Simple inline filters -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <!-- Search input -->
          <div class="w-full md:flex-1 relative">
            <div class="relative">
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search events..."
                class="w-full p-3 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-second-green focus:border-transparent"
                :class="{
                  'border-second-green': searchTerm,
                  'text-second-green': searchTerm,
                }"
              />
              <span
                class="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                v-if="searchTerm"
                @click="searchTerm = ''"
              >
                <Icon
                  name="material-symbols:cancel"
                  class="h-3 w-3"
                  aria-label="Clear search"
                />
              </span>
            </div>
          </div>

          <!-- Liked toggle -->
          <div class="flex items-center whitespace-nowrap">
            <label class="flex items-center gap-2 cursor-pointer">
              <div class="relative">
                <input
                  type="checkbox"
                  v-model="showLikedOnly"
                  class="sr-only peer"
                  @change="applyFilters"
                />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-second-green peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-second-green"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-700 flex items-center">
                <Icon
                  name="mdi:thumb-up"
                  class="mr-1 h-4 w-4 text-second-green"
                />
                Most Liked
              </span>
            </label>
          </div>
        </div>
      </div>
      <!-- Main content area -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <p class="text-gray-600 text-sm">
              <template v-if="filteredItems.length === dataStore.events.length">
                {{ dataStore.events.length }} events found
              </template>
              <template v-else>
                {{ filteredItems.length }} of {{ dataStore.events.length }}
                {{ filteredItems.length === 1 ? "event" : "events" }} shown
              </template>
            </p>
          </div>
          <div>
            <button
              @click="clearFilters"
              class="px-4 py-2 text-white rounded-md transition-colors text-sm flex items-center gap-1"
              :class="[
                filteredItems.length !== dataStore.events.length
                  ? 'bg-first-purple hover:bg-second-green'
                  : 'bg-gray-400 hover:bg-gray-500',
              ]"
            >
              <Icon name="material-symbols:filter-alt-off" class="h-4 w-4" />
              Clear Filters
            </button>
          </div>
        </div>

        <!-- No events message -->
        <div
          v-if="filteredItems.length === 0"
          class="bg-white rounded-lg shadow-md p-8 text-center"
        >
          <Icon
            name="mdi:calendar-blank"
            class="text-5xl text-gray-400 mb-4 mx-auto"
          />
          <h3 class="text-xl font-medium text-gray-700 mb-2">
            No events found
          </h3>
          <p class="text-gray-600">
            Try adjusting your search or check back later for new events.
          </p>
          <button
            @click="clearFilters"
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-first-purple hover:bg-second-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-first-purple"
          >
            <Icon name="material-symbols:filter-alt-off" class="mr-2 h-4 w-4" />
            Clear Filters
          </button>
        </div>

        <!-- Events list - displayed in a grid without grouping -->
        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard
              v-for="event in sortedEvents"
              :key="event.id"
              :event="event"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
