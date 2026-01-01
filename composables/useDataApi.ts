// TypeScript version of the data API module
import { useDataStore } from "~/store/data";
import type { Teacher, Course, Event, CourseSchedule } from "~/types";

function slugify(text: string): string {
  return text.toString().toLowerCase().replace(/\s+/g, "-"); // Replace spaces with -
}

// Generic interface for Supabase client to avoid type issues
interface SupabaseClient {
  from: (table: string) => {
    select: (query: string) => any;
  };
}

interface CourseTeacherRelation {
  course_id: number;
  teacher_id: number;
}

interface EventTeacherRelation {
  event_id: number;
  teacher_id: number;
}

export async function fetchAllData(supabase: SupabaseClient) {
  console.log("Fetching all data from Supabase...");
  const dataStore = useDataStore();

  // If already initialized, don't fetch again
  if (dataStore.isInitialized) {
    console.log("Data already loaded, skipping fetch");
    return;
  }

  // Fetch all tables sequentially
  const coursesRes = await supabase.from("courses").select("*");
  if (coursesRes.error) throw coursesRes.error;
  const teachersRes = await supabase.from("teachers").select("*");
  if (teachersRes.error) throw teachersRes.error;
  const courseTeacherRes = await supabase.from("course_teacher").select("*");
  if (courseTeacherRes.error) throw courseTeacherRes.error;
  const courseScheduleRes = await supabase.from("course_schedule").select("*");
  if (courseScheduleRes.error) throw courseScheduleRes.error;
  const eventsRes = await supabase.from("events").select("*");
  if (eventsRes.error) throw eventsRes.error;
  const eventsTeachersRes = await supabase.from("events_teachers").select("*");
  if (eventsTeachersRes.error) throw eventsTeachersRes.error; // Process raw data
  const courses: Course[] = coursesRes.data || [];
  const teachers: Teacher[] = teachersRes.data || [];
  const courseTeacher: CourseTeacherRelation[] = courseTeacherRes.data || [];
  const courseSchedule: CourseSchedule[] = courseScheduleRes.data || [];
  const events: Event[] = eventsRes.data || [];
  const eventsTeachers: EventTeacherRelation[] = eventsTeachersRes.data || [];

  // STEP 1: Process and sort base arrays first - this ensures paths are ready before attaching to relations
  // Sort base arrays
  teachers.sort((a, b) => a.id - b.id);
  courses.sort((a, b) => a.id - b.id);
  events.sort((a, b) => {
    if (a.starts_at && b.starts_at) {
      return new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime();
    }
    return a.id - b.id;
  });

  // Step 2: Add paths to the teachers
  teachers.forEach((teacher) => {
    teacher.path = `${slugify(teacher.first_name)}-${slugify(
      teacher.last_name
    )}`;
  });

  // Step 3: Add paths to the courses
  courses.forEach((course) => {
    course.path = slugify(course.title);
  });

  // Step 3: Add paths to the events and ensure equipment is an array
  events.forEach((event) => {
    event.path = slugify(event.title);

    // Ensure equipment is always an array
    if (event.equipment && typeof event.equipment === "string") {
      event.equipment = (event.equipment as unknown as string)
        .split(",")
        .map((item) => item.trim());
    } else if (!event.equipment) {
      event.equipment = [];
    }
  });

  // STEP 4: Now that all base objects have paths and are properly formatted, create the relationships

  // Merge teachers with their courses and events
  const teachersWithRelations = teachers.map((teacher) => {
    const teacherCourses = courseTeacher
      .filter((ct) => ct.teacher_id === teacher.id)
      .map((ct) => courses.find((c) => c.id === ct.course_id))
      .filter(Boolean) as Course[];

    const teacherEvents = eventsTeachers
      .filter((et) => et.teacher_id === teacher.id)
      .map((et) => events.find((e) => e.id === et.event_id))
      .filter(Boolean) as Event[];

    // Sort teacher events by start date
    teacherEvents.sort((a, b) => {
      if (a.starts_at && b.starts_at) {
        return (
          new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
        );
      }
      return a.id - b.id;
    });

    // Teacher path already assigned earlier, but included here for reference
    // const teacherPath = `${slugify(teacher.first_name)}-${slugify(teacher.last_name)}`;

    // Ensure each teacher has required fields
    let bio = teacher.bio;
    if (!bio) {
      // Generate a placeholder bio if not present in database
      bio = `${teacher.first_name} ${
        teacher.last_name
      } is a certified yoga instructor from ${
        teacher.origin_country
      }. With a passion for teaching and helping others discover the benefits of yoga, ${
        teacher.first_name
      } specializes in ${
        teacherCourses.length > 0
          ? teacherCourses.map((c) => c.title).join(", ")
          : "various yoga styles"
      }. Join ${
        teacher.first_name
      }'s classes to experience a transformative practice that nurtures both body and mind.`;
    }

    // Add instagram tag if not present
    const instaTag =
      teacher.insta_tag ||
      `@${teacher.first_name.toLowerCase()}.${teacher.last_name.toLowerCase()}.yoga`;

    // Add teacher quote if not present
    const quote =
      teacher.quote ||
      "I believe movement is a celebration, not a performance. Every breath you take on the mat is a reminder that you're alive, worthy, and already enough. My hope is that each class gives you space to explore, express, and come home to yourself — no pressure, just presence.";

    // Generate featured_in array if not present
    const featured_in = teacher.featured_in || [
      `${Math.floor(Math.random() * 100) + 50} Classes`,
      `${Math.floor(Math.random() * 30) + 5} Events`,
      `${Math.floor(Math.random() * 15) + 1} Retreats`,
      `${Math.floor(Math.random() * 20) + 5} Articles`,
    ];
    return {
      ...teacher,
      courses: teacherCourses,
      events: teacherEvents,
      bio: bio,
      insta_tag: instaTag,
      quote: quote,
      featured_in: featured_in,
    } as Teacher;
  });

  // STEP 5: Create course relationships using the already processed base data
  // Merge courses with their teachers and schedule
  const coursesWithRelations = courses.map((course) => {
    const courseTeachers = courseTeacher
      .filter((ct) => ct.course_id === course.id)
      .map((ct) => teachers.find((t) => t.id === ct.teacher_id))
      .filter(Boolean) as Teacher[];

    const schedule = courseSchedule.filter((cs) => cs.course_id === course.id);

    return {
      ...course,
      teachers: courseTeachers,
      schedule,
    } as Course;
  });

  // Calculate total duration (in days) for each course based on start_date, end_date, and schedule weekdays
  coursesWithRelations.forEach((course) => {
    if (!course.start_date || !course.end_date || !course.schedule?.length) {
      course.courseDuration = 0;
      course.courseDurationUnit = "days";
      return;
    }

    const start = new Date(course.start_date);
    const end = new Date(course.end_date);
    let days = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days++;
    }

    if (days >= 7) {
      course.courseDuration = Math.ceil(days / 7);
      course.courseDurationUnit = "weeks";
    } else {
      course.courseDuration = days;
      course.courseDurationUnit = "days";
    }

    // Calculate individual class length in minutes based on schedule
    if (course.schedule && course.schedule.length > 0) {
      // Find the first schedule entry with valid times
      const scheduleEntry = course.schedule.find(
        (entry) => entry.start_time && entry.end_time
      );

      if (scheduleEntry) {
        const startTime = new Date(
          `1970-01-01T${scheduleEntry.start_time.replace("+00", "Z")}`
        );
        const endTime = new Date(
          `1970-01-01T${scheduleEntry.end_time.replace("+00", "Z")}`
        );

        // Calculate duration in minutes
        const durationMs = endTime.getTime() - startTime.getTime();
        const durationMinutes = Math.round(durationMs / (1000 * 60));
        course.class_length = durationMinutes;
        course.class_length_formatted = `${durationMinutes} min`;
      }
    }
  });

  // STEP 6: Create event relationships using the already processed base data
  // Merge events with their teachers
  const eventsWithRelations = events.map((event) => {
    const eventTeachers = eventsTeachers
      .filter((et) => et.event_id === event.id)
      .map((et) => teachers.find((t) => t.id === et.teacher_id))
      .filter(Boolean) as Teacher[];

    // Process equipment array (redundant safety check)
    if (event.equipment && typeof event.equipment === "string") {
      event.equipment = (event.equipment as unknown as string)
        .split(",")
        .map((item) => item.trim());
    } else if (!event.equipment) {
      event.equipment = [];
    }
    return { ...event, teachers: eventTeachers } as Event;
  });

  // STEP 7: Store all processed data with relationships in Pinia state management
  // Store in Pinia
  dataStore.setCourses(coursesWithRelations);
  dataStore.setTeachers(teachersWithRelations);
  if (dataStore.setEvents) dataStore.setEvents(eventsWithRelations);

  return {
    courses: coursesWithRelations,
    teachers: teachersWithRelations,
    events: eventsWithRelations,
  };
}
