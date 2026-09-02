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
    tagline: "ما نزل هذا الأسبوع من تشكيلة خريف ٢٠٢٦",
  },
  {
    slug: "jackets",
    name: "جاكيتات",
    tagline: "الطبقة التي تُنهي المظهر",
    image: wide("1611312449408-fcece27cdbb7"),
  },
  {
    slug: "tees",
    name: "تيشيرتات",
    tagline: "تيشيرتات، هوديز، وسويت شيرتات",
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
    tagline: "التفصيل الأخير",
    image: wide("1529139574466-a303027c1d8b"),
  },
  {
    slug: "footwear",
    name: "أحذية",
    tagline: "نعل ثقيل وخطوط تسعينية",
    image: wide("1560769629-975ec94e6a86"),
  },
  {
    slug: "sale",
    name: "تخفيضات",
    tagline: "ما تبقّى من المواسم السابقة",
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
      "سطح لامع يعكس الضوء بدل أن يمتصّه، فيتغيّر لون الجاكيت مع كل مصدر إضاءة يمرّ عليه. القطعة الوحيدة في التشكيلة التي تُرى قبل أن يُرى صاحبها.",
    details: [
      "طبقة خارجية مطلية بالبولي يوريثان",
      "بطانة شبكية خفيفة تمنع الالتصاق",
      "سحّاب معدني مطفي بمقبض مطاطي",
      "تنظيف بقطعة قماش رطبة فقط — لا غسالة",
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
      "قطننا الأثقل حتى الآن، مصبوغ بعد الحياكة ليبقى أسود بعد الغسلة العاشرة. الطباعة على الظهر بحبر مائي يدخل في النسيج بدل أن يجلس فوقه.",
    details: [
      "قطن ممشوط ٢٤٠ غرام/م²",
      "قصّة أوفرسايز — أوسع بمقاس عن المعتاد",
      "أكتاف مسدلة وحواف مزدوجة الخياطة",
      "غسيل بارد، تجفيف بالهواء",
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
      "ساق مستقيمة تتّسع من الركبة، وستة جيوب بعمق حقيقي — لا زينة. صُمّم ليُلبس كل يوم لا لموسم واحد.",
    details: [
      "تويل قطني مطلي ٣٢٠ غرام/م²",
      "خصر مطاطي مع رباط داخلي",
      "ستة جيوب عاملة، اثنان منها بغطاء",
      "طول الساق ١٠٤ سم لمقاس L",
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
      "الأزرق الوحيد في التشكيلة، مأخوذ من لون الماء عند آخر عمق يصله الضوء. بطانة داخلية كثيفة وقبعة تحفظ شكلها بعد سنة.",
    details: [
      "مزيج قطن ٨٠٪ وبوليستر ٢٠٪ — ٤٢٠ غرام/م²",
      "قبعة مبطّنة بطبقتين",
      "جيب كنغر بخياطة مقواة",
      "تطريز على الصدر بخيط مطابق للون",
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
      "نسيج معدني يسقط على الجسم بثقل الحرير لا بصلابة المعدن. طول تحت الركبة، وفتحة خلفية تكفي للمشي بخطوة كاملة.",
    details: [
      "بوليستر ميتاليك مبطّن بالكامل",
      "سحّاب مخفي على الجانب",
      "طول ١١٦ سم لمقاس S",
      "تنظيف جاف فقط",
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
      "نعل ثقيل وخطوط مقتبسة من أحذية الجري في ٢٠٠٢، بلا حنين زائد. مبطّن عند الكاحل ليُلبس طول اليوم.",
    details: [
      "نعل خارجي مطاطي بارتفاع ٤ سم",
      "وجه شبكي مع أشرطة من الجلد الصناعي",
      "بطانة داخلية قابلة للإزالة",
      "المقاسات هنا بالأحرف — راجع دليل المقاسات",
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
      "أبيض يميل إلى العظمي، لأن الأبيض الصافي يصفرّ مع الوقت وهذا لا يفعل. القصّة نفسها التي في التيشيرت الأسود.",
    details: [
      "قطن ممشوط ٢٤٠ غرام/م²",
      "قصّة أوفرسايز",
      "بلا علامة داخلية — طباعة على الرقبة",
      "غسيل بارد مع الألوان الفاتحة",
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
      "أول ما أطلقناه، وما زال الأكثر طلباً. أعدنا طباعته مرة واحدة فقط وبنفس الدفعة من الخيط.",
    details: [
      "مزيج قطن ٨٠٪ وبوليستر ٢٠٪ — ٤٢٠ غرام/م²",
      "قبعة مبطّنة بطبقتين",
      "جيب كنغر بخياطة مقواة",
      "شعار مطبوع بالحرارة على الظهر",
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
      "دنيم مغسول مرتين ليبدأ مرتاحاً من أول يوم. ياقة من قماش مخالف، وأزرار تفقد لمعتها عمداً مع الاستعمال.",
    details: [
      "دنيم ١٢ أونصة",
      "غسلتان قبل البيع",
      "ياقة قطيفة بلون مخالف",
      "قصّة واسعة قليلاً — خذ مقاسك المعتاد",
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
      "التطريز على الصدر مصنوع بخيط واحد متصل. من بعيد يبدو خطاً، ومن قريب يظهر الاسم.",
    details: [
      "قطن حلقي ٣٨٠ غرام/م²",
      "تطريز مباشر — لا طباعة",
      "ياقة مضلّعة مقاومة للتمدد",
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
      "ستة قطع، حافة منحنية مسبقاً، وإغلاق معدني خلفي. مقاس واحد يضبط الجميع.",
    details: [
      "قطن تويل غير منشّى",
      "حافة منحنية",
      "إغلاق معدني قابل للتعديل",
      "تطريز أمامي بخيط مطابق",
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
      "إطار ملفوف بعدسة واحدة متصلة — الشكل الذي لم يعد أحد يصنعه منذ ٢٠٠٤. عدسات مضادة للانعكاس بحماية كاملة.",
    details: [
      "إطار من الأسيتات المصقول",
      "عدسة واحدة متصلة بحماية UV400",
      "أذرع مرنة بمفصلة معدنية",
      "تأتي بجراب قماشي",
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
      "خصر مرتفع وساق تسقط مستقيمة من الورك إلى الأرض. صُمّم ليُلبس مع حذاء ذي نعل ثقيل.",
    details: [
      "صوف مخلوط بملمس ناعم",
      "خصر مرتفع مع حزام داخلي",
      "ثنية أمامية واحدة",
      "طول ١٠٨ سم لمقاس S",
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
      "خطوط رأسية تطيل الساق، وقصّة تتّسع من الركبة إلى الأسفل. القطعة التي تحمل المظهر كله وحدها.",
    details: [
      "بوليستر مخلوط بملمس حريري",
      "خصر مطاطي من الخلف",
      "قصّة واسعة من الركبة",
      "غسيل بارد على الوجه المقلوب",
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
      "ألوان باهتة على نعل أبيض سميك. آخر ما تبقّى من دفعة الصيف، ولن تُطبع مرة أخرى.",
    details: [
      "جلد صناعي مع لوحات شبكية",
      "نعل أوسط مبطّن",
      "لا إعادة طباعة لهذا اللون",
      "المقاسات بالأحرف — راجع دليل المقاسات",
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
      "الطبقة التي تُنهي المظهر. مبطّن بخفة يكفي لليالي الرياض، وسحّاب يفتح باتجاه واحد بسلاسة.",
    details: [
      "سطح خارجي مقاوم للماء",
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
    alt: "عارضة ترتدي قطعة سوداء تحت إضاءة زرقاء باردة",
  },
  {
    src: wide("1517841905240-472988babdf9"),
    alt: "هودي رمادي تحت جاكيت دنيم أمام جدار أزرق",
  },
  {
    src: wide("1509631179647-0177331693ae"),
    alt: "بنطلون مخطط بقصّة واسعة في إضاءة نيون",
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
