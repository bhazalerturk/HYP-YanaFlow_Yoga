<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

// Props to receive data from parent
const props = defineProps({
  courses: {
    type: Array,
    required: true,
  },
  teachers: {
    type: Array,
    required: true,
  },
});

// Emits to send filtered results back to parent
const emit = defineEmits(["update:filteredCourses"]);

// Filter states
const searchTerm = ref("");
const selectedLevel = ref("");
const selectedEquipment = ref([]);
const selectedTeachers = ref([]);
const selectedLength = ref("");
const showTrendingOnly = ref(false);

// UI states
const teacherDropdownOpen = ref(false);
const levelDropdownOpen = ref(false);
const durationDropdownOpen = ref(false);
const filtersVisible = ref(true); // Track if filters are visible

// Dynamically get levels from courses
const levels = computed(() => {
  const levelsSet = new Set();
  props.courses.forEach((course) => {
    if (course.level && course.level !== "All Levels") {
      levelsSet.add(course.level);
    }
  });

  // Define the order of levels
  const levelOrder = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
  };

  // Sort levels by predefined order
  return Array.from(levelsSet).sort((a, b) => {
    const orderA = levelOrder[a] || 999; // Default high value for unknown levels
    const orderB = levelOrder[b] || 999;
    return orderA - orderB;
  });
});

// Dynamically get equipment from courses
const equipmentList = computed(() => {
  const equipmentSet = new Set();
  props.courses.forEach((course) => {
    try {
      // Handle equipment as a JSON string
      if (typeof course.equipment === "string") {
        const parsedEquipment = JSON.parse(course.equipment);
        if (Array.isArray(parsedEquipment)) {
          parsedEquipment.forEach((item) => equipmentSet.add(item));
        }
      }
      // Handle equipment as array
      else if (course.equipment && Array.isArray(course.equipment)) {
        course.equipment.forEach((item) => equipmentSet.add(item));
      }
    } catch (e) {
      console.error("Error parsing equipment:", e);
    }
  });
  return Array.from(equipmentSet).sort();
});

// Get teacher data with images from all courses
const teachersData = computed(() => {
  // Use the teachers directly from props without transformation
  return props.teachers.sort((a, b) =>
    `${a.first_name} ${a.last_name}`.localeCompare(
      `${b.first_name} ${b.last_name}`
    )
  );
});

// Process courses to add class_length based on schedule
const processedCourses = computed(() => {
  return props.courses.map((course) => {
    const processedCourse = { ...course };

    // Ensure level is defined
    if (processedCourse.level === undefined || processedCourse.level === null) {
      processedCourse.level = "";
    }

    // Parse equipment if it's a string
    if (typeof course.equipment === "string") {
      try {
        processedCourse.parsedEquipment = JSON.parse(course.equipment);
        // Keep original for compatibility
        processedCourse.equipment = course.equipment;
      } catch (e) {
        processedCourse.parsedEquipment = [];
      }
    } else if (Array.isArray(course.equipment)) {
      processedCourse.parsedEquipment = course.equipment;
    } else {
      processedCourse.parsedEquipment = [];
    }

    return processedCourse;
  });
});

// Duration options for class length
const durations = ["30 min or less", "30-60 min", "60-90 min", "90+ min"];

// Filter courses based on all criteria
const filteredCourses = computed(() => {
  return processedCourses.value.filter((course) => {
    // Filter by search term (title)
    if (
      searchTerm.value &&
      !course.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    ) {
      return false;
    } // Filter by level
    if (selectedLevel.value && course.level !== selectedLevel.value) {
      return false;
    }
    // Filter by equipment
    if (selectedEquipment.value.length > 0) {
      let courseEquipment = [];

      // Handle equipment as JSON string
      if (typeof course.equipment === "string") {
        try {
          courseEquipment = JSON.parse(course.equipment);
        } catch (e) {
          courseEquipment = [];
        }
      }
      // Handle equipment as array
      else if (Array.isArray(course.equipment)) {
        courseEquipment = course.equipment;
      }
      // Check if course has at least one of the selected equipment items
      if (!selectedEquipment.value.some((eq) => courseEquipment.includes(eq))) {
        return false;
      }
    } // Filter by teachers (multiple selection)
    if (selectedTeachers.value.length > 0) {
      const hasSelectedTeacher = course.teachers?.some((teacher) => {
        return selectedTeachers.value.some(
          (selectedTeacher) => selectedTeacher.id === teacher.id
        );
      });

      if (!hasSelectedTeacher) {
        return false;
      }
    } // Filter by class length
    if (selectedLength.value) {
      const durationMinutes = course.class_length || 0;

      switch (selectedLength.value) {
        case "30 min or less":
          if (durationMinutes > 30) return false;
          break;
        case "30-60 min":
          if (durationMinutes < 30 || durationMinutes > 60) return false;
          break;
        case "60-90 min":
          if (durationMinutes < 60 || durationMinutes > 90) return false;
          break;
        case "90+ min":
          if (durationMinutes <= 90) return false;
          break;
      }
    }

    // Filter by trending status
    if (showTrendingOnly.value && !course.trending) {
      return false;
    }

    return true;
  });
});

