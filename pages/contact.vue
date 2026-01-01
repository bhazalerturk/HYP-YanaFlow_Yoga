<script setup>
// Set the head metadata for the contact page
useHead({
  title: "Contact Us",
  meta: [
    {
      name: "description",
      content:
        "Get in touch with YANA FLOW Yoga Center. Contact us for inquiries about classes, memberships, or any questions you may have.",
    },
    {
      name: "keywords",
      content:
        "yoga contact, yoga studio contact, yoga class information, yoga studio location, yoga studio hours",
    },
    { property: "og:title", content: "Contact Us - YANA FLOW Yoga Center" },
    {
      property: "og:description",
      content:
        "Reach out to our yoga studio with questions or feedback. Find our location, hours, and contact information.",
    },
    { property: "og:type", content: "website" },
  ],
  // Add structured data for local business
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "YANA FLOW Yoga Center",
        image: "/logo/Yana_FLOW_transparent_icon.svg",
        "@id": "https://yana-flow.com",
        url: "https://yana-flow.com",
        telephone: "+39 02 1234 5678",

        address: {
          "@type": "PostalAddress",
          streetAddress: "Piazza Leonardo da Vinci",
          addressLocality: "Milano",
          addressRegion: "MI",
          postalCode: "20133",
          addressCountry: "IT",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "06:00",
            closes: "21:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday", "Sunday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
      }),
    },
  ],
});

// Map loading state
const mapError = ref(false);
const handleMapError = () => {
  mapError.value = true;
};

// Form state management
const formSubmitted = ref(false);
const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
  privacy: false,
});

// Submit form handler
const handleSubmit = () => {
  // In a real application, we would send the form data to a server
  // For now, we'll just simulate a successful submission
  formSubmitted.value = true;

  // Reset form after submission. Only resetting
  form.subject = "";
  form.message = "";
  form.privacy = false;
};
</script>

