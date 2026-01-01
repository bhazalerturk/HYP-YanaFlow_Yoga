// TypeScript version of the data store
import { defineStore } from "pinia";
import type { Teacher, Course, Event } from "~/types";

interface DataState {
  courses: Course[];
  teachers: Teacher[];
  events: Event[];
  isInitialized: boolean;
}

export const useDataStore = defineStore("data", {
  state: (): DataState => ({
    courses: [],
    teachers: [],
    events: [],
    isInitialized: false,
  }),
  actions: {
    setCourses(courses: Course[]) {
      this.courses = courses;
    },
    setTeachers(teachers: Teacher[]) {
      this.teachers = teachers;
    },
    setEvents(events: Event[]) {
      this.events = events;
    },
    setInitialized(status: boolean) {
      this.isInitialized = status;
    },
  },
});
