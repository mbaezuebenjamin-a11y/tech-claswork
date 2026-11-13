import { Article } from '../types/blog';

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'quiet-geometry-of-morning-light',
    title: 'The Quiet Geometry of Morning Light',
    subtitle: 'How contemporary studios are trading open-plan clamor for pale travertine, lime plaster, and deliberate shadow.',
    excerpt:
      'Inside a sunlit studio where honed stone, warm oak, and unhurried mornings reshape creative clarity.',
    category: 'Architecture',
    author: 'Clara Lindqvist',
    authorRole: 'Architecture Editor',
    publishedAt: 'Nov 10, 2026',
    readTime: '7 min read',
    coverImage: '/src/assets/images/hero_editorial_studio_1794571136630.jpg',
    coverAlt: 'Sunlit minimalist design studio with pale travertine desk and open art monograph',
    figureCaption: 'Fig. 01 — Morning light traversing lime-washed plaster across the courtyard desk.',
    featured: true,
    pullQuote:
      'A room does not merely house the work you do; its proportions quietly decide the speed at which you think.',
    body: [
      'Before a single sketch is drawn or a sentence typed, light writes its own schedule across the plaster wall. In an era obsessed with hyper-optimized productivity desks, a growing circle of architects and independent publishers are returning to rooms shaped around natural daylight rather than overhead glare.',
      'Walking into the studio at seven in the morning, the travertine slab still holds the cool stillness of night. There are no glowing monitors mounted to articulated arms, no tangle of nylon cables crowding the floor. Instead, a linen-bound monograph rests open beside a salt-glazed stoneware vessel, catching the first angled rays through steel-framed glazing.',
      'Material restraint is not an exercise in austerity; it is an act of editing. When surfaces are honest—honed limestone, oiled European oak, unbleached linen—the eye finds places to rest between periods of intense concentration. Every object earns its footprint through daily utility or quiet permanence.',
      'Over the past decade, studio design drifted toward acoustic pods and bright lounges meant to simulate hospitality. Yet what creative work genuinely requires is continuity: a space that ages gracefully alongside the projects conceived within it, marking the seasons not by software updates, but by the shifting angle of the afternoon sun.'
    ]
  },
  {
    id: 'art-2',
    slug: 'rituals-of-wild-fermentation',
    title: 'Rituals of Wild Fermentation & Table',
    subtitle: 'Stone-milled loaves, cold-pressed olive oil, and the quiet patience required at a limestone kitchen table.',
    excerpt:
      'Exploring heritage grain milling and 36-hour fermentation with bakers who measure time by aroma and crust.',
    category: 'Gastronomy',
    author: 'Mateo Alvarez',
    authorRole: 'Culinary Editor',
    publishedAt: 'Nov 05, 2026',
    readTime: '6 min read',
    coverImage: '/src/assets/images/article_culinary_ritual_1794571137801.jpg',
    coverAlt: 'Artisanal sourdough loaf on wooden board beside stoneware bowls, flaky sea salt, and olive oil',
    figureCaption: 'Fig. 02 — Freshly milled heritage wheat loaf paired with early-harvest olive oil and rosemary.',
    pullQuote:
      'Good bread cannot be hurried; it asks only for flour, water, salt, and your willingness to wait.',
    body: [
      'Across a pitted limestone table, a blistered country loaf cools on rough linen while morning mist lifts outside the stone casement. Beside it sits a small ceramic bowl of flaky sea salt and a glass cruet filled with peppery green olive oil steeped with garden rosemary.',
      'Working with stone-ground heritage wheat changes how a baker listens to dough. Unlike uniform commercial flours, freshly milled grain drinks water unpredictably, shifting slightly with each harvest and rainfall pattern.',
      'When sliced thick and torn by hand, the crumb reveals an open honeycomb sheen—proof that thirty-six hours of cool fermentation transformed simple pantry staples into a meal worthy of gathering around.'
    ]
  },
  {
    id: 'art-3',
    slug: 'pavilions-of-cedar-and-water',
    title: 'Pavilions of Cedar and Still Water',
    subtitle: 'Exploring timber-framed sanctuaries designed to frame wind, reflection, and late afternoon sun.',
    excerpt:
      'Set beside a shallow reflecting basin, this cedar and board-formed concrete pavilion turns weather into ornament.',
    category: 'Architecture',
    author: 'Kenji Takahashi',
    authorRole: 'Contributing Architect',
    publishedAt: 'Oct 29, 2026',
    readTime: '6 min read',
    coverImage: '/src/assets/images/article_architecture_light_1794571136847.jpg',
    coverAlt: 'Minimalist concrete and cedar courtyard pavilion beside a calm reflecting pool',
    figureCaption: 'Fig. 03 — Western cedar slats casting late-afternoon shadows across the reflecting basin.',
    pullQuote:
      'Water acts as an inverted sky, doubling the quietness of timber walls without adding a single square meter.',
    body: [
      'When architecture steps back from spectacle, landscape steps forward. Built on the edge of an olive grove, this compact pavilion pairs rough board-formed concrete with horizontal western red cedar louvers that breathe with shifting humidity.',
      'Rather than enclosing the interior behind floor-to-ceiling glass, the architects carved deep recessed thresholds that invite breezes straight through the central chamber. At dusk, the reflecting pool along the southern perimeter mirrors the warm amber grain of the timber, dissolving the boundary between built edge and water.',
      'There are no motorized blinds or recessed downlights here. Illumination arrives strictly through the rhythm of vertical apertures, reminding visitors that shelter can feel both grounded and completely porous to the world outside.'
    ]
  },
  {
    id: 'art-4',
    slug: 'permanence-of-hand-set-type',
    title: 'The Permanence of Hand-Set Type',
    subtitle: 'Inside an independent bindery keeping cotton rag paper, brass calipers, and letterpress alive.',
    excerpt:
      'Why tactile printmaking and sewn bindings continue to captivate designers raised on infinite digital scrolls.',
    category: 'Craft',
    author: 'Arthur Vance',
    authorRole: 'Senior Features Writer',
    publishedAt: 'Oct 21, 2026',
    readTime: '8 min read',
    coverImage: '/src/assets/images/article_analog_craft_1794571137134.jpg',
    coverAlt: 'Artisan printmaking workbench with handmade cotton paper, brass calipers, and ceramic inkwell',
    figureCaption: 'Fig. 04 — Measuring deckle margins on 300gsm cotton rag sheets before stitching.',
    pullQuote:
      'Ink pressed into damp cotton fibers carries a physical memory that pixels can imitate but never hold.',
    body: [
      'The workbench smells faintly of linseed oil, beeswax, and aged cedar drawers. Along the oak surface, brass calipers rest atop stacks of deckle-edged cotton paper, each sheet inspected by hand against the northern window light before touching the press.',
      'For thirty years, master printer Henrik Solberg has watched digital publishing accelerate from weekly newsletters to real-time feeds. Paradoxically, his smallest print runs—editions of two hundred sewn chapbooks—now sell out faster than ever, collected by software engineers and typographers alike.',
      'To set a page by hand is to respect constraints. Every millimeter of margin must be calculated physically with wooden furniture and quoins. You cannot endlessly nudge a layout at midnight; you commit to proportion, pull a proof, and trust the weight of the impression.'
    ]
  },
  {
    id: 'art-5',
    slug: 'morning-espresso-above-the-aegean',
    title: 'Morning Espresso Above the Aegean',
    subtitle: 'Slowing the itinerary on quiet island terraces where ferries dictate the pace of the day.',
    excerpt:
      'Bypassing crowded viewpoints for limestone courtyards, early morning swims, and unhurried coastal rhythms.',
    category: 'Travel',
    author: 'Elena Rostova',
    authorRole: 'Travel Correspondent',
    publishedAt: 'Oct 14, 2026',
    readTime: '5 min read',
    coverImage: '/src/assets/images/article_slow_travel_1794571137532.jpg',
    coverAlt: 'Limestone terrace overlooking calm Aegean sea at dawn with wooden chair and espresso cup',
    figureCaption: 'Fig. 05 — First light over the harbor before the morning mail boat arrives.',
    pullQuote:
      'The finest souvenirs are rarely packed in luggage; they are rhythms you borrow and carry home.',
    body: [
      'At six-thirty in the morning, the Cycladic wind drops to a whisper. Out on the limestone terrace, the sea looks less like water and more like hammered pewter, catching faint ribbons of rose from the eastern horizon.',
      'Travel often collapses into a checklist of landmarks photographed between transit connections. Staying on a single island for two full weeks reverses that impulse: you begin noticing which shutters open first, how figs ripen along dry-stone walls, and when the baker pulls sesame rings from the wood oven.',
      'With a speckled stoneware cup of espresso warming your palms and linen draped over a weathered teak chair, there is nowhere urgent to be until midday heat sends everyone back indoors.'
    ]
  },
  {
    id: 'art-6',
    slug: 'architecture-of-the-private-library',
    title: 'The Architecture of the Private Library',
    subtitle: 'Designing intimate reading sanctuaries where tall oak shelving and soft lamp light anchor the home.',
    excerpt:
      'Why dedicated rooms for physical books remain our most enduring antidote to fragmented attention.',
    category: 'Architecture',
    author: 'Clara Lindqvist',
    authorRole: 'Architecture Editor',
    publishedAt: 'Oct 02, 2026',
    readTime: '7 min read',
    coverImage: '/src/assets/images/auth_editorial_cover_1794571138450.jpg',
    coverAlt: 'Warm oak library with tall bookshelves, leather armchair, and tall arched windows',
    figureCaption: 'Fig. 06 — Double-height white oak shelving framing an arched reading alcove.',
    pullQuote:
      'A personal library is never finished; it is a quiet autobiography written in spines and margin notes.',
    body: [
      'Step inside a room lined floor-to-ceiling with seasoned oak shelves and the acoustics change immediately. Hundreds of paper spines absorb harsh echoes, replacing the brightness of modern interiors with a cushioned, library hush.',
      'Rather than treating books as decorative styling props arranged by jacket color, thoughtful architects build libraries around reach, posture, and light. A well-placed leather armchair angled beneath an arched linen-curtained window turns an overlooked corridor into the heart of a residence.',
      'When evening settles, a single brass reading lamp casts a warm pool across worn floorboards—reminding us that solitude, properly framed, feels less like isolation and more like company.'
    ]
  }
];
