// Typed version of the useDataLoading composable
import { ref, computed, onMounted, watch } from "vue";
import type { Ref } from "vue";
import { useDataStore } from "~/store/data";
import type { Teacher, Course, Event } from "~/types";

// Define the shape of our data store
interface DataStore {
  teachers: Teacher[];
  courses: Course[];
  events?: Event[];
  isInitialized: boolean;
  setCourses: (courses: Course[]) => void;
  setTeachers: (teachers: Teacher[]) => void;
  setEvents?: (events: Event[]) => void;
}

/**
 * Composable for handling data loading states
 * @returns {Object} Object containing isLoading ref and dataStore
 */
export function useDataLoading() {
  const dataStore = useDataStore() as DataStore;
  const isLoading = ref<boolean>(true);

  onMounted(() => {
    if (dataStore.isInitialized) {
      isLoading.value = false;
    } else {
      // Set up a watcher to monitor when data is initialized
      const unwatch = watch(
        () => dataStore.isInitialized,
        (isInitialized) => {
          if (isInitialized) {
            isLoading.value = false;
            unwatch();
          }
        }
      );
    }
  });

  return {
    isLoading,
    dataStore,
  };
}