// Add watchers to ensure filter changes trigger events
watch(
  [
    searchTerm,
    selectedLevel,
    selectedEquipment,
    selectedTeachers,
    selectedLength,
    showTrendingOnly,
  ],
  () => {
    // Directly emit the current filtered courses
    emitFilteredCourses();
  },
  { deep: true }
);

// Helper function to emit filtered courses
const emitFilteredCourses = () => {
  // Get the current filtered courses
  const filtered = filteredCourses.value;
  // Emit to parent
  emit("update:filteredCourses", filtered);
};

// Toggle equipment selection
const toggleEquipment = (item) => {
  const index = selectedEquipment.value.indexOf(item);
  if (index === -1) {
    selectedEquipment.value.push(item);
  } else {
    selectedEquipment.value.splice(index, 1);
  }
};

// Toggle teacher selection
const toggleTeacher = (teacher) => {
  const index = selectedTeachers.value.findIndex((t) => t.id === teacher.id);
  if (index === -1) {
    selectedTeachers.value.push(teacher);
  } else {
    selectedTeachers.value.splice(index, 1);
  }
};

// Remove teacher from selection
const removeTeacher = (teacher) => {
  const index = selectedTeachers.value.findIndex((t) => t.id === teacher.id);
  if (index !== -1) {
    selectedTeachers.value.splice(index, 1);
  }
};

// Check if teacher is selected
const isTeacherSelected = (teacher) => {
  return selectedTeachers.value.some((t) => t.id === teacher.id);
};

// Close dropdown when clicking outside
const closeDropdowns = (event) => {
  // Handle teacher dropdown
  const isClickInsideTeacherDropdown = event.target.closest(
    "[data-teacher-dropdown]"
  );
  if (!isClickInsideTeacherDropdown) {
    teacherDropdownOpen.value = false;
  }

  // Handle level dropdown
  const isClickInsideLevelDropdown = event.target.closest(
    "[data-level-dropdown]"
  );
  if (!isClickInsideLevelDropdown) {
    levelDropdownOpen.value = false;
  }

  // Handle duration dropdown
  const isClickInsideDurationDropdown = event.target.closest(
    "[data-duration-dropdown]"
  );
  if (!isClickInsideDurationDropdown) {
    durationDropdownOpen.value = false;
  }
};

// Add event listener for clicks outside dropdown
onMounted(() => {
  document.addEventListener("click", closeDropdowns);

  // Emit initial filtered courses
  emitFilteredCourses();
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdowns);
});

// Clear all filters
const clearFilters = () => {
  searchTerm.value = "";
  selectedLevel.value = "";
  selectedEquipment.value = [];
  selectedTeachers.value = [];
  selectedLength.value = "";
  showTrendingOnly.value = false;

  // Explicitly emit all courses after clearing filters
  emitFilteredCourses();
};

// Expose filter results and methods for parent component
defineExpose({
  filteredCourses,
  clearFilters,
  showTrendingOnly,
});
</script>

