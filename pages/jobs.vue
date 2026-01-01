<script setup>
// Set the head metadata for the Jobs page
useHead({
  title: "Careers",
  meta: [
    {
      name: "description",
      content:
        "Career opportunities at YANA FLOW Yoga Center. We're always looking for passionate individuals to join our team.",
    },
    {
      name: "keywords",
      content:
        "yoga jobs, yoga careers, yoga teacher positions, yoga studio employment, yoga instructor opportunities",
    },
    { property: "og:title", content: "Careers - YANA FLOW Yoga Center" },
    {
      property: "og:description",
      content:
        "Explore career opportunities at our yoga studio. Join our team of passionate yoga professionals.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>

<template>
  <div class="bg-near-white-tan">
    <!-- Cover image with title -->
    <CoverImage title="Careers at Yana Flow" />

    <!-- Main content area -->
    <div class="container-xl py-16">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <!-- Current status -->
          <div class="text-center mb-12">
            <div
              class="bg-first-purple/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"
            >
              <Icon
                name="material-symbols:work"
                class="h-12 w-12 text-first-purple"
              />
            </div>

            <h2
              class="text-3xl font-bold text-fourth-purple mb-4 font-['Lora']"
            >
              We're Not Currently Hiring
            </h2>

            <p class="text-lg text-gray-700 mb-6">
              Thank you for your interest in joining the Yana Flow team. While
              we don't have any open positions at the moment, we're always on
              the lookout for talented individuals who share our passion for
              yoga and wellness.
            </p>
          </div>

          <!-- Initiative application section -->
          <div class="bg-first-purple/10 rounded-xl p-8 text-center">
            <h3
              class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']"
            >
              Send Us Your Initiative Application
            </h3>

            <p class="text-gray-700 mb-6">
              If you believe you would be a great addition to our team, we
              encourage you to submit an initiative application. Tell us about
              your skills, experience, and why you're passionate about joining
              Yana Flow.
            </p>

            <nuxt-link
              to="/contact"
              class="inline-block bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              <Icon name="material-symbols:contact-page" class="h-5 w-5" />
              Contact Us
            </nuxt-link>
          </div>

          <!-- What we look for section -->
          <div class="mt-12">
            <h3
              class="text-2xl font-bold text-fourth-purple mb-6 font-['Lora']"
            >
              What We Look For
            </h3>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex items-start gap-4">
                <div
                  class="bg-first-purple/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0"
                >
                  <Icon
                    name="material-symbols:favorite"
                    class="h-6 w-6 text-first-purple"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-bold text-fourth-purple mb-1">
                    Passion
                  </h4>
                  <p class="text-gray-700">
                    A genuine love for yoga and wellness, and a desire to share
                    that passion with others.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="bg-first-purple/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0"
                >
                  <Icon
                    name="material-symbols:groups"
                    class="h-6 w-6 text-first-purple"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-bold text-fourth-purple mb-1">
                    Community
                  </h4>
                  <p class="text-gray-700">
                    Commitment to creating an inclusive, supportive environment
                    for all practitioners.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="bg-first-purple/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0"
                >
                  <Icon
                    name="material-symbols:school"
                    class="h-6 w-6 text-first-purple"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-bold text-fourth-purple mb-1">
                    Growth Mindset
                  </h4>
                  <p class="text-gray-700">
                    Continuous learners who are open to evolving their practice
                    and teaching.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="bg-first-purple/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0"
                >
                  <Icon
                    name="material-symbols:diversity-3"
                    class="h-6 w-6 text-first-purple"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-bold text-fourth-purple mb-1">
                    Authenticity
                  </h4>
                  <p class="text-gray-700">
                    Being true to yourself and bringing your unique perspective
                    to our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
