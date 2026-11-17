// All copy lives here. Every user-facing string is { en, ar }.

export const navItems = [
  { id: 'work', label: { en: 'Work', ar: 'الأعمال' } },
  { id: 'principles', label: { en: 'Principles', ar: 'المبادئ' } },
  { id: 'career', label: { en: 'Career', ar: 'المسيرة' } },
  { id: 'contact', label: { en: 'Contact', ar: 'التواصل' } },
]

export const hero = {
  eyebrow: { en: 'Senior Backend Engineer · Nawah', ar: 'مهندس Backend أول · نواة' },
  first: { en: 'Hosam', ar: 'حسام' },
  last: { en: 'Mohamed', ar: 'محمد' },
  leadStrong: {
    en: 'I build the backend that other systems lean on.',
    ar: 'أبني الأنظمة الخلفية التي تعتمد عليها الأنظمة الأخرى.',
  },
  leadRest: {
    en: ' PHP and Laravel since 2022: queues, third-party integrations and the databases underneath them.',
    ar: ' أعمل بـPHP و Laravel منذ ٢٠٢٢: الـqueues، والتكامل مع الأنظمة الخارجية، وقواعد البيانات التي تحتها.',
  },
  meta: [
    { label: { en: 'Based in', ar: 'المكان' }, value: { en: 'Mansoura, EG', ar: 'المنصورة، مصر' } },
    { label: { en: 'Local time', ar: 'التوقيت المحلي' }, clock: true },
    { label: { en: 'Coordinates', ar: 'الإحداثيات' }, value: { en: '31.04°N 31.38°E', ar: '31.04°N 31.38°E' } },
    { label: { en: 'Currently', ar: 'حالياً' }, value: { en: 'At Nawah', ar: 'في نواة' } },
  ],
  scroll: { en: 'Scroll', ar: 'مرّر للأسفل' },
}

// Ten items on purpose: the marquee duplicates the list for a seamless loop,
// and the even-child outline styling only lines up across the seam with an even count.
export const marqueeItems = [
  'Laravel', 'PostgreSQL', 'Redis', 'Horizon', 'Docker',
  'MySQL', 'Octane', 'AWS', 'Nginx', 'Sanctum',
]

export const workHeading = { lines: { en: ['Selected', 'work'], ar: ['أعمال', 'مختارة'] }, idx: '(02)' }

export const projects = [
  {
    no: '01',
    tag: { en: 'Integration · 2026 · In progress', ar: 'تكامل · ٢٠٢٦ · قيد التنفيذ' },
    title: {
      en: 'Arabic phone screening, wired into an applicant tracking system',
      ar: 'مقابلات هاتفية بالعربية، موصولة بنظام تتبّع المتقدمين',
    },
    lead: {
      en: 'An AI voice agent runs the first-round call with candidates in Saudi Arabia, in Arabic, and the result lands back where recruiters already work.',
      ar: 'وكيل صوتي بالذكاء الاصطناعي يُجري مكالمة الفرز الأولى مع المرشحين في السعودية بالعربية، وتعود النتيجة إلى حيث يعمل فريق التوظيف.',
    },
    body: {
      en: 'I own the integration layer between the ATS and the voice provider: triggering calls at the right pipeline stage, receiving results by webhook, writing outcomes to the candidate record.',
      ar: 'أتولّى طبقة التكامل بين نظام التوظيف ومزوّد الخدمة الصوتية: بدء المكالمة في المرحلة المناسبة، واستقبال النتائج عبر webhook، وكتابتها في ملف المرشح.',
    },
    side: [
      { label: { en: 'Role', ar: 'الدور' }, value: { en: 'Backend / integration', ar: 'Backend / تكامل' } },
      { label: { en: 'Stack', ar: 'الأدوات' }, chips: ['Laravel', 'Queues', 'Webhooks'] },
      { label: { en: 'Users', ar: 'المستخدمون' }, value: { en: 'Recruiters; candidates in KSA', ar: 'فرق التوظيف؛ مرشحون في السعودية' } },
    ],
  },
  {
    no: '02',
    tag: { en: 'Infrastructure · 2026', ar: 'بنية تحتية · ٢٠٢٦' },
    title: {
      en: 'An AWS plan for a learning platform, priced before it was built',
      ar: 'خطة AWS لمنصة تعليمية، بتكلفتها قبل أن تُبنى',
    },
    lead: {
      en: 'The infrastructure proposal for an LMS, with a line-by-line monthly cost estimate for management to decide on.',
      ar: 'مقترح البنية التحتية لنظام إدارة تعلّم، مع تقدير شهري للتكلفة بنداً بنداً لتقرّر الإدارة على أساسه.',
    },
    body: {
      en: 'Compute, database, storage, bandwidth, load balancing, backups, and the NAT gateway that surprises everyone on the first bill.',
      ar: 'الحوسبة وقاعدة البيانات والتخزين ونقل البيانات وموازنة الحِمل والنسخ الاحتياطي، وبوابة NAT التي تفاجئ الجميع في أول فاتورة.',
    },
    side: [
      { label: { en: 'Role', ar: 'الدور' }, value: { en: 'Author of the proposal', ar: 'كاتب المقترح' } },
      { label: { en: 'Covers', ar: 'يغطي' }, chips: ['EC2', 'RDS', 'S3', 'ALB', 'NAT'] },
      { label: { en: 'Audience', ar: 'الجمهور' }, value: { en: 'Engineering management', ar: 'إدارة الهندسة' } },
    ],
  },
]

