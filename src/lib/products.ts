import type {
  Category,
  CategorySlug,
  Colorway,
  LookbookShot,
  Product,
} from "./types";

/**
 * Mock catalogue.
 *
 * Photography is placeholder until the brand's own shoot lands. Every frame is
 * requested at a fixed 3:4 crop so the grid stays flush regardless of the
 * source image, and every accessor below is async on purpose: when the backend
 * exists, replace the body of each function with a `fetch()` and nothing else
 * in the app changes.
 */

/** Editorial 3:4 crop. */
const shot = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&h=1600&q=80`;

/** Wide 3:2 crop for the lookbook and category rails. */
const wide = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&h=1100&q=80`;

const BLACK: Colorway = { id: "black", name: "أسود", hex: "#0f0f0f" };
const CHROME: Colorway = { id: "chrome", name: "كروم", hex: "#c0c0c0" };
const BONE: Colorway = { id: "bone", name: "عظمي", hex: "#e6e2da" };
const SMOKE: Colorway = { id: "smoke", name: "رمادي دخاني", hex: "#6a6a6a" };
const ABYSS_BLUE: Colorway = { id: "blue", name: "أزرق عميق", hex: "#4a90e2" };
const RUST: Colorway = { id: "rust", name: "صدئ", hex: "#8a4b32" };

export const categories: Category[] = [
  {
    slug: "new",
    name: "التشكيلة الجديدة",
    tagline: "اللي نزل هذا الأسبوع من دروب خريف 2026",
  },
  {
    slug: "jackets",
    name: "جاكيتات",
    tagline: "الطبقة اللي تكمّل اللبسة",
    image: wide("1611312449408-fcece27cdbb7"),
  },
  {
    slug: "tees",
    name: "تيشيرتات",
    tagline: "تيشيرتات وهوديز وسويت شيرتات",
    image: wide("1503341504253-dff4815485f1"),
  },
  {
    slug: "pants",
    name: "بناطيل",
    tagline: "كارجو وقصّات واسعة",
    image: wide("1594633312681-425c7b97ccd1"),
  },
  {
    slug: "accessories",
    name: "إكسسوارات",
    tagline: "التفصيلة اللي تفرق",
    image: wide("1529139574466-a303027c1d8b"),
  },
  {
    slug: "footwear",
    name: "أحذية",
    tagline: "نعل ثقيل وستايل تسعينات",
    image: wide("1560769629-975ec94e6a86"),
  },
  {
    slug: "sale",
    name: "تخفيضات",
    tagline: "اللي باقي من دروبات قبل",
  },
];

