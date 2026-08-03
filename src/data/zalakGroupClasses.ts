import type { FaqItem } from "@/data/siteFaq";
import { ROUTES } from "@/config/routes";

export type ZalakGroupClassKey = "prenatal" | "postnatal" | "pilates";

export type ZalakGroupClassContent = {
  key: ZalakGroupClassKey;
  slug: string;
  title: string;
  eyebrow: string;
  metaDescription: string;
  intro: string;
  path: string;
  heroHighlight: string;
  whyItMatters: string[];
  offerings: string[];
  whoItsFor: string[];
  whyJoin: string[];
  classFormats: string[];
  onlineOfflineDetails: string[];
  galleryImages: string[];
  testimonials: Array<{ name: string; quote: string; context: string }>;
  faqs: FaqItem[];
  relatedLinks: Array<{ label: string; path: string }>;
};

export const ZALAK_GROUP_CLASS_CONTENT: Record<ZalakGroupClassKey, ZalakGroupClassContent> = {
  prenatal: {
    key: "prenatal",
    slug: "prenatal-classes",
    title: "Prenatal & Antenatal Classes for Pregnancy Support",
    eyebrow: "Dr. Zalak Shah · Pregnancy movement & birth preparation",
    metaDescription:
      "Join Dr. Zalak Shah's prenatal and antenatal classes for pregnancy-safe movement, pelvic floor support, birth preparation. 1:1 and group classes online & offline in Bangalore, Ahmedabad.",
    intro:
      "These pregnancy classes are designed for women who want safe, evidence-informed movement during pregnancy, confidence in labour preparation, and practical support for everyday comfort. Dr. Zalak Shah combines women's health physiotherapy expertise with prenatal Pilates methodology to guide you through each trimester with care.",
    path: ROUTES.prenatal,
    heroHighlight:
      "Online and offline prenatal classes designed for confident, comfortable pregnancy movement.",
    whyItMatters: [
      "Pregnancy-friendly movement can help reduce back pain, pelvic discomfort, and stiffness.",
      "Structured breathing and mobility sessions prepare you for labour, recovery and postpartum care.",
      "Small-group support helps you stay active with guidance that respects each trimester.",
      "Evidence-based physiotherapy approach ensures safety for both mother and baby.",
    ],
    offerings: [
      "1:1 personalized pregnancy sessions with tailored exercise plans",
      "Small group antenatal classes for shared learning and motivation",
      "Online prenatal classes via video consultation for home-based practice",
      "Offline batch classes in Bangalore and Ahmedabad for in-person guidance",
      "Breathing, mobility, core stability, pelvic floor awareness and birth prep guidance",
    ],
    whoItsFor: [
      "Pregnant women looking for safe exercise guidance in each trimester",
      "Women who want to reduce pelvic, back or hip discomfort with pregnancy-specific care",
      "Expecting mothers preparing for labour, delivery and early postpartum recovery",
      "First-time mothers seeking confidence in pregnancy movement",
      "Women with high-risk pregnancies requiring modified exercise programs",
    ],
    whyJoin: [
      "Led by Dr. Zalak Shah, a qualified women's health physiotherapist and prenatal Pilates instructor",
      "Classes are tailored to your trimester, symptoms, comfort level and mobility goals",
      "You receive practical strategies you can use daily, not only during the class",
      "Small group sizes ensure personalized attention and safe progression",
      "Flexible online and offline options to fit your schedule and location",
    ],
    classFormats: [
      "1:1 Personal Sessions: Individualized attention with customized exercise plans based on your specific pregnancy stage, symptoms, and goals. Ideal for women with specific concerns or high-risk pregnancies.",
      "Group Classes: Small batch sessions (typically 3-6 participants) for shared learning, motivation, and cost-effective care. Great for building community with other expecting mothers.",
      "Online Sessions: Live video consultations allowing you to join from home with real-time guidance on your form. Perfect for busy schedules or those unable to attend in person.",
      "Offline Batches: In-person classes in Bangalore and Ahmedabad with hands-on corrections and equipment access. Ideal for those who prefer face-to-face interaction.",
    ],
    onlineOfflineDetails: [
      "Online prenatal classes use secure video platforms with clear demonstrations and real-time feedback on your form.",
      "Offline classes are held in Bangalore and Ahmedabad with professional Pilates equipment and mats provided.",
      "Both formats include home exercise plans and pregnancy-safe movement guides for daily practice.",
      "Hybrid options available - start with online assessment, join offline batches when convenient.",
    ],
    galleryImages: [
      "/images/classes/prenatal-class-2.jpg",
      "/images/classes/prenatal-class-4.jpg",
      "/images/classes/prenatal-class-5.jpg",
      "/images/classes/prenatal-class-6.jpg",
      "/images/classes/prenatal-class-7.jpg",
    ],
    testimonials: [
      {
        name: "Desai Manali",
        quote:
          "One of my best decision to join Prenatal classes with her. Our sessions were online but her cues and instructions made it so simple and eased out exercise. When I started my chief complain was intense Pubic pain and lower backache but with the help of her guidance and correct ergonomics the pain went in few days and didn't came back.",
        context: "Pregnancy pain relief and online prenatal classes",
      },
      {
        name: "Anjali Hardik Desai",
        quote:
          "My physiotherapy classes with Zalak ma'am were a real lifesaver for me. The hospital recommended them at just the right time, and they helped me so much during my pregnancy. They supported me physically, mentally, and improved my mood. In the initial months of my pregnancy, I also had back pain, but after taking these sessions, that back pain disappeared, and my delivery was completely normal.",
        context: "Pregnancy support and back pain relief",
      },
      {
        name: "Sumeen Rattan",
        quote:
          "I had severe RIB PAIN and SCIATICA PAIN during my 3rd trimester, thanks to her the pain eased out and I was able to recover well during post partam. She is very encouraging, gives personal attention and remembers every detail about her patients. As a result of constantly working out during pregnancy my baby is also healthy and has lean muscle.",
        context: "Third trimester pain relief and postpartum recovery",
      },
      {
        name: "Trupti Sapariya",
        quote:
          "I had a wonderful experience attending Zalak prenatal classes. She is an exceptional instructor who patiently guides you through each exercise step by step, ensuring proper technique and understanding. Her expertise in breathing techniques was especially helpful during my labor phase—I truly believe I wouldn't have been able to deliver naturally without her guidance and support.",
        context: "Natural delivery preparation and breathing techniques",
      },
    ],
    faqs: [
      {
        question: "Do you offer online prenatal classes?",
        answer:
          "Yes. We offer online prenatal and antenatal classes via secure video consultation, as well as offline group sessions in Bangalore and Ahmedabad. You can choose the format that works best for your schedule and comfort level.",
      },
      {
        question: "What's the difference between 1:1 and group prenatal classes?",
        answer:
          "1:1 sessions provide personalized attention with exercise plans tailored to your specific pregnancy stage and concerns. Group classes offer shared learning and motivation with other expecting mothers at a lower cost. Many women combine both for comprehensive care.",
      },
      {
        question: "Is this suitable in every trimester?",
        answer:
          "The class plan is adjusted based on your trimester, symptoms, comfort level and medical clearance. First trimester focuses on gentle movement and habit building, second on strength and stability, third on birth preparation and comfort. We aim to make movement feel supportive and practical at every stage.",
      },
      {
        question: "Can I join if I am new to exercise?",
        answer:
          "Absolutely. These sessions are designed for beginners and women returning to movement during pregnancy, with modifications and pacing built in. Dr. Zalak specializes in making exercise accessible and safe regardless of your prior experience.",
      },
      {
        question: "Do I need medical clearance before joining?",
        answer:
          "We recommend consulting your obstetrician before starting any exercise program during pregnancy, especially if you have high-risk factors. Dr. Zalak can work with your doctor's guidance to ensure exercises are safe for your specific situation.",
      },
      {
        question: "What should I wear and bring to class?",
        answer:
          "Wear comfortable, non-restrictive clothing that allows movement. For online classes, have a yoga mat, water bottle, and pillows nearby for support. For offline classes, mats and equipment are provided - just bring yourself and any medical reports your doctor has shared.",
      },
    ],
    relatedLinks: [
      { label: "Postnatal recovery classes", path: ROUTES.postnatal },
      { label: "Mat & Reformer Pilates", path: ROUTES.pilates },
      { label: "Dr. Zalak Shah profile", path: ROUTES.drZalak },
    ],
  },
  postnatal: {
    key: "postnatal",
    slug: "postnatal-classes",
    title: "Postnatal Classes for Recovery, Core Strength & Confidence",
    eyebrow: "Dr. Zalak Shah · Postpartum movement and rehabilitation",
    metaDescription:
      "Explore Dr. Zalak Shah's postnatal classes for pelvic floor recovery, diastasis recti healing, core strength. 1:1 and group classes online & offline in Bangalore, Ahmedabad.",
    intro:
      "Postnatal classes help women rebuild strength after delivery with gentle, structured movement, pelvic floor awareness and confidence-building exercise. Dr. Zalak Shah specializes in postpartum rehabilitation, addressing diastasis recti, pelvic floor recovery, and safe return to fitness after childbirth.",
    path: ROUTES.postnatal,
    heroHighlight: "Gentle, structured postpartum support for recovery, strength and daily energy.",
    whyItMatters: [
      "Postpartum recovery is more effective when movement is guided and progressive.",
      "Targeted exercise can support core healing, breathing, posture and pelvic floor function.",
      "Supportive classes help new mothers feel stronger, steadier and more connected to their body.",
      "Addressing diastasis recti and pelvic floor concerns early prevents long-term complications.",
    ],
    offerings: [
      "1:1 postnatal rehabilitation sessions with personalized recovery plans",
      "Small group postnatal classes for shared support and motivation",
      "Online postnatal classes for convenient home-based recovery",
      "Offline batch classes in Bangalore and Ahmedabad with hands-on guidance",
      "Specialized programs for diastasis recti, pelvic floor recovery, and c-section recovery",
    ],
    whoItsFor: [
      "Mothers in the early postpartum period (6 weeks+) seeking guided recovery",
      "Women dealing with abdominal separation, pelvic floor symptoms or fatigue",
      "New mothers wanting a safe return to movement after childbirth",
      "Mothers struggling with back pain, weak core, or urinary incontinence post-birth",
      "Women who had c-sections requiring specialized rehabilitation guidance",
    ],
    whyJoin: [
      "Progressive guidance helps you feel safe while rebuilding strength",
      "Classes focus on recovery goals that matter in real life, from lifting to walking to caring for your baby",
      "Dr. Zalak's approach combines movement science with empathy and practical coaching",
      "Small group sizes create a supportive community of new mothers",
      "Flexible scheduling options for busy new moms with unpredictable sleep patterns",
    ],
    classFormats: [
      "1:1 Rehabilitation Sessions: Personalized assessment and treatment for specific postpartum concerns like diastasis recti, pelvic floor dysfunction, or c-section recovery. Includes home exercise programs and progress tracking.",
      "Group Classes: Small batch sessions (3-6 participants) focusing on general postpartum recovery, core strengthening, and safe return to fitness. Great for motivation and sharing experiences with other new moms.",
      "Online Sessions: Live video consultations allowing you to recover from home with your baby nearby. Ideal when leaving the house is challenging or for follow-up sessions.",
      "Offline Batches: In-person classes in Bangalore and Ahmedabad with access to Pilates equipment and hands-on corrections. Perfect when you're ready for structured out-of-home activity.",
    ],
    onlineOfflineDetails: [
      "Online postnatal classes can be done with your baby in the room - we understand new mom challenges and adapt accordingly.",
      "Offline classes in Bangalore and Ahmedabad provide access to specialized Pilates equipment for progressive strengthening.",
      "Both formats include baby-friendly movement tips and exercises you can do during daily care activities.",
      "Postnatal classes can be started 6-8 weeks after vaginal birth and 10-12 weeks after c-section, with doctor clearance.",
    ],
    galleryImages: [
      "/images/classes/postnatal-class-1.jpg",
      "/images/classes/postnatal-class-2.jpg",
      "/images/classes/postnatal-class-4.jpg",
    ],
    testimonials: [
      {
        name: "Khushbu Patel",
        quote:
          "What truly stood out was her continued support in the postpartum period. Her advice and customized recovery exercises were incredibly helpful in regaining strength and healing after delivery. She explained everything patiently, made sure I was comfortable with the pace, and genuinely cared about my well-being.",
        context: "Postpartum recovery and personalized guidance",
      },
      {
        name: "Poonam Soni",
        quote:
          "In my case I had C- section due to some complications in last period but I was up on the very second day due to excercises that I did during pregnancy which guided by you, my muscles were trained so good in Ante natal period. Highly recommend Dr. Zalak to all expecting mommy.",
        context: "C-section recovery and prenatal preparation",
      },
      {
        name: "Riddhi",
        quote:
          "I have received ante natal exercises treatment from Dr. Zalak during my pregnancy. She has provided me great support and guidance throughout my pregnancy for mobility exercises which kept me going for 9 months. Even after surgery i was up on the very second day due to exercises that I did in pregnancy. My muscles are trained so good in ante natal.",
        context: "Antenatal exercises and post-surgery recovery",
      },
      {
        name: "Darpan Mistry",
        quote:
          "I am incredibly grateful to Dr. Zalak Shah for the exceptional physiotherapy care provided to my wife during her maternity period. Dr. Shah's expertise and compassionate approach made a significant difference in my wife's comfort and recovery. The exercises and hands-on techniques greatly improved her mobility and reduced pain, making her pregnancy and postpartum experience much smoother.",
        context: "Postpartum recovery and compassionate care",
      },
    ],
    faqs: [
      {
        question: "When should I start postnatal classes?",
        answer:
          "For vaginal births, you can typically start 6-8 weeks postpartum with doctor clearance. For c-sections, wait 10-12 weeks. We assess your healing, symptoms, and energy levels to create a safe progression plan tailored to your recovery timeline.",
      },
      {
        question: "What's the difference between 1:1 and group postnatal classes?",
        answer:
          "1:1 sessions focus on specific concerns like diastasis recti, pelvic floor dysfunction, or c-section recovery with personalized treatment plans. Group classes provide general postpartum strengthening and community support. Many women start with 1:1 assessment then join group classes for maintenance.",
      },
      {
        question: "Do you offer online postnatal sessions?",
        answer:
          "Yes. Online postnatal sessions are ideal for new mothers who can't leave the house easily or prefer recovering at home. You can even have your baby nearby during sessions. We also offer offline batches in Bangalore and Ahmedabad when you're ready for in-person classes.",
      },
      {
        question: "Can I bring my baby to class?",
        answer:
          "For online sessions, absolutely - many moms have their babies in the room. For offline classes, we recommend checking current facility policies, but we understand new motherhood challenges and try to accommodate when possible.",
      },
      {
        question: "What if I have diastasis recti or pelvic floor issues?",
        answer:
          "These are exactly the conditions Dr. Zalak specializes in. 1:1 sessions are recommended for specific assessment and treatment of diastasis recti and pelvic floor dysfunction. We use evidence-based protocols to safely address these concerns.",
      },
      {
        question: "Are these classes only for recent mothers?",
        answer:
          "While designed for early postpartum recovery, these classes can also help women returning to movement after a longer gap or dealing with persistent postpartum symptoms months or years later. It's never too late to address core and pelvic floor health.",
      },
    ],
    relatedLinks: [
      { label: "Prenatal & antenatal classes", path: ROUTES.prenatal },
      { label: "Mat & Reformer Pilates", path: ROUTES.pilates },
      { label: "Learn hub", path: ROUTES.learn },
    ],
  },
  pilates: {
    key: "pilates",
    slug: "pilates-classes",
    title: "Mat Pilates & Reformer Pilates Classes with Dr. Zalak Shah",
    eyebrow: "Dr. Zalak Shah · Pilates for strength, posture and mindful movement",
    metaDescription:
      "Book Dr. Zalak Shah's Mat Pilates and Reformer Pilates classes for posture, core strength, mobility. 1:1 and group classes online & offline in Bangalore, Ahmedabad.",
    intro:
      "These Pilates classes combine mindful movement, core strength and body awareness for women who want to feel stronger, more balanced and more capable in everyday life. Dr. Zalak Shah integrates her women's health physiotherapy background with Pilates methodology to create safe, effective classes for all fitness levels.",
    path: ROUTES.pilates,
    heroHighlight:
      "Structured Pilates classes for posture, strength, flexibility and long-term movement confidence.",
    whyItMatters: [
      "Pilates supports posture, breath control, core stability and overall body awareness.",
      "Regular practice can improve mobility, balance and confidence in daily movement.",
      "A well-designed class can help you feel strong without overloading the body.",
      "Pilates is particularly beneficial for women's health concerns like pelvic floor weakness and back pain.",
    ],
    offerings: [
      "Mat Pilates classes for fundamental core strength and body awareness",
      "Reformer Pilates sessions with equipment-based resistance and alignment work",
      "1:1 Pilates sessions for personalized technique correction and goal-specific programming",
      "Small group Pilates classes for motivation and cost-effective training",
      "Online Pilates classes for home practice with real-time feedback",
      "Offline Pilates batches in Bangalore and Ahmedabad with full equipment access",
    ],
    whoItsFor: [
      "Women seeking posture, core strength and mobility support",
      "Beginners and regular exercisers who want a structured Pilates routine",
      "Patients who want a fitness option aligned with women's health principles",
      "Women dealing with back pain, weak core, or poor posture from desk work",
      "Anyone looking for low-impact exercise that builds strength without joint stress",
    ],
    whyJoin: [
      "Classes are progressive and designed for sustainable, long-term movement habits",
      "Dr. Zalak blends physiotherapy principles with Pilates technique for safety and effectiveness",
      "You get practical coaching that feels supportive, not intimidating",
      "Both Mat and Reformer options available to suit your preferences and goals",
      "Flexible online and offline options to fit your schedule and location",
    ],
    classFormats: [
      "1:1 Pilates Sessions: Personalized attention focusing on your specific goals - whether posture improvement, injury recovery, or advanced technique refinement. Ideal for beginners learning proper form or experienced practitioners wanting to break through plateaus.",
      "Group Mat Pilates: Small group classes (3-6 participants) focusing on fundamental Pilates principles using body weight and props. Cost-effective option with community energy and motivation.",
      "Group Reformer Pilates: Equipment-based classes using the Pilates reformer for resistance, alignment support, and progressive challenge. Provides more feedback and variety than Mat work.",
      "Online Pilates: Live video sessions for Mat Pilates that you can do from home with minimal equipment. Includes real-time form correction and home exercise recommendations.",
      "Offline Batches: In-person classes in Bangalore and Ahmedabad with access to full Pilates equipment including reformers, chairs, and props. Best for hands-on corrections and equipment-based work.",
    ],
    onlineOfflineDetails: [
      "Online Mat Pilates requires minimal equipment - a yoga mat, resistance bands, and small props like Pilates balls or light weights.",
      "Offline classes in Bangalore and Ahmedabad provide access to professional Pilates reformers and other equipment for more varied workouts.",
      "Both formats emphasize proper breathing, alignment, and mindful movement - the core principles of Pilates.",
      "Hybrid packages available - combine online convenience with occasional in-person equipment sessions for comprehensive training.",
    ],
    galleryImages: [
      "/images/classes/pilates-class-2.jpg",
      "/images/classes/pilates-class-3.jpg",
      "/images/classes/pilates-class-4.jpg",
      "/images/classes/pilates-class-5.jpg",
      "/images/classes/pilates-class-6.jpg",
    ],
    testimonials: [
      {
        name: "Hir Patel",
        quote:
          "Over the last few months, Pilates has completely transformed my life. Not only has it strengthened my body, improving my posture and core stability, but it has also become a powerful tool for stress relief and mental clarity. I feel more connected to my body, moving with greater ease and confidence in everyday activities.",
        context: "Pilates for posture, strength and mental clarity",
      },
      {
        name: "Aashima Kadakia",
        quote:
          "Training with Zalak was such a wonderful experience. She introduced me to Pilates in the most positive, encouraging way, and thanks to her classes, I truly fell in love with the practice. What sets her apart is not just her expertise in Pilates, but also her deep understanding as a physiotherapist. I could genuinely feel my core getting stronger and my body becoming more aligned.",
        context: "Pilates introduction and core strength",
      },
      {
        name: "Dipika Mishra",
        quote:
          "My very first Pilates session was with Zalak, and honestly, I had no clue what to expect. As a physiotherapist, she's been my secret weapon ever since, fixing my posture, wiping out my chronic backache, and helping me get leaner and stronger, all through her expert Pilates techniques.",
        context: "Posture correction and chronic back pain relief",
      },
      {
        name: "Priyanshi Desai",
        quote:
          "From the very first session, they made me feel at ease and provided excellent guidance to help me manage pregnancy-related aches and pains. The exercises and stretches they recommended were tailored to my specific needs, and I could immediately feel a difference. She was very knowledgeable, compassionate, and always took the time to listen.",
        context: "Personalized guidance and pain management",
      },
    ],
    faqs: [
      {
        question: "Which Pilates format is right for me - Mat or Reformer?",
        answer:
          "Mat Pilates is excellent for building fundamental core strength and body awareness using your own body weight. Reformer Pilates adds resistance and support through equipment, making it ideal for more specific conditioning, rehabilitation, or adding variety. Many women practice both for comprehensive benefits.",
      },
      {
        question: "What's the difference between 1:1 and group Pilates classes?",
        answer:
          "1:1 sessions provide personalized attention with exercises tailored to your specific goals, injuries, or concerns. Group classes offer community motivation and cost-effective training in a small setting. Beginners often benefit from a few 1:1 sessions to learn proper form before joining groups.",
      },
      {
        question: "Do you offer online Pilates classes?",
        answer:
          "Yes. We offer online Mat Pilates classes via live video with real-time feedback on your form. This is perfect for home practice, busy schedules, or if you're not located near Bangalore or Ahmedabad. Reformer classes are currently offered offline only due to equipment requirements.",
      },
      {
        question: "Do I need prior experience?",
        answer:
          "Not necessarily. Many women join as beginners and appreciate the structured, low-pressure coaching style. Dr. Zalak specializes in making Pilates accessible regardless of your fitness level or prior experience. Classes are designed to meet you where you are.",
      },
      {
        question: "How often should I attend Pilates classes?",
        answer:
          "For best results, 2-3 times per week is ideal, but even once a week provides benefits. Consistency matters more than frequency. We can help you create a sustainable schedule that fits your lifestyle and goals.",
      },
      {
        question: "Is Pilates suitable during pregnancy or postpartum?",
        answer:
          "Pilates can be excellent during pregnancy and postpartum when properly modified. However, we recommend our specialized prenatal and postnatal classes for these stages, as they're specifically designed with pregnancy-safe modifications and postpartum recovery focus.",
      },
    ],
    relatedLinks: [
      { label: "Prenatal & antenatal classes", path: ROUTES.prenatal },
      { label: "Postnatal recovery classes", path: ROUTES.postnatal },
      { label: "Dr. Zalak Shah profile", path: ROUTES.drZalak },
    ],
  },
};
