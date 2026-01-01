# TypeScript Implementation in HYP-YOGA

This document outlines the TypeScript integration in the HYP-YOGA project.

## Type Definitions

All shared type definitions are located in the `types/index.ts` file, including:

- `Teacher`: Interface for teacher data
- `Course`: Interface for course data
- `Event`: Interface for event data
- `CourseSchedule`: Interface for course schedule data

## TypeScript Files

The following files have been converted to TypeScript:

- `composables/useDataApi.ts`: Data fetching logic
- `composables/useDataLoading.ts`: Loading state management
- `composables/useRandomImage.ts`: Random image utilities
- `store/data.ts`: Pinia store with proper typing
- `plugins/init-store.ts`: Data initialization plugin

## Components with TypeScript

The following Vue components now use TypeScript:

- `components/TeacherCard.vue`
- `components/LoadingSpinner.vue`
- `pages/teachers/[teacher].vue`
- `pages/teachers/index.vue`

## Best Practices

When working with TypeScript in this project:

1. Import types using the `import type` syntax:

   ```typescript
   import type { Teacher, Course } from "~/types";
   ```

2. Define Vue component props with proper typing:

   ```typescript
   const props = defineProps({
     teacher: {
       type: Object as PropType<Teacher>,
       required: true,
     },
   });
   ```

3. Use typed refs to ensure proper type checking:

   ```typescript
   const teacher = ref<Teacher | null>(null);
   ```

4. When handling DOM events, use proper type casting:
   ```typescript
   @error="(e: Event) => {
     const target = e.target as HTMLImageElement;
     if (target) target.src = '/images/covers/cover_1.jpg';
   }"
   ```

## Future Improvements

To further enhance TypeScript integration:

1. Convert remaining JavaScript files to TypeScript
2. Add more specific type definitions for Supabase interactions
3. Implement stricter TypeScript configurations in tsconfig.json
4. Add TypeScript validation to CI/CD pipelines
