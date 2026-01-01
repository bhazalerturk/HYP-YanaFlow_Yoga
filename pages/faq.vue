<script setup>
// Set the head metadata for the FAQ page
useHead({
  title: "FAQ",
  meta: [
    {
      name: "description",
      content:
        "Frequently Asked Questions about YANA FLOW Yoga Center. Find answers to common questions about our yoga classes, memberships, and services.",
    },
    {
      name: "keywords",
      content:
        "yoga FAQ, yoga questions, yoga beginners, yoga studio information, yoga class preparation, yoga membership",
    },
    {
      property: "og:title",
      content: "Frequently Asked Questions - YANA FLOW Yoga Center",
    },
    {
      property: "og:description",
      content:
        "Find answers to common questions about our yoga classes, what to bring, pricing, and more.",
    },
    { property: "og:type", content: "website" },
  ],
  // Add structured data for FAQ page
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What should I bring to my first yoga class?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For your first class, we recommend bringing a yoga mat (although we do have mats available for rent), a water bottle, and a small towel. Wear comfortable, breathable clothing that allows you to move freely.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need to be flexible to do yoga?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, flexibility is not a prerequisite for yoga. In fact, yoga is an excellent way to increase your flexibility gradually. Our classes accommodate all levels of flexibility.",
            },
          },
        ],
      }),
    },
  ],
});

// FAQ data with questions and answers
const faqItems = ref([
  {
    question: "What should I bring to my first yoga class?",
    answer:
      "For your first class, we recommend bringing a yoga mat (although we do have mats available for rent), a water bottle, and a small towel. Wear comfortable, breathable clothing that allows you to move freely. It's best to practice barefoot. If you have props like blocks or straps that you prefer to use, feel free to bring them, though we provide all necessary props in our studio.",
  },
  {
    question: "I'm a complete beginner. Which class should I start with?",
    answer:
      "We recommend beginners start with our Hatha Yoga, Yoga for Beginners, or Gentle Flow classes. These classes focus on basic poses and proper alignment, providing a solid foundation for your practice. Our instructors offer modifications for all levels, so you'll feel comfortable and supported regardless of your experience.",
  },
  {
    question: "How early should I arrive before class?",
    answer:
      "We recommend arriving 15-20 minutes early for your first visit to complete any necessary paperwork and get oriented to the space. For returning students, arriving 10 minutes early gives you time to set up your mat and center yourself before class begins.",
  },
  {
    question: "Do I need to register for classes in advance?",
    answer:
      "While drop-ins are welcome for most classes, we recommend registering in advance, especially for popular time slots that tend to fill up quickly. You can register through our website or mobile app up to 7 days before a class.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We require at least 6 hours notice for class cancellations to receive a refund or class credit. This allows us to offer your spot to other students who may be on a waitlist. For special workshops or events, please check the specific cancellation policy as it may differ.",
  },
  {
    question: "Are there showers and changing facilities available?",
    answer:
      "Yes, our studio has clean changing rooms and shower facilities available for students. We provide lockers for storing your belongings during class, but recommend leaving valuables at home.",
  },
  {
    question: "How often should I practice yoga as a beginner?",
    answer:
      "For beginners, we recommend starting with 2-3 classes per week to build strength, flexibility, and familiarity with the poses without overwhelming your body. Listen to your body and rest when needed. Consistency is more important than frequency when you're just starting out.",
  },
  {
    question: "Do you offer private yoga sessions?",
    answer:
      "Yes, we offer private one-on-one and small group sessions with our experienced instructors. Private sessions are perfect for addressing specific needs, working with injuries, or deepening your practice. Contact us for current rates and instructor availability.",
  },
  {
    question: "What types of memberships do you offer?",
    answer:
      "We offer a variety of membership options including monthly unlimited, class packages (5, 10, or 20 classes), and drop-in rates. We also have special rates for students, seniors, and military personnel. Check our pricing page for current membership options and promotional offers.",
  },
  {
    question: "Is yoga suitable for people with injuries or health conditions?",
    answer:
      "Yoga can be adapted for most injuries and health conditions, but it's important to consult with your healthcare provider before beginning any new exercise program. Please inform your instructor about any injuries or health concerns before class begins. They can suggest modifications to make your practice safe and beneficial.",
  },
]);

// Toggle functionality for expanding/collapsing FAQ items
const openItems = ref({});

function toggleItem(index) {
  openItems.value[index] = !openItems.value[index];
}
</script>

<template>
  <div class="bg-near-white-tan">
    <!-- Cover image with title -->
    <CoverImage title="Frequently Asked Questions" />

    <!-- Main content area -->
    <div class="container-xl py-16">
      <div class="max-w-4xl mx-auto">
        <!-- Introduction -->
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-fourth-purple mb-4 font-['Lora']">
            Have Questions? We're Here to Help
          </h2>
          <p class="text-lg text-gray-700 max-w-3xl mx-auto">
            Find answers to commonly asked questions about our yoga classes,
            services, and policies. If you don't see your question here, please
            don't hesitate to
            <nuxt-link
              to="/contact"
              class="text-first-purple hover:text-second-green hover:underline"
              >contact us</nuxt-link
            >.
          </p>
        </div>

        <!-- FAQ Accordion -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div
            v-for="(item, index) in faqItems"
            :key="index"
            class="border-b last:border-b-0 border-gray-200"
          >
            <!-- FAQ Question (header) -->
            <button
              @click="toggleItem(index)"
              class="w-full px-6 py-5 text-left flex justify-between items-center transition-colors duration-200 focus:ring-0 focus:ring-offset-2 focus:ring-[var(--color-near-white-tan)] hover:ring-[var(--color-near-white-tan)] hover:ring-0 hover:ring-offset-2"
              :aria-expanded="openItems[index]"
              :aria-controls="`faq-answer-${index}`"
            >
              <h3 class="text-lg font-semibold text-near-white-tan pr-8">
                {{ item.question }}
              </h3>
              <div class="relative flex-shrink-0">
                <Icon
                  name="material-symbols:keyboard-arrow-down-rounded"
                  class="h-6 w-6 text-near-white-tan transition-transform duration-300"
                  :class="{
                    'rotate-180': openItems[index],
                    'rotate-0': !openItems[index],
                  }"
                />
              </div>
            </button>

            <!-- FAQ Answer (content) -->
            <div
              v-show="openItems[index]"
              :id="`faq-answer-${index}`"
              class="px-6 pb-5 pt-0 text-gray-700 mt-4"
            >
              <p class="pb-2">{{ item.answer }}</p>
            </div>
          </div>
        </div>

        <!-- Still have questions section -->
        <div
          class="bg-gradient-to-br from-first-purple/20 to-fourth-purple/10 rounded-2xl p-8 text-center"
        >
          <h3 class="text-2xl font-bold text-fourth-purple mb-4 font-['Lora']">
            Still Have Questions?
          </h3>
          <p class="text-gray-700 mb-6 max-w-2xl mx-auto">
            We're here to help! Reach out to our team for personalized
            assistance with any questions you may have about our classes,
            memberships, or services.
          </p>
          <nuxt-link to="/contact" class="flex justify-center">
            <button
              class="bg-first-purple hover:bg-second-green text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center gap-2 group"
            >
              Contact us
              <Icon
                name="material-symbols:arrow-forward-rounded"
                class="h-5 w-5 group-hover:translate-x-1 transition-transform"
              />
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
