import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { DropletIcon, SunIcon, ThermometerIcon, WindIcon, ScissorsIcon, BugIcon } from "lucide-react";

const guides = [
  {
    icon: DropletIcon,
    color: "bg-blue-100 text-blue-600",
    title: "Watering",
    subtitle: "The golden rule: less is more.",
    tips: [
      "Check the soil moisture before every water — stick your finger 2 inches deep.",
      "Water thoroughly until it drains from the bottom, then let it dry out before watering again.",
      "Most houseplants prefer to dry slightly between waterings.",
      "Use room-temperature water to avoid shocking the roots.",
      "Water less in winter when plants slow their growth.",
    ],
  },
  {
    icon: SunIcon,
    color: "bg-yellow-100 text-yellow-600",
    title: "Light",
    subtitle: "Match light to your plant's origin.",
    tips: [
      "Bright indirect light suits most tropical houseplants — a few feet from a window.",
      "South-facing windows provide the most light; north-facing the least.",
      "Rotate your plant every few weeks for even growth.",
      "Yellowing leaves can signal too much light; leggy growth signals too little.",
      "Supplement with a grow light during short winter days.",
    ],
  },
  {
    icon: ThermometerIcon,
    color: "bg-red-100 text-red-600",
    title: "Temperature & Humidity",
    subtitle: "Keep it comfortable.",
    tips: [
      "Most houseplants thrive between 60–80°F (15–27°C).",
      "Avoid placing plants near heating or cooling vents.",
      "Tropical plants love humidity — mist leaves or use a pebble tray.",
      "Succulents and cacti prefer dry air and tolerate temperature swings.",
      "Cold drafts from windows can damage tropical species in winter.",
    ],
  },
  {
    icon: WindIcon,
    color: "bg-green-100 text-green-600",
    title: "Air & Soil",
    subtitle: "Give roots room to breathe.",
    tips: [
      "Use well-draining potting mix suited to your plant type.",
      "Succulents need gritty, sandy soil; tropicals prefer rich, loamy mix.",
      "Always use pots with drainage holes to prevent root rot.",
      "Gently aerate the top layer of soil monthly to prevent compaction.",
      "Repot every 1–2 years or when roots circle the bottom of the pot.",
    ],
  },
  {
    icon: ScissorsIcon,
    color: "bg-purple-100 text-purple-600",
    title: "Pruning & Grooming",
    subtitle: "Keep your plant looking its best.",
    tips: [
      "Remove dead, yellow, or damaged leaves promptly with clean scissors.",
      "Pinch back leggy stems to encourage bushier growth.",
      "Wipe dust off large leaves with a damp cloth to improve photosynthesis.",
      "Prune in spring or early summer when growth is most active.",
      "Always use sterilised tools to prevent spreading disease between plants.",
    ],
  },
  {
    icon: BugIcon,
    color: "bg-orange-100 text-orange-600",
    title: "Pests & Problems",
    subtitle: "Catch issues early.",
    tips: [
      "Inspect leaves — top and bottom — weekly for signs of pests.",
      "Common pests: fungus gnats (overwatering), spider mites (dry air), mealybugs (sticky residue).",
      "Isolate new plants for 2 weeks before placing near your collection.",
      "Treat pests with neem oil spray or insecticidal soap.",
      "Yellow leaves = often overwatering; brown crispy tips = underwatering or low humidity.",
    ],
  },
];

const CareGuidesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full pt-32 pb-20">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Plant Care
          </p>
          <h1 className="title-font text-5xl lg:text-6xl">
            Care <span className="text-green-600">&amp; Tips</span>.
          </h1>
          <p className="text-gray-500 mt-5 leading-7">
            Everything you need to keep your plants happy, healthy, and
            thriving — from watering basics to pest control.
          </p>
        </div>

        {/* QUICK TIPS BANNER */}
        <div className="bg-green-600 text-white rounded-3xl p-8 lg:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="title-font text-3xl mb-3">The #1 rule of plants?</h2>
            <p className="text-green-100 text-lg leading-7 max-w-xl">
              Observe more, react less. Check your plant weekly — healthy leaves,
              firm stems, and moist (not soggy) soil are all good signs.
            </p>
          </div>
          <div className="text-7xl shrink-0">🪴</div>
        </div>

        {/* GUIDES GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map(({ icon: Icon, color, title, subtitle, tips }) => (
            <div
              key={title}
              className="border rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl mb-1">{title}</h3>
              <p className="text-gray-400 text-sm mb-4">{subtitle}</p>
              <ul className="space-y-2.5">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 font-bold mt-0.5">·</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-20 border rounded-2xl p-10">
          <h2 className="title-font text-3xl mb-4">Still have questions?</h2>
          <p className="text-gray-500 mb-6">
            Our team is happy to help you troubleshoot any plant problem.
          </p>
          <a
            href="/contact"
            className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CareGuidesPage;
