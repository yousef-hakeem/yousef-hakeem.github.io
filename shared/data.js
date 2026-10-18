/* Portfolio content — single source of truth for every page (Arabic + English). */
window.SITE = {
  phone: '+966590700541',
  phoneDisplay: '+966 59 070 0541',
  whatsapp: 'https://wa.me/966590700541',
  email: 'yousef.z.hakeem@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yousef-hakeem-b09663279/',
  cv: 'Yousef_Hakeem_CV.pdf',

  order: ['scrapbid', 'studybuddy', 'qurrat', 'nusuk', 'mister', 'mindwell'],
  meta: {
    scrapbid:   { kind: 'web',   accent: '#c4561f', cover: { ar: [0], en: [0] }, coverStyle: 'plain', isNew: true },
    studybuddy: { kind: 'web',   accent: '#6d5bd0', cover: { ar: [0], en: [1] } },
    qurrat:     { kind: 'web',   accent: '#1d6b5f', cover: { ar: [0], en: [0] } },
    nusuk:      { kind: 'watch', accent: '#c9a24a', cover: { ar: [1], en: [1] } },
    mister:     { kind: 'phone', accent: '#5b7cfa', cover: { ar: [0, 2, 4], en: [0, 2, 4] } },
    mindwell:   { kind: 'phone', accent: '#1f6b6e', cover: { ar: [1, 2, 3], en: [1, 2, 3] } }
  },

  t: {
    ar: {
      dir: 'rtl', langBtn: 'EN',
      brand: 'يوسف حكيم',
      nav: { about: 'نبذة', work: 'الأعمال', process: 'المنهجية', contact: 'تواصل' },
      menu: 'القائمة', close: 'إغلاق',
      firstName: 'يوسف', lastName: 'حكيم',
      fullName: 'يوسف زين العابدين حكيم',
      role: 'مصمم واجهات وتجربة المستخدم',
      roleSub: 'UI/UX Designer · HCI',
      available: 'متاح لفرص جديدة',
      intro: 'أصمّم تجارب رقمية واضحة وسهلة الاستخدام، مبنية على فهم سلوك المستخدم. خريج هندسة البرمجيات من جامعة أم القرى بتخصص تفاعل الإنسان مع الحاسب.',
      ctaWork: 'شاهد أعمالي', ctaCV: 'السيرة الذاتية',
      scroll: 'مرّر',
      marquee: ['تصميم الواجهات', 'تجربة المستخدم', 'قابلية الاستخدام', 'بحث المستخدم', 'أنظمة التصميم', 'النماذج التفاعلية', 'تصميم التفاعل'],
      aboutLabel: 'نبذة',
      statement: 'أؤمن أن التصميم الجيّد يبدأ من المستخدم — من احتياجاته وسياقه والمشكلة الحقيقية التي يواجهها. أحوّل الأفكار المعقّدة إلى واجهات بسيطة وممتعة وقابلة للاستخدام.',
      aboutP: 'أعمل عبر دورة كاملة: من البحث وبناء النماذج الأوّلية إلى التصميم البصري، ثم اختبار قابلية الاستخدام والتكرار حتى تصبح التجربة جاهزة للإطلاق.',
      quote: 'البساطة ليست غياب التفاصيل، بل وضوح المقصد.',
      facts: [['الجامعة', 'جامعة أم القرى'], ['التخصص', 'تفاعل الإنسان مع الحاسب'], ['المجال', 'تصميم UI / UX'], ['اللغات', 'العربية · English']],
      stats: [['6', 'مشاريع مختارة'], ['65+', 'شاشة مصمّمة'], ['3', 'منصّات: ويب · جوال · ساعة']],
      workLabel: 'أعمال مختارة',
      workH: 'مشاريع صمّمتها من الفكرة إلى الشاشة الأخيرة.',
      viewCase: 'تصفّح الشاشات', screens: 'شاشة', nextProject: 'المشروع التالي',
      featured: 'مشروع التخرّج', isNew: 'الأحدث',
      P: {
        scrapbid: { title: 'سكراب بيد', sub: 'سوق مزادات الخردة والمعدات الصناعية', tag: 'منصّة مزادات · ويب + جوال + لوحة إدارة · UI/UX', desc: 'السوق السعودي لمزادات الخردة والمعدات الصناعية — يحوّل فائض المصانع إلى سيولة بمزاد شفاف. بائعون موثّقون بالسجل التجاري والهوية، مزايدة لحظية بعدّاد انتهاء، وبيع بسعر ثابت أو بمزاد، والتسجيل للمنشآت فقط بعد المراجعة والاعتماد. صمّمت التجربة كاملة: الواجهة وتصفّح المزادات وصفحة الإعلان والمزايدة، تسجيل المنشأة على خطوتين، لوحة البائع لإدارة القوائم والسومات وطلبات الشراء، ولوحة إدارة للتوثيق ومراجعة المحتوى والمستخدمين والإيرادات والتحليلات — بالعربية والإنجليزية، بوضعين فاتح وداكن، ونسخة للجوال.' },
        studybuddy: { title: 'StudyBuddy', sub: 'منصّة طلاب الجامعة', tag: 'مشروع تخرّج · ويب · UI/UX', desc: 'منصّة متكاملة لطلاب الجامعة تجمع المقرّرات والملاحظات واللقاءات ومساعداً ذكياً في نظام واحد، مع تتبّع المعدّل والتقدّم والشارات. صمّمت التجربة كاملة بالعربية والإنجليزية وبوضعين فاتح وداكن، مع تركيز على سهولة الاستخدام ووضوح المعلومات.' },
        qurrat: { title: 'جمعية قرة عين', sub: 'موقع جمعية + لوحة تحكم', tag: 'عمل لعميل · ويب + لوحة تحكم', desc: 'عمل حقيقي لجهة: موقع تعريفي متكامل لجمعية قرة عين للناشئين. صمّمت ونفّذت الواجهة الرئيسية و«من نحن» والبرامج ومواد الحوكمة ونموذج التواصل بهوية الجمعية الخضراء والذهبية — مع لوحة تحكم تمنح الإدارة تحكّماً كاملاً بالمحتوى دون أي برمجة.' },
        nusuk: { title: 'نُسُك', sub: 'مرافق الحج والعمرة على Apple Watch', tag: 'مشروع مادة · Apple Watch · UI', desc: 'مرافق ذكي للرحلة الروحية على Apple Watch — يعدّ أشواط الطواف والسعي مع اهتزاز عند إكمال كل شوط، ويعرض أوقات الصلاة وخريطة الحرم والاتجاهات ومؤشرات الصحة وزرّ طوارئ. واجهة داكنة فاخرة بلمسة ذهبية تناسب شاشة الساعة.' },
        mister: { title: 'مستر', sub: 'مساعد دراسي ذكي', tag: 'مشروع شخصي · مساعد AI · قيد التطوير', desc: 'تطبيق تعليمي بمساعد ذكي لطلاب المدارس مع لوحة لولي الأمر. للطالب: محادثة مع «مستر» لكل مادة، ومكتبة، ومهام، ونقاط وسلاسل تحفيزية. لولي الأمر: متابعة التقدّم والمحادثات والمهام. بشخصية ودّية (بومة) وواجهة تناسب الأعمار الصغيرة.' },
        mindwell: { title: 'مايند ويل', sub: 'الصحة النفسية والتأمل', tag: 'تطبيق جوال · صحة نفسية · UI/UX', desc: 'تطبيق هادئ للصحة النفسية: تسجيل المزاج اليومي، وتمارين تنفّس موجّهة، وجلسات تأمل، ولوحة تحليلات تُظهر متوسّط المزاج والعوامل المؤثّرة — بواجهة عربية بألوان تبعث على الاسترخاء.' }
      },
      processLabel: 'المنهجية',
      processH: 'كيف أحوّل المشكلة إلى منتج يستحق الإطلاق.',
      process: [
        { n: '01', t: 'البحث', d: 'أفهم المستخدم والمشكلة قبل أي بكسل: مقابلات، تحليل، وخرائط رحلة.' },
        { n: '02', t: 'التعريف', d: 'أحوّل الرؤى إلى مشكلة واضحة وأهداف قابلة للقياس.' },
        { n: '03', t: 'التصميم', d: 'هيكلة، نماذج أوّلية، وواجهات عالية الدقة ضمن نظام متّسق.' },
        { n: '04', t: 'التحقّق', d: 'اختبار قابلية الاستخدام والتكرار حتى تصبح التجربة بديهية.' }
      ],
      expertiseLabel: 'الخبرات',
      expertise: [
        { h: 'البحث والتحليل', items: ['مقابلات المستخدمين', 'الاستبيانات وتحليل البيانات', 'الشخصيات (Personas)', 'خرائط رحلة المستخدم'] },
        { h: 'التصميم والنمذجة', items: ['تحسين تجربة المستخدم', 'المخططات الهيكلية', 'نماذج تفاعلية عالية الدقة', 'أنظمة التصميم والمكوّنات'] },
        { h: 'التقييم والاختبار', items: ['اختبار قابلية الاستخدام', 'التقييم الإرشادي', 'اختبار A/B'] }
      ],
      tools: ['Figma', 'FigJam', 'Adobe XD', 'Framer', 'Miro', 'Maze', 'Notion', 'HTML / CSS'],
      timelineLabel: 'التعليم والخبرة',
      timeline: [
        { title: 'بكالوريوس هندسة البرمجيات', org: 'جامعة أم القرى', desc: 'تخصص دقيق في تفاعل الإنسان مع الحاسب (HCI): تصميم الواجهات، قابلية الاستخدام، وعلم النفس المعرفي للمستخدم.' },
        { title: 'مشاريع تصميم UI/UX', org: 'مستقلة وأكاديمية', desc: 'تجارب كاملة لتطبيقات ومواقع — من بحث المستخدم إلى النماذج التفاعلية عالية الدقة.' },
        { title: 'دراسات قابلية الاستخدام', org: 'ضمن المسار الأكاديمي', desc: 'تخطيط وتنفيذ جلسات اختبار مع مستخدمين حقيقيين وتحويل النتائج إلى توصيات تصميم.' }
      ],
      contactLabel: 'تواصل',
      contactH: 'لنصنع شيئاً يستحق الاستخدام.',
      contactP: 'عندك مشروع أو فرصة عمل؟ يسعدني أسمع منك.',
      call: 'اتصال', whatsapp: 'واتساب', emailLbl: 'البريد', linkedin: 'لينكدإن',
      localTime: 'مكة المكرمة',
      footer: '© ٢٠٢٦ يوسف حكيم',
      backTop: 'للأعلى',
      zoomHint: 'قرّب بإصبعين أو انقر مرتين · اسحب للتحريك',
      fabTitle: 'تواصل معي'
    },
    en: {
      dir: 'ltr', langBtn: 'ع',
      brand: 'Yousef Hakeem',
      nav: { about: 'About', work: 'Work', process: 'Process', contact: 'Contact' },
      menu: 'Menu', close: 'Close',
      firstName: 'Yousef', lastName: 'Hakeem',
      fullName: 'Yousef Zain Alabdeen Hakeem',
      role: 'UI / UX Designer',
      roleSub: 'Human–Computer Interaction',
      available: 'Open to new opportunities',
      intro: 'I design clear, easy-to-use digital experiences grounded in real user behaviour. Software Engineering graduate from Umm Al-Qura University, specialising in Human–Computer Interaction.',
      ctaWork: 'View my work', ctaCV: 'Résumé',
      scroll: 'Scroll',
      marquee: ['UI Design', 'UX Design', 'Usability', 'User Research', 'Design Systems', 'Prototyping', 'Interaction Design'],
      aboutLabel: 'About',
      statement: 'I believe good design starts with the user — their needs, their context, and the real problem they face. I turn complex ideas into simple, enjoyable, usable interfaces.',
      aboutP: 'I work across the full cycle: from research and prototyping to visual design, then usability testing and iteration until the experience is ready to ship.',
      quote: 'Simplicity isn’t the absence of detail — it’s clarity of intent.',
      facts: [['University', 'Umm Al-Qura University'], ['Specialty', 'Human–Computer Interaction'], ['Field', 'UI / UX Design'], ['Languages', 'Arabic · English']],
      stats: [['6', 'Selected projects'], ['65+', 'Screens designed'], ['3', 'Platforms: web · mobile · watch']],
      workLabel: 'Selected work',
      workH: 'Projects I designed from first idea to final screen.',
      viewCase: 'Browse screens', screens: 'screens', nextProject: 'Next project',
      featured: 'Graduation project', isNew: 'Latest',
      P: {
        scrapbid: { title: 'ScrapBid', sub: 'Industrial scrap & equipment auctions', tag: 'Auction platform · Web + mobile + admin · UI/UX', desc: 'Saudi Arabia’s marketplace for industrial scrap and equipment auctions — turning factory surplus into cash through transparent bidding. Verified sellers (commercial registration and ID), live bidding with countdowns, fixed-price or auction listings, and business-only sign-up with review and approval. I designed the whole experience: home and auction browsing, listing and bidding pages, two-step business registration, a seller workspace for listings, bids and purchase requests, and an admin console for verification, content review, users, revenue and analytics — in Arabic and English, light and dark, with a mobile version.' },
        studybuddy: { title: 'StudyBuddy', sub: 'University platform', tag: 'Graduation project · Web · UI/UX', desc: 'An all-in-one platform for university students that unifies courses, notes, meetings and an AI assistant — with GPA tracking, progress and badges. I designed the full experience in Arabic and English with light and dark modes, focused on usability and clarity.' },
        qurrat: { title: 'Qurrat Ayn', sub: 'NGO website + admin panel', tag: 'Client work · Web + Admin', desc: 'Real client work: a complete website for Qurrat Ayn, a children’s non-profit — landing, About, Programs, Governance and contact, in the association’s green and gold — plus an admin dashboard that gives staff full control of every section with no coding.' },
        nusuk: { title: 'Nusuk', sub: 'Hajj & Umrah on Apple Watch', tag: 'Course project · Apple Watch · UI', desc: 'A smart companion for the spiritual journey on Apple Watch — counts Tawaf and Sa’i laps with haptics, and shows prayer times, a Haram map, directions, health metrics and an SOS button. A premium dark UI with a gold touch, crafted for the small screen.' },
        mister: { title: 'Mister', sub: 'AI study companion', tag: 'Personal project · AI tutor · In progress', desc: 'An AI study companion for school students with a parent dashboard. Students chat with “Mister” per subject, browse a library, and earn points and streaks; parents follow progress, chats and tasks. Designed around a friendly owl mascot.' },
        mindwell: { title: 'MindWell', sub: 'Mental health & mindfulness', tag: 'Mobile app · Mental health · UI/UX', desc: 'A calming mental-health app: daily mood check-ins, guided breathing, meditation sessions and an insights dashboard of mood and contributing factors — a soothing Arabic (RTL) interface.' }
      },
      processLabel: 'Process',
      processH: 'How I turn a problem into a product worth shipping.',
      process: [
        { n: '01', t: 'Research', d: 'Understand the user and the problem before any pixel: interviews, analysis, journey maps.' },
        { n: '02', t: 'Define', d: 'Turn insights into a sharp problem statement and measurable goals.' },
        { n: '03', t: 'Design', d: 'Architecture, prototypes and high-fidelity UI within a consistent system.' },
        { n: '04', t: 'Validate', d: 'Usability testing and iteration until the experience feels obvious.' }
      ],
      expertiseLabel: 'Expertise',
      expertise: [
        { h: 'Research & Analysis', items: ['User interviews', 'Surveys & data analysis', 'Personas', 'Journey mapping'] },
        { h: 'Design & Prototyping', items: ['UX improvement', 'Wireframes', 'High-fidelity prototypes', 'Design systems'] },
        { h: 'Evaluation & Testing', items: ['Usability testing', 'Heuristic evaluation', 'A/B testing'] }
      ],
      tools: ['Figma', 'FigJam', 'Adobe XD', 'Framer', 'Miro', 'Maze', 'Notion', 'HTML / CSS'],
      timelineLabel: 'Education & experience',
      timeline: [
        { title: 'BSc, Software Engineering', org: 'Umm Al-Qura University', desc: 'Focused specialty in Human–Computer Interaction (HCI): interface design, usability and user cognition.' },
        { title: 'UI/UX design projects', org: 'Independent & academic', desc: 'End-to-end experiences for apps and websites — from user research to high-fidelity prototypes.' },
        { title: 'Usability studies', org: 'Academic track', desc: 'Planned and ran sessions with real users and turned findings into design recommendations.' }
      ],
      contactLabel: 'Contact',
      contactH: 'Let’s make something worth using.',
      contactP: 'Have a project or an opportunity? I’d love to hear from you.',
      call: 'Call', whatsapp: 'WhatsApp', emailLbl: 'Email', linkedin: 'LinkedIn',
      localTime: 'Makkah',
      footer: '© 2026 Yousef Hakeem',
      backTop: 'Back to top',
      zoomHint: 'Pinch or double-tap to zoom · drag to move',
      fabTitle: 'Get in touch'
    }
  }
};

