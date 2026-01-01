<script setup>
// Set the head metadata for the privacy policy page
useHead({
  title: "Privacy Policy",
  meta: [
    {
      name: "description",
      content:
        "YANA FLOW Yoga Center privacy policy and data protection information.",
    },
    {
      name: "keywords",
      content:
        "privacy policy, data protection, cookie policy, personal information, GDPR compliance",
    },
    { property: "og:title", content: "Privacy Policy - YANA FLOW Yoga Center" },
    {
      property: "og:description",
      content:
        "Our privacy policy explains how we collect, use, and protect your personal information.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>

<template>
  <div class="bg-near-white-tan">
    <!-- Cover image with title -->
    <CoverImage title="Privacy Policy" />

    <!-- Main content area -->
    <div class="container-xl py-16">
      <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 class="text-3xl font-bold text-fourth-purple mb-8 font-['Lora']">
          Privacy Policy
        </h1>

        <div class="space-y-8 text-gray-700">
          <section>
            <h2 class="text-2xl font-bold text-first-purple mb-4">
              Introduction
            </h2>
            <p class="mb-4">
              At YANA FLOW, we respect your privacy and are committed to
              protecting your personal data. This privacy policy will inform you
              about how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law
              protects you.
            </p>
            <p>
              This policy applies to information we collect when you use our
              website, sign up for classes, purchase memberships, or contact us
              through any channel.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-first-purple mb-4">
              Information We Collect
            </h2>
            <p class="mb-4">
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <ul class="list-disc pl-6 space-y-2">
              <li>
                <strong>Identity Data</strong> includes first name, last name,
                username or similar identifier, title, date of birth.
              </li>
              <li>
                <strong>Contact Data</strong> includes billing address, delivery
                address, email address and telephone numbers.
              </li>
              <li>
                <strong>Financial Data</strong> includes payment card details
                (processed securely through our payment processors).
              </li>
              <li>
                <strong>Transaction Data</strong> includes details about
                payments to and from you and other details of products and
                services you have purchased from us.
              </li>
              <li>
                <strong>Technical Data</strong> includes internet protocol (IP)
                address, browser type and version, time zone setting and
                location, browser plug-in types and versions, operating system
                and platform, and other technology on the devices you use to
                access this website.
              </li>
              <li>
                <strong>Usage Data</strong> includes information about how you
                use our website, products and services.
              </li>
              <li>
                <strong>Marketing and Communications Data</strong> includes your
                preferences in receiving marketing from us and our third parties
                and your communication preferences.
              </li>
              <li>
                <strong>Health and Fitness Data</strong> includes information
                about your fitness level, health conditions, and yoga experience
                that you voluntarily provide to us.
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-first-purple mb-4">
              How We Use Your Information
            </h2>
            <p class="mb-4">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul class="list-disc pl-6 space-y-2">
              <li>To register you as a new customer.</li>
              <li>
                To process and deliver your order including managing payments.
              </li>
              <li>To manage our relationship with you.</li>
              <li>
                To personalize your experience and deliver relevant content and
                offerings.
              </li>
              <li>
                To improve our website, products/services, marketing, and
                customer relationships.
              </li>
              <li>
                To recommend products or services that may be of interest to
                you.
              </li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-first-purple mb-4">
              Data Security
            </h2>
            <p>
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed. In addition, we limit
              access to your personal data to those employees, agents,
              contractors and other third parties who have a business need to
              know.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-first-purple mb-4">
              Your Legal Rights
            </h2>
            <p class="mb-4">
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data, including the right to:
            </p>
            <ul class="list-disc pl-6 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-first-purple mb-4">
              Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at:
              <a
                href="mailto:privacy@yanaflow.com"
                class="text-first-purple hover:text-second-green hover:underline"
                >privacy@yanaflow.com</a
              >
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-first-purple mb-4">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update our privacy policy from time to time. We will notify
              you of any changes by posting the new privacy policy on this page.
            </p>
          </section>

          <div class="border-t border-gray-200 pt-6 mt-8 text-sm text-gray-500">
            <p>Last updated: June 8, 2025</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
