<script setup>
import { useDataLoading } from "~/composables/useDataLoading";
import { computed } from "vue";
import "vue3-carousel/carousel.css";

// Set SEO metadata for the home page
useHead({
  title: "YANA FLOW Yoga Center",
  titleTemplate: "%s - Find Your Flow",
  meta: [
    {
      name: "description",
      content:
        "YANA FLOW Yoga Center offers a variety of yoga classes, workshops, and events for all levels. Join our community and discover the transformative power of yoga.",
    },
    {
      name: "keywords",
      content:
        "yoga, meditation, wellness, yoga classes, yoga studio, yoga center, mindfulness, yoga community",
    },
    { property: "og:title", content: "YANA FLOW Yoga Center - Find Your Flow" },
    {
      property: "og:description",
      content:
        "Join our yoga community and discover classes and events for all levels. Start your yoga journey with us today.",
    },
    { property: "og:image", content: "/images/landing_frame_1.png" },
    { property: "og:url", content: "https://yana-flow.com/" },
    { property: "og:type", content: "website" },
  ],
});

// Use our common loading composable
const { isLoading, dataStore } = useDataLoading();

// Function to construct carousel items from courses and events
const carouselImages = computed(() => {
  if (!dataStore.courses || !dataStore.events) return [];

  // Shuffle the courses and events to get random ones
  const shuffledCourses = [...dataStore.courses].sort(
    () => 0.5 - Math.random()
  );
  const shuffledEvents = [...dataStore.events].sort(() => 0.5 - Math.random());

  // Landing frame images
  const frameImages = [
    "/images/landing_frame_1.png",
    "/images/landing_frame_2.png",
    "/images/landing_frame_3.png",
    "/images/landing_frame_4.png",
    "/images/landing_frame_5.png",
  ];

  // Select up to 3 random courses
  const courseItems = shuffledCourses.slice(0, 3).map((course, index) => ({
    src: frameImages[index % frameImages.length],
    pretitle: "YOGA COURSE",
    title: course.title,
    subtitle: course.courseDuration
      ? `${course.courseDuration} ${(
          course.courseDurationUnit || "WEEK"
        ).toUpperCase()}${course.trending ? " · TRENDING" : ""}`
      : course.class_length_formatted || "",
    link: `/courses/${course.path}`,
  }));

  // Select up to 2 random events
  const eventItems = shuffledEvents.slice(0, 2).map((event, index) => ({
    src: frameImages[(index + 3) % frameImages.length],
    pretitle: "EVENT",
    title: event.title,
    subtitle: event.starts_at
      ? `${new Date(event.starts_at).getDate()} ${new Date(event.starts_at)
          .toLocaleString("en-US", { month: "short" })
          .toUpperCase()} ${new Date(event.starts_at)
          .getFullYear()
          .toString()
          .substr(2)}${event.most_liked ? " · LIMITED SPOTS" : ""}`
      : event.most_liked
      ? "LIMITED SPOTS"
      : "",
    link: `/events/${event.path || event.id}`,
  }));

  // Combine courses and events, alternating
  const combinedItems = [];
  const maxLength = Math.max(courseItems.length, eventItems.length);

  for (let i = 0; i < maxLength; i++) {
    if (courseItems[i]) combinedItems.push(courseItems[i]);
    if (eventItems[i]) combinedItems.push(eventItems[i]);
  }
  return combinedItems.length > 0
    ? combinedItems
    : [
        {
          src: "/images/landing_frame_1.png",
          pretitle: "YOGA COURSE",
          title: "Mastering the Basics: A Beginner's Journey into Yoga",
          subtitle: "6-WEEK SERIES",
          link: "/courses",
        },
        {
          src: "/images/landing_frame_2.png",
          pretitle: "EVENT",
          title: "Awaken & Flow: A Weekend Retreat for Mindful Living",
          subtitle: "MAY 25-26 · LIMITED SPOTS",
          link: "/events",
        },
        {
          src: "/images/landing_frame_3.png",
          pretitle: "YOGA COURSE",
          title: "Breathe & Align: Deepening Your Practice Through Pranayama",
          subtitle: "4-WEEK SERIES",
          link: "/courses",
        },
      ];
});
</script>