<template>
  <div class="bg-near-white-tan">
    <!-- Cover image with title -->
    <CoverImage title="Contact Us" />

    <!-- Main content area -->
    <div class="container-xl py-16">
      <div class="max-w-6xl mx-auto">
        <!-- Two-column layout for desktop -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Left column: Contact Form -->
          <div class="bg-white rounded-2xl shadow-xl p-8 flex flex-col h-full">
            <template v-if="!formSubmitted">
              <h2
                class="text-3xl font-bold text-fourth-purple mb-8 font-['Lora']"
              >
                Send Us a Message
              </h2>

              <form
                @submit.prevent="handleSubmit"
                class="space-y-6 flex-1 flex flex-col"
              >
                <div class="flex-1">
                  <!-- Name field -->
                  <div class="mb-6">
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Full Name</label
                    >
                    <input
                      v-model="form.name"
                      type="text"
                      id="name"
                      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-first-purple focus:border-first-purple transition-colors"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <!-- Email field -->
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Email Address</label
                    >
                    <input
                      v-model="form.email"
                      type="email"
                      id="email"
                      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-first-purple focus:border-first-purple transition-colors"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <!-- Subject field -->
                  <div class="mb-6">
                    <label
                      for="subject"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Subject</label
                    >
                    <select
                      v-model="form.subject"
                      id="subject"
                      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-first-purple focus:border-first-purple transition-colors"
                      required
                    >
                      <option value="" disabled selected>
                        Select a subject
                      </option>
                      <option value="general">General Inquiry</option>
                      <option value="classes">Classes & Schedule</option>
                      <option value="membership">Membership</option>
                      <option value="private">Private Sessions</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <!-- Message field -->
                  <div class="mb-6">
                    <label
                      for="message"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Message</label
                    >
                    <textarea
                      v-model="form.message"
                      id="message"
                      rows="5"
                      class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-first-purple focus:border-first-purple transition-colors"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>

                  <!-- Privacy policy checkbox -->
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        v-model="form.privacy"
                        id="privacy"
                        type="checkbox"
                        class="h-4 w-4 border-gray-300 rounded text-first-purple focus:ring-first-purple"
                        required
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="privacy" class="text-gray-700">
                        I agree to the
                        <nuxt-link
                          to="/privacy-policy"
                          class="text-first-purple hover:text-second-green hover:underline"
                          >privacy policy</nuxt-link
                        >
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Submit button - at the bottom of the form -->
                <div class="mt-auto pt-6">
                  <button
                    type="submit"
                    class="w-full bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Icon
                      name="material-symbols:send-rounded"
                      class="h-5 w-5"
                    />
                    Send Message
                  </button>
                </div>
              </form>
            </template>

            <!-- Confirmation message after form submission -->
            <div
              v-if="formSubmitted"
              class="flex flex-col items-center justify-center h-full text-center py-10"
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
                Thank You!
              </h2>
              <p class="text-lg text-gray-700 mb-6 max-w-md">
                Your message has been received. We'll get back to you as soon as
                possible.
              </p>
              <button
                @click="formSubmitted = false"
                class="bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 inline-flex items-center gap-2"
              >
                <Icon name="material-symbols:refresh" class="h-5 w-5" />
                Send Another Message
              </button>
            </div>
          </div>

          <!-- Right column: Contact Info + Map -->
          <div class="space-y-8">
            <!-- Contact Information -->
            <div class="bg-white rounded-2xl shadow-xl p-8">
              <h2
                class="text-3xl font-bold text-fourth-purple mb-6 font-['Lora']"
              >
                Contact Information
              </h2>
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div
                    class="bg-first-purple/10 p-3 rounded-full h-12 w-12 flex items-center justify-center"
                  >
                    <Icon
                      name="material-symbols:location-on"
                      class="h-6 w-6 text-first-purple"
                    />
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-fourth-purple">
                      Our Location
                    </h3>
                    <p class="text-gray-700">
                      Piazza Leonardo da Vinci<br />20133 Milano, Italy
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div
                    class="bg-first-purple/10 p-3 rounded-full h-12 w-12 flex items-center justify-center"
                  >
                    <Icon
                      name="material-symbols:phone-in-talk"
                      class="h-6 w-6 text-first-purple"
                    />
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-fourth-purple">Phone</h3>
                    <p class="text-gray-700">
                      <a
                        href="tel:+390212345678"
                        class="hover:text-first-purple transition-colors"
                        >+39 02 1234 5678</a
                      >
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div
                    class="bg-first-purple/10 p-3 rounded-full h-12 w-12 flex items-center justify-center"
                  >
                    <Icon
                      name="material-symbols:mail"
                      class="h-6 w-6 text-first-purple"
                    />
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-fourth-purple">Email</h3>
                    <p class="text-gray-700">
                      <a
                        href="mailto:info@yanaflow.com"
                        class="hover:text-first-purple transition-colors"
                        >info@yanaflow.com</a
                      >
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div
                    class="bg-first-purple/10 p-3 rounded-full h-12 w-12 flex items-center justify-center"
                  >
                    <Icon
                      name="material-symbols:schedule"
                      class="h-6 w-6 text-first-purple"
                    />
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-fourth-purple">
                      Opening Hours
                    </h3>
                    <p class="text-gray-700">
                      Monday - Friday: 6:00 AM - 9:00 PM<br />
                      Saturday - Sunday: 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <!-- Social Media Icons -->
              <div class="mt-8">
                <h3 class="text-lg font-bold text-fourth-purple mb-4">
                  Follow Us
                </h3>
                <div class="flex gap-4">
                  <a
                    href="https://instagram.com/yana-flow"
                    target="_blank"
                    class="bg-first-purple hover:bg-second-green text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300"
                  >
                    <Icon name="mdi:instagram" class="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com/yana-flow"
                    target="_blank"
                    class="bg-first-purple hover:bg-second-green text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300"
                  >
                    <Icon name="mdi:facebook" class="h-5 w-5" />
                  </a>
                  <a
                    href="https://x.com/yana-flow"
                    target="_blank"
                    class="bg-first-purple hover:bg-second-green text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300"
                  >
                    <Icon name="line-md:twitter-x" class="h-5 w-5" />
                  </a>
                  <a
                    href="https://youtube.com/yana-flow"
                    target="_blank"
                    class="bg-first-purple hover:bg-second-green text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300"
                  >
                    <Icon name="mdi:youtube" class="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <!-- Interactive Map -->
            <div
              class="bg-white rounded-2xl shadow-xl overflow-hidden h-80 relative"
            >
              <!-- Fallback Map (Displayed if iframe has an error) -->
              <div
                v-if="mapError"
                class="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gray-50"
              >
                <h3 class="text-lg font-bold text-fourth-purple mb-2">
                  Find Us at
                </h3>
                <p class="text-gray-700 mb-4 text-center">
                  Piazza Leonardo da Vinci, 20133 Milano, Italy
                </p>
                <a
                  href="https://www.openstreetmap.org/?mlat=45.47819&mlon=9.22561#map=19/45.47819/9.22561"
                  target="_blank"
                  class="bg-first-purple hover:bg-second-green text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <Icon name="material-symbols:map" class="h-5 w-5" />
                  View on OpenStreetMap
                </a>
              </div>

              <iframe
                v-show="!mapError"
                src="https://www.openstreetmap.org/export/embed.html?bbox=9.222047328948977%2C45.4766574149838%2C9.229171276092531%2C45.47972138423838&amp;layer=mapnik&amp;marker=45.47818941961576%2C9.225609302520752"
                width="100%"
                height="100%"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                title="Map showing our location at Politecnico di Milano, Piazza Leonardo da Vinci"
                @error="handleMapError"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
