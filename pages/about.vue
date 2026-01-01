<script setup>
import { useDataLoading } from "~/composables/useDataLoading";

// Set SEO metadata for the about page
useHead({
  title: "About Us",
  meta: [
    {
      name: "description",
      content:
        "Learn about YANA FLOW Yoga Center's mission, values, and history. Discover our commitment to creating an inclusive yoga community for practitioners of all levels.",
    },
    {
      name: "keywords",
      content:
        "yoga studio, yoga center, yoga mission, yoga values, yoga philosophy, yoga community, wellness center",
    },
    { property: "og:title", content: "About Us - YANA FLOW Yoga Center" },
    {
      property: "og:description",
      content:
        "Learn about our yoga studio's mission and values. Discover how we create an inclusive space for all practitioners.",
    },
    { property: "og:type", content: "website" },
  ],
});

// Use our common loading composable
const { isLoading, dataStore } = useDataLoading();

// Values for our mission section
const missionValues = [
  {
    title: "Meditation",
    description:
      "We provide guided practices to cultivate mindfulness and inner peace in everyday life.",
    icon: "mdi:meditation",
  },
  {
    title: "Yoga",
    description:
      "We offer various yoga styles that honor traditional roots while making them accessible to modern practitioners.",
    icon: "mdi:yoga",
  },
  {
    title: "Fitness",
    description:
      "We focus on building strength, flexibility and balance through mindful movement practices.",
    icon: "mdi:run",
  },
  {
    title: "Wellness",
    description:
      "We promote holistic well-being through integrated mind-body practices and supportive community.",
    icon: "mdi:leaf",
  },
  {
    title: "Health",
    description:
      "We support your journey to physical and mental health through evidence-based yoga and mindfulness techniques.",
    icon: "mdi:heart",
  },
];

// Organization members
const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Founder & Director",
    bio: "Sarah founded Yana Flow in 2015 after traveling throughout India and Southeast Asia studying various yoga traditions. She holds E-RYT 500 certification and specializes in alignment-based vinyasa.",
    image: "/images/covers/cover_3.jpg",
  },
  {
    name: "Michael Rodriguez",
    role: "Operations Manager",
    bio: "Michael ensures our center runs smoothly day-to-day. With a background in wellness retreat management, he creates an environment where both students and teachers can thrive.",
    image: "/images/covers/cover_5.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Program Director",
    bio: "Priya curates our course offerings and special events. Her extensive background in Ashtanga and Iyengar yoga informs her thoughtful approach to program development.",
    image: "/images/covers/cover_7.jpg",
  },
];
</script>

