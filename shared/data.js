/* Portfolio content — single source of truth for every page (Arabic + English). */
window.SITE = {
  phone: '+966590700541',
  phoneDisplay: '+966 59 070 0541',
  whatsapp: 'https://wa.me/966590700541',
  email: 'yousef.z.hakeem@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yousef-hakeem-b09663279/',
  cv: 'Yousef_Hakeem_CV.pdf?v=20261105a',
  cvIT: 'Yousef_Hakeem_CV_IT.pdf?v=20261105a',

  order: ['scrapbid', 'studybuddy', 'qurrat', 'nusuk', 'mister', 'mindwell'],
  meta: {
    scrapbid:   { kind: 'web',   accent: '#c4561f', cover: { ar: [0], en: [0] }, coverStyle: 'plain', isNew: true, demo: 'https://www.scrapbid.net/' },
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
      nav: { work: 'الأعمال', about: 'نبذة', experience: 'الخبرة', skills: 'المهارات', process: 'المنهجية', contact: 'تواصل' },
      lead: {
        work: 'ستة مشاريع مختارة على الويب والجوال وApple Watch. قلّب الشاشات هنا مباشرة، أو افتح المشروع لترى دوري وما قمت به.',
        about: 'مصمم UI/UX ومتخصص تقنية معلومات — أصمّم للمستخدم الحقيقي وأبني ما أصمّمه.',
        experience: 'أين طبّقت التصميم والهندسة في جهات حقيقية، وما درسته.',
        skills: 'البحث والتصميم والتطوير والدعم التقني — الأدوات التي أعمل بها.',
        process: 'طريقة واضحة وقابلة للتكرار للانتقال من مشكلة حقيقية إلى منتج سهل الاستخدام.'
      },
      expLabel: 'الخبرة', eduLabel: 'التعليم', skillsLabel: 'المهارات',
      caseRole: 'الدور', casePlatform: 'المنصّة', caseTools: 'الأدوات', caseDid: 'أبرز ما قمت به', liveDemo: 'زيارة الموقع المباشر',
      menu: 'القائمة', close: 'إغلاق',
      firstName: 'يوسف', lastName: 'حكيم',
      fullName: 'يوسف زين العابدين حكيم',
      role: 'مصمم UI/UX ومتخصص تقنية معلومات',
      roleSub: 'تصميم · دعم تقني · تطوير',
      available: 'متاح لفرص جديدة',
      intro: 'أصمّم تجارب رقمية واضحة وسهلة الاستخدام وأبنيها من الواجهة إلى الخادم، مع خبرة عملية في الدعم التقني وإدارة الأنظمة. خريج تفاعل الإنسان مع الحاسب من قسم هندسة البرمجيات بجامعة أم القرى.',
      ctaWork: 'شاهد أعمالي', ctaCV: 'السيرة الذاتية',
      cvUX: 'سيرة UI/UX', cvUXd: 'التصميم وتجربة المستخدم', cvIT: 'سيرة IT', cvITd: 'الدعم التقني والأنظمة والتطوير',
      scroll: 'مرّر',
      marquee: ['تصميم الواجهات', 'تجربة المستخدم', 'قابلية الاستخدام', 'بحث المستخدم', 'أنظمة التصميم', 'النماذج التفاعلية', 'تصميم التفاعل'],
      aboutLabel: 'نبذة',
      statement: 'أؤمن أن التصميم الجيّد يبدأ من المستخدم — من احتياجاته وسياقه والمشكلة الحقيقية التي يواجهها. أحوّل الأفكار المعقّدة إلى واجهات بسيطة وممتعة وقابلة للاستخدام.',
      aboutP: 'أعمل عبر دورة كاملة: من البحث والنماذج الأوّلية إلى التصميم البصري والبرمجة والإطلاق — ومعها خبرة عملية في الدعم التقني وإدارة الخوادم وحسابات المستخدمين والشبكات.',
      quote: 'البساطة ليست غياب التفاصيل، بل وضوح المقصد.',
      facts: [['الجامعة', 'جامعة أم القرى'], ['التخصص', 'تفاعل الإنسان مع الحاسب'], ['المجال', 'UI/UX · تقنية المعلومات'], ['اللغات', 'العربية · English']],
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
      C: {
        scrapbid: { role: 'تصميم UI/UX', platform: 'ويب · جوال · لوحة إدارة', did: ['تسجيل للمنشآت على خطوتين مع التوثيق بالسجل التجاري والهوية', 'مزايدة لحظية بعدّاد انتهاء، مع البيع بسعر ثابت', 'مساحة عمل للبائع لإدارة القوائم والسومات وطلبات الشراء', 'لوحة إدارة للتوثيق ومراجعة المحتوى والمستخدمين والإيرادات', 'عربي وإنجليزي، فاتح وداكن، كمبيوتر وجوال'] },
        studybuddy: { role: 'تصميم UI/UX وتطوير كامل', platform: 'ويب', tools: 'Figma · Flutter · PostgreSQL', did: ['منصّة واحدة تجمع المقرّرات والملاحظات واللقاءات ومساعداً ذكياً', 'تتبّع المعدّل والتقدّم والشارات', 'صمّمت الواجهات في Figma ثم برمجتها بـ Flutter وPostgreSQL', 'عربي وإنجليزي بوضعين فاتح وداكن'] },
        qurrat: { role: 'تصميم وتطوير (عمل لجهة)', platform: 'موقع + لوحة تحكم', did: ['الصفحة الرئيسية و«من نحن» والبرامج والحوكمة والتواصل بهوية الجمعية', 'لوحة تحكم عربية يدير بها فريق غير تقني كل المحتوى', 'سلّمت المشروع كاملاً بصفتي القائد التقني للجمعية'] },
        nusuk: { role: 'بحث تجربة المستخدم وتصميم الواجهات', platform: 'Apple Watch', tools: 'Figma', did: ['تقييم تطبيق نسك بمبادئ Nielsen الإرشادية', 'دراسة لخريطة الزحام الحرارية', 'نموذج أولي لمرافق على Apple Watch: عدّاد أشواط الطواف والسعي مع اهتزاز، أوقات الصلاة، خريطة الحرم، وزر طوارئ'] },
        mister: { role: 'هوية بصرية وتصميم منتج', platform: 'تطبيق جوال', tools: 'Figma', did: ['الشعار وشخصية البومة ونظام الألوان ودليل الهوية', 'تجربة الطالب: محادثة لكل مادة ومكتبة ومهام ونقاط وسلاسل', 'لوحة لولي الأمر لمتابعة التقدّم والمحادثات والمهام'] },
        mindwell: { role: 'تصميم وتطوير Flutter', platform: 'جوال (متعدد المنصّات)', tools: 'Flutter · Firebase', did: ['15 شاشة: تسجيل المزاج اليومي وتمارين التنفّس والتأمل ولوحة التحليلات', 'تسجيل دخول عبر Firebase Authentication', 'واجهة عربية كاملة من اليمين لليسار'] }
      },
      processH: 'كيف أحوّل المشكلة إلى منتج يستحق الإطلاق.',
      process: [
        { n: '01', t: 'البحث', d: 'أفهم المستخدم والمشكلة قبل أي بكسل: مقابلات، تحليل، وخرائط رحلة.' },
        { n: '02', t: 'التعريف', d: 'أحوّل الرؤى إلى مشكلة واضحة وأهداف قابلة للقياس.' },
        { n: '03', t: 'التصميم', d: 'هيكلة، نماذج أوّلية، وواجهات عالية الدقة ضمن نظام متّسق.' },
        { n: '04', t: 'التحقّق', d: 'اختبار قابلية الاستخدام والتكرار حتى تصبح التجربة بديهية.' }
      ],
      expertiseLabel: 'الخبرات',
      expertise: [
        { h: 'البحث والتقييم', items: ['مقابلات المستخدمين', 'الشخصيات (Personas)', 'خرائط رحلة المستخدم', 'اختبار قابلية الاستخدام', 'التقييم الإرشادي (Nielsen)'] },
        { h: 'التصميم والنمذجة', items: ['تحسين تجربة المستخدم', 'المخططات الهيكلية', 'نماذج تفاعلية عالية الدقة', 'أنظمة التصميم والمكوّنات'] },
        { h: 'التطوير', items: ['HTML · CSS · JavaScript', 'تطبيقات Flutter (Dart)', 'PostgreSQL · SQL · Firebase', 'لوحات تحكم وأنظمة إدارة محتوى', 'Git ونشر المواقع'] },
        { h: 'الدعم التقني والأنظمة', items: ['الدعم الفني (Help Desk)', 'تشخيص الأجهزة والبرامج والشبكات', 'إدارة الخوادم وحسابات المستخدمين', 'إدارة التذاكر حتى الحل'] }
      ],
      tools: ['تفاعل الإنسان مع الحاسب', 'بحث المستخدم', 'قابلية الاستخدام', 'النماذج الأولية', 'أنظمة التصميم', 'الدعم التقني', 'إدارة الأنظمة', 'Figma', 'Adobe XD', 'HTML / CSS', 'JavaScript', 'Flutter', 'PostgreSQL', 'Firebase'],
      timelineLabel: 'التعليم والخبرة',
      timeline: [
        { kind: 'work', title: 'قائد تقني', org: 'جمعية قرة عين · الدمام', date: 'يناير – أغسطس 2026', desc: 'بنيت نظام الجمعية كاملاً من الصفر: الموقع والخادم ولوحة تحكم عربية لإدارة المحتوى، وسلّمته وحدي لفريق غير تقني يدير المحتوى بنفسه.' },
        { kind: 'work', title: 'متدرب تقنية معلومات (تدريب تعاوني)', org: 'شركة أميانتيت العربية السعودية', date: 'مارس – يوليو 2025', desc: 'دعم فني في مكتب المساعدة وإدارة الأنظمة: حل مشاكل الأجهزة والبرامج والشبكات، وإدارة الخوادم وحسابات المستخدمين.' },
        { kind: 'edu', title: 'بكالوريوس تفاعل الإنسان مع الحاسب (HCI)', org: 'جامعة أم القرى · قسم هندسة البرمجيات', date: '2026', desc: 'تصميم الواجهات وقابلية الاستخدام وعلم النفس المعرفي للمستخدم، على أساس من هندسة البرمجيات.' }
      ],
      contactLabel: 'تواصل',
      contactH: 'لنعمل معاً.',
      contactP: 'عندك مشروع أو فرصة عمل؟ يسعدني أسمع منك.',
      call: 'اتصال', whatsapp: 'واتساب', emailLbl: 'البريد', linkedin: 'لينكدإن',
      localTime: 'الدمام، المنطقة الشرقية',
      footer: '© ٢٠٢٦ يوسف حكيم',
      backTop: 'للأعلى',
      zoomHint: 'قرّب بإصبعين أو انقر مرتين · اسحب للتحريك',
      fabTitle: 'تواصل معي'
    },
    en: {
      dir: 'ltr', langBtn: 'ع',
      brand: 'Yousef Hakeem',
      nav: { work: 'Work', about: 'About', experience: 'Experience', skills: 'Skills', process: 'Process', contact: 'Contact' },
      lead: {
        work: 'Six selected projects across web, mobile and Apple Watch. Flip through the screens right here, or open a project to see my role and what I did.',
        about: 'UI/UX designer and IT specialist — I design for real users and build what I design.',
        experience: 'Where I have applied design and engineering in real organisations, and what I studied.',
        skills: 'Research, design, development and IT support — the toolkit behind my work.',
        process: 'A clear, repeatable way to move from a real problem to a product people can use.'
      },
      expLabel: 'Experience', eduLabel: 'Education', skillsLabel: 'Skills',
      caseRole: 'Role', casePlatform: 'Platform', caseTools: 'Tools', caseDid: 'What I did', liveDemo: 'Visit live site',
      menu: 'Menu', close: 'Close',
      firstName: 'Yousef', lastName: 'Hakeem',
      fullName: 'Yousef Zain Alabdeen Hakeem',
      role: 'UI/UX Designer & IT Specialist',
      roleSub: 'Design · IT support · Development',
      available: 'Open to new opportunities',
      intro: 'I design clear, easy-to-use digital experiences and build them end to end, with hands-on experience in IT support and system administration. Human–Computer Interaction graduate from the Software Engineering Department at Umm Al-Qura University.',
      ctaWork: 'View my work', ctaCV: 'Résumé',
      cvUX: 'UI/UX résumé', cvUXd: 'Design & user experience', cvIT: 'IT résumé', cvITd: 'IT support, systems & development',
      scroll: 'Scroll',
      marquee: ['UI Design', 'UX Design', 'Usability', 'User Research', 'Design Systems', 'Prototyping', 'Interaction Design'],
      aboutLabel: 'About',
      statement: 'I believe good design starts with the user — their needs, their context, and the real problem they face. I turn complex ideas into simple, enjoyable, usable interfaces.',
      aboutP: 'I work across the full cycle — from research and prototyping to visual design, development and launch — backed by hands-on experience in IT support, servers, user accounts and networks.',
      quote: 'Simplicity isn’t the absence of detail — it’s clarity of intent.',
      facts: [['University', 'Umm Al-Qura University'], ['Specialty', 'Human–Computer Interaction'], ['Field', 'UI/UX · Information Technology'], ['Languages', 'Arabic · English']],
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
      C: {
        scrapbid: { role: 'UI/UX design', platform: 'Web · Mobile · Admin', did: ['Two-step business registration verified by commercial registration and ID', 'Live bidding with countdowns, plus fixed-price listings', 'Seller workspace for listings, bids and purchase requests', 'Admin console for verification, content review, users and revenue', 'Arabic & English, light & dark, desktop & mobile'] },
        studybuddy: { role: 'UI/UX design & full-stack development', platform: 'Web', tools: 'Figma · Flutter · PostgreSQL', did: ['One platform for courses, notes, meetings and an AI assistant', 'GPA tracking, progress and badges', 'Designed in Figma, then built with Flutter and PostgreSQL', 'Arabic & English with light and dark modes'] },
        qurrat: { role: 'Design & development (client work)', platform: 'Website + admin dashboard', did: ['Landing, About, Programs, Governance and Contact pages in the association’s identity', 'Arabic CMS dashboard so non-technical staff manage every section', 'Delivered end to end as the association’s Technical Lead'] },
        nusuk: { role: 'UX research & UI design', platform: 'Apple Watch', tools: 'Figma', did: ['Heuristic evaluation of the Nusuk app using Nielsen’s heuristics', 'Crowd-heatmap study', 'Apple Watch companion prototype: Tawaf & Sa’i lap counter with haptics, prayer times, Haram map and SOS'] },
        mister: { role: 'Brand identity & product design', platform: 'Mobile app', tools: 'Figma', did: ['Logo, owl mascot, colour system and brand guidelines', 'Student experience: per-subject chats, library, tasks, points and streaks', 'Parent dashboard to follow progress, chats and tasks'] },
        mindwell: { role: 'Design & Flutter development', platform: 'Mobile (cross-platform)', tools: 'Flutter · Firebase', did: ['15 screens: daily mood check-ins, guided breathing, meditation and insights', 'Sign-in with Firebase Authentication', 'Fully Arabic, right-to-left interface'] }
      },
      processH: 'How I turn a problem into a product worth shipping.',
      process: [
        { n: '01', t: 'Research', d: 'Understand the user and the problem before any pixel: interviews, analysis, journey maps.' },
        { n: '02', t: 'Define', d: 'Turn insights into a sharp problem statement and measurable goals.' },
        { n: '03', t: 'Design', d: 'Architecture, prototypes and high-fidelity UI within a consistent system.' },
        { n: '04', t: 'Validate', d: 'Usability testing and iteration until the experience feels obvious.' }
      ],
      expertiseLabel: 'Expertise',
      expertise: [
        { h: 'Research & Evaluation', items: ['User interviews', 'Personas', 'Journey mapping', 'Usability testing', 'Heuristic evaluation (Nielsen)'] },
        { h: 'Design & Prototyping', items: ['UX improvement', 'Wireframes', 'High-fidelity prototypes', 'Design systems'] },
        { h: 'Development', items: ['HTML · CSS · JavaScript', 'Flutter (Dart) apps', 'PostgreSQL · SQL · Firebase', 'Admin dashboards & CMS', 'Git & web deployment'] },
        { h: 'IT Support & Systems', items: ['Help Desk support', 'Hardware, software & network troubleshooting', 'Server & user-account management', 'Ticket management to resolution'] }
      ],
      tools: ['Human-Computer Interaction', 'UX Research', 'Usability Testing', 'Prototyping', 'Design Systems', 'IT Support', 'System Administration', 'Figma', 'Adobe XD', 'HTML / CSS', 'JavaScript', 'Flutter', 'PostgreSQL', 'Firebase'],
      timelineLabel: 'Education & experience',
      timeline: [
        { kind: 'work', title: 'Technical Lead', org: 'Qoratayn Youth Association · Dammam', date: 'Jan – Aug 2026', desc: 'Built the association’s complete system from scratch — website, back end and an Arabic CMS dashboard — and delivered it single-handedly to non-technical staff who now manage content themselves.' },
        { kind: 'work', title: 'IT Trainee (Cooperative Training)', org: 'Saudi Arabian Amiantit Company', date: 'Mar – Jul 2025', desc: 'Help Desk and System Administration: resolved hardware, software and network issues, and managed servers and user accounts.' },
        { kind: 'edu', title: 'Bachelor of Human–Computer Interaction (HCI)', org: 'Umm Al-Qura University · Software Engineering Department', date: '2026', desc: 'Interface design, usability and user cognition, built on a software engineering foundation.' }
      ],
      contactLabel: 'Contact',
      contactH: 'Let’s work together.',
      contactP: 'Have a project or an opportunity? I’d love to hear from you.',
      call: 'Call', whatsapp: 'WhatsApp', emailLbl: 'Email', linkedin: 'LinkedIn',
      localTime: 'Dammam, Eastern Province',
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