const products: Product[] = [
  {
    id: 1,
    slug: "chrome-jacket",
    name: "جاكيت كروم أبيض",
    subtitle: "CHROME JACKET",
    price: 499,
    categories: ["new", "jackets"],
    sizes: ["S", "M", "L", "XL"],
    colors: [CHROME, BLACK],
    images: [shot("1551028719-00167b16eac5")],
    description:
      "سطحه يعكس الضوء ما يمتصه، فلونه يتغيّر مع كل إضاءة تمر عليه. القطعة الوحيدة في الدروب اللي تشوفها قبل ما تشوف اللي لابسها.",
    details: [
      "طبقة خارجية مطلية بالبولي يوريثان",
      "بطانة شبك خفيفة ما تلزق على الجسم",
      "سحّاب معدني مطفي بمقبض مطاطي",
      "نظّفه بقماشة مبلولة بس — لا تحطه بالغسالة",
    ],
    isNew: true,
  },
  {
    id: 2,
    slug: "abyss-black-tee",
    name: "تيشيرت أبيس أسود",
    subtitle: "ABYSS BLACK TEE",
    price: 199,
    categories: ["new", "tees"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [BLACK, BONE],
    images: [shot("1503341504253-dff4815485f1")],
    description:
      "أثقل قطن اشتغلنا عليه، مصبوغ بعد الحياكة عشان يظل أسود بعد عشر غسلات. الطباعة على الظهر بحبر مائي يدخل بالقماش ما يجلس فوقه.",
    details: [
      "قطن ممشوط 240 غرام/م²",
      "قصّة أوفرسايز — أوسع بمقاس عن المعتاد",
      "أكتاف مسدلة وحواف مزدوجة الخياطة",
      "غسيل بارد وتنشيف بالهوا",
    ],
    isNew: true,
    isBestseller: true,
  },
  {
    id: 3,
    slug: "silver-cargo",
    name: "بنطلون كارجو فضي",
    subtitle: "SILVER CARGO",
    price: 349,
    categories: ["new", "pants"],
    sizes: ["S", "M", "L", "XL"],
    colors: [CHROME, BLACK],
    images: [shot("1594633312681-425c7b97ccd1")],
    description:
      "ساق مستقيمة تتوسّع من الركبة، وستة جيوب عميقة تشيل أغراضك فعلاً — مو زينة. مصمّم تلبسه كل يوم مو لموسم.",
    details: [
      "تويل قطني مطلي 320 غرام/م²",
      "خصر مطاطي مع رباط داخلي",
      "ستة جيوب شغّالة، ثنتين منها بغطاء",
      "طول الساق 104 سم لمقاس L",
    ],
    isNew: true,
  },
  {
    id: 4,
    slug: "abyss-blue-hoodie",
    name: "هودي أبيس أزرق",
    subtitle: "ABYSS BLUE HOODIE",
    price: 399,
    categories: ["new", "tees"],
    sizes: ["S", "M", "L", "XL"],
    colors: [ABYSS_BLUE, BLACK],
    images: [shot("1517841905240-472988babdf9")],
    description:
      "الأزرق الوحيد في الدروب، مأخوذ من لون الماء عند آخر عمق يوصله الضوء. بطانة داخلية ثقيلة، والكبوت يحفظ شكله بعد سنة.",
    details: [
      "مزيج قطن 80٪ وبوليستر 20٪ — 420 غرام/م²",
      "كبوت مبطّن بطبقتين",
      "جيب كنغر بخياطة مقواة",
      "تطريز على الصدر بخيط نفس اللون",
    ],
    isNew: true,
    isBestseller: true,
  },
  {
    id: 5,
    slug: "metallic-dress",
    name: "فستان ميتاليك",
    subtitle: "METALLIC DRESS",
    price: 429,
    categories: ["new"],
    sizes: ["XS", "S", "M", "L"],
    colors: [CHROME, BLACK],
    images: [shot("1534528741775-53994a69daeb")],
    description:
      "قماش معدني ينزل على الجسم بنعومة الحرير مو بقساوة المعدن. طوله تحت الركبة، وفيه فتحة خلفية تخليك تمشين بخطوة كاملة.",
    details: [
      "بوليستر ميتاليك مبطّن بالكامل",
      "سحّاب مخفي من الجنب",
      "الطول 116 سم لمقاس S",
      "تنظيف جاف بس",
    ],
    isNew: true,
  },
  {
    id: 6,
    slug: "y2k-sneaker",
    name: "سنيكرز ي2كي",
    subtitle: "Y2K RUNNER",
    price: 599,
    categories: ["new", "footwear"],
    sizes: ["S", "M", "L", "XL"],
    colors: [BONE, CHROME],
    images: [shot("1560769629-975ec94e6a86")],
    description:
      "نعل ثقيل وخطوط مأخوذة من جزم الجري حق 2002، بدون مبالغة. مبطّن عند الكاحل عشان تلبسه طول اليوم.",
    details: [
      "نعل خارجي مطاط بارتفاع 4 سم",
      "وجه شبك مع أشرطة جلد صناعي",
      "فرشة داخلية تنشال",
      "المقاسات هنا بالأحرف — شوف دليل المقاسات",
    ],
    isNew: true,
    isBestseller: true,
    soldOutSizes: ["S"],
  },
  {
    id: 7,
    slug: "bone-oversized-tee",
    name: "تيشيرت أوفرسايز عظمي",
    subtitle: "BONE OVERSIZED TEE",
    price: 179,
    categories: ["tees"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [BONE, SMOKE],
    images: [shot("1521572163474-6864f9cf17ab")],
    description:
      "أبيض مايل للعظمي، لأن الأبيض الصافي يصفرّ مع الوقت وهذا لا. نفس قصّة التيشيرت الأسود بالضبط.",
    details: [
      "قطن ممشوط 240 غرام/م²",
      "قصّة أوفرسايز",
      "بدون تاق داخلي — الطباعة على الرقبة",
      "اغسله بارد مع الألوان الفاتحة",
    ],
  },
  {
    id: 8,
    slug: "drop-01-hoodie",
    name: "هودي الإصدار الأول",
    subtitle: "DROP 01 HOODIE",
    price: 349,
    categories: ["tees"],
    sizes: ["S", "M", "L", "XL"],
    colors: [SMOKE, BLACK],
    images: [shot("1550246140-29f40b909e5a")],
    description:
      "أول قطعة نزّلناها، ولين الحين الأكثر طلباً. أعدناها مرة وحدة بس، ومن نفس دفعة الخيط.",
    details: [
      "مزيج قطن 80٪ وبوليستر 20٪ — 420 غرام/م²",
      "كبوت مبطّن بطبقتين",
      "جيب كنغر بخياطة مقواة",
      "الشعار مطبوع بالحرارة على الظهر",
    ],
    isBestseller: true,
    soldOutSizes: ["S"],
  },
  {
    id: 9,
    slug: "washed-denim-jacket",
    name: "جاكيت دنيم مغسول",
    subtitle: "WASHED DENIM",
    price: 429,
    categories: ["jackets"],
    sizes: ["S", "M", "L", "XL"],
    colors: [SMOKE, BLACK],
    images: [shot("1611312449408-fcece27cdbb7")],
    description:
      "دنيم مغسول مرتين عشان يجيك مريح من أول يوم. الياقة من قماش مختلف، والأزرار تروح لمعتها مع الاستعمال — بقصد.",
    details: [
      "دنيم 12 أونصة",
      "مغسول غسلتين قبل ما يوصلك",
      "ياقة قطيفة بلون مختلف",
      "قصّة واسعة شوي — خذ مقاسك المعتاد",
    ],
    isBestseller: true,
  },
  {
    id: 10,
    slug: "chrome-crewneck",
    name: "سويت شيرت كروم",
    subtitle: "CHROME CREWNECK",
    price: 279,
    categories: ["tees"],
    sizes: ["S", "M", "L", "XL"],
    colors: [BONE, SMOKE],
    images: [shot("1620799140408-edc6dcb6d633")],
    description:
      "التطريز على الصدر بخيط واحد متصل. من بعيد يبان خط، ومن قريب يطلع لك الاسم.",
    details: [
      "قطن حلقي 380 غرام/م²",
      "تطريز مباشر — مو طباعة",
      "ياقة مضلّعة ما تتمدد",
      "قصّة عادية",
    ],
  },
  {
    id: 11,
    slug: "logo-cap",
    name: "قبعة مطرزة",
    subtitle: "LOGO CAP",
    price: 119,
    categories: ["accessories"],
    sizes: ["M"],
    colors: [BLACK, BONE],
    images: [shot("1571945153237-4929e783af4a")],
    description:
      "ست قطع، حرف منحني جاهز، وإغلاق معدني من ورا. مقاس واحد يضبط على الكل.",
    details: [
      "قطن تويل بدون تنشية",
      "حرف منحني",
      "إغلاق معدني تعدّله على راسك",
      "تطريز أمامي بخيط نفس اللون",
    ],
  },
  {
    id: 12,
    slug: "chrome-shades",
    name: "نظارة كروم",
    subtitle: "CHROME SHADES",
    price: 229,
    categories: ["accessories", "new"],
    sizes: ["M"],
    colors: [CHROME, BLACK],
    images: [shot("1529139574466-a303027c1d8b")],
    description:
      "إطار ملفوف بعدسة وحدة متصلة — الشكل اللي ما أحد صار يسويه من 2004. عدسة ضد الانعكاس وحماية كاملة.",
    details: [
      "إطار أسيتات مصقول",
      "عدسة وحدة متصلة بحماية UV400",
      "أذرع مرنة بمفصّلة معدنية",
      "تجيك مع جراب قماش",
    ],
  },
  {
    id: 13,
    slug: "wide-trouser",
    name: "بنطلون واسع رمادي",
    subtitle: "WIDE TROUSER",
    price: 319,
    categories: ["pants"],
    sizes: ["XS", "S", "M", "L"],
    colors: [SMOKE, BLACK],
    images: [shot("1517445312882-bc9910d016b7")],
    description:
      "خصر عالي وساق تنزل مستقيمة من الورك للأرض. مصمّم يتلبس مع جزمة نعلها ثقيل.",
    details: [
      "صوف مخلوط بملمس ناعم",
      "خصر عالي مع حزام داخلي",
      "ثنية وحدة من قدام",
      "الطول 108 سم لمقاس S",
    ],
  },
  {
    id: 14,
    slug: "striped-y2k-pant",
    name: "بنطلون مخطط ي2كي",
    subtitle: "Y2K STRIPE PANT",
    price: 289,
    categories: ["pants"],
    sizes: ["XS", "S", "M", "L"],
    colors: [BLACK, BONE],
    images: [shot("1509631179647-0177331693ae")],
    description:
      "خطوط طولية تطوّل الساق، وقصّة تتوسّع من الركبة وتحت. القطعة اللي تشيل اللبسة كلها لحالها.",
    details: [
      "بوليستر مخلوط بملمس حرير",
      "خصر مطاطي من ورا",
      "يتوسّع من الركبة",
      "اغسله بارد وهو مقلوب",
    ],
  },
  {
    id: 15,
    slug: "pastel-runner",
    name: "سنيكرز باستيل",
    subtitle: "PASTEL RUNNER",
    price: 549,
    oldPrice: 649,
    categories: ["footwear", "sale"],
    sizes: ["S", "M", "L", "XL"],
    colors: [BONE, CHROME],
    images: [shot("1595950653106-6c9ebd614d3a")],
    description:
      "ألوان فاتحة على نعل أبيض سميك. آخر اللي باقي من دفعة الصيف، وما راح تنزل مرة ثانية.",
    details: [
      "جلد صناعي مع قطع شبك",
      "نعل أوسط مبطّن",
      "هذا اللون ما يتعاد",
      "المقاسات بالأحرف — شوف دليل المقاسات",
    ],
    soldOutSizes: ["XL"],
  },
  {
    id: 16,
    slug: "rust-bomber",
    name: "جاكيت بومبر صدئ",
    subtitle: "RUST BOMBER",
    price: 459,
    oldPrice: 599,
    categories: ["jackets", "sale"],
    sizes: ["M", "L", "XL"],
    colors: [RUST, BLACK],
    images: [shot("1591047139829-d91aecb6caea")],
    description:
      "الطبقة اللي تكمّل اللبسة. مبطّن خفيف يكفي لليالي الرياض، وسحّابه يفتح باتجاه واحد بسلاسة.",
    details: [
      "سطح خارجي يصد الماء",
      "بطانة داخلية خفيفة",
      "أساور وحزام سفلي مضلّع",
      "جيب داخلي واحد بسحّاب",
    ],
  },
];

/** The lookbook triptych: one tall frame, two stacked. */
export const lookbook: LookbookShot[] = [
  {
    src: wide("1534528741775-53994a69daeb"),
    alt: "عارضة لابسة قطعة سوداء تحت إضاءة زرقاء باردة",
  },
  {
    src: wide("1517841905240-472988babdf9"),
    alt: "هودي رمادي تحت جاكيت دنيم قدام جدار أزرق",
  },
  {
    src: wide("1509631179647-0177331693ae"),
    alt: "بنطلون مخطط بقصّة واسعة تحت إضاءة نيون",
  },
];

/* ── Accessors ─────────────────────────────────────────────────────────────
   Swap these bodies for real requests when the API exists. Signatures stay. */

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(
  category: CategorySlug
): Promise<Product[]> {
  return products.filter((p) => p.categories.includes(category));
}

export async function getNewDrop(limit = 6): Promise<Product[]> {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export async function getBestsellers(): Promise<Product[]> {
  return products.filter((p) => p.isBestseller);
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategory(slug: string): Promise<Category | null> {
  return categories.find((c) => c.slug === slug) ?? null;
}

/** Categories shown on the browse rail — the five that have a card image. */
export function getBrowseCategories(): Category[] {
  return categories.filter((c) => Boolean(c.image));
}

/** Products shown in the "you might also like" strip on a product page. */
export async function getRelatedProducts(
  slug: string,
  limit = 4
): Promise<Product[]> {
  const current = products.find((p) => p.slug === slug);
  if (!current) return products.slice(0, limit);

  return products
    .filter(
      (p) =>
        p.slug !== slug &&
        p.categories.some((c) => current.categories.includes(c))
    )
    .slice(0, limit);
}

/**
 * Substring match over the arabic name, latin subtitle and category labels.
 *
 * Synchronous because the search overlay filters on every keystroke against
 * the in-memory catalogue. When search moves server-side, keep this for the
 * client and let `searchProducts` below become the network call.
 */
export function searchProductsSync(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return products.filter((p) => {
    const haystack = [
      p.name,
      p.subtitle,
      ...p.categories.map(
        (c) => categories.find((cat) => cat.slug === c)?.name ?? ""
      ),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export async function searchProducts(query: string): Promise<Product[]> {
  return searchProductsSync(query);
}

/** Formats a SAR price. Western numerals — the Saudi retail convention. */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