<template>
  <!-- Loading state -->
  <LoadingSpinner v-if="isLoading" message="Loading about page..." />

  <!-- About content -->
  <div v-else class="bg-near-white-tan">
    <CoverImage :title="'About Yana Flow'" />

    <!-- Our Story Section -->
    <div class="container-xl">
      <h1 class="mb-8 text-fourth-purple">Our Story</h1>

      <p class="text-lg mb-6 leading-relaxed text-gray-700">
        Yana Flow was founded with a simple mission: to make yoga accessible to
        everyone, regardless of experience level or background. Our center
        brings together talented instructors from around the world to share
        their knowledge and passion for yoga.
      </p>

      <p class="text-lg mb-6 leading-relaxed text-gray-700">
        Established in 2015, our studio began as a small community space with
        just two instructors and a handful of dedicated students. Today, we've
        grown into a thriving center with multiple studio rooms, over 20
        teachers, and a diverse offering of classes, workshops, and teacher
        training programs.
      </p>

      <p class="text-lg mb-10 leading-relaxed text-gray-700">
        We believe that yoga is more than just physical exercise – it's a
        journey toward balance, mindfulness, and connection. Whether you're
        looking to improve flexibility, reduce stress, or deepen your practice,
        Yana Flow offers classes and resources to support your path.
      </p>

      <!-- Image gallery -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
        <div class="rounded-lg overflow-hidden shadow-md h-64">
          <img
            src="/images/covers/cover_1.jpg"
            alt="Yoga studio"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="rounded-lg overflow-hidden shadow-md h-64">
          <img
            src="/images/covers/cover_2.jpg"
            alt="Yoga class"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="rounded-lg overflow-hidden shadow-md h-64">
          <img
            src="/images/covers/cover_4.jpg"
            alt="Meditation space"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    <!-- Our Mission Section -->
    <div class="bg-light-second-green py-16">
      <div class="container-xl pb-0">
        <h2 class="font-bold text-fourth-purple mb-8 font-['Lora'] text-center">
          Our Mission & Objectives
        </h2>

        <p class="text-lg leading-relaxed text-gray-700 text-center">
          At Yana Flow, we're committed to creating a supportive environment
          where individuals can explore the transformative practices of yoga and
          mindfulness. Our mission encompasses five key areas:
        </p>
      </div>

      <div class="container-xl lg:px-16">
        <div
          class="flex flex-row flex-wrap gap-8 justify-center items-stretch px-4 xs:px-8 sm:px-16 md:px-0"
        >
          <div
            v-for="(value, index) in missionValues"
            :key="index"
            class="bg-white p-5 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 w-full md:w-80"
          >
            <div class="flex flex-col items-center text-center">
              <div class="p-4 rounded-full mb-2">
                <Icon :name="value.icon" class="text-3xl text-fourth-purple" />
              </div>
              <h3 class="text-xl font-bold text-fourth-purple mb-2">
                {{ value.title }}
              </h3>
              <p class="text-gray-700 text-sm">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Our Team Section -->
    <div class="container-xl pb-0">
      <h2 class="font-bold text-fourth-purple mb-8 font-['Lora']">
        Meet Our Organization Team
      </h2>

      <p class="text-lg mb-10 leading-relaxed text-gray-700">
        The heart of Yana Flow is our dedicated team of professionals who bring
        their unique expertise and passion to our community.
      </p>
    </div>
    <div class="container mx-auto py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 overflow-hidden"
        >
          <div class="h-64 overflow-hidden">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-fourth-purple mb-1">
              {{ member.name }}
            </h3>
            <p class="text-first-purple mb-4 font-medium">
              {{ member.role }}
            </p>
            <p class="text-gray-700 text-sm">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Join Us CTA -->
    <div class="container-xl bg-third-tan py-16">
      <h2
        class="text-3xl md:text-4xl font-bold text-fourth-purple mb-6 font-['Lora']"
      >
        Join Our Community
      </h2>
      <p class="text-lg mb-10 leading-relaxed text-gray-700">
        Whether you're new to yoga or a seasoned practitioner, we invite you to
        become part of our supportive community. Explore our diverse classes,
        connect with our experienced teachers, and discover the transformative
        power of yoga.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
        <nuxt-link
          to="/courses"
          class="bg-white rounded-xl p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center"
        >
          <div class="p-4 rounded-full mb-3">
            <Icon name="mdi:yoga" class="h-8 w-8" />
          </div>
          <h3 class="font-bold text-fourth-purple mb-2">Courses</h3>
          <p class="text-sm text-gray-600 mb-4 text-center">
            Find the perfect class for your practice level
          </p>
          <span
            class="font-medium text-sm mt-auto flex items-center gap-1 hover:underline group hover:text-second-green transition-colors text-center"
          >
            Explore
            <Icon
              name="material-symbols:arrow-forward-rounded"
              class="h-4 w-4 group-hover:translate-x-1 transition-transform"
            />
          </span>
        </nuxt-link>
        <nuxt-link
          to="/events"
          class="bg-white rounded-xl p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center"
        >
          <div class="p-4 rounded-full mb-3">
            <Icon name="mdi:calendar" class="h-8 w-8 text-fourth-purple" />
          </div>
          <h3 class="font-bold text-fourth-purple mb-2">Events</h3>
          <p class="text-sm text-gray-600 mb-4 text-center">
            Join our special workshops and retreats
          </p>
          <span
            class="font-medium text-sm mt-auto flex items-center gap-1 hover:underline group hover:text-second-green transition-colors text-center"
          >
            Discover
            <Icon
              name="material-symbols:arrow-forward-rounded"
              class="h-4 w-4 group-hover:translate-x-1 transition-transform"
            />
          </span>
        </nuxt-link>

        <nuxt-link
          to="/teachers"
          class="bg-white rounded-xl p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center"
        >
          <div class="p-4 rounded-full mb-3">
            <Icon name="mdi:account-group" class="h-8 w-8 text-second-green" />
          </div>
          <h3 class="font-bold text-fourth-purple mb-2">Teachers</h3>
          <p class="text-sm text-gray-600 mb-4 text-center">
            Meet our experienced instructors
          </p>
          <span
            class="font-medium text-sm mt-auto flex items-center gap-1 hover:underline group hover:text-second-green transition-colors text-center"
          >
            Meet
            <Icon
              name="material-symbols:arrow-forward-rounded"
              class="h-4 w-4 group-hover:translate-x-1 transition-transform"
            />
          </span>
        </nuxt-link>

        <nuxt-link
          to="/contact"
          class="bg-first-purple text-white rounded-xl p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center hover:bg-second-green transition-colors"
        >
          <div class="p-4 rounded-full mb-3 bg-white/20">
            <Icon name="material-symbols:mail" class="h-8 w-8 text-white" />
          </div>
          <h3 class="font-bold text-white mb-2">Contact</h3>
          <p class="text-sm text-white/90 mb-4 text-center">
            Get in touch with our team
          </p>
          <span
            class="font-medium text-sm mt-auto flex items-center gap-1 group text-white text-center hover:underline"
          >
            Reach Out
            <Icon
              name="material-symbols:arrow-forward-rounded"
              class="h-4 w-4 group-hover:translate-x-1 transition-transform"
            />
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