export const principlesHeading = { lines: { en: ['How I', 'build'], ar: ['كيف', 'أبني'] }, idx: '(05)' }

export const principles = [
  {
    k: '01 / simplicity',
    title: { en: 'Simple until the load says otherwise', ar: 'البساطة أولاً، حتى يفرض الحِمل غير ذلك' },
    body: { en: 'A queue, a cache or a new service has to earn its place.', ar: 'الـqueue أو الـcache أو الخدمة الجديدة يجب أن تستحق مكانها.' },
  },
  {
    k: '02 / data',
    title: { en: 'The database is the product', ar: 'قاعدة البيانات هي المنتج' },
    body: { en: "Indexes, constraints and transactions before clever code. N+1 doesn't pass review.", ar: 'الفهارس والقيود والـtransactions قبل الكود الذكي. N+1 لا يمرّ من المراجعة.' },
  },
  {
    k: '03 / async',
    title: { en: 'Slow work goes to a queue', ar: 'العمل البطيء مكانه الـqueue' },
    body: { en: 'Idempotent jobs on Horizon, with retries and backoff.', ar: 'Jobs على Horizon قابلة للتكرار بأمان، مع إعادة المحاولة.' },
  },
  {
    k: '04 / integrations',
    title: { en: 'Third-party APIs will fail', ar: 'الأنظمة الخارجية ستتعطّل' },
    body: { en: 'Timeouts on every call, signed webhooks verified, logs without secrets.', ar: 'مهلة لكل طلب، والتحقق من توقيع كل webhook، وسجلات بلا أسرار.' },
  },
  {
    k: '05 / security',
    title: { en: 'Security is part of done', ar: 'الأمان جزء من التسليم' },
    body: { en: 'Policies, rate limits on public endpoints, tenant data kept apart by default.', ar: 'Policies، وحدود للطلبات، وفصل بيانات العملاء افتراضياً.' },
  },
]

export const principlesCta = { en: 'Need this on your team? →', ar: 'تحتاج هذا في فريقك؟ ←' }

export const careerHeading = { lines: { en: ['Career'], ar: ['المسيرة'] }, idx: '2019 — 2026' }

export const jobs = [
  {
    when: { en: 'Jan 2025 — now', ar: 'يناير ٢٠٢٥ — الآن' },
    title: { en: 'Senior Backend Engineer', ar: 'مهندس Backend أول' },
    org: { en: 'Nawah', ar: 'Nawah' },
    desc: { en: 'Integrations and backend architecture for SaaS products, including ATS and LMS work.', ar: 'التكامل والبنية الخلفية لمنتجات SaaS، منها أنظمة التوظيف والتعليم.' },
  },
  {
    when: { en: 'Nov 2022 — Dec 2024', ar: 'نوفمبر ٢٠٢٢ — ديسمبر ٢٠٢٤' },
    title: { en: 'Backend Engineer', ar: 'مهندس Backend' },
    org: { en: 'innovaDigits', ar: 'innovaDigits' },
  },
  {
    when: { en: 'Jun — Nov 2022', ar: 'يونيو — نوفمبر ٢٠٢٢' },
    title: { en: 'Backend Developer', ar: 'مطوّر Backend' },
    org: { en: 'LinesDev', ar: 'LinesDev' },
    desc: { en: 'Started as an intern (Mar — May 2022); first production Laravel work.', ar: 'بدأت متدرّباً (مارس — مايو ٢٠٢٢)؛ أول عمل لي على Laravel في بيئة إنتاج.' },
  },
  {
    when: { en: '2019 — 2023', ar: '٢٠١٩ — ٢٠٢٣' },
    title: { en: 'B.Sc. Computer Science', ar: 'بكالوريوس علوم الحاسب' },
    org: { en: 'Mansoura University', ar: 'جامعة المنصورة' },
  },
]

export const toolboxHeading = { lines: { en: ['Toolbox'], ar: ['الأدوات'] }, idx: { en: 'all used in production', ar: 'كلها في بيئة إنتاج' } }

export const toolGroups = [
  { label: { en: 'Every day', ar: 'يومياً' }, items: ['PHP', 'Laravel', 'Horizon', 'Sanctum', 'Passport', 'Octane', 'MySQL', 'PostgreSQL', 'Redis'] },
  { label: { en: 'Running it', ar: 'التشغيل' }, items: ['Docker', 'Nginx', 'Apache', 'Ubuntu', 'AWS', 'DigitalOcean'] },
  { label: { en: 'Across the stack', ar: 'عبر الطبقات' }, items: ['REST', 'JSON-RPC', 'Vue.js', { en: 'Payment APIs', ar: 'بوابات الدفع' }] },
]

export const contact = {
  heading: { en: ["Let's", 'talk'], ar: ['لنتحدّث', 'معاً'] },
  sub: { en: 'Hiring for backend or integration work? Write to me.', ar: 'تبحث عن مهندس Backend أو تكامل؟ راسلني.' },
  email: 'hosam.nawah@gmail.com',
  github: 'https://github.com/hosametm',
}

export const footer = {
  copyright: '© 2026 Hosam Mohamed',
  credit: { en: 'Rendered live with WebGL', ar: 'مرسوم مباشرة بـWebGL' },
}
