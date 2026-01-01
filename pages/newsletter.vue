<script setup>
// Set the head metadata for the Newsletter page
useHead({
  title: "Newsletter",
  meta: [
    {
      name: "description",
      content:
        "Sign up for the YANA FLOW newsletter to receive updates on classes, events, and wellness tips.",
    },
    {
      name: "keywords",
      content:
        "yoga newsletter, yoga tips, wellness newsletter, yoga updates, mindfulness tips",
    },
    { property: "og:title", content: "Newsletter - YANA FLOW Yoga Center" },
    {
      property: "og:description",
      content:
        "Subscribe to our newsletter for yoga tips, class updates, and exclusive content delivered to your inbox.",
    },
    { property: "og:type", content: "website" },
  ],
});

// Form state management
const isSubmitted = ref(false);
const form = reactive({
  firstName: "",
  email: "",
});

// Submit form handler
const handleSubmit = () => {
  // In a real application, we would send the form data to a server
  // For now, we'll just simulate a successful submission
  isSubmitted.value = true;

  // Reset form values
  form.firstName = "";
  form.email = "";
};
</script>

<template>
  <div class="bg-near-white-tan">
    <!-- Cover image with title -->
    <CoverImage title="Join Our Newsletter" />

    <!-- Main content area -->
    <div class="container-xl py-16">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <!-- Newsletter sign-up form -->
          <div v-if="!isSubmitted" class="p-8 md:p-12">
            <div class="text-center mb-10">
              <div
                class="bg-first-purple/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"
              >
                <Icon
                  name="material-symbols:mail"
                  class="h-12 w-12 text-first-purple"
                />
              </div>

              <h2
                class="text-3xl font-bold text-fourth-purple mb-4 font-['Lora']"
              >
                Stay Connected
              </h2>

              <p class="text-lg text-gray-700">
                Sign up for our newsletter to receive the latest updates on
                classes, events, and wellness tips directly to your inbox.
              </p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- First Name field -->
              <div>
                <label
                  for="firstName"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  id="firstName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-first-purple focus:border-first-purple transition-colors"
                  placeholder="Your first name"
                  required
                />
              </div>

              <!-- Email field -->
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-first-purple focus:border-first-purple transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <!-- Privacy notice -->
              <div class="text-sm text-gray-600">
                <p>
                  By signing up, you agree to receive emails from us. You can
                  unsubscribe at any time. See our
                  <nuxt-link
                    to="/privacy-policy"
                    class="text-first-purple hover:text-second-green hover:underline"
                    >Privacy Policy</nuxt-link
                  >
                  for more details.
                </p>
              </div>

              <!-- Submit button -->
              <div>
                <button
                  type="submit"
                  class="w-full bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Icon name="material-symbols:send-rounded" class="h-5 w-5" />
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <!-- Confirmation message after form submission -->
          <div
            v-if="isSubmitted"
            class="flex flex-col items-center justify-center p-6 text-center"
          >
            <div class="bg-second-green/10 rounded-full p-6 mb-6">
              <Icon
                name="material-symbols:check-circle"
                class="h-20 w-20 text-second-green"
              />
            </div>

            <h2
              class="text-3xl font-bold text-fourth-purple mb-4 font-['Lora']"
            >
              Thank You for Subscribing!
            </h2>

            <p class="text-lg text-gray-700 mb-8 max-w-md">
              You've successfully joined our newsletter. We look forward to
              sharing our yoga journey with you!
            </p>

            <nuxt-link
              to="/"
              class="bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 inline-flex items-center gap-2"
            >
              <Icon name="material-symbols:home" class="h-5 w-5" />
              Return to Home
            </nuxt-link>
          </div>
        </div>

        <!-- Additional information -->
        <div
          class="mt-10 bg-gradient-to-br from-first-purple/20 to-fourth-purple/10 rounded-2xl p-8 text-center"
        >
          <h3 class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']">
            What to Expect
          </h3>

          <div class="grid md:grid-cols-3 gap-6 mt-6">
            <div class="flex flex-col items-center">
              <div class="bg-white p-4 rounded-full mb-3">
                <Icon
                  name="material-symbols:calendar-month"
                  class="h-8 w-8 text-first-purple"
                />
              </div>
              <h4 class="font-bold text-fourth-purple mb-1">Monthly Updates</h4>
              <p class="text-sm text-gray-700">
                New classes and schedule changes
              </p>
            </div>

            <div class="flex flex-col items-center">
              <div class="bg-white p-4 rounded-full mb-3">
                <Icon
                  name="material-symbols:event"
                  class="h-8 w-8 text-first-purple"
                />
              </div>
              <h4 class="font-bold text-fourth-purple mb-1">Special Events</h4>
              <p class="text-sm text-gray-700">
                Workshops, retreats, and community gatherings
              </p>
            </div>

            <div class="flex flex-col items-center">
              <div class="bg-white p-4 rounded-full mb-3">
                <Icon
                  name="material-symbols:self-improvement"
                  class="h-8 w-8 text-first-purple"
                />
              </div>
              <h4 class="font-bold text-fourth-purple mb-1">Wellness Tips</h4>
              <p class="text-sm text-gray-700">
                Yoga sequences and mindfulness practices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