<template>
  <!-- Loading state -->
  <LoadingSpinner v-if="isLoading" message="Loading Yana Flow..." />
  <!-- Main content -->
  <div v-else class="min-h-[calc(100dvh-64px)] relative">
    <div
      class="w-full h-[calc(100dvh-64px)] flex items-center justify-center bg-black"
    >
      <LandingPageCarousel :images="carouselImages" :autoplay="true" />
    </div>
    <div class="bg-third-tan pt-16 px-8 sm:px-16 lg:px-32 w-full mx-auto pb-16">
      <div class="flex flex-col lg:flex-row justify-center items-center gap-16">
        <CircleImage
          src="/images/circles/most_liked_events.png"
          alt="Events"
          label="Our most liked<br>events"
          linkTo="/events?mostLiked=true"
        />
        <CircleImage
          src="/images/circles/trending_courses.jpg"
          alt="Trending Courses"
          label="Trending<br>Courses"
          linkTo="/courses?trending=true"
        />
      </div>
    </div>
    <div class="bg-light-second-green container-xl">
      <h2
        class="text-fourth-purple text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl"
      >
        Our Organisation Objective
      </h2>
      <div
        class="flex flex-col sm:flex-row flex-wrap justify-center items-center mt-8"
      >
        <div
          class="flex flex-col items-center w-full sm:w-1/2 md:w-1/5 max-w-xs"
        >
          <Icon
            name="mdi:meditation"
            class="text-4xl text-fourth-purple rounded-full"
          />
          <p
            class="mt-2 text-fourth-purple text-base sm:text-lg md:text-xl text-center"
          >
            Meditation
          </p>
        </div>
        <div
          class="flex flex-col items-center w-full sm:w-1/2 md:w-1/5 max-w-xs"
        >
          <Icon name="mdi:yoga" class="text-4xl text-fourth-purple" />
          <p
            class="mt-2 text-fourth-purple text-base sm:text-lg md:text-xl text-center"
          >
            Yoga
          </p>
        </div>
        <div
          class="flex flex-col items-center w-full sm:w-1/2 md:w-1/5 max-w-xs"
        >
          <Icon name="mdi:run" class="text-4xl text-fourth-purple" />
          <p
            class="mt-2 text-fourth-purple text-base sm:text-lg md:text-xl text-center"
          >
            Fitness
          </p>
        </div>
        <div
          class="flex flex-col items-center w-full sm:w-1/2 md:w-1/5 max-w-xs"
        >
          <Icon name="mdi:leaf" class="text-4xl text-fourth-purple" />
          <p
            class="mt-2 text-fourth-purple text-base sm:text-lg md:text-xl text-center"
          >
            Wellness
          </p>
        </div>
        <div
          class="flex flex-col items-center w-full sm:w-1/2 md:w-1/5 max-w-xs"
        >
          <Icon name="mdi:heart" class="text-4xl text-fourth-purple" />
          <p
            class="mt-2 text-fourth-purple text-base sm:text-lg md:text-xl text-center"
          >
            Health
          </p>
        </div>
      </div>
    </div>
    <div class="bg-near-white-tan pt-16 w-full mx-auto pb-16">
      <div class="container-xl py-0">
        <h2 class="font-bold mb-8">Courses</h2>
      </div>
      <CoursesCarousel />
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
    <!-- Teacher Section -->
    <div class="bg-second-green container-xl">
      <h2 class="text-3xl sm:text-4xl font-bold text-near-white-tan mb-8">
        Our Teachers
      </h2>
      <div
        class="flex flex-row flex-wrap gap-8 justify-center items-stretch px-4 xs:px-8 sm:px-16 md:px-0"
      >
        <TeacherCard v-for="teacher in dataStore.teachers" :teacher="teacher" />
      </div>
      <nuxt-link to="/teachers" class="flex justify-center mt-10 mb-6">
        <button
          class="bg-first-purple hover:bg-fourth-purple text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center gap-2 group"
        >
          Explore All Teachers
          <Icon
            name="material-symbols:arrow-forward-rounded"
            class="h-5 w-5 group-hover:translate-x-1 transition-transform"
          />
        </button>
      </nuxt-link>
    </div>
    <div
      class="grid lg:grid-cols-12 bg-first-purple container-xl gap-x-4 gap-y-10"
    >
      <div
        class="col-span-1 lg:col-span-8 bg-fifth-near-white rounded-2xl shadow-md p-6 px-12 flex flex-col justify-center shadow-lg border-2"
      >
        <h3 class="text-black text-2xl font-bold mb-8">Yana Flow Reviews</h3>
        <div class="grid grid-cols-12 gap-1 items-center">
          <template v-for="(review, i) in 5" :key="i">
            <div class="col-start-1 col-end-8 flex items-center">
              <span class="text-amber-400 font-bold w-6 text-center">
                {{ 5 - i }}
              </span>
              <div
                class="w-full bg-white rounded-full h-2.5 ml-4 flex items-center col-span-11"
              >
                <div
                  class="bg-second-green h-2.5 rounded-full"
                  :style="`width: ${Math.round(
                    85 * Math.exp(-0.8 * (5 - (5 - i)))
                  )}%`"
                ></div>
              </div>
            </div>
          </template>
          <div
            class="col-start-9 col-end-12 row-start-1 row-end-4 flex items-center justify-center"
          >
            <span class="text-black text-7xl font-bold">4.8</span>
          </div>
          <div
            class="col-start-9 col-end-12 row-start-4 row-end-5 flex items-center justify-center"
          >
            <span class="text-yellow-400 text-2xl">★★★★</span
            ><span class="text-yellow-400 text-2xl">☆</span>
          </div>
          <div
            class="col-start-9 col-end-12 row-start-5 row-end-6 flex items-center justify-center"
          >
            <span class="">493 Reviews</span>
          </div>
        </div>
      </div>
      <div
        class="col-span-1 hidden lg:inline lg:col-start-9 lg:col-end-12 bg-fifth-near-white shadow-md rounded-full flex items-center justify-center aspect-square h-full min-h-0"
        style="height: 100%; min-height: 0; align-self: end"
      >
        <img
          src="/logo/Yana_FLOW_full_long.png"
          alt="Yana Flow Logo"
          class="w-full h-full object-cover rounded-full aspect-square"
        />
      </div>
      <div
        class="col-span-1 lg:col-span-7 bg-fifth-near-white rounded-2xl shadow-md p-6 px-12 flex flex-col justify-center shadow-lg"
      >
        <div class="grid content-between gap-6 h-full">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
            </div>
            <span class="text-gray-500 text-base font-medium"
              >16th Nov 2022</span
            >
          </div>
          <div class="text-xl text-fourth-purple font-normal leading-relaxed">
            This platform completely transformed my yoga journey. The
            instructors are amazing and the content is so accessible.
          </div>
          <div class="flex items-center gap-4 mt-2">
            <img
              src="/images/circles/emily_rivers.svg"
              alt="Jared Patel"
              class="w-12 h-12 rounded-full object-cover border-2 border-second-green"
            />
            <div>
              <div class="font-bold text-lg text-black">Emily Rivers</div>
              <div class="text-gray-500 text-base">Wellness Coach</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-span-1 lg:col-span-7 bg-fifth-near-white rounded-2xl shadow-md p-6 px-12 flex flex-col justify-center shadow-lg"
      >
        <div class="grid content-between gap-6 h-full">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
            </div>
            <span class="text-gray-500 text-base font-medium"
              >27th Feb 2025</span
            >
          </div>
          <div class="text-xl text-fourth-purple font-normal leading-relaxed">
            There's an amazing variety of sessions, and the community keeps me
            motivated every day. I love how easy it is to find something that
            fits my mood or schedule.
          </div>
          <div class="flex items-center gap-4 mt-2">
            <img
              src="/images/circles/sasha_morgan.svg"
              alt="Sasha Morgan"
              class="w-12 h-12 rounded-full object-cover border-2 border-second-green"
            />
            <div>
              <div class="font-bold text-lg text-black">Sasha Morgan</div>
              <div class="text-gray-500 text-base">Digital Marketer</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-span-1 lg:col-start-8 lg:col-end-13 lg:row-start-2 lg:row-end-4 bg-second-green text-white rounded-2xl shadow-md p-6 px-12 flex flex-col justify-center shadow-lg"
      >
        <div class="grid content-between gap-6 h-full">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">☆</span>
            </div>
            <span class="text-white text-base font-medium">3rd Aug 2021</span>
          </div>
          <span>
            <div class="text-3xl font-bold mb-4">Best Work!</div>
            <div class="text-xl text-white font-normal leading-relaxed">
              I was sceptical at first, but this really exceeded my
              expectations. The courses are thoughtfully structured, the
              interface is clean, and the sessions are perfect for unwinding
              after work. Best platform!
            </div>
          </span>
          <div class="flex items-center gap-4 mt-2">
            <img
              src="/images/circles/carlos_nguyen.svg"
              alt="Carlos Nguyen"
              class="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <div>
              <div class="font-bold text-lg text-white">Carlos Nguyen</div>
              <div class="text-white text-base">Freelance Design</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-span-1 lg:col-span-5 bg-second-green text-white rounded-2xl shadow-md p-6 px-12 flex flex-col justify-center shadow-lg"
      >
        <div class="grid content-between gap-6 h-full">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
            </div>
            <span class="text-white text-base font-medium">18th Apr 2025</span>
          </div>
          <img
            src="/images/circles/nina_caldwell.svg"
            alt="Nina Caldwell"
            class="hidden lg:block w-24 h-24 rounded-full object-cover border-2 border-white justify-self-center"
          />
          <span class="lg:text-center">
            <div class="hidden lg:block text-2xl font-bold">Nina Caldwell</div>
            <div class="text-xl text-white font-normal leading-relaxed">
              Clear guidance, great pacing, and a sense of connection even
              through a screen. Highly recommend.
            </div>
          </span>
          <div class="flex items-center gap-4 mt-2 block lg:hidden">
            <img
              src="/images/circles/nina_caldwell.svg"
              alt="Nina Caldwell"
              class="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <div>
              <div class="font-bold text-lg text-white">Nina Caldwell</div>
              <div class="text-white text-base">Doctor</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-span-1 lg:col-span-7 bg-fifth-near-white rounded-2xl shadow-md p-6 px-12 flex flex-col justify-center shadow-lg"
      >
        <div class="grid content-between gap-6 h-full">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">★</span>
              <span class="text-yellow-400 text-2xl">☆</span>
            </div>
            <span class="text-gray-500 text-base font-medium"
              >25th Sep 2024</span
            >
          </div>
          <div class="text-xl text-fourth-purple font-normal leading-relaxed">
            Really enjoy the vibe and structure of each course. The sessions fit
            well into my busy schedule and have helped me stay more consistent.
            A bit more variety in class types would make it perfect, but
            overall, it's been a great addition to my routine.
          </div>
          <div class="flex items-center gap-4 mt-2">
            <img
              src="/images/circles/jared_patel.svg"
              alt="Jared Patel"
              class="w-12 h-12 rounded-full object-cover border-2 border-second-green"
            />
            <div>
              <div class="font-bold text-lg text-black">Jared Patel</div>
              <div class="text-gray-500 text-base">Startup Founder</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact CTA Section -->
    <div
      class="bg-gradient-to-br from-first-purple/20 to-fourth-purple/10 py-16"
    >
      <div class="container-xl mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2
            class="text-3xl md:text-4xl font-bold text-fourth-purple mb-6 font-['Lora']"
          >
            Ready to Begin Your Yoga Journey?
          </h2>
          <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you have questions about our classes, want to discuss
            membership options, or need any other information, our team is here
            to help.
          </p>
          <nuxt-link
            to="/contact"
            class="inline-block bg-first-purple hover:bg-second-green text-white font-bold py-4 px-8 rounded-md transition-colors duration-300 text-lg shadow-md"
          >
            Get in Touch
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