<template>
  <!-- Filters section -->
  <div class="mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl text-second-green">Find Your Perfect Course</h2>
      <button
        @click="filtersVisible = !filtersVisible"
        class="flex items-center gap-2 bg-transparent hover:bg-gray-100 text-gray-700 px-3 py-1 rounded-md border border-gray-300 transition-colors"
      >
        <span>{{ filtersVisible ? "Hide Filters" : "Show Filters" }}</span>
        <Icon
          name="material-symbols:chevron-left"
          class="h-5 w-5 transition-transform duration-300"
          :class="{
            'rotate-90': filtersVisible,
            '-rotate-90': !filtersVisible,
          }"
        />
      </button>
    </div>

    <!-- Search bar - always visible -->
    <div class="mb-4 relative">
      <label
        for="search"
        class="block text-sm font-medium text-gray-700 mb-1 flex items-center"
        ><Icon name="carbon:search" class="h-4 w-4 mr-1" />Search Courses</label
      >
      <div class="relative">
        <input
          id="search"
          v-model="searchTerm"
          type="text"
          placeholder="Search by course name..."
          class="w-full p-2 border border-gray-300 rounded-md text-gray-700"
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
    <!-- Collapsible filters section -->
    <div v-if="filtersVisible" class="transition-all duration-300">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Level filter -->
        <div data-level-dropdown>
          <label
            for="level"
            class="block text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <Icon name="carbon:skill-level" class="h-4 w-4 mr-1" />
            Level
          </label>
          <div class="relative">
            <div
              class="w-full p-2 border border-gray-300 rounded-md pr-8 cursor-pointer flex items-center"
              @click="levelDropdownOpen = !levelDropdownOpen"
              :class="{
                'border-second-green': selectedLevel,
              }"
            >
              <span
                v-if="selectedLevel"
                class="flex-grow text-second-green flex items-center gap-1"
              >
                <Icon
                  :name="
                    selectedLevel.toLowerCase() === 'beginner'
                      ? 'carbon:skill-level-basic'
                      : selectedLevel.toLowerCase() === 'intermediate'
                      ? 'carbon:skill-level-intermediate'
                      : selectedLevel.toLowerCase() === 'advanced'
                      ? 'carbon:skill-level-advanced'
                      : 'carbon:skill-level'
                  "
                  class="h-4 w-4"
                />{{ selectedLevel }}</span
              ><span v-else class="text-gray-500"> All Levels </span>
              <div
                class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <Icon
                  name="material-symbols:chevron-left"
                  class="h-5 w-5 text-gray-500 transition-transform duration-300"
                  :class="{
                    'rotate-90': levelDropdownOpen,
                    '-rotate-90': !levelDropdownOpen,
                  }"
                />
              </div>
            </div>
            <!-- Dropdown -->
            <div
              v-if="levelDropdownOpen"
              class="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-auto mt-1"
            >
              <div
                @click="
                  selectedLevel = '';
                  levelDropdownOpen = false;
                "
                class="p-2 hover:bg-gray-100 cursor-pointer"
                :class="selectedLevel === '' ? 'bg-gray-100' : ''"
              >
                All Levels
              </div>
              <div
                v-for="level in levels"
                :key="level"
                @click="
                  selectedLevel = level;
                  levelDropdownOpen = false;
                "
                class="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-1"
                :class="selectedLevel === level ? 'bg-gray-100' : ''"
              >
                <Icon
                  :name="
                    level.toLowerCase() === 'beginner'
                      ? 'carbon:skill-level-basic'
                      : level.toLowerCase() === 'intermediate'
                      ? 'carbon:skill-level-intermediate'
                      : level.toLowerCase() === 'advanced'
                      ? 'carbon:skill-level-advanced'
                      : 'carbon:skill-level'
                  "
                  class="h-4 w-4"
                />{{ level }}
              </div>
            </div>
          </div>
        </div>

        <!-- Teacher filter with multi-select and images -->
        <div data-teacher-dropdown>
          <label
            class="block text-sm font-medium text-gray-700 mb-1 flex items-center"
            ><Icon name="carbon:user" class="h-4 w-4 mr-1" />Teachers</label
          >
          <div class="relative">
            <div
              class="w-full p-2 border border-gray-300 rounded-md min-h-[40px] cursor-pointer flex flex-wrap gap-1 pr-8"
              @click="teacherDropdownOpen = !teacherDropdownOpen"
              :class="{
                'border-second-green': selectedTeachers.length > 0,
                'text-second-green': selectedTeachers.length > 0,
              }"
            >
              <div
                v-if="selectedTeachers.length === 0"
                class="flex-grow text-gray-500"
              >
                All Teachers
              </div>
              <div
                v-for="teacher in selectedTeachers"
                :key="teacher.id"
                class="flex items-center bg-second-green text-white rounded-full px-2 py-1 text-xs"
              >
                <img
                  v-if="teacher.image_url"
                  :src="teacher.image_url"
                  :alt="`${teacher.first_name} ${teacher.last_name}`"
                  class="w-4 h-4 rounded-full mr-1 object-cover"
                />
                <span>{{ teacher.first_name }}</span>

                <Icon
                  name="material-symbols:cancel"
                  class="ms-1 h-3 w-3"
                  @click.stop="removeTeacher(teacher)"
                />
              </div>
              <div
                class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <Icon
                  name="material-symbols:chevron-left"
                  class="h-5 w-5 text-gray-500 transition-transform duration-300"
                  :class="{
                    'rotate-90': teacherDropdownOpen,
                    '-rotate-90': !teacherDropdownOpen,
                  }"
                />
              </div>
            </div>

            <!-- Dropdown -->
            <div
              v-if="teacherDropdownOpen"
              class="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-auto mt-1"
            >
              <div
                @click.stop="
                  selectedTeachers = [];
                  teacherDropdownOpen = false;
                "
                class="p-2 hover:bg-gray-100 cursor-pointer"
                :class="selectedTeachers.length === 0 ? 'bg-gray-100' : ''"
              >
                All Teachers
              </div>
              <div
                v-for="teacher in teachersData"
                :key="teacher.id"
                @click.stop="toggleTeacher(teacher)"
                class="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                :class="isTeacherSelected(teacher) ? 'bg-gray-100' : ''"
              >
                <div class="flex-shrink-0 mr-2">
                  <img
                    v-if="teacher.image_url"
                    :src="teacher.image_url"
                    :alt="`${teacher.first_name} ${teacher.last_name}`"
                    class="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                  <div
                    v-else
                    class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300"
                  >
                    <span class="text-gray-500 text-xs font-semibold"
                      >{{ teacher.first_name.charAt(0)
                      }}{{ teacher.last_name.charAt(0) }}</span
                    >
                  </div>
                </div>
                <span class="ml-2"
                  >{{ teacher.first_name }} {{ teacher.last_name }}</span
                >
                <div v-if="isTeacherSelected(teacher)" class="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-second-green"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Class length filter -->
        <div data-duration-dropdown>
          <label
            for="length"
            class="block text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <Icon name="carbon:timer" class="h-4 w-4 mr-1" />
            Lesson Duration
          </label>
          <div class="relative">
            <div
              class="w-full p-2 border border-gray-300 rounded-md pr-8 cursor-pointer flex items-center"
              @click="durationDropdownOpen = !durationDropdownOpen"
              :class="{
                'border-second-green': selectedLength,
              }"
            >
              <span class="flex-grow" v-if="selectedLength">{{
                selectedLength
              }}</span>
              <span v-else class="text-gray-500"> Any Duration </span>
              <div
                class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <Icon
                  name="material-symbols:chevron-left"
                  class="h-5 w-5 text-gray-500 transition-transform duration-300"
                  :class="{
                    'rotate-90': durationDropdownOpen,
                    '-rotate-90': !durationDropdownOpen,
                  }"
                />
              </div>
            </div>
            <select id="length" v-model="selectedLength" class="hidden">
              <option value="">Any Duration</option>
              <option
                v-for="duration in durations"
                :key="duration"
                :value="duration"
              >
                {{ duration }}
              </option>
            </select>
            <!-- Dropdown -->
            <div
              v-if="durationDropdownOpen"
              class="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-auto mt-1"
            >
              <div
                @click="
                  selectedLength = '';
                  durationDropdownOpen = false;
                "
                class="p-2 hover:bg-gray-100 cursor-pointer"
                :class="selectedLength === '' ? 'bg-gray-100' : ''"
              >
                Any Duration
              </div>
              <div
                v-for="duration in durations"
                :key="duration"
                @click="
                  selectedLength = duration;
                  durationDropdownOpen = false;
                "
                class="p-2 hover:bg-gray-100 cursor-pointer"
                :class="selectedLength === duration ? 'bg-gray-100' : ''"
              >
                {{ duration }}
              </div>
            </div>
          </div>
        </div>
        <!-- Trending filter -->
        <div>
          <label
            for="trending"
            class="block text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <Icon
              name="material-symbols:trending-up"
              class="h-4 w-4 mr-1 text-second-green"
            />
            Trending Courses
          </label>
          <div class="flex items-center h-[40px] px-2">
            <label class="w-11 h-6 relative inline-block cursor-pointer">
              <input
                type="checkbox"
                id="trending"
                v-model="showTrendingOnly"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-second-green peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-second-green"
              ></div>
            </label>
          </div>
        </div>
      </div>
      <!-- Equipment filter -->
      <div class="mt-4">
        <label
          class="block text-sm font-medium text-gray-700 mb-1 flex items-center"
          ><Icon name="carbon:tools" class="h-4 w-4 mr-1" />Equipment</label
        >
        <div class="flex flex-wrap gap-2">
          <div
            v-for="item in equipmentList"
            :key="item"
            @click="toggleEquipment(item)"
            class="px-3 py-1 rounded-full text-sm transition-colors flex items-center cursor-pointer"
            :class="
              selectedEquipment.includes(item)
                ? 'bg-second-green text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
          >
            <span>{{ item }}</span>
            <Icon
              name="material-symbols:cancel"
              class="ms-1 h-3 w-3"
              v-if="selectedEquipment.includes(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
