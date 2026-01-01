<script setup lang="ts">
import { useDataLoading } from "~/composables/useDataLoading";
import type { Teacher } from "~/types";

// Set SEO metadata for the teachers page
useHead({
  title: "Our Yoga Teachers",
  meta: [
    {
      name: "description",
      content:
        "Meet our experienced and certified yoga teachers. Learn about their unique approaches, specialties, and backgrounds.",
    },
    {
      name: "keywords",
      content:
        "yoga teachers, yoga instructors, certified yoga teachers, yoga experts, yoga professionals",
    },
    {
      property: "og:title",
      content: "Our Yoga Teachers - YANA FLOW Yoga Center",
    },
    {
      property: "og:description",
      content:
        "Get to know our passionate team of experienced yoga teachers who will guide you through your practice.",
    },
    { property: "og:type", content: "website" },
  ],
});

// Access the data store with loading state
const { isLoading, dataStore } = useDataLoading();
</script>

<template>
  <!-- Loading state -->
  <LoadingSpinner v-if="isLoading" message="Loading teachers..." />

  <!-- Teachers page content -->
  <div v-else class="relative">
    <CoverImage :title="'Teachers'" />

    <!-- Teachers sections -->
    <div class="container-xl bg-near-white-tan py-16">
      <div class="container mx-auto px-4 space-y-16">
        <div
          v-for="(teacher, index) in dataStore.teachers"
          :key="teacher.id"
          class="py-8"
        >
          <TeacherCard
            :teacher="teacher"
            :fullWidth="true"
            :imagePosition="index % 2 === 0 ? 'left' : 'right'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
