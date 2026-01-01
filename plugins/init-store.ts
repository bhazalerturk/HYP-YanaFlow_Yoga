// TypeScript version of the init-store plugin
import { fetchAllData } from "~/composables/useDataApi";
import { useDataStore } from "~/store/data";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Get Supabase client and store
  const client = useSupabaseClient();
  const dataStore = useDataStore();

  // Only fetch data if it's not already initialized
  if (!dataStore.isInitialized) {
    try {
      console.log("⚙️ Initializing data store on first page load");
      // Cast client to any to bypass type checking temporarily
      await fetchAllData(client as any);
      dataStore.setInitialized(true);
      console.log("✅ Data store initialized successfully");
    } catch (error) {
      console.error("❌ Error initializing data store:", error);
    }
  }
});
