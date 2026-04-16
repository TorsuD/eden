export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  color: string;
  emoji: string;
  content: Section[];
}

interface Section {
  heading?: string;
  body: string;
}

export const posts: BlogPost[] = [
  {
    slug: "beginner-guide-to-indoor-plants",
    category: "Beginner",
    title: "The Beginner's Guide to Indoor Plants",
    excerpt:
      "Starting your plant journey? We break down the easiest species to grow, common pitfalls to avoid, and how to set your space up for success.",
    date: "April 10, 2026",
    readTime: "5 min read",
    color: "bg-green-100",
    emoji: "🌿",
    content: [
      {
        body: "Everyone starts somewhere. Maybe you picked up a pothos at the market, or a friend gifted you a succulent. Whatever brought you here, welcome — you're about to discover one of the most rewarding hobbies there is. Indoor plants aren't just decoration; they're living things that respond to care, light, and attention in ways that are endlessly satisfying to observe.",
      },
      {
        heading: "Start with the easy ones",
        body: "The biggest mistake beginners make is falling in love with a finicky plant before they've built their confidence. Start with forgiving species that tolerate inconsistent watering and varying light. The pothos (Epipremnum aureum) is the gold standard — it trails beautifully, grows fast, and practically thrives on neglect. Snake plants (Sansevieria) are equally bulletproof: they tolerate low light and can go weeks without water. Spider plants, ZZ plants, and peace lilies round out the beginner-friendly list.",
      },
      {
        heading: "The three things every plant needs",
        body: "Light, water, and the right soil — get these three right and you're most of the way there. Light is the trickiest variable indoors. Most houseplants want bright, indirect light: bright enough to read a book by, but not direct sun streaming through glass, which can scorch leaves. Water is where most beginners overcorrect. Less is almost always more. Stick your finger two inches into the soil before watering — if it's still damp, wait. And always use pots with drainage holes so roots never sit in standing water.",
      },
      {
        heading: "Setting up your space",
        body: "Take a walk around your home at different times of day and notice where the light falls. South-facing windows get the most sun; north-facing the least. East and west windows offer gentler morning and afternoon light that suits most tropicals perfectly. Once you know your light zones, match plants to locations rather than the other way around. A dim corner needs a ZZ plant, not a fiddle-leaf fig.",
      },
      {
        heading: "Common mistakes to avoid",
        body: "Overwatering is the single most common cause of plant death — it causes root rot, which is silent and swift. Equally harmful is placing a plant in a spot it hates and ignoring the signs. Yellowing leaves, leggy stems reaching toward a window, and crispy brown tips are all your plant's way of telling you something is off. Listen early and adjust. Finally, don't repot too soon — most plants are happiest slightly root-bound and don't need a new pot until roots are visibly circling the bottom.",
      },
      {
        heading: "Build the habit, not the collection",
        body: "The temptation with plants is to accumulate quickly. Resist it, at least at first. Start with two or three plants and care for them well before expanding. You'll learn far more from a handful of thriving plants than from a shelf of struggling ones. Once you've got a routine — checking soil, rotating for even light, wiping leaves clean — adding more plants becomes effortless. That's when the real fun begins.",
      },
    ],
  },
  {
    slug: "why-succulents-are-perfect-for-busy-people",
    category: "Succulents",
    title: "Why Succulents Are Perfect for Busy People",
    excerpt:
      "Low water, high reward. Succulents are the ideal companion for those who love greenery but live a hectic lifestyle.",
    date: "April 3, 2026",
    readTime: "4 min read",
    color: "bg-orange-100",
    emoji: "🌵",
    content: [
      {
        body: "Between work, travel, and everything else life throws at you, remembering to water a plant can feel like one task too many. That's exactly where succulents shine. These remarkable plants have evolved to store water in their thick leaves and stems, making them uniquely suited to the rhythms of a busy modern life.",
      },
      {
        heading: "Built to survive, designed to thrive",
        body: "Succulents come from some of the harshest environments on earth — deserts, rocky hillsides, coastal cliffs where rain is rare and unpredictable. Over thousands of years they've developed a superpower: water storage. Their plump leaves can hold enough moisture to keep the plant alive for weeks, sometimes months, between waterings. For you, this means forgetting to water for two or three weeks isn't a death sentence — it's just Tuesday.",
      },
      {
        heading: "How to water a succulent (properly)",
        body: "The most common mistake with succulents is watering too frequently, not too little. The correct method is 'soak and dry': water deeply until it runs out of the drainage hole, then leave the soil completely alone until it's bone dry — usually 10 to 14 days in summer, longer in winter. Never mist succulents. Never let them sit in a saucer of water. And please, always use a pot with a drainage hole. Soggy roots are a succulent's only real enemy.",
      },
      {
        heading: "Light: the one thing they do need",
        body: "Succulents' one non-negotiable is light. They want bright, direct sun for at least four to six hours a day. A sunny south or west-facing windowsill is ideal. Without enough light they'll etiolate — stretch out in a desperate reach for the sun, losing their compact, rosette shape. If you don't have a bright window, a grow light on a timer does the job perfectly and gives you full flexibility over placement.",
      },
      {
        heading: "The variety is astonishing",
        body: "One of the joys of succulents is the sheer range. Echeverias form perfect geometric rosettes in shades of blue, purple, and coral. Haworthias stay small and elegant and tolerate lower light than most. Aloe is both beautiful and practical — the gel inside is a genuine remedy for minor burns. String of pearls trails dramatically from a hanging pot. Whether your aesthetic is minimalist, maximalist, or anywhere in between, there's a succulent that fits.",
      },
      {
        heading: "Low maintenance doesn't mean no maintenance",
        body: "Succulents are forgiving, but they still benefit from occasional attention. Remove dead leaves from the base to prevent pests and rot. Feed once a month during the growing season with a diluted succulent fertiliser. And check every few months whether they've outgrown their pot — when roots circle the bottom, it's time to move them up one size. A little care goes a long way, and the reward is a plant that looks stunning with minimal effort.",
      },
    ],
  },
  {
    slug: "how-to-water-your-plants-correctly",
    category: "Care Tips",
    title: "How to Water Your Plants Correctly",
    excerpt:
      "Overwatering is the #1 killer of houseplants. Learn how to read your plant's thirst signals and build a watering routine that actually works.",
    date: "March 28, 2026",
    readTime: "6 min read",
    color: "bg-blue-100",
    emoji: "💧",
    content: [
      {
        body: "Water. Plants need it to survive, yet more houseplants die from too much of it than from too little. Overwatering is the number one killer of indoor plants — and the frustrating part is that the symptoms look almost identical to underwatering: drooping leaves, yellowing, wilting. Learning to water well is the single most impactful skill you can develop as a plant parent.",
      },
      {
        heading: "Check before you water, always",
        body: "The golden rule: never water on a fixed schedule. Instead, check the soil. Push your finger about two inches into the compost — if it still feels damp, put the watering can down and come back in a few days. Only when the top layer is dry (or fully dry for succulents and cacti) should you water. A soil moisture meter takes the guesswork out entirely and costs very little. Lift the pot too — a light pot almost always means a thirsty plant.",
      },
      {
        heading: "How to water, not just when",
        body: "Technique matters. Water slowly and evenly across the whole surface of the soil until it flows freely from the drainage hole — this ensures the entire root system gets moisture, not just the top layer. Then empty the saucer underneath after 30 minutes so roots don't sit in standing water. Avoid wetting the leaves of plants like African violets, which are prone to fungal spots. For most tropical houseplants, giving a thorough drink and then letting them dry partially is the ideal rhythm.",
      },
      {
        heading: "Water quality and temperature",
        body: "Tap water is fine for most plants, but some are sensitive to the chlorine and fluoride it contains — spider plants and peace lilies can develop brown leaf tips as a result. Leaving tap water in an open jug overnight allows chlorine to dissipate. If you can collect rainwater, use it — plants genuinely respond to it. Temperature also matters: always use room-temperature water. Cold water from the tap can shock tropical roots and slow growth.",
      },
      {
        heading: "Reading your plant's signals",
        body: "Plants communicate constantly, if you know what to look for. Soft, drooping leaves on a plant with dry soil = thirsty. Soft, drooping leaves on a plant with wet soil = root rot from overwatering — a very different problem requiring a very different fix. Crispy brown leaf tips usually signal low humidity or inconsistent watering. Yellowing lower leaves often mean overwatering. When in doubt, check the roots: healthy roots are white or light tan; rotten roots are brown, mushy, and smell unpleasant.",
      },
      {
        heading: "Seasonal adjustments",
        body: "Plants don't have the same needs year-round. In spring and summer, active growth means they need more water — sometimes every few days for fast growers. In autumn and winter, most houseplants slow down significantly and need far less. A plant that needed water weekly in July might be fine every two to three weeks in December. Adjust with the seasons rather than sticking to a fixed routine, and your plants will thank you for it.",
      },
    ],
  },
  {
    slug: "best-plants-for-low-light-rooms",
    category: "Indoor Plants",
    title: "The Best Plants for Low-Light Rooms",
    excerpt:
      "No sunny windowsill? No problem. These shade-tolerant plants thrive in dimly lit corners and dark offices.",
    date: "March 20, 2026",
    readTime: "5 min read",
    color: "bg-purple-100",
    emoji: "🌑",
    content: [
      {
        body: "Not everyone has south-facing windows bathed in afternoon sun. Many homes have north-facing rooms, small windows blocked by neighbouring buildings, or interior spaces that rarely see direct daylight. The good news: a surprising number of plants not only tolerate low light but actually prefer it. Here's your guide to filling those shadowy corners with life.",
      },
      {
        heading: "What 'low light' actually means",
        body: "Low light doesn't mean no light — it means indirect, filtered, or ambient light without bright sun. A room where you can comfortably read without turning on a lamp is workable for low-light plants. A completely dark room with no natural light at all isn't suitable for any plant long-term without artificial grow lighting. If a space feels gloomy to you, it's gloomy to a plant too.",
      },
      {
        heading: "The best performers",
        body: "The ZZ plant (Zamioculcas zamiifolia) is arguably the most low-light tolerant houseplant in existence. Its waxy, dark green leaves look polished and architectural, and it can survive in conditions that would kill almost anything else. Snake plants are equally tough, growing slowly but steadily in near-darkness. Pothos adapts to low light better than almost any vining plant, though its growth will slow and leaf variegation may fade. Cast iron plants live up to their name — practically indestructible.",
      },
      {
        heading: "For a little drama",
        body: "If you want something with more presence, Chinese evergreens (Aglaonema) come in stunning shades of red, pink, and silver and genuinely thrive away from direct light. Peace lilies are one of the few flowering plants that tolerate shade, producing elegant white blooms even in dim conditions. Dracaena varieties — tall, structural, and striking — do well in bright indirect to low light and make excellent statement pieces for corners.",
      },
      {
        heading: "Managing expectations",
        body: "Low-light plants will grow more slowly than their sun-loving counterparts. Don't expect rapid growth or frequent repotting — these plants are conserving energy. They also need less frequent watering since lower light means slower moisture evaporation. Check soil thoroughly before each water and be prepared to wait longer between sessions. If you notice very leggy growth or significant pale leaves, the plant is reaching for more light than it's getting.",
      },
      {
        heading: "Rotate and rest",
        body: "Even shade-tolerant plants benefit from occasional brighter conditions. If you can, move your low-light plants to a brighter spot for a week or two every couple of months to let them recharge. Some people rotate plants between a dim display position and a brighter recovery spot near a window — a simple practice that keeps even the toughest plants looking their best over the long term.",
      },
    ],
  },
  {
    slug: "spring-gardening-tips-for-outdoor-spaces",
    category: "Outdoor",
    title: "Spring Gardening Tips for Outdoor Spaces",
    excerpt:
      "As the season changes, your garden wakes up. Here's everything you need to know to get your outdoor space blooming this spring.",
    date: "March 12, 2026",
    readTime: "7 min read",
    color: "bg-yellow-100",
    emoji: "🌸",
    content: [
      {
        body: "Spring is the gardener's new year. After months of dormancy, the soil warms, bulbs stir, and the whole garden seems to exhale. It's also the busiest time of year if you want to set yourself up for a summer of colour, fragrance, and growth. Here's how to make the most of the season.",
      },
      {
        heading: "Start with a clean slate",
        body: "Before you plant a single seed, spend time clearing the debris of winter. Remove dead stems and leaves that have accumulated — they can harbour pests and fungal disease. Cut back ornamental grasses and perennials that you left standing for winter interest. Rake leaves from lawn areas to prevent bare patches from forming. This tidying work is unglamorous but it pays dividends: a clean bed is a healthy bed.",
      },
      {
        heading: "Prepare your soil",
        body: "Soil is everything. Before planting, dig over any compacted areas with a fork and work in generous amounts of organic matter — well-rotted compost, garden manure, or leaf mould. This improves drainage, adds nutrients, and encourages the earthworm activity that aerates soil naturally. If you're planting into pots and containers, always start with fresh compost — old compost becomes depleted and compacted and won't give new plants the support they need.",
      },
      {
        heading: "Sow seeds early (but not too early)",
        body: "The temptation is always to start too soon. Cold soil and late frosts can set seedlings back significantly. Check your last frost date and count backwards. Many annuals and vegetables can be started indoors under grow lights 6–8 weeks before the last frost, then hardened off outdoors gradually before planting. Direct-sow hardy annuals like calendula, cornflower, and poppy as soon as the soil is workable — they germinate in cool conditions and are unfazed by light frosts.",
      },
      {
        heading: "Feed, mulch, divide",
        body: "Spring is the right time to feed established plants. A balanced slow-release fertiliser worked into the soil around perennials and shrubs sets them up for the growing season. Mulching bare soil between plants conserves moisture, suppresses weeds, and improves the look of beds significantly — use bark chips, composted leaves, or straw. And if your perennials have formed large clumps, spring is the perfect time to divide them: dig up the clump, split it with a spade, and replant the vigorous outer sections.",
      },
      {
        heading: "Think about pollinators",
        body: "A garden that's beautiful to you can also be a vital resource for bees, butterflies, and other pollinators. Plant a succession of flowering plants that bloom from early spring through autumn so there's always something in flower. Native wildflowers are especially valuable — they've co-evolved with local insects and provide exactly the nectar and pollen they need. Even a small patch of native flowers in a corner can make a meaningful difference to your local ecosystem.",
      },
      {
        heading: "Be patient with spring",
        body: "The final tip is also the hardest: don't rush it. Gardens have their own pace, and the urge to plant everything immediately is understandable but often counterproductive. Watch your space for a week or two before committing to major planting. See where the light falls, which areas drain slowly after rain, and where the wind is strongest. That knowledge will help you place the right plants in the right spots — and a well-placed plant will always outperform a rushed one.",
      },
    ],
  },
  {
    slug: "the-science-behind-plants-and-mental-health",
    category: "Wellness",
    title: "The Science Behind Plants & Mental Health",
    excerpt:
      "Studies show that having plants around reduces stress, boosts creativity, and improves mood. Here's what the research actually says.",
    date: "March 5, 2026",
    readTime: "8 min read",
    color: "bg-pink-100",
    emoji: "🧠",
    content: [
      {
        body: "It's not just your imagination. That sense of calm you feel in a plant-filled room, the gentle lift of mood when you water your favourites in the morning — there's real science behind it. Over the past two decades, researchers in environmental psychology, neuroscience, and public health have built a compelling body of evidence showing that contact with plants and natural environments has measurable positive effects on human wellbeing.",
      },
      {
        heading: "Stress reduction: the evidence",
        body: "One of the most replicated findings in environmental psychology is that exposure to nature — including indoor plants — reduces physiological stress markers. Studies measuring cortisol levels, heart rate, and blood pressure consistently show lower readings in participants who spend time around plants compared to those in plant-free environments. A landmark study by Ulrich and colleagues found that patients recovering from surgery needed less pain medication and had shorter hospital stays when their rooms had a view of trees. More recent studies have replicated this in office settings: workers in plant-rich environments report lower perceived stress and higher job satisfaction.",
      },
      {
        heading: "Attention restoration theory",
        body: "Psychologists Rachel and Stephen Kaplan developed Attention Restoration Theory (ART) to explain why natural environments feel so restorative. The idea is that directed attention — the kind we use for work, screens, and problem-solving — is a finite resource that fatigues over the course of a day. Natural environments engage a different, effortless kind of attention (what Kaplan calls 'fascination') that allows directed attention to recover. Even a brief interaction with a plant — noticing new growth, arranging a pot, watering — engages this restorative mode and provides genuine mental relief.",
      },
      {
        heading: "Plants and productivity",
        body: "Several studies have examined the relationship between plants and cognitive performance in workplace settings. A 2014 study by Nieuwenhuis and colleagues, published in the Journal of Experimental Psychology, found that enriching a previously 'lean' office with plants increased productivity by 15%. Workers reported higher levels of concentration, satisfaction, and perceived air quality. Similar findings have emerged in educational settings: students in classrooms with plants show better attendance, improved test scores, and more positive attitudes toward learning.",
      },
      {
        heading: "The air quality connection",
        body: "NASA's famous Clean Air Study suggested that common houseplants could remove volatile organic compounds (VOCs) from indoor air. While subsequent research has tempered the most optimistic claims — you'd need a very large number of plants to meaningfully clean a room — plants do have a genuine effect on indoor air quality. They absorb carbon dioxide and release oxygen. Some species (especially those with large leaf surfaces) do remove trace amounts of pollutants. And the calming visual effect of greenery may be as important to wellbeing as any direct air-quality benefit.",
      },
      {
        heading: "Biophilia: our innate connection to nature",
        body: "The biophilia hypothesis, introduced by biologist E.O. Wilson, proposes that humans have an innate, genetically encoded affinity for other living things — an evolved attraction to the natural world that shaped our development over hundreds of thousands of years as a species living within nature rather than separate from it. From this perspective, the positive effects of plants on mood and cognition aren't surprising at all. We are wired for greenery. The built environments we now inhabit are evolutionarily novel, and surrounding ourselves with plants is one way of meeting a deep biological need.",
      },
      {
        heading: "Putting the science to work",
        body: "You don't need a perfectly curated indoor jungle to experience the benefits. Research suggests that even a single plant on a desk can improve mood and focus. The act of caring for a plant — the routine of checking, watering, observing — provides structure, purpose, and a small, satisfying daily win. In a time when anxiety and burnout are widespread, that's not a trivial thing. Start small, stay consistent, and let the science do the rest.",
      },
    ],
  },
];
