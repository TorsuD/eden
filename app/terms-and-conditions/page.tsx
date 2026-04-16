import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Eden platform — including our website, mobile site, and any related services — you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time, and continued use of the platform after changes constitutes acceptance of the revised terms.`,
  },
  {
    title: "2. Use of the Platform",
    content: `Eden grants you a limited, non-exclusive, non-transferable licence to access and use our platform for personal, non-commercial purposes. You agree not to misuse the platform in any way, including but not limited to: attempting to gain unauthorised access to any part of the system, using automated tools to scrape or extract data, or engaging in any conduct that disrupts or damages the platform or its users.`,
  },
  {
    title: "3. Account Registration",
    content: `To purchase products or access certain features, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You agree to provide accurate and up-to-date information at registration. Eden reserves the right to suspend or terminate accounts that violate these terms or are found to contain false information.`,
  },
  {
    title: "4. Products and Availability",
    content: `All products listed on Eden are subject to availability. We make every effort to display accurate product descriptions, images, and pricing, but we do not guarantee that all information is error-free. Eden reserves the right to discontinue any product, modify prices, or limit quantities at any time without prior notice. In the event of a pricing error, we reserve the right to cancel the affected order and notify you.`,
  },
  {
    title: "5. Orders and Payment",
    content: `When you place an order, you are making an offer to purchase a product at the listed price. Your order is confirmed when you receive a confirmation email or notification. Payment is processed securely through our payment provider. Eden does not store your full card details. All transactions are in the currency displayed at checkout and are subject to applicable taxes and delivery fees.`,
  },
  {
    title: "6. Shipping and Delivery",
    content: `Eden aims to dispatch orders within the timeframes stated at checkout. Delivery times are estimates and may vary based on your location and external factors outside our control. Risk of loss and title for products passes to you upon delivery. If your order is lost or damaged in transit, please contact us within 7 days of the estimated delivery date.`,
  },
  {
    title: "7. Returns and Refunds",
    content: `Due to the perishable nature of plants, we are unable to accept returns on live plants unless they arrive damaged or in poor health. If your plant arrives in an unsatisfactory condition, please contact us within 48 hours of delivery with photographic evidence. We will assess each case individually and offer a replacement or store credit at our discretion. Non-plant items such as pots and accessories may be returned within 14 days of receipt in their original condition.`,
  },
  {
    title: "8. Intellectual Property",
    content: `All content on the Eden platform — including text, images, graphics, logos, and product photography — is the property of Eden or its content suppliers and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this platform without prior written permission from Eden.`,
  },
  {
    title: "9. Privacy",
    content: `Your use of the Eden platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our platform, you consent to the collection and use of your personal information as described in the Privacy Policy. We are committed to protecting your data and will never sell your personal information to third parties.`,
  },
  {
    title: "10. Limitation of Liability",
    content: `To the fullest extent permitted by law, Eden shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform or any products purchased through it. Our total liability for any claim arising from a purchase shall not exceed the amount paid for the relevant product. Nothing in these terms limits our liability for fraud or any other liability that cannot be excluded by law.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms and Conditions are governed by and construed in accordance with the laws of Ghana. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Ghana. If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.`,
  },
  {
    title: "12. Contact",
    content: `If you have any questions or concerns about these Terms and Conditions, please contact us at hello@edenplants.com or through the Contact page on our website. We are happy to clarify anything and will respond within one business day.`,
  },
];

const TermsAndConditionsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 lg:px-8 w-full pt-32 pb-20">
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1 className="title-font text-5xl lg:text-6xl">
            Terms &amp; <span className="text-green-600">Conditions</span>.
          </h1>
          <p className="text-gray-500 mt-5 leading-7">
            Please read these terms carefully before using Eden. By accessing
            our platform you agree to be bound by the terms set out below.
          </p>
          <p className="text-gray-400 text-sm mt-3">
            Last updated: April 16, 2026
          </p>
        </div>

        {/* DIVIDER */}
        <div className="border-t mb-12" />

        {/* SECTIONS */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-bold text-lg mb-3">{section.title}</h2>
              <p className="text-gray-500 leading-8 text-sm">{section.content}</p>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="border-t mt-14 mb-10" />

        {/* CLOSING */}
        <div className="bg-green-50 rounded-2xl p-6 text-sm text-gray-500 leading-7">
          <p>
            By creating an account or placing an order on Eden, you confirm that
            you have read, understood, and agree to these Terms and Conditions.
            If you do not agree, please discontinue use of the platform
            immediately.
          </p>
          <p className="mt-3">
            For questions, reach us at{" "}
            <a
              href="mailto:hello@edenplants.com"
              className="text-green-600 font-medium hover:underline"
            >
              hello@edenplants.com
            </a>{" "}
            or visit our{" "}
            <a href="/contact" className="text-green-600 font-medium hover:underline">
              Contact page
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