/* Helpers shared by every page. */
window.SITE.lang = function () { return document.documentElement.lang === 'en' ? 'en' : 'ar'; };
window.SITE.tr = function () { return window.SITE.t[window.SITE.lang()]; };
window.SITE.img = function (id, i) { return window.MEDIA[id][i]; };
window.SITE.url = function (p) { return (window.SITE_ROOT || '') + p; };
window.SITE.esc = function (s) {
  return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
};
/* Wrap each word in a span (never split Arabic letters — it breaks letter joining). */
window.SITE.words = function (text, cls) {
  return String(text).split(/(\s+)/).map(function (w) {
    return /^\s+$/.test(w) ? w : '<span class="' + (cls || 'w') + '"><span>' + window.SITE.esc(w) + '</span></span>';
  }).join('');
};
/* Project cover markup: browser frame for web, fanned screens for phone, plain card for watch. */
window.SITE.cover = function (id) {
  var S = window.SITE, m = S.meta[id], idx = m.cover[S.lang()];
  var pic = function (i, cls) {
    var im = S.img(id, i);
    return '<img class="' + (cls || '') + '" src="' + S.url(im.sm) + '" width="' + im.w + '" height="' + im.h + '" alt="" loading="lazy" decoding="async">';
  };
  if (m.coverStyle === 'plain') return '<div class="cv cv-plain">' + pic(idx[0]) + '</div>';
  if (m.kind === 'web') {
    return '<div class="cv cv-web"><div class="cv-bar"><i></i><i></i><i></i></div>' + pic(idx[0]) + '</div>';
  }
  if (m.kind === 'watch') return '<div class="cv cv-watch">' + pic(idx[0]) + '</div>';
  return '<div class="cv cv-phones">' + idx.map(function (i, k) { return pic(i, 'p' + (k + 1)); }).join('') + '</div>';
};
