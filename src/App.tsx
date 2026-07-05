import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Brain,
  Camera,
  Check,
  ClipboardList,
  FileText,
  Image,
  Layers3,
  Megaphone,
  Menu,
  PenLine,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  TimerReset,
  Users,
  WandSparkles,
  X,
} from 'lucide-react';
import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

const textColor = '#E1E0CC';
const ease = [0.16, 1, 0.3, 1] as const;
const cardEase = [0.22, 1, 0.36, 1] as const;

const heroVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

const featureVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4';

const backgroundImages = {
  creativeSystem: '/backgrounds/creative-system-bg.jpg',
  pricingValue: '/backgrounds/pricing-value-bg.jpg',
  productPhoto: '/backgrounds/product-photo-bg.jpg',
  nanoCreative: '/backgrounds/nano-creative-bg.jpg',
};

type StyledSegment = {
  text: string;
  className?: string;
};

type IconComponent = typeof Sparkles;

type PackPage = {
  path: string;
  navLabel: string;
  price: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroBullets: string[];
  primaryButton: string;
  secondaryButton: string;
  problemTitle: string;
  problemParagraphs: string[];
  insideTitle: string;
  insideIntro: string;
  includesTitle: string;
  includes: string[];
  benefitsTitle: string;
  benefits: string[];
  audienceTitle: string;
  audienceIntro?: string;
  audience: string[];
  processTitle: string;
  processSteps: Array<{ title: string; text: string }>;
  comparisonTitle?: string;
  comparisonRows?: Array<[string, string]>;
  useCasesTitle?: string;
  useCases?: Array<{ title: string; text: string }>;
  whyTitle: string;
  whyText: string;
  whyBullets?: string[];
  priceTitle: string;
  priceText: string;
  faq: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalText: string;
  icon: IconComponent;
  stat: string;
};

type PolicyPage = {
  path: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
};

type PricingPlan = {
  name: string;
  badge: string;
  oldPrice: string;
  price: string;
  description: string;
  losses?: string[];
  gains?: string[];
  cta: string;
};

const packPages: PackPage[] = [
  {
    path: '/ai-expert-prompt-system',
    navLabel: 'AI Expert',
    price: '$9.90',
    metaTitle: 'AI Expert Prompt System — 300+ Prompts for ChatGPT, Claude & Gemini',
    metaDescription:
      'Get 300+ ready-to-use AI prompts for marketing, copywriting, business analysis, audience research, content, offers, and strategy. Works with ChatGPT, Claude, and Gemini.',
    eyebrow: 'AI Expert Prompt System',
    title:
      '300+ AI Prompts That Turn ChatGPT, Claude, and Gemini Into Your Business Assistant',
    subtitle:
      'Ready-to-use prompts for marketing, copywriting, strategy, audience research, content, offers, business analysis, and creative thinking.',
    heroBullets: [
      'No complicated prompt engineering.',
      'No blank page.',
      'No random AI results.',
      'Copy, paste, customize, and get useful output in minutes.',
    ],
    primaryButton: 'Get Instant Access',
    secondaryButton: 'See What’s Inside',
    problemTitle: 'AI Can Help You Work Faster — But Only If You Ask It Correctly',
    problemParagraphs: [
      'Most people open ChatGPT, type a simple request, get a generic answer, then try again and again.',
      'The problem is not the AI. The problem is that AI needs the right structure: role, context, task, audience, constraints, and quality criteria.',
      'This prompt system gives you that structure instantly.',
    ],
    insideTitle: 'Inside the AI Expert Prompt System',
    insideIntro: 'You get 300+ structured prompts for real business and creative tasks.',
    includesTitle: 'Includes prompts for',
    includes: [
      'Marketing strategy',
      'Audience research',
      'Customer pain points',
      'Offer creation',
      'Copywriting',
      'Landing page structure',
      'Headlines and hooks',
      'Social media content',
      'Ad ideas',
      'Product positioning',
      'Competitor analysis',
      'Business analysis',
      'Funnel ideas',
      'Creative direction',
      'Content planning',
      'Brand voice',
      'Idea generation',
      'Quality improvement',
    ],
    benefitsTitle: 'What This Prompt Pack Helps You Do',
    benefits: [
      'Save hours on writing, research, and planning',
      'Get deeper and more useful AI answers',
      'Create stronger offers and content',
      'Analyze your audience faster',
      'Plan marketing campaigns',
      'Generate business ideas',
      'Improve your copy',
      'Stop starting from scratch',
      'Use AI like a real assistant, not a toy',
    ],
    audienceTitle: 'Perfect For',
    audienceIntro:
      'If you use ChatGPT, Claude, or Gemini for business, this pack helps you get better results faster.',
    audience: [
      'Entrepreneurs',
      'Marketers',
      'Freelancers',
      'Content creators',
      'Agencies',
      'Product managers',
      'Startup founders',
      'Small business owners',
      'Coaches and consultants',
    ],
    processTitle: 'Simple 3-Step Process',
    processSteps: [
      {
        title: 'Choose your task',
        text: 'Open the section you need: marketing, copywriting, audience research, strategy, content, or analysis.',
      },
      {
        title: 'Copy the prompt',
        text: 'Each prompt is already structured with role, context, task, and output format.',
      },
      {
        title: 'Paste into AI',
        text: 'Use it with ChatGPT, Claude, Gemini, or another assistant, then customize it with your niche, product, audience, or goal.',
      },
    ],
    comparisonTitle: 'Why This Is Better Than Free Prompts',
    comparisonRows: [
      ['Random examples', 'Organized by task'],
      ['Generic answers', 'Business-focused output'],
      ['No clear logic', 'Structured prompt format'],
      ['Hard to customize', 'Easy to adapt'],
      ['No quality criteria', 'Built-in response standards'],
      ['Time-consuming', 'Copy-paste-ready'],
    ],
    whyTitle: 'Use AI Like a Real Business Assistant',
    whyText:
      'The pack gives AI the commercial structure it needs to produce answers you can actually use for planning, copy, strategy, and creative work.',
    priceTitle: 'Get the AI Expert Prompt System Today',
    priceText:
      'Get instant access to 300+ prompts that help you use AI for business, marketing, content, strategy, and analysis.',
    faq: [
      {
        question: 'Do I need prompt engineering experience?',
        answer:
          'No. The prompts are ready to use. You only need to copy, paste, and customize them.',
      },
      {
        question: 'Which AI tools does this work with?',
        answer:
          'This pack works with ChatGPT, Claude, Gemini, and similar AI assistants.',
      },
      {
        question: 'Can I use this for client work?',
        answer: 'Yes. You can use the prompts for your own projects or client projects.',
      },
      {
        question: 'Is this a course?',
        answer: 'No. This is a practical prompt library, not a long course.',
      },
      {
        question: 'Will this guarantee business results?',
        answer:
          'No prompt can guarantee results. Your results depend on your offer, product, audience, and execution. This pack helps you create better output faster.',
      },
    ],
    finalTitle: 'Stop Getting Generic AI Answers',
    finalText: 'Use a structured prompt system and turn AI into your business assistant.',
    icon: Brain,
    stat: '300+',
  },
  {
    path: '/product-photography-prompts',
    navLabel: 'Product Photos',
    price: '$9.90',
    metaTitle: 'Product Photography Prompt Pack — 50 AI Prompts for E-commerce Images',
    metaDescription:
      'Create realistic product photos for online stores, beauty brands, marketplaces, social media, and ads using 50 ready-to-use AI product photography prompts.',
    eyebrow: 'Product Photography Prompt Pack',
    title: 'Create Realistic Product Photos With AI — Without a Photo Studio',
    subtitle:
      '50 ready-to-use AI product photography prompts for stylish, realistic, and premium product images in minutes.',
    heroBullets: [
      'No photographer.',
      'No expensive studio.',
      'No special equipment.',
      'Add your product details and generate professional-looking visuals.',
    ],
    primaryButton: 'Get Product Photography Prompts',
    secondaryButton: 'View Styles Inside',
    problemTitle: 'Product Photos Are Expensive, Slow, and Hard to Produce',
    problemParagraphs: [
      'If you sell products online, you need good visuals for listings, Instagram posts, Facebook ads, product pages, email campaigns, and launch content.',
      'Photo shoots cost money, take time, and require planning.',
      'This prompt pack helps you create product visuals faster using AI image generators.',
    ],
    insideTitle: '50 Product Photography Prompts for AI Image Generators',
    insideIntro:
      'Ready-to-use prompts for different product styles, backgrounds, lighting setups, and visual directions.',
    includesTitle: 'Includes styles like',
    includes: [
      'Minimalist product photography',
      'Luxury beauty product shots',
      'Eco-style product scenes',
      'Clean marketplace visuals',
      'Premium cosmetic layouts',
      'Trendy social media product photos',
      'Soft natural lighting',
      'Studio-style product shots',
      'Advertising compositions',
      'Seasonal product visuals',
      'Product flat lays',
      'Lifestyle product scenes',
    ],
    benefitsTitle: 'What This Pack Helps You Do',
    benefits: [
      'Create product images without a studio',
      'Save money on photo shoots',
      'Generate visuals for ads and social media',
      'Make your product look more premium',
      'Test different backgrounds and styles',
      'Launch new products faster',
      'Create marketplace-ready images',
      'Build content for your brand',
      'Improve your visual presentation',
    ],
    audienceTitle: 'Perfect For',
    audience: [
      'Skincare products',
      'Cosmetics',
      'Lipstick',
      'Mascara',
      'Face masks',
      'Creams',
      'Perfume',
      'Aroma diffusers',
      'Beauty tools',
      'Haircare products',
      'Wellness products',
      'Small e-commerce products',
      'Marketplace products',
    ],
    processTitle: 'Create Product Visuals in 3 Steps',
    processSteps: [
      {
        title: 'Choose a visual style',
        text: 'Select minimalist, luxury, eco, clean marketplace, premium beauty, or social media style.',
      },
      {
        title: 'Add your product details',
        text: 'Replace the placeholders with your product name, packaging color, material, label, and brand style.',
      },
      {
        title: 'Generate the image',
        text: 'Paste the prompt into Nano Banana or another AI image generator and create your product visual.',
      },
    ],
    useCasesTitle: 'Use This Pack For',
    useCases: [
      { title: 'Listings', text: 'Product listing images and marketplace photos.' },
      { title: 'Social', text: 'Instagram content, launch images, and brand moodboards.' },
      { title: 'Ads', text: 'Facebook ad creatives and campaign visual concepts.' },
      { title: 'Websites', text: 'Product page visuals and creative direction tests.' },
    ],
    whyTitle: 'Save Time and Reduce Content Costs',
    whyText:
      'You do not always need a full photoshoot to test ideas. With AI product photography prompts, you can quickly create visual concepts, test different styles, and produce content faster.',
    priceTitle: 'Get 50 Product Photography Prompts',
    priceText:
      'Create product photos faster with ready-to-use AI prompts for e-commerce, beauty products, marketplaces, ads, and social media.',
    faq: [
      {
        question: 'Do I need a real product photo?',
        answer:
          'You can use product details, packaging description, or a reference image depending on the AI tool you use.',
      },
      {
        question: 'Which tools does this work with?',
        answer:
          'The prompts are designed for Nano Banana and can also be adapted for other AI image generators.',
      },
      {
        question: 'Is this only for beauty products?',
        answer:
          'No. It works best for beauty and small e-commerce products, but you can adapt the prompts for many product categories.',
      },
      {
        question: 'Can I use the images for ads?',
        answer:
          'You can use generated images according to the rules of the AI tool you use. Always check the tool’s commercial usage policy.',
      },
      {
        question: 'Will every image be perfect on the first try?',
        answer:
          'AI results may vary. The prompts are designed to give strong direction, but you may still need to generate a few versions.',
      },
    ],
    finalTitle: 'Create Better Product Photos Without Expensive Shoots',
    finalText: 'Get 50 ready-to-use AI product photography prompts today.',
    icon: Camera,
    stat: '50',
  },
  {
    path: '/prompts-that-sell',
    navLabel: 'Sell',
    price: '$9.90',
    metaTitle: 'Prompts That Sell — AI Prompts for Offers, Copy, Ads & Funnels',
    metaDescription:
      'A practical library of sales-driven AI prompts for creating offers, landing page copy, ad ideas, content, funnels, audience analysis, and marketing angles.',
    eyebrow: 'Prompts That Sell',
    title: 'AI Prompts That Help You Create Offers, Copy, Ads, and Content That Sell',
    subtitle:
      'Sales-focused AI prompts built for marketers, entrepreneurs, product teams, creators, and small business owners.',
    heroBullets: [
      'No theory course.',
      'No blank-page guessing.',
      'Practical prompts for offers, copy, funnels, and audience insights.',
      'Copy. Paste. Customize. Get a result you can work with.',
    ],
    primaryButton: 'Get Prompts That Sell',
    secondaryButton: 'See What’s Inside',
    problemTitle: 'Your Offer Is Not Weak Because You Are Bad at Marketing',
    problemParagraphs: [
      'You spend an hour trying to write one headline. You create an offer, but it feels average. You plan content, but it does not lead anywhere.',
      'You ask ChatGPT for help, but the answer sounds generic.',
      'The problem is that AI needs a better commercial structure. Prompts That Sell gives AI that structure.',
    ],
    insideTitle: 'Sales-Driven AI Templates for Real Marketing Tasks',
    insideIntro:
      'This pack helps you create marketing assets faster without starting from a blank page.',
    includesTitle: 'Includes prompts for',
    includes: [
      'Strong offers',
      'Headlines',
      'Hooks',
      'Landing page blocks',
      'Ad copy',
      'Facebook ad angles',
      'Instagram content',
      'Reels and TikTok ideas',
      'Stories scripts',
      'Funnel ideas',
      'CJM',
      'Audience analysis',
      'Customer pain points',
      'Objection handling',
      'Product positioning',
      'Creative concepts',
      'Hypothesis testing',
      'Sales messages',
    ],
    benefitsTitle: 'What This Pack Helps You Do',
    benefits: [
      'Create stronger offers',
      'Write better headlines',
      'Understand customer pain points',
      'Generate ad ideas faster',
      'Improve landing page copy',
      'Build content around real audience motivation',
      'Create marketing angles',
      'Test ideas before production',
      'Turn weak ideas into stronger campaigns',
      'Use AI as a sales assistant',
    ],
    audienceTitle: 'Perfect For',
    audienceIntro:
      'If you sell products, services, digital products, courses, subscriptions, or client work, this prompt pack can help you create better marketing output faster.',
    audience: [
      'Marketers',
      'Founders',
      'Product managers',
      'Freelancers',
      'Agencies',
      'Creators',
      'Coaches',
      'Consultants',
      'Small business owners',
      'Online service providers',
    ],
    processTitle: 'From Blank Page to Marketing Asset',
    processSteps: [
      {
        title: 'Choose the task',
        text: 'Pick what you need: offer, hook, ad, landing page, funnel, content idea, or audience analysis.',
      },
      {
        title: 'Copy the prompt',
        text: 'Each prompt gives AI a clear role, task, structure, and output format.',
      },
      {
        title: 'Add your product details',
        text: 'Customize it with your niche, audience, price, product, or offer.',
      },
      {
        title: 'Use the result',
        text: 'Edit, test, publish, or turn the result into a campaign asset.',
      },
    ],
    useCasesTitle: 'Use Prompts That Sell To Create',
    useCases: [
      { title: 'Offers', text: 'Product, service, digital product, and subscription offers.' },
      {
        title: 'Copy',
        text: 'Landing pages, headlines, hooks, descriptions, and value propositions.',
      },
      { title: 'Ads', text: 'Facebook ads, Instagram ads, UGC ideas, and creative angles.' },
      { title: 'Content', text: 'Stories, Reels, TikTok, Threads, X, and captions.' },
      { title: 'Strategy', text: 'Audience analysis, objections, funnels, CJM, and tests.' },
    ],
    whyTitle: 'Better Prompts Create Better Marketing Output',
    whyText:
      'Instead of asking AI to write a vague ad, you give it the audience, product, pain point, desired outcome, offer structure, tone of voice, output format, and quality criteria.',
    whyBullets: [
      'Audience and product context',
      'Pain point and desired outcome',
      'Offer structure and tone of voice',
      'Output format and quality criteria',
    ],
    priceTitle: 'Get Prompts That Sell Today',
    priceText:
      'Create stronger offers, copy, ads, content, funnels, and marketing ideas with ready-to-use AI prompts.',
    faq: [
      {
        question: 'Is this only for marketers?',
        answer:
          'No. It is useful for entrepreneurs, founders, freelancers, creators, agencies, and anyone who needs better marketing output.',
      },
      {
        question: 'Can I use it with ChatGPT?',
        answer: 'Yes. It works with ChatGPT, Claude, Gemini, and similar AI assistants.',
      },
      {
        question: 'Is this a course?',
        answer: 'No. This is a practical prompt pack. No long lessons. Just ready-to-use prompts.',
      },
      {
        question: 'Can I use it for client projects?',
        answer: 'Yes. You can use it to speed up marketing and copywriting work for yourself or clients.',
      },
      {
        question: 'Will it guarantee sales?',
        answer:
          'No. Sales depend on your product, offer, audience, traffic, and execution. The prompts help you create stronger marketing assets faster.',
      },
    ],
    finalTitle: 'Stop Guessing What to Write',
    finalText:
      'Use sales-driven AI prompts to create better offers, copy, ads, content, and funnels.',
    icon: BarChart3,
    stat: 'Sales',
  },
  {
    path: '/nano-banana-creative-techniques',
    navLabel: 'Nano Banana',
    price: '$9.90',
    metaTitle: 'Nano Banana Creative Techniques — 100 AI Image Generation Methods',
    metaDescription:
      'Get 100 proven AI image generation techniques for Nano Banana Pro and other AI image tools. Create visuals for ads, fashion, e-commerce, content, games, branding, and product design.',
    eyebrow: 'Nano Banana Creative Techniques',
    title: '100 Proven Nano Banana Techniques for Creating Better AI Images',
    subtitle:
      'A tested creative system for marketing, e-commerce, fashion, content, branding, product design, games, and visual projects.',
    heroBullets: [
      'Not just a random image prompt list.',
      'A practical creative system.',
      'Copy, adapt, and use it immediately.',
      'Guide AI with clearer creative direction.',
    ],
    primaryButton: 'Get Nano Banana Techniques',
    secondaryButton: 'See What’s Inside',
    problemTitle: 'AI Image Generation Is Powerful — But Random Prompts Create Random Results',
    problemParagraphs: [
      'You type a simple image prompt. The result looks average. The composition is weak. The lighting is wrong. The product does not look premium.',
      'The problem is not only the AI tool. The problem is the creative direction inside the prompt.',
      'This pack gives you tested techniques that help you guide AI more clearly.',
    ],
    insideTitle: '100 AI Image Generation Techniques',
    insideIntro:
      'A practical collection of tested techniques for Nano Banana Pro and other image generators.',
    includesTitle: 'Includes techniques for',
    includes: [
      'Fashion visuals',
      'E-commerce product mockups',
      'Virtual try-ons',
      'Product placement',
      'Lookbooks',
      'Brand campaigns',
      'UGC-style visuals',
      'Billboard concepts',
      'YouTube thumbnails',
      'Podcast covers',
      'Social media graphics',
      'Storyboards',
      'Cinematic lighting',
      'VFX-style images',
      '3D concepts',
      'Product design visualization',
      'Blueprints',
      'Character design',
      'Typography',
      'Collages',
      'Game assets',
      'Retro graphics',
      'Isometric scenes',
      'Infographics',
      'Professional portraits',
      'Technical documentation',
    ],
    benefitsTitle: 'What This Pack Helps You Do',
    benefits: [
      'Create better AI images faster',
      'Improve visual quality',
      'Generate premium creative concepts',
      'Build ad visuals',
      'Create product mockups',
      'Design fashion and e-commerce visuals',
      'Make content for social media',
      'Create storyboards and thumbnails',
      'Test creative directions',
      'Speed up design work',
      'Use Nano Banana more professionally',
    ],
    audienceTitle: 'Perfect For',
    audienceIntro:
      'If you create visuals with AI, this pack helps you get more controlled and professional results.',
    audience: [
      'Designers',
      'Marketers',
      'Content creators',
      'Agencies',
      'Photographers',
      'Brand owners',
      'E-commerce sellers',
      'Creative directors',
      'YouTubers',
      'Social media managers',
      'Game creators',
      'Product designers',
    ],
    processTitle: 'Use the Techniques in 3 Steps',
    processSteps: [
      {
        title: 'Choose the technique',
        text: 'Pick the visual task you need: product mockup, ad visual, portrait, fashion concept, thumbnail, storyboard, or 3D concept.',
      },
      {
        title: 'Copy the prompt structure',
        text: 'Each technique gives AI a clear visual direction.',
      },
      {
        title: 'Customize the details',
        text: 'Add your product, brand, colors, style, lighting, camera angle, mood, and composition. Generate, refine, and use the result.',
      },
    ],
    useCasesTitle: 'Use Nano Banana Creative Techniques For',
    useCases: [
      { title: 'Marketing', text: 'Ad creatives, campaign visuals, product placement, UGC-style content.' },
      { title: 'E-commerce', text: 'Product mockups, beauty visuals, fashion looks, marketplace content.' },
      { title: 'Content', text: 'YouTube thumbnails, podcast covers, social posts, and storyboards.' },
      { title: 'Design', text: '3D concepts, product visualization, blueprints, typography, and collages.' },
      { title: 'Creative Projects', text: 'Characters, cinematic scenes, retro graphics, game assets, and isometric scenes.' },
    ],
    whyTitle: 'Better Visual Direction Creates Better AI Images',
    whyText:
      'A good AI image prompt is not just a description. It is a creative brief that tells AI what to show, how to frame it, what lighting to use, what style to follow, and what result you expect.',
    whyBullets: [
      'Subject and composition',
      'Lighting, mood, and style',
      'Camera angle and visual hierarchy',
      'Details that matter for the final result',
    ],
    priceTitle: 'Get 100 Nano Banana Creative Techniques',
    priceText:
      'Create better AI visuals with tested techniques for Nano Banana Pro and other image generators.',
    faq: [
      {
        question: 'Is this only for Nano Banana Pro?',
        answer:
          'The examples are designed for Nano Banana Pro, but many techniques can be adapted for other AI image generators.',
      },
      {
        question: 'Do I need design experience?',
        answer:
          'No. The techniques are written so you can copy, adapt, and use them even if you are not a professional designer.',
      },
      {
        question: 'Can I use it for client work?',
        answer: 'Yes. You can use the techniques for your own work or client projects.',
      },
      {
        question: 'Are these just image prompts?',
        answer:
          'No. This is a collection of creative techniques and prompt structures for different visual tasks.',
      },
      {
        question: 'Will every image be perfect?',
        answer:
          'AI image generation can vary. These techniques help you give better direction and improve the quality of results, but you may still need to test several versions.',
      },
    ],
    finalTitle: 'Create Better AI Images With Proven Prompt Techniques',
    finalText:
      'Get 100 Nano Banana creative techniques and start generating stronger visuals today.',
    icon: WandSparkles,
    stat: '100',
  },
];

const homeNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Prompt Packs', href: '#packs' },
  { label: 'AI Expert Prompts', href: '/ai-expert-prompt-system' },
  { label: 'Product Photography', href: '/product-photography-prompts' },
  { label: 'Prompts That Sell', href: '/prompts-that-sell' },
  { label: 'Nano Banana Techniques', href: '/nano-banana-creative-techniques' },
  { label: 'FAQ', href: '#faq' },
];

const storeName = 'AI Prompt Packs';
const supportEmail = 'support@yourdomain.com';
const supportHref = `mailto:${supportEmail}?subject=AI%20Prompt%20Packs%20Support`;
const policyUpdatedAt = 'July 2, 2026';
const launchDealDeadline = '2026-07-10T23:59:59+06:00';
const baseOfferPrice = '$9.90';
const fullOfferPrice = '$14.90';
const fullOfferOldPrice = '$79';

const heroQuizOptions = [
  {
    label: 'Sales',
    result: 'Prompts That Sell',
    text: 'Offers, hooks, objections, landing pages, and ad angles.',
    href: '/prompts-that-sell',
  },
  {
    label: 'Business',
    result: 'AI Expert Prompt System',
    text: 'Strategy, audience research, ideas, content, and analysis.',
    href: '/ai-expert-prompt-system',
  },
  {
    label: 'Product Photos',
    result: 'Product Photography Pack',
    text: 'Premium product images without a studio or expensive shoot.',
    href: '/product-photography-prompts',
  },
  {
    label: 'AI Visuals',
    result: 'Nano Banana Techniques',
    text: 'Scenes, fashion looks, thumbnails, and creatives with clear art direction.',
    href: '/nano-banana-creative-techniques',
  },
];

const packSalesCopy: Record<
  string,
  {
    title: string;
    subtitle: string;
    heroBullets: string[];
    primaryButton: string;
    secondaryButton: string;
    problemTitle: string;
    problemText: string;
    finalTitle: string;
    finalText: string;
  }
> = {
  '/ai-expert-prompt-system': {
    title: 'Turn AI Into a Business Assistant That Gives You Useful Output',
    subtitle:
      '300+ prompts for strategy, marketing, analysis, content, and offers. Copy. Paste. Get structure.',
    heroBullets: [
      '⚡ Start without prompt engineering',
      '🎯 Ready formats for real business tasks',
      '💼 Use it for your business, clients, and content',
    ],
    primaryButton: 'Get Full Access',
    secondaryButton: 'See What’s Inside',
    problemTitle: 'AI gives weak answers when the task is weak',
    problemText:
      'You ask for an idea and get something obvious. You ask for strategy and get generic advice. You ask for copy and it sounds like everyone else. That is frustrating because your time disappears and the result still feels unusable. This pack gives AI a role, context, quality criteria, and output format so it works like an assistant, not a random phrase generator.',
    finalTitle: 'Get the prompt system and stop starting from a blank page',
    finalText:
      'Open the right section, copy the prompt, add your product or niche, and get usable output in minutes.',
  },
  '/product-photography-prompts': {
    title: 'Create Product Photos That Look More Expensive Than Your Budget',
    subtitle:
      '50 prompts for AI product photography: lighting, camera angle, background, surface, composition, and premium mood.',
    heroBullets: [
      '📸 No studio or photographer needed',
      '🛒 Built for marketplaces, ads, and Instagram',
      '✨ Make products look cleaner and more premium',
    ],
    primaryButton: 'Get Photo Prompts',
    secondaryButton: 'See Examples',
    problemTitle: 'Bad product photos make good products look cheap',
    problemText:
      'You can have a strong product, but if the image looks random, buyers scroll past it. A studio is expensive. A photographer takes time. AI without a clear prompt gives plastic textures, strange shadows, and an unnatural look. This pack turns your request into art direction: lighting, camera, surface, style, and realism rules are already built in.',
    finalTitle: 'Make your product look more premium today',
    finalText:
      'Use ready-made product photo prompts, add your product, and create images for listings, ads, and content.',
  },
  '/prompts-that-sell': {
    title: 'Write Offers, Hooks, and Copy That Push People Toward Buying',
    subtitle:
      'Sales prompts for pain points, promises, objections, CTAs, landing pages, ads, Reels, TikTok, and email.',
    heroBullets: [
      '💰 Sharper offers and clearer value',
      '🧲 More hooks for ads and content',
      '🚀 Faster path from idea to sale',
    ],
    primaryButton: 'Get Selling Prompts',
    secondaryButton: 'What’s Inside',
    problemTitle: 'People do not buy when they do not feel “why now”',
    problemText:
      'Weak copy can sound nice, but it does not move people to act. It misses the pain, fails to explain value, does not reduce fear, and gives no reason to buy now. Ads get fewer clicks. Landing pages feel soft. Content gets likes instead of sales. This pack helps uncover real buyer motivation and turn it into offers, hooks, CTAs, and page structure.',
    finalTitle: 'Stop writing “fine.” Start writing copy that sells.',
    finalText:
      'Use ready-made sales prompts for offers, landing pages, ads, content, and objection handling.',
  },
  '/nano-banana-creative-techniques': {
    title: 'Create AI Visuals That Feel Like Real Art Direction',
    subtitle:
      '100 techniques for Nano Banana and other image AI tools: scenes, style, lighting, composition, campaigns, thumbnails, and mockups.',
    heroBullets: [
      '🍌 More control over the final image',
      '🎬 Cinematic style without chaos',
      '🧠 Ready creative scenarios',
    ],
    primaryButton: 'Get the Techniques',
    secondaryButton: 'See Examples',
    problemTitle: 'AI images look random when they have no creative director',
    problemText:
      'One prompt gives a beautiful frame. The next gives strange composition, extra details, and a different style. That breaks ads, brand consistency, and visual systems. The problem is not AI. The problem is missing creative direction. This pack gives you the frame technique: mood, subject, lighting, hierarchy, style, and final control.',
    finalTitle: 'Give AI clear visual direction',
    finalText:
      'Choose a technique, add your product or idea, and create visuals for ads, content, and campaigns.',
  },
};

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    badge: 'Minimum',
    oldPrice: '$29',
    price: baseOfferPrice,
    description: 'One prompt pack. Useful only if you need one narrow task.',
    losses: [
      '❌ Only 1 pack',
      '❌ No bonus checklists',
      '❌ No quick-start guide',
      '❌ No full system for sales and visuals',
    ],
    cta: 'Get Basic',
  },
  {
    name: 'Complete',
    badge: 'Best Value',
    oldPrice: fullOfferOldPrice,
    price: fullOfferPrice,
    description:
      'All 4 prompt packs + bonuses. Only $5 more, with several times more value.',
    gains: [
      '✅ All 4 prompt packs',
      '✅ 300+ business prompts',
      '✅ 50 product photo prompts',
      '✅ Sales pack + Nano Banana techniques',
      '✅ All bonuses below included free',
    ],
    cta: 'Get Complete Bundle',
  },
];

const valueStackItems = [
  {
    title: 'Core Product: 4 Prompt Packs',
    value: '$79',
    text: 'Business, sales, product photos, and AI visuals in one practical system.',
  },
  {
    title: 'Bonus: Quick-Start Guide',
    value: '$19',
    text: 'How to choose the right prompt, add context, and get useful output faster.',
  },
  {
    title: 'Bonus: AI Output Checklist',
    value: '$15',
    text: 'Check every answer for structure, specificity, CTA, visual logic, and mistakes.',
  },
  {
    title: 'Bonus: Launch Content Templates',
    value: '$29',
    text: 'Templates for posts, hooks, offers, and fast promotional ideas.',
  },
  {
    title: 'Bonus: Starter Email Support',
    value: '$25',
    text: 'Help with access, choosing the right pack, and first questions after purchase.',
  },
];

const objectionFaqItems = [
  {
    question: '😅 I am a beginner. Can I start without experience?',
    answer:
      'Yes. Open the right section, copy the prompt, add your product, niche, or task. No complicated prompt engineering required.',
  },
  {
    question: '🔒 Is the checkout safe?',
    answer:
      'Payment should happen through a secure Stripe checkout or another trusted payment provider. This website does not store card details.',
  },
  {
    question: '⚡ When do I get access?',
    answer:
      'After payment, you receive digital access to the selected pack or complete bundle. This is a digital product, not a physical shipment.',
  },
  {
    question: '💸 What if it is not right for me?',
    answer:
      'You get a 100% money-back guarantee for 7 days. Contact support if the product does not help you get started faster.',
  },
  {
    question: '🧑‍💼 Can I use this for client work?',
    answer:
      'Yes. You can use the prompts for your projects, business, content, and client work. You cannot resell the prompt pack files themselves.',
  },
];


const commerceTrustItems: Array<{
  title: string;
  text: string;
  icon: IconComponent;
}> = [
  {
    title: 'One-time purchase',
    text: 'Each pack is sold separately for $9.90. No monthly subscription.',
    icon: ShoppingBag,
  },
  {
    title: 'Instant digital access',
    text: 'After checkout, buyers receive access to the selected prompt pack.',
    icon: TimerReset,
  },
  {
    title: 'Clear commercial license',
    text: 'Use the prompts for your own projects, business assets, and client work.',
    icon: FileText,
  },
  {
    title: 'Support and policies',
    text: 'Contact, refund, privacy, terms, and license pages are ready for launch.',
    icon: ShieldCheck,
  },
];

const legalPages: PolicyPage[] = [
  {
    path: '/privacy-policy',
    navLabel: 'Privacy',
    eyebrow: 'Privacy Policy',
    title: 'How customer information is handled',
    metaTitle: 'Privacy Policy - AI Prompt Packs',
    metaDescription:
      'Privacy policy for AI Prompt Packs, including purchase data, email support, analytics, and payment processor information.',
    intro:
      'This policy explains what information may be collected when someone visits the site, contacts support, or buys a digital prompt pack.',
    sections: [
      {
        title: 'Information we may collect',
        body: [
          'We may collect basic contact information such as name and email address when a customer buys a product, requests support, or joins an email list.',
          'We may also collect technical information such as pages visited, device type, browser type, referral source, and general site analytics.',
        ],
      },
      {
        title: 'Payments',
        body: [
          'Payment card details are processed by the checkout provider. This site should not store full card numbers or sensitive payment credentials.',
          'The payment provider may share order details needed to deliver the digital product, confirm purchase status, prevent fraud, and provide receipts.',
        ],
      },
      {
        title: 'How information is used',
        body: [
          'Customer information is used to deliver purchased prompt packs, provide support, send receipts, improve the website, and handle legal or security requirements.',
          'Marketing emails should only be sent when a customer has agreed to receive them or when allowed by the checkout provider settings.',
        ],
      },
      {
        title: 'Contact',
        body: [
          `For privacy questions or data requests, contact ${supportEmail}.`,
          'Replace this email with the real support email before publishing the live store.',
        ],
      },
    ],
  },
  {
    path: '/terms',
    navLabel: 'Terms',
    eyebrow: 'Terms of Use',
    title: 'Rules for buying and using the prompt packs',
    metaTitle: 'Terms of Use - AI Prompt Packs',
    metaDescription:
      'Terms of use for buying and using AI Prompt Packs digital products.',
    intro:
      'These terms explain the buyer relationship, digital product access, acceptable use, and practical limitations of AI-generated output.',
    sections: [
      {
        title: 'Digital product purchase',
        body: [
          'AI Prompt Packs sells downloadable or accessible digital prompt collections. No physical product is shipped.',
          'After a successful checkout, the customer should receive access to the selected pack through the checkout provider or delivery email.',
        ],
      },
      {
        title: 'Use of AI tools',
        body: [
          'The prompts are designed for tools such as ChatGPT, Claude, Gemini, Nano Banana, and similar AI products.',
          'AI tools can produce different results depending on model, settings, input quality, niche, and user editing. Results are not guaranteed.',
        ],
      },
      {
        title: 'No business guarantee',
        body: [
          'Prompt packs can help customers create better drafts, ideas, visual briefs, copy, and research outputs faster.',
          'They do not guarantee revenue, sales, ad performance, ranking, legal compliance, or business outcomes.',
        ],
      },
      {
        title: 'Customer responsibility',
        body: [
          'Customers are responsible for checking AI outputs before publishing or using them in business, advertising, legal, medical, financial, or client-facing contexts.',
          'Customers should follow the terms and policies of the AI tools they use.',
        ],
      },
    ],
  },
  {
    path: '/refund-policy',
    navLabel: 'Refunds',
    eyebrow: 'Refund Policy',
    title: 'A clear policy for digital prompt pack purchases',
    metaTitle: 'Refund Policy - AI Prompt Packs',
    metaDescription:
      'Refund policy for AI Prompt Packs digital products, access issues, duplicate purchases, and support requests.',
    intro:
      'Because prompt packs are digital products, the refund policy needs to be clear before customers buy.',
    sections: [
      {
        title: '7-day money-back guarantee',
        body: [
          'Customers can request a refund within 7 days of purchase if the prompt pack does not help them get started faster or create more useful AI output.',
          'To request a refund, contact support with the buyer email, product name, and order receipt if available.',
        ],
      },
      {
        title: 'When support can help',
        body: [
          'Customers should contact support if they paid but did not receive access, bought the same product twice by mistake, received the wrong product, or want to use the 7-day guarantee.',
          'Support will review the request and respond through the buyer email.',
        ],
      },
      {
        title: 'Digital product note',
        body: [
          'Prompt packs are digital products. The guarantee is designed to remove purchase risk while still protecting the product from abuse.',
          'Refund decisions may still depend on fraud prevention, duplicate claims, payment provider rules, and unusual account activity.',
        ],
      },
      {
        title: 'Support email',
        body: [
          `For purchase help, contact ${supportEmail}.`,
          'Replace this email with the real support email before taking live payments.',
        ],
      },
    ],
  },
  {
    path: '/license',
    navLabel: 'License',
    eyebrow: 'Prompt License',
    title: 'What buyers can and cannot do with the prompts',
    metaTitle: 'License - AI Prompt Packs',
    metaDescription:
      'Commercial license rules for using AI Prompt Packs in personal projects, business work, and client work.',
    intro:
      'This license gives buyers practical freedom to use the prompts in real work while protecting the prompt packs from resale or redistribution.',
    sections: [
      {
        title: 'Allowed use',
        body: [
          'Buyers may use the prompts for personal projects, business projects, marketing assets, content creation, product visuals, research, and client work.',
          'Buyers may edit, adapt, and combine prompts with their own context, niche, products, brand voice, and workflow.',
        ],
      },
      {
        title: 'Client work',
        body: [
          'Buyers may use outputs created with the prompts for client projects, agency work, consulting, and freelance delivery.',
          'The prompt pack files themselves should not be transferred to clients as a standalone product.',
        ],
      },
      {
        title: 'Not allowed',
        body: [
          'Buyers may not resell, redistribute, upload, share publicly, or package the prompt packs as their own product.',
          'Buyers may not use the packs to create a substantially similar prompt library for resale.',
        ],
      },
      {
        title: 'AI output ownership',
        body: [
          'Ownership and usage rights for AI-generated output can depend on the AI tool used, local law, and the customer input. Buyers should check the terms of their AI provider.',
        ],
      },
    ],
  },
  {
    path: '/contact',
    navLabel: 'Contact',
    eyebrow: 'Contact',
    title: 'Questions before or after purchase',
    metaTitle: 'Contact - AI Prompt Packs',
    metaDescription:
      'Contact AI Prompt Packs for purchase help, product questions, support, licensing, and business inquiries.',
    intro:
      'Use this page for buyer support, product questions, licensing questions, and business inquiries.',
    sections: [
      {
        title: 'Support email',
        body: [
          `Email: ${supportEmail}`,
          'Replace this placeholder with the real support email before launch.',
        ],
      },
      {
        title: 'Before purchase',
        body: [
          'Customers can ask which prompt pack fits their task, whether a pack works with their AI tool, or what is included before buying.',
        ],
      },
      {
        title: 'After purchase',
        body: [
          'Customers can ask for help with access, delivery, duplicate purchases, wrong product delivery, or license questions.',
        ],
      },
      {
        title: 'Response expectations',
        body: [
          'A simple public promise such as "we usually reply within 1-2 business days" can be added here after the support process is confirmed.',
        ],
      },
    ],
  },
];

const heroStats = [
  { value: '$9.90', label: 'per prompt pack' },
  { value: '4', label: 'focused packs' },
  { value: '0', label: 'monthly subscription' },
];

const trustItems: Array<{ title: string; text: string; icon: IconComponent }> = [
  {
    title: 'Ready to use instantly',
    text: 'Copy, paste, customize, and get results.',
    icon: TimerReset,
  },
  {
    title: 'Works with popular AI tools',
    text: 'Use with ChatGPT, Claude, Gemini, Nano Banana, and other AI tools.',
    icon: Brain,
  },
  {
    title: 'Built for real tasks',
    text: 'Marketing, sales, content, product visuals, research, and creative work.',
    icon: Target,
  },
  {
    title: 'No subscription',
    text: 'Buy only the prompt pack you need.',
    icon: ShieldCheck,
  },
];

const homeComparisonRows: Array<[string, string]> = [
  ['Hard to organize', 'Organized by task'],
  ['Usually generic', 'Built for commercial use'],
  ['No clear system', 'Easy to copy and customize'],
  ['No business logic', 'Focused on real outcomes'],
  ['Often require many rewrites', 'Designed for ChatGPT, Claude, Gemini, and Nano Banana'],
  ['Not built for specific workflows', 'Simple one-time purchase'],
];

const workflowSteps = [
  {
    title: 'Choose your prompt pack',
    text: 'Pick the pack that matches your current goal: business, sales, product photos, or AI images.',
  },
  {
    title: 'Buy once for $9.90',
    text: 'No subscription. No hidden fees. Just one prompt pack for one clear task.',
  },
  {
    title: 'Copy the prompt',
    text: 'Open the prompt you need and copy it.',
  },
  {
    title: 'Paste into your AI tool',
    text: 'Use it with ChatGPT, Claude, Gemini, Nano Banana, or another compatible AI tool.',
  },
  {
    title: 'Customize and use the result',
    text: 'Add your product, audience, niche, style, brand, or goal, then turn the AI output into real work.',
  },
];

const creationCategories = [
  {
    title: 'For business',
    text: 'Marketing ideas, product positioning, competitor analysis, audience research, business plans, and strategy.',
    icon: Megaphone,
  },
  {
    title: 'For sales',
    text: 'Offers, hooks, objections, landing page copy, sales angles, value propositions, and funnel ideas.',
    icon: Target,
  },
  {
    title: 'For content',
    text: 'Instagram posts, Threads posts, X posts, Reels ideas, TikTok scripts, Stories, YouTube titles, and content plans.',
    icon: PenLine,
  },
  {
    title: 'For e-commerce',
    text: 'Product photos, marketplace visuals, product descriptions, ad creatives, launch visuals, and brand content.',
    icon: ShoppingBag,
  },
  {
    title: 'For design and visuals',
    text: 'Nano Banana images, product mockups, fashion visuals, cinematic scenes, thumbnails, storyboards, characters, and infographics.',
    icon: Image,
  },
];

const homeFaqItems = [
  {
    question: 'Do I need prompt engineering experience?',
    answer:
      'No. The prompt packs are ready to use. You only need to copy, paste, and customize them.',
  },
  {
    question: 'Do I need to buy all packs?',
    answer:
      'No. Each pack is sold separately for $9.90. You can buy only the one you need.',
  },
  {
    question: 'Which tools can I use these prompts with?',
    answer:
      'The prompts are designed for ChatGPT, Claude, Gemini, Nano Banana, and other popular AI tools.',
  },
  {
    question: 'Is this a course?',
    answer:
      'No. These are practical prompt packs, not a long course.',
  },
  {
    question: 'Can I use the prompts for client work?',
    answer:
      'Yes. You can use them for your own projects, business, content, or client work.',
  },
  {
    question: 'Will the prompts guarantee sales?',
    answer:
      'No. Results depend on your product, audience, offer, traffic, and execution. The prompts help you create better output faster.',
  },
  {
    question: 'Are the image prompts only for Nano Banana?',
    answer:
      'The Nano Banana pack is designed for Nano Banana Pro, but many techniques can be adapted for other image-generation tools.',
  },
  {
    question: 'How do I get access?',
    answer:
      'After purchase, you get instant access to the selected prompt pack.',
  },
  {
    question: 'Can I use the prompts for client projects?',
    answer:
      'Yes. The license allows use in your own business, content, marketing, visuals, and client work. You cannot resell or redistribute the prompt pack itself.',
  },
  {
    question: 'What if I have a purchase problem?',
    answer:
      'Contact support if you paid but did not receive access, bought the same pack twice, or received the wrong product.',
  },
];

const homePackCopy: Record<
  string,
  {
    headline: string;
    bestFor: string;
    useItToCreate: string[];
  }
> = {
  '/ai-expert-prompt-system': {
    headline: '300+ prompts to turn AI into your business assistant',
    bestFor:
      'Entrepreneurs, freelancers, marketers, creators, agencies, product managers, and startup founders.',
    useItToCreate: [
      'Business ideas',
      'Marketing strategies',
      'Audience research',
      'Customer pain analysis',
      'Offers and hooks',
      'Landing page copy',
      'Content plans',
      'Ad ideas',
      'Competitor analysis',
      'Product positioning',
    ],
  },
  '/product-photography-prompts': {
    headline: '50 prompts to create product photos with AI without a photo studio',
    bestFor:
      'Beauty brands, skincare products, cosmetics, e-commerce stores, marketplace sellers, and product creators.',
    useItToCreate: [
      'Product listing images',
      'Beauty product visuals',
      'Instagram product content',
      'Facebook ad creatives',
      'Marketplace images',
      'Launch visuals',
      'Premium product scenes',
      'Minimalist and luxury product shots',
    ],
  },
  '/prompts-that-sell': {
    headline: 'Sales-focused prompts for offers, copy, ads, funnels, and content',
    bestFor:
      'Marketers, founders, product teams, agencies, coaches, consultants, freelancers, and small business owners.',
    useItToCreate: [
      'Strong offers',
      'Headlines and hooks',
      'Landing page blocks',
      'Ad copy',
      'Instagram content',
      'Reels and TikTok ideas',
      'Stories scripts',
      'Funnel ideas',
      'CJM',
      'Objection handling',
      'Sales angles',
    ],
  },
  '/nano-banana-creative-techniques': {
    headline: '100 tested techniques for creating better AI images',
    bestFor:
      'Designers, content creators, marketers, agencies, photographers, e-commerce brands, creative directors, and visual creators.',
    useItToCreate: [
      'Fashion visuals',
      'Product mockups',
      'AI ad creatives',
      'UGC-style images',
      'YouTube thumbnails',
      'Brand campaigns',
      'Lookbooks',
      'Storyboards',
      'Character designs',
      '3D concepts',
      'Infographics',
      'Game assets',
    ],
  },
};

const beforeAfterCards = [
  {
    before: 'Write me an ad for my product.',
    after:
      'Act as a direct-response marketer. Use this audience, pain point, offer, proof, tone, constraints, and output format to create 10 ad angles.',
  },
  {
    before: 'Make a product photo.',
    after:
      'Create a premium cosmetic product scene with camera angle, lighting, surface, background, styling props, realism rules, and composition notes.',
  },
  {
    before: 'Give me business ideas.',
    after:
      'Analyze this niche, customer segment, buying trigger, existing alternatives, constraints, and generate validated offer ideas with positioning.',
  },
];

const previewCards = [
  {
    title: 'Audience Pain Analyzer',
    useCase: 'Find emotional buying triggers before writing copy.',
    output: 'Pain points, objections, desired outcomes, messaging angles.',
  },
  {
    title: 'Landing Page Block Builder',
    useCase: 'Turn a product idea into a structured page section.',
    output: 'Headline, proof, benefits, objections, CTA, section flow.',
  },
  {
    title: 'AI Product Photo Director',
    useCase: 'Create a premium image prompt for e-commerce visuals.',
    output: 'Scene direction, lighting, camera, surface, styling, realism.',
  },
  {
    title: 'Nano Banana Campaign Visual',
    useCase: 'Guide AI toward a more controlled creative image.',
    output: 'Concept, mood, composition, visual hierarchy, final refinements.',
  },
];

const receiveItems = [
  'Instant access after purchase',
  'Copy-paste-ready prompt structures',
  'Organized categories for specific tasks',
  'Use forever with no monthly subscription',
  'Works with ChatGPT, Claude, Gemini, Nano Banana, and other AI tools',
  'Built-in role, context, output format, and quality criteria',
];

const packChooserItems = [
  {
    title: 'Need better marketing?',
    text: 'Choose Prompts That Sell for offers, hooks, copy, funnels, and ad ideas.',
    href: '/prompts-that-sell',
  },
  {
    title: 'Need better AI images?',
    text: 'Choose Nano Banana Creative Techniques for visual direction and image systems.',
    href: '/nano-banana-creative-techniques',
  },
  {
    title: 'Need product photos?',
    text: 'Choose Product Photography Prompt Pack for premium e-commerce visuals.',
    href: '/product-photography-prompts',
  },
  {
    title: 'Need a business assistant?',
    text: 'Choose AI Expert Prompt System for marketing, research, strategy, and content.',
    href: '/ai-expert-prompt-system',
  },
];

const packPreviewByPath: Record<
  string,
  Array<{ title: string; useCase: string; output: string }>
> = {
  '/ai-expert-prompt-system': [
    {
      title: 'Business Idea Generator',
      useCase: 'Turn a niche into practical offer and content opportunities.',
      output: 'Ideas, positioning, audience, risks, next actions.',
    },
    {
      title: 'Audience Research Map',
      useCase: 'Understand what customers want, fear, compare, and buy.',
      output: 'Pain points, objections, motivations, language patterns.',
    },
    {
      title: 'Competitor Analysis Brief',
      useCase: 'Find gaps in competitor messaging and product positioning.',
      output: 'Strengths, weaknesses, hooks, differentiation ideas.',
    },
  ],
  '/product-photography-prompts': [
    {
      title: 'Luxury Beauty Scene',
      useCase: 'Create a premium campaign visual for cosmetics or skincare.',
      output: 'Lighting, props, surface, lens, composition, realism rules.',
    },
    {
      title: 'Clean Marketplace Shot',
      useCase: 'Generate listing-friendly visuals with a polished studio look.',
      output: 'White space, angle, shadows, background, product hierarchy.',
    },
    {
      title: 'Social Product Flat Lay',
      useCase: 'Make scroll-stopping content for Instagram and ads.',
      output: 'Layout, styling props, texture, color palette, mood.',
    },
  ],
  '/prompts-that-sell': [
    {
      title: 'Offer Sharpener',
      useCase: 'Turn an average offer into a clearer promise.',
      output: 'Audience, problem, value, mechanism, risk reducer, CTA.',
    },
    {
      title: 'Objection Handler',
      useCase: 'Find why people hesitate and write blocks that reduce friction.',
      output: 'Objections, proof, answers, page blocks, ad angles.',
    },
    {
      title: 'Hook Generator',
      useCase: 'Create strong hooks for ads, Reels, TikTok, and landing pages.',
      output: 'Hook types, emotional angles, formats, variations.',
    },
  ],
  '/nano-banana-creative-techniques': [
    {
      title: 'Cinematic Product Placement',
      useCase: 'Create brand visuals with controlled scene direction.',
      output: 'Subject, environment, lighting, camera, mood, composition.',
    },
    {
      title: 'Fashion Lookbook Frame',
      useCase: 'Generate editorial visuals for social campaigns and moodboards.',
      output: 'Styling, pose, fabric, location, lens, color grading.',
    },
    {
      title: 'Storyboard Concept Shot',
      useCase: 'Design visual sequences for campaigns, videos, or creative tests.',
      output: 'Scene beat, framing, atmosphere, motion, visual hierarchy.',
    },
  ],
};

const visualGalleryByPath: Record<
  string,
  Array<{ src: string; title: string; caption: string }>
> = {
  '/product-photography-prompts': [
    {
      src: '/packs/product-photography/product-photo-01.png',
      title: 'Luxury product scene',
      caption: 'Premium product direction for ads and launch visuals.',
    },
    {
      src: '/packs/product-photography/product-photo-02.png',
      title: 'Beauty campaign shot',
      caption: 'Soft lighting, clean styling, e-commerce-ready mood.',
    },
    {
      src: '/packs/product-photography/product-photo-03.png',
      title: 'Marketplace polish',
      caption: 'Structured visual brief for listings and product pages.',
    },
    {
      src: '/packs/product-photography/product-photo-04.png',
      title: 'Social product content',
      caption: 'Scroll-ready product visuals for feeds and ads.',
    },
    {
      src: '/packs/product-photography/product-photo-05.png',
      title: 'Minimal composition',
      caption: 'Clean backgrounds and premium product focus.',
    },
    {
      src: '/packs/product-photography/product-photo-06.png',
      title: 'Launch visual concept',
      caption: 'Fast concept testing before production.',
    },
    {
      src: '/packs/product-photography/product-photo-07.png',
      title: 'Brand detail frame',
      caption: 'Texture, packaging, surface, and lighting direction.',
    },
  ],
  '/nano-banana-creative-techniques': [
    {
      src: '/packs/nano-banana/nano-banana-01.png',
      title: 'Creative campaign visual',
      caption: 'Cinematic prompt direction for stronger AI images.',
    },
    {
      src: '/packs/nano-banana/nano-banana-02.png',
      title: 'Fashion and brand mood',
      caption: 'Controlled style, lighting, and atmosphere.',
    },
    {
      src: '/packs/nano-banana/nano-banana-03.png',
      title: 'Visual storytelling frame',
      caption: 'Composition-led techniques for content and ads.',
    },
    {
      src: '/packs/nano-banana/nano-banana-04.png',
      title: 'Surreal product concept',
      caption: 'Creative systems for more memorable output.',
    },
    {
      src: '/packs/nano-banana/nano-banana-05.png',
      title: 'Thumbnail-ready idea',
      caption: 'High-impact framing for social and video assets.',
    },
    {
      src: '/packs/nano-banana/nano-banana-06.png',
      title: 'Cinematic AI scene',
      caption: 'Mood, lighting, and visual hierarchy in one brief.',
    },
  ],
};

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute('content', description);
  }, [description, title]);
}

function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const isLast = index === words.length - 1;

        return (
          <span className="overflow-hidden pb-[0.08em]" key={`${word}-${index}`}>
            <motion.span
              className="relative inline-block"
              initial={{ y: 22, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 22, opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease,
              }}
            >
              {word}
              {showAsterisk && isLast ? (
                <span className="absolute -right-[0.32em] top-[0.65em] text-[0.31em] leading-none">
                  *
                </span>
              ) : null}
              {index < words.length - 1 ? '\u00A0' : null}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

function WordsPullUpMultiStyle({
  segments,
  className = '',
}: {
  segments: StyledSegment[];
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const words = useMemo(
    () =>
      segments.flatMap((segment, segmentIndex) =>
        segment.text.split(' ').map((word, wordIndex) => ({
          className: segment.className,
          id: `${segmentIndex}-${wordIndex}-${word}`,
          word,
        })),
      ),
    [segments],
  );

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map(({ word, className: wordClassName, id }, index) => (
        <span className="overflow-hidden pb-[0.12em]" key={id}>
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: index * 0.06,
              ease,
            }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : null}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function AnimatedLetter({
  children,
  index,
  progress,
  total,
}: {
  children: ReactNode;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const charProgress = index / total;
  const opacity = useTransform(
    progress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1],
  );

  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

function RevealCard({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.96, y: 16 }
      }
      transition={{ duration: 0.75, delay, ease: cardEase }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton({
  children,
  href,
  variant = 'solid',
}: {
  children: ReactNode;
  href: string;
  variant?: 'solid' | 'ghost';
}) {
  const isSolid = variant === 'solid';

  return (
    <a
      className={`group inline-flex items-center gap-2 rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-[gap,background-color,color,border-color] duration-300 hover:gap-3 sm:text-base ${
        isSolid
          ? 'bg-primary text-black'
          : 'border border-primary/25 bg-black/30 text-primary backdrop-blur-md hover:border-primary/60'
      }`}
      href={href}
    >
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10 ${
          isSolid ? 'bg-black' : 'bg-primary'
        }`}
      >
        <ArrowRight
          className={`h-4 w-4 ${isSolid ? 'text-primary' : 'text-black'}`}
          strokeWidth={1.8}
        />
      </span>
    </a>
  );
}

function LazySectionBackground({
  src,
  imageClassName = 'opacity-35',
  overlayClassName = 'bg-black/75',
}: {
  src: string;
  imageClassName?: string;
  overlayClassName?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        aria-hidden="true"
        alt=""
        className={`h-full w-full object-cover ${imageClassName}`}
        decoding="async"
        loading="lazy"
        src={src}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  cream,
  muted,
}: {
  eyebrow?: string;
  cream: string;
  muted?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl text-center">
      {eyebrow ? (
        <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-normal leading-[0.95] sm:text-4xl md:text-5xl lg:text-6xl">
        <WordsPullUpMultiStyle
          segments={[
            { text: cream, className: 'text-primary' },
            ...(muted ? [{ text: muted, className: 'text-gray-500' }] : []),
          ]}
        />
      </h2>
    </div>
  );
}

function HeaderNav({
  items,
}: {
  items: Array<{ label: string; href: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="absolute left-1/2 top-0 z-20 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
        <div className="hidden md:block">
          <ul className="flex items-center gap-10 whitespace-nowrap lg:gap-12">
            {items.map((item) => (
              <li key={item.label}>
                <a
                  className="text-sm transition-colors duration-300"
                  href={item.href}
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = textColor;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color =
                      'rgba(225, 224, 204, 0.8)';
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:hidden">
          <button
            aria-expanded={isOpen}
            aria-label={
              isOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="flex items-center gap-2 rounded-full px-2 py-1 text-xs text-primary/85"
            type="button"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span>Menu</span>
            {isOpen ? (
              <X className="h-4 w-4" strokeWidth={1.8} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.8} />
            )}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <motion.div
          className="fixed inset-x-4 top-16 z-30 max-h-[calc(100vh-5rem)] origin-top overflow-y-auto rounded-2xl border border-primary/10 bg-black/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease }}
        >
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.label}>
                <a
                  className="block rounded-xl px-4 py-3 text-sm text-primary/80 transition-colors duration-300 hover:bg-primary/10 hover:text-primary"
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </>
  );
}

function getTimeLeft() {
  const distance = new Date(launchDealDeadline).getTime() - Date.now();
  const safeDistance = Math.max(distance, 0);
  const days = Math.floor(safeDistance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDistance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDistance / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDistance / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function OfferTimer({ compact = false }: { compact?: boolean }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const timerText = `${timeLeft.days}d ${String(timeLeft.hours).padStart(
    2,
    '0',
  )}h ${String(timeLeft.minutes).padStart(2, '0')}m ${String(
    timeLeft.seconds,
  ).padStart(2, '0')}s`;

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 rounded-full border border-primary/15 bg-black/40 px-4 py-2 text-xs text-primary/85 backdrop-blur-md ${
        compact ? 'max-w-full' : ''
      }`}
    >
      <span>⏳ Launch price:</span>
      <span className="font-bold text-primary">
        {fullOfferPrice} instead of {fullOfferOldPrice}
      </span>
      <span className="text-primary/60">ends in</span>
      <span className="font-bold text-primary">{timerText}</span>
    </div>
  );
}

function HeroQuickQuiz() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = heroQuizOptions[selectedIndex];

  return (
    <motion.div
      className="w-full rounded-2xl border border-primary/10 bg-black/40 p-3 backdrop-blur-md"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.78, ease }}
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60">
        🔥 Quick chooser
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {heroQuizOptions.map((option, index) => (
          <button
            className={`rounded-full px-3 py-2 text-xs transition-colors duration-300 ${
              selectedIndex === index
                ? 'bg-primary text-black'
                : 'bg-primary/10 text-primary/75 hover:bg-primary/20'
            }`}
            key={option.label}
            type="button"
            onClick={() => setSelectedIndex(index)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-black/45 p-3">
        <p className="text-sm font-bold text-primary">{selected.result}</p>
        <p className="mt-1 text-xs leading-snug text-gray-400">{selected.text}</p>
        <a
          className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-primary transition-colors duration-300 hover:text-white"
          href={selected.href}
        >
          Open this pack
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
        </a>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[820px] bg-black p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/80" />

        <HeaderNav items={homeNavigation} />

        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-7 sm:px-6 md:px-8 md:pb-10 lg:px-10">
          <div className="grid grid-cols-12 items-end gap-6">
            <div className="col-span-12 md:col-span-8">
              <motion.p
                className="mb-4 inline-flex rounded-full border border-primary/20 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-primary backdrop-blur-md sm:text-xs"
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease }}
              >
                ⚡ AI Prompt Packs for faster sales, content & visuals
              </motion.p>
              <h1
                className="max-w-5xl text-[13vw] font-medium leading-[0.82] tracking-[-0.055em] sm:text-[11vw] md:text-[7.6vw] lg:text-[6.7vw] xl:text-[6.3vw]"
                style={{ color: textColor }}
              >
                <WordsPullUpMultiStyle
                  className="justify-start"
                  segments={[
                    { text: 'Get AI output' },
                    {
                      text: 'that sells,',
                      className: 'text-[#fff1a8]',
                    },
                    {
                      text: 'not just sounds smart',
                      className: 'text-primary/55',
                    },
                  ]}
                />
              </h1>
              <motion.div
                className="mt-5"
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.48, ease }}
              >
                <OfferTimer compact />
              </motion.div>
            </div>

            <div className="col-span-12 flex max-w-md flex-col items-start gap-4 pb-1 md:col-span-4 md:pb-4 lg:pb-7">
              <motion.p
                className="text-sm leading-[1.25] text-primary/75 sm:text-base"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease }}
              >
                Stop wasting hours on empty AI answers. Get ready-made prompts
                for sales, marketing, product photos, and AI visuals. Copy.
                Paste. Create something useful.
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.66, ease }}
              >
                <PrimaryButton href="#pricing">
                  Get the Complete Bundle for {fullOfferPrice}
                </PrimaryButton>
                <a
                  className="text-sm text-primary/75 underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
                  href="#packs"
                >
                  or choose 1 pack for {baseOfferPrice}
                </a>
              </motion.div>

              <div className="hidden w-full sm:block">
                <HeroQuickQuiz />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileQuickChooser() {
  return (
    <section className="bg-black px-4 pb-12 sm:hidden">
      <HeroQuickQuiz />
    </section>
  );
}

function Problem() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const bodyText =
    'You open ChatGPT hoping to quickly create copy, an offer, or an idea. Twenty minutes later, you still have generic output. Your ad sounds like every competitor. Your visual looks cheap. Your offer does not hit. The worst part is that you start thinking AI is not useful for you. But the problem is not AI. The problem is a weak instruction. Without role, context, customer pain, output format, and quality criteria, AI guesses. When AI guesses, you lose time, money, and confidence.';

  return (
    <section id="problem" className="bg-black px-4 py-20 sm:px-6 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[#101010] px-5 py-16 text-center sm:px-8 md:rounded-[2rem] md:py-24 lg:px-12">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
          😤 Customer pain
        </p>
        <h2
          className="mx-auto mt-8 max-w-4xl text-3xl font-normal leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
          style={{ color: textColor }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: 'AI can help you sell.' },
              {
                text: 'A weak prompt makes it useless.',
                className: 'font-serif italic text-[#fff1a8]',
              },
              {
                text: 'Structure changes everything.',
                className: 'font-normal text-gray-500',
              },
            ]}
          />
        </h2>
        <p
          ref={ref}
          className="mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-[#DEDBC8] sm:text-base md:mt-14 md:text-lg"
        >
          {bodyText.split('').map((letter, index) => (
            <AnimatedLetter
              index={index}
              key={`${letter}-${index}`}
              progress={scrollYProgress}
              total={bodyText.length}
            >
              {letter}
            </AnimatedLetter>
          ))}
        </p>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Micro benefits"
          cream="Ready to use instantly."
          muted="Built for real tasks."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <RevealCard
                className="rounded-2xl bg-[#212121] p-6"
                delay={index * 0.08}
                key={item.title}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-black">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-8 text-2xl font-normal leading-none text-primary">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">{item.text}</p>
              </RevealCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Before / After"
          cream="Weak prompts create weak output."
          muted="Structured prompts create usable work."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {beforeAfterCards.map((item, index) => (
            <RevealCard
              className="overflow-hidden rounded-2xl bg-[#101010]"
              delay={index * 0.1}
              key={item.before}
            >
              <div className="border-b border-primary/10 p-5 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
                  Average prompt
                </p>
                <p className="mt-5 text-lg leading-snug text-gray-400">
                  “{item.before}”
                </p>
              </div>
              <div className="bg-[#212121] p-5 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-primary">
                  Structured prompt
                </p>
                <p className="mt-5 text-lg leading-snug text-primary">
                  “{item.after}”
                </p>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromptPreviewGrid({
  items,
}: {
  items: Array<{ title: string; useCase: string; output: string }>;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <RevealCard
          className="rounded-2xl border border-primary/10 bg-[#212121] p-5"
          delay={index * 0.08}
          key={item.title}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
              Prompt preview
            </p>
            <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.8} />
          </div>
          <h3 className="mt-8 text-2xl font-normal leading-none text-primary">
            {item.title}
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-gray-400">{item.useCase}</p>
          <div className="mt-6 rounded-xl bg-black/35 p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-primary/70">
              Output
            </p>
            <p className="mt-3 text-sm leading-snug text-gray-300">{item.output}</p>
          </div>
        </RevealCard>
      ))}
    </div>
  );
}

function PreviewInsideHome() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Preview inside"
          cream="See the kind of prompts you are buying."
          muted="Concrete tasks, clear output, less guessing."
        />
        <div className="mt-12">
          <PromptPreviewGrid items={previewCards} />
        </div>
      </div>
    </section>
  );
}

function WhatYouReceive() {
  return (
    <section className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-12">
        <RevealCard className="rounded-2xl bg-primary p-6 text-black sm:p-8 md:col-span-5">
          <p className="text-[10px] uppercase tracking-[0.22em]">
            After purchase
          </p>
          <h2 className="mt-8 text-balance text-4xl font-normal leading-[0.9] sm:text-5xl md:text-6xl">
            What you receive
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-black/70 sm:text-base">
            A practical prompt pack you can open immediately, copy from, customize,
            and reuse for business, marketing, sales, content, or visuals.
          </p>
          <p className="mt-8 text-5xl leading-none">$9.90</p>
          <p className="mt-3 text-sm text-black/65">One-time purchase per pack.</p>
        </RevealCard>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-7">
          {receiveItems.map((item, index) => (
            <RevealCard
              className="rounded-2xl bg-[#212121] p-5"
              delay={index * 0.06}
              key={item}
            >
              <BadgeCheck className="h-5 w-5 text-primary" strokeWidth={1.8} />
              <p className="mt-6 text-base leading-snug text-gray-300">{item}</p>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackCard({
  pack,
  index,
}: {
  pack: PackPage;
  index: number;
}) {
  const Icon = pack.icon;
  const homeCopy = homePackCopy[pack.path];

  return (
    <RevealCard
      className="flex min-h-[640px] flex-col justify-between rounded-2xl bg-[#212121] p-5 sm:p-6"
      delay={index * 0.12}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-black">
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span className="text-xs text-gray-500">0{index + 1}</span>
        </div>
        <h3 className="mt-8 max-w-[15rem] text-3xl font-normal leading-none text-primary">
          {pack.eyebrow}
        </h3>
        <p className="mt-4 text-lg leading-tight text-primary/90">
          {homeCopy.headline}
        </p>
        <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-gray-500">
          Best for
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-400">
          {homeCopy.bestFor}
        </p>
      </div>

      <div className="mt-8">
        <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
          Use it to create
        </p>
        <ul className="mt-4 space-y-3">
          {homeCopy.useItToCreate.slice(0, 6).map((item) => (
            <li className="flex gap-3 text-sm leading-snug text-gray-400" key={item}>
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                strokeWidth={1.8}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-7 text-2xl leading-none text-primary">{pack.price}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-primary py-1 pl-4 pr-1 text-sm font-medium text-black transition-[gap] duration-300 hover:gap-3"
            href={`${pack.path}#price`}
          >
            Buy for {pack.price}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-primary">
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </span>
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm text-primary transition-colors duration-300 hover:border-primary/60"
            href={pack.path}
          >
            View Details
          </a>
        </div>
      </div>
    </RevealCard>
  );
}

function Packs() {
  return (
    <section
      id="packs"
      className="relative min-h-screen overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Prompt Packs"
          cream="Choose the prompt pack that solves your current task."
          muted="Each pack is focused on one clear outcome."
        />
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-gray-400 sm:text-base">
          You don&apos;t need to buy a huge course or learn prompt engineering from
          scratch. Pick the pack you need, pay once, and use it whenever you want.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {packPages.map((pack, index) => (
            <PackCard index={index} key={pack.path} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Bundle() {
  return (
    <section id="start" className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-2xl bg-[#101010] md:grid-cols-12 md:rounded-[2rem]">
        <div className="relative min-h-[380px] md:col-span-5">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={featureVideo}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
              Start with one pack
            </p>
            <p className="mt-3 text-3xl leading-none text-primary sm:text-4xl">
              One pack. One clear result.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:col-span-7 md:p-12 lg:p-16">
          <h2 className="max-w-3xl text-4xl font-normal leading-[0.9] text-primary sm:text-5xl md:text-6xl">
            One Pack. One Clear Result. Only $9.90.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400">
            You don&apos;t need to buy everything at once. Start with the prompt
            pack that solves your biggest problem today.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              'Need better marketing? Choose Prompts That Sell.',
              'Need better AI images? Choose Nano Banana Creative Techniques.',
              'Need product photos? Choose Product Photography Prompt Pack.',
              'Need a full business assistant? Choose AI Expert Prompt System.',
            ].map((item) => (
              <div className="flex items-start gap-3 rounded-xl bg-[#212121] p-4" key={item}>
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm leading-snug text-gray-400">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <PrimaryButton href="#packs">Browse All Prompt Packs</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingPlansSection({ page }: { page?: PackPage }) {
  const plans = [
    {
      name: page ? `${page.eyebrow} Basic` : pricingPlans[0].name,
      badge: pricingPlans[0].badge,
      oldPrice: pricingPlans[0].oldPrice,
      price: page?.price ?? pricingPlans[0].price,
      description: page
        ? `Get only this one pack. Good if you need ${page.eyebrow} today, but you miss the full sales and visual system.`
        : pricingPlans[0].description,
      items: page
        ? [
            '❌ Only this one pack',
            '❌ No bonus checklists',
            '❌ No quick-start guide',
            '❌ No complete bundle workflow',
          ]
        : pricingPlans[0].losses ?? [],
      cta: page ? `Get ${page.eyebrow}` : pricingPlans[0].cta,
      featured: false,
    },
    {
      name: pricingPlans[1].name,
      badge: pricingPlans[1].badge,
      oldPrice: pricingPlans[1].oldPrice,
      price: pricingPlans[1].price,
      description: pricingPlans[1].description,
      items: pricingPlans[1].gains ?? [],
      cta: pricingPlans[1].cta,
      featured: true,
    },
  ];

  return (
    <section
      id={page ? 'price' : 'pricing'}
      className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28"
    >
      <LazySectionBackground
        imageClassName="opacity-40"
        overlayClassName="bg-black/70"
        src={backgroundImages.pricingValue}
      />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Pricing"
          cream="Choose one pack."
          muted="Or unlock the full bundle for just $5 more."
        />
        <div className="mt-8 flex justify-center">
          <OfferTimer />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <RevealCard
              className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 ${
                plan.featured
                  ? 'bg-primary text-black'
                  : 'border border-primary/10 bg-[#101010] text-primary'
              }`}
              delay={index * 0.1}
              key={plan.name}
            >
              {plan.featured ? (
                <div className="absolute right-4 top-4 rounded-full bg-black px-4 py-2 text-xs font-bold text-primary">
                  🔥 Most Value
                </div>
              ) : null}
              <p
                className={`text-[10px] uppercase tracking-[0.22em] ${
                  plan.featured ? 'text-black/60' : 'text-primary/60'
                }`}
              >
                {plan.badge}
              </p>
              <h3 className="mt-8 text-4xl font-normal leading-none sm:text-5xl">
                {plan.name}
              </h3>
              <p
                className={`mt-5 max-w-xl text-sm leading-relaxed sm:text-base ${
                  plan.featured ? 'text-black/70' : 'text-gray-400'
                }`}
              >
                {plan.description}
              </p>
              <div className="mt-8 flex items-end gap-3">
                <span
                  className={`text-xl line-through ${
                    plan.featured ? 'text-black/45' : 'text-gray-600'
                  }`}
                >
                  {plan.oldPrice}
                </span>
                <span className="text-6xl leading-none sm:text-7xl">
                  {plan.price}
                </span>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.items.map((item) => (
                  <li
                    className={`text-sm leading-snug ${
                      plan.featured ? 'text-black/75' : 'text-gray-400'
                    }`}
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <a
                className={`mt-9 inline-flex items-center gap-2 rounded-full py-1 pl-6 pr-1 text-sm font-medium transition-[gap] duration-300 hover:gap-3 sm:text-base ${
                  plan.featured
                    ? 'bg-black text-primary'
                    : 'border border-primary/25 bg-primary text-black'
                }`}
                href="#access"
              >
                {plan.cta}
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    plan.featured ? 'bg-primary text-black' : 'bg-black text-primary'
                  }`}
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </a>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueStackSection() {
  return (
    <section
      id="value-stack"
      className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28"
    >
      <LazySectionBackground
        imageClassName="opacity-30"
        overlayClassName="bg-black/78"
        src={backgroundImages.creativeSystem}
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Value Stack"
          cream="$167 total value."
          muted="Launch offer: bonuses included FREE."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-5">
          {valueStackItems.map((item, index) => (
            <RevealCard
              className={`rounded-2xl p-6 ${
                index === 0 ? 'bg-primary text-black' : 'bg-[#212121]'
              }`}
              delay={index * 0.06}
              key={item.title}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`text-[10px] uppercase tracking-[0.18em] ${
                    index === 0 ? 'text-black/55' : 'text-primary/60'
                  }`}
                >
                  {index === 0 ? 'Included' : 'FREE Bonus'}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    index === 0
                      ? 'bg-black text-primary'
                      : 'bg-primary text-black'
                  }`}
                >
                  {index === 0 ? item.value : `${item.value} FREE`}
                </span>
              </div>
              <h3
                className={`mt-10 text-2xl font-normal leading-none ${
                  index === 0 ? 'text-black' : 'text-primary'
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`mt-4 text-sm leading-relaxed ${
                  index === 0 ? 'text-black/70' : 'text-gray-400'
                }`}
              >
                {item.text}
              </p>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section id="guarantee" className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-12">
        <RevealCard className="rounded-2xl bg-primary p-6 text-black sm:p-8 md:col-span-7">
          <ShieldCheck className="h-9 w-9" strokeWidth={1.8} />
          <p className="mt-8 text-[10px] uppercase tracking-[0.22em] text-black/55">
            100% Money-Back Guarantee
          </p>
          <h2 className="mt-5 text-balance text-4xl font-normal leading-[0.9] sm:text-5xl md:text-6xl">
            Try it for 7 days. If it does not save you time, get your money back.
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-black/70 sm:text-base">
            Open the prompts. Use them on a real task. If you feel the pack does
            not help you create better output faster, email support within 7 days.
            No drama. No pressure.
          </p>
        </RevealCard>

        <RevealCard
          className="rounded-2xl bg-[#212121] p-6 sm:p-8 md:col-span-5"
          delay={0.12}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary/60">
            Risk reversal
          </p>
          <h3 className="mt-8 text-3xl font-normal leading-none text-primary">
            You risk almost nothing.
          </h3>
          <ul className="mt-8 space-y-4">
            {[
              '✅ Secure checkout',
              '✅ Digital access after purchase',
              '✅ Use with ChatGPT, Claude, Gemini, Nano Banana, and more',
              '✅ Commercial use for your own work and client projects',
              '✅ 7-day refund window',
            ].map((item) => (
              <li className="text-sm leading-snug text-gray-400" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </RevealCard>
      </div>
    </section>
  );
}

function WhyBuy() {
  const criteria = [
    'A clear role',
    'A specific task',
    'Business context',
    'Output format',
    'Quality criteria',
    'Step-by-step logic',
    'Easy customization',
  ];

  return (
    <section className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-12">
        <RevealCard className="rounded-2xl bg-[#101010] p-6 sm:p-8 md:col-span-7">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
            Why buy
          </p>
          <h2 className="mt-8 text-balance text-4xl font-normal leading-[0.9] text-primary sm:text-5xl md:text-6xl">
            Why These Prompt Packs Are Different
          </h2>
          <p className="mt-8 text-base leading-relaxed text-gray-400">
            Free prompts usually give you one random example. These prompt packs
            give you organized systems for real work, so instead of asking AI vague
            questions, you give it a clear professional brief.
          </p>
          <p className="mt-5 text-base leading-relaxed text-gray-400">
            That is why the output becomes more useful, more specific, and easier
            to turn into real content, ads, visuals, or business decisions.
          </p>
        </RevealCard>

        <RevealCard
          className="rounded-2xl bg-[#212121] p-6 sm:p-8 md:col-span-5"
          delay={0.12}
        >
          <Layers3 className="h-8 w-8 text-primary" strokeWidth={1.8} />
          <p className="mt-8 text-2xl leading-tight text-primary">
            Each prompt is built to guide AI with:
          </p>
          <ul className="mt-8 space-y-4">
            {criteria.map((item) => (
              <li className="flex gap-3 text-sm leading-snug text-gray-400" key={item}>
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </RevealCard>
      </div>
    </section>
  );
}

function Comparison({
  title = 'Stop Collecting Random Prompts.',
  muted = 'Use Prompt Packs Built for Specific Results.',
  rows = homeComparisonRows,
  leftLabel = 'Random free prompts',
  rightLabel = 'Our prompt packs',
}: {
  title?: string;
  muted?: string;
  rows?: Array<[string, string]>;
  leftLabel?: string;
  rightLabel?: string;
}) {
  return (
    <section className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Why it works" cream={title} muted={muted} />

        <RevealCard className="mt-12 overflow-hidden rounded-2xl border border-primary/10 bg-[#101010]">
          <div className="grid grid-cols-2 border-b border-primary/10 text-sm uppercase tracking-[0.18em] text-primary">
            <div className="p-4 sm:p-6">{leftLabel}</div>
            <div className="border-l border-primary/10 p-4 sm:p-6">
              {rightLabel}
            </div>
          </div>
          {rows.map(([free, library]) => (
            <div
              className="grid grid-cols-2 border-b border-primary/10 last:border-b-0"
              key={free}
            >
              <div className="flex items-center gap-3 p-4 text-sm text-gray-500 sm:p-6">
                <X className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                <span>{free}</span>
              </div>
              <div className="flex items-center gap-3 border-l border-primary/10 p-4 text-sm text-gray-300 sm:p-6">
                <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
                <span>{library}</span>
              </div>
            </div>
          ))}
        </RevealCard>
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section id="workflow" className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          cream="How It Works."
          muted="Choose, buy once, copy, paste, customize."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 md:grid-cols-2 lg:grid-cols-5">
          {workflowSteps.map((step, index) => (
            <RevealCard
              className="rounded-2xl bg-[#212121] p-6"
              delay={index * 0.1}
              key={step.title}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">0{index + 1}</span>
                <TimerReset className="h-5 w-5 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="mt-16 text-2xl font-normal leading-none text-primary">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">{step.text}</p>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience() {
  const forItems = [
    'Entrepreneurs',
    'Marketers',
    'Freelancers',
    'Designers',
    'Content creators',
    'Agencies',
    'Online stores',
    'Product managers',
    'Coaches',
    'Consultants',
    'Startup founders',
    'Small business owners',
  ];

  return (
    <section className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Who these prompt packs are for"
          cream="Practical AI results,"
          muted="not theory."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-12">
          <RevealCard className="rounded-2xl bg-[#101010] p-6 sm:p-8 lg:col-span-4">
            <Users className="h-8 w-8 text-primary" strokeWidth={1.8} />
            <h3 className="mt-8 text-3xl font-normal leading-none text-primary">
              Perfect for people who use AI for work.
            </h3>
            <p className="mt-6 text-sm leading-relaxed text-gray-400 sm:text-base">
              If you use AI for work, content, marketing, sales, or visuals, these
              packs help you move faster.
            </p>
          </RevealCard>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8">
            {forItems.map((item, index) => (
              <RevealCard
                className="rounded-2xl bg-[#212121] p-5 text-center"
                delay={index * 0.035}
                key={item}
              >
                <Check className="mx-auto h-4 w-4 text-primary" strokeWidth={1.8} />
                <p className="mt-5 text-sm leading-snug text-gray-300">{item}</p>
              </RevealCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CreationMatrix() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What you can create"
          cream="What You Can Create"
          muted="with these prompt packs."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {creationCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <RevealCard
                className="rounded-2xl bg-[#212121] p-6"
                delay={index * 0.08}
                key={category.title}
              >
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.8} />
                <h3 className="mt-8 text-2xl font-normal leading-none text-primary">
                  {category.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  {category.text}
                </p>
              </RevealCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CommerceTrust() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Ready for launch"
          cream="Everything buyers expect"
          muted="before they pay."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {commerceTrustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <RevealCard
                className="rounded-2xl bg-[#212121] p-6"
                delay={index * 0.08}
                key={item.title}
              >
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.8} />
                <h3 className="mt-8 text-2xl font-normal leading-none text-primary">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  {item.text}
                </p>
              </RevealCard>
            );
          })}
        </div>

        <RevealCard className="mt-3 rounded-2xl bg-primary p-6 text-black sm:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="text-[10px] uppercase tracking-[0.22em] sm:text-xs">
                Buyer confidence
              </p>
              <h3 className="mt-4 text-3xl font-normal leading-none sm:text-4xl">
                Policies, license, refunds, and contact are now in place.
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-black/70 sm:text-base">
                This gives the checkout page a stronger trust layer: customers can
                see how access works, what the license allows, and where to ask for
                help.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-black py-1 pl-5 pr-1 text-sm font-medium text-primary transition-[gap] duration-300 hover:gap-3"
                href="/refund-policy"
              >
                Refund Policy
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-black">
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </a>
              <a
                className="inline-flex items-center rounded-full border border-black/20 px-5 py-3 text-sm font-medium text-black transition-colors duration-300 hover:border-black/50"
                href="/license"
              >
                License
              </a>
            </div>
          </div>
        </RevealCard>
      </div>
    </section>
  );
}

function FAQ({
  items = homeFaqItems,
}: {
  items?: Array<{ question: string; answer: string }>;
}) {
  return (
    <section id="faq" className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="FAQ"
          cream="Everything practical."
          muted="Nothing complicated."
        />

        <div className="mt-12 space-y-3">
          {items.map((item, index) => (
            <RevealCard delay={index * 0.06} key={item.question}>
              <details className="group rounded-2xl bg-[#101010] p-5 open:bg-[#151515] sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-primary sm:text-xl">
                  <span>{item.question}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
                  {item.answer}
                </p>
              </details>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="access" className="bg-black p-4 sm:p-6">
      <div className="relative min-h-[620px] overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 flex min-h-[620px] flex-col items-center justify-center px-5 py-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
            Launch offer: complete bundle for {fullOfferPrice}
          </p>
          <h2
            className="mt-8 max-w-5xl text-balance text-4xl font-normal leading-[0.88] tracking-[-0.04em] sm:text-5xl md:text-7xl lg:text-8xl"
            style={{ color: textColor }}
          >
            Stop Guessing. Get the Prompts, Bonuses, and Direction in One Bundle.
          </h2>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-primary/70 sm:text-base md:text-lg">
            Get all 4 prompt packs, the quick-start guide, output checklist,
            launch templates, and starter support. Build better copy, visuals,
            product photos, and AI workflows without staring at a blank prompt box.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PrimaryButton href="#pricing">
              Get Complete Bundle for {fullOfferPrice}
            </PrimaryButton>
            <PrimaryButton href="#guarantee" variant="ghost">
              See the 7-Day Guarantee
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackHero({ page }: { page: PackPage }) {
  const Icon = page.icon;
  const salesCopy = packSalesCopy[page.path];

  return (
    <section className="relative min-h-screen bg-black p-4 md:p-6">
      <div className="relative flex min-h-[760px] overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={page.path.includes('product') || page.path.includes('nano') ? featureVideo : heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.72] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/85" />

        <HeaderNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Inside', href: '#inside' },
            { label: 'Benefits', href: '#benefits' },
            { label: 'Price', href: '#price' },
            { label: 'FAQ', href: '#faq' },
          ]}
        />

        <div className="relative z-10 grid w-full grid-cols-12 items-end gap-6 px-5 pb-8 pt-24 sm:px-7 md:px-10 md:pb-12 lg:px-12">
          <div className="col-span-12 max-w-5xl lg:col-span-8">
            <motion.div
              className="mb-5 flex flex-wrap items-center gap-3"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.12, ease }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-primary backdrop-blur-md sm:text-xs">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                {page.eyebrow}
              </span>
              <span className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-black">
                {page.price}
              </span>
            </motion.div>

            <h1
              className="text-balance text-[12vw] font-medium leading-[0.86] tracking-[-0.055em] sm:text-[10vw] md:text-[7vw] lg:text-[5.8vw] xl:text-[5.2vw]"
              style={{ color: textColor }}
            >
              <WordsPullUp text={salesCopy?.title ?? page.title} />
            </h1>
          </div>

          <div className="col-span-12 max-w-md lg:col-span-4">
            <motion.p
              className="text-sm leading-[1.25] text-primary/75 sm:text-base"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease }}
            >
              {salesCopy?.subtitle ?? page.subtitle}
            </motion.p>

            <motion.ul
              className="mt-6 space-y-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.68, ease }}
            >
              {(salesCopy?.heroBullets ?? page.heroBullets).map((bullet) => (
                <li className="flex gap-3 text-sm text-gray-300" key={bullet}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{bullet}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.82, ease }}
            >
              <PrimaryButton href="#price">
                {salesCopy?.primaryButton ?? page.primaryButton}
              </PrimaryButton>
              <PrimaryButton href="#inside" variant="ghost">
                {salesCopy?.secondaryButton ?? page.secondaryButton}
              </PrimaryButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackProblem({ page }: { page: PackPage }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const salesCopy = packSalesCopy[page.path];
  const bodyText = salesCopy?.problemText ?? page.problemParagraphs.join(' ');

  return (
    <section id="problem" className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[#101010] px-5 py-16 text-center sm:px-8 md:rounded-[2rem] md:py-24 lg:px-12">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
          😤 Pain
        </p>
        <h2 className="mx-auto mt-8 max-w-4xl text-balance text-3xl font-normal leading-[0.95] text-primary sm:text-4xl md:text-5xl lg:text-6xl">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: salesCopy?.problemTitle ?? page.problemTitle,
                className: 'font-normal',
              },
            ]}
          />
        </h2>
        <p
          ref={ref}
          className="mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-[#DEDBC8] sm:text-base md:mt-14 md:text-lg"
        >
          {bodyText.split('').map((letter, index) => (
            <AnimatedLetter
              index={index}
              key={`${letter}-${index}`}
              progress={scrollYProgress}
              total={bodyText.length}
            >
              {letter}
            </AnimatedLetter>
          ))}
        </p>
      </div>
    </section>
  );
}

function InsideSection({ page }: { page: PackPage }) {
  return (
    <section id="inside" className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What you get"
          cream={page.insideTitle}
          muted={page.insideIntro}
        />

        <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-12">
          <RevealCard className="rounded-2xl bg-[#101010] p-6 sm:p-8 lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
              {page.includesTitle}
            </p>
            <p className="mt-8 text-6xl leading-none text-primary sm:text-7xl">
              {page.stat}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              {page.insideIntro}
            </p>
          </RevealCard>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {page.includes.map((item, index) => (
              <RevealCard
                className="rounded-2xl bg-[#212121] p-5"
                delay={index * 0.025}
                key={item}
              >
                <Check className="h-4 w-4 text-primary" strokeWidth={1.8} />
                <p className="mt-6 text-sm leading-snug text-gray-300">{item}</p>
              </RevealCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PackPreviewSection({ page }: { page: PackPage }) {
  const previews = packPreviewByPath[page.path] ?? previewCards.slice(0, 3);

  return (
    <section className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Prompt previews"
          cream="What the pack feels like inside."
          muted="Real task structure, not vague examples."
        />
        <div className="mt-12">
          <PromptPreviewGrid items={previews} />
        </div>
      </div>
    </section>
  );
}

function VisualGallerySection({ page }: { page: PackPage }) {
  const gallery = visualGalleryByPath[page.path];

  if (!gallery?.length) {
    return null;
  }

  const isProduct = page.path.includes('product');
  const layoutClasses = [
    'md:col-span-2 md:row-span-2',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-2',
    'md:col-span-2 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-2 md:row-span-1',
  ];

  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <LazySectionBackground
        imageClassName="opacity-[0.28]"
        overlayClassName="bg-black/80"
        src={
          isProduct
            ? backgroundImages.productPhoto
            : backgroundImages.nanoCreative
        }
      />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Visual proof"
          cream={
            isProduct
              ? 'Product photography prompt examples.'
              : 'Nano Banana creative technique examples.'
          }
          muted="A more tangible look at the kind of visuals this pack helps direct."
        />

        <div className="mt-12 grid auto-rows-[240px] grid-cols-1 gap-3 md:grid-cols-4 md:auto-rows-[220px]">
          {gallery.map((item, index) => (
            <RevealCard
              className={`group relative overflow-hidden rounded-2xl bg-[#212121] ${
                layoutClasses[index % layoutClasses.length]
              }`}
              delay={index * 0.06}
              key={item.src}
            >
              <img
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={item.src}
                alt={item.title}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xl leading-none text-primary">{item.title}</p>
                <p className="mt-2 max-w-sm text-xs leading-snug text-gray-300">
                  {item.caption}
                </p>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection({ page }: { page: PackPage }) {
  return (
    <section id="benefits" className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Benefits"
          cream={page.benefitsTitle}
          muted="Use the pack to move from scattered ideas to usable output."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {page.benefits.map((benefit, index) => (
            <RevealCard
              className="rounded-2xl bg-[#212121] p-6"
              delay={index * 0.05}
              key={benefit}
            >
              <BadgeCheck className="h-6 w-6 text-primary" strokeWidth={1.8} />
              <p className="mt-8 text-lg leading-snug text-primary">{benefit}</p>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection({ page }: { page: PackPage }) {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Audience"
          cream={page.audienceTitle}
          muted={page.audienceIntro ?? 'Built for people who need practical AI output.'}
        />

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {page.audience.map((item, index) => (
            <RevealCard
              className="rounded-2xl bg-[#212121] p-5 text-center"
              delay={index * 0.035}
              key={item}
            >
              <Users className="mx-auto h-5 w-5 text-primary" strokeWidth={1.8} />
              <p className="mt-6 text-sm leading-snug text-gray-300">{item}</p>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ page }: { page: PackPage }) {
  return (
    <section className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          cream={page.processTitle}
          muted="A simple path from prompt to finished asset."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {page.processSteps.map((step, index) => (
            <RevealCard
              className="rounded-2xl bg-[#212121] p-6"
              delay={index * 0.1}
              key={step.title}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">0{index + 1}</span>
                <TimerReset className="h-5 w-5 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="mt-16 text-2xl font-normal leading-none text-primary">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">{step.text}</p>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({ page }: { page: PackPage }) {
  if (!page.useCases?.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Use cases"
          cream={page.useCasesTitle ?? 'Use this pack for'}
          muted="Turn the prompt system into specific marketing and creative assets."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {page.useCases.map((useCase, index) => (
            <RevealCard
              className="rounded-2xl bg-[#212121] p-6"
              delay={index * 0.08}
              key={useCase.title}
            >
              <Sparkles className="h-6 w-6 text-primary" strokeWidth={1.8} />
              <h3 className="mt-8 text-2xl font-normal leading-none text-primary">
                {useCase.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                {useCase.text}
              </p>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection({ page }: { page: PackPage }) {
  return (
    <section className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-12">
        <RevealCard className="rounded-2xl bg-[#101010] p-6 sm:p-8 md:col-span-7">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
            Why it works
          </p>
          <h2 className="mt-8 text-balance text-4xl font-normal leading-[0.9] text-primary sm:text-5xl md:text-6xl">
            {page.whyTitle}
          </h2>
          <p className="mt-8 text-base leading-relaxed text-gray-400">
            {page.whyText}
          </p>
        </RevealCard>

        <RevealCard className="rounded-2xl bg-[#212121] p-6 sm:p-8 md:col-span-5" delay={0.12}>
          <Layers3 className="h-8 w-8 text-primary" strokeWidth={1.8} />
          <p className="mt-8 text-2xl leading-tight text-primary">
            Structure turns a prompt into a working brief.
          </p>
          <ul className="mt-8 space-y-4">
            {(page.whyBullets ?? page.heroBullets).map((item) => (
              <li className="flex gap-3 text-sm leading-snug text-gray-400" key={item}>
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </RevealCard>
      </div>
    </section>
  );
}

function PriceSection({ page }: { page: PackPage }) {
  return <PricingPlansSection page={page} />;
}

function PackFinalCTA({ page }: { page: PackPage }) {
  const salesCopy = packSalesCopy[page.path];

  return (
    <section id="access" className="bg-black p-4 sm:p-6">
      <div className="relative min-h-[620px] overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={page.path.includes('product') || page.path.includes('nano') ? featureVideo : heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/68" />

        <div className="relative z-10 flex min-h-[620px] flex-col items-center justify-center px-5 py-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
            {page.eyebrow}
          </p>
          <h2
            className="mt-8 max-w-5xl text-balance text-4xl font-normal leading-[0.88] tracking-[-0.04em] sm:text-5xl md:text-7xl lg:text-8xl"
            style={{ color: textColor }}
          >
            {salesCopy?.finalTitle ?? page.finalTitle}
          </h2>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-primary/70 sm:text-base md:text-lg">
            {salesCopy?.finalText ?? page.finalText}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PrimaryButton href="#price">
              Get Instant Access from {page.price}
            </PrimaryButton>
            <PrimaryButton href="/" variant="ghost">
              Back to Library
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyCTA({
  label,
  href,
  secondaryLabel,
  secondaryHref,
}: {
  label: string;
  href: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 flex items-center gap-2 rounded-full border border-primary/15 bg-black/85 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:hidden">
      <a
        className="flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-medium text-black"
        href={href}
      >
        {label}
      </a>
      {secondaryLabel && secondaryHref ? (
        <a
          className="flex items-center justify-center rounded-full border border-primary/20 px-4 py-3 text-sm text-primary"
          href={secondaryHref}
        >
          {secondaryLabel}
        </a>
      ) : null}
    </div>
  );
}

function SiteFooter() {
  const shopLinks = [
    { label: 'All Prompt Packs', href: '/#packs' },
    ...packPages.map((page) => ({
      label: page.eyebrow,
      href: page.path,
    })),
  ];

  const supportLinks = [
    { label: 'Contact', href: '/contact' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'License', href: '/license' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use', href: '/terms' },
  ];

  return (
    <footer className="bg-black px-4 pb-10 pt-16 sm:px-6 md:pt-20">
      <div className="mx-auto max-w-7xl border-t border-primary/10 pt-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a className="text-2xl leading-none text-primary" href="/">
              {storeName}
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
              Ready-to-use AI prompt packs for business, marketing, sales,
              product photography, and visual content.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['$9.90 per pack', 'Instant access', 'No subscription'].map((item) => (
                <span
                  className="rounded-full border border-primary/15 px-3 py-1 text-xs text-primary/70"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-7">
            {[
              { title: 'Shop', links: shopLinks },
              { title: 'Support', links: supportLinks },
              { title: 'Legal', links: legalLinks },
            ].map((column) => (
              <div key={column.title}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary/60">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        className="text-sm text-gray-400 transition-colors duration-300 hover:text-primary"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-primary/10 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {storeName}. Digital prompt packs for practical AI workflows.
          </p>
          <a className="transition-colors duration-300 hover:text-primary" href={supportHref}>
            {supportEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}

function PolicyLanding({ page }: { page: PolicyPage }) {
  usePageMeta(page.metaTitle, page.metaDescription);

  return (
    <main className="min-h-screen overflow-hidden bg-black">
      <section className="relative bg-black px-4 pb-20 pt-24 sm:px-6 md:pb-28 md:pt-32">
        <HeaderNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Prompt Packs', href: '/#packs' },
            { label: 'Contact', href: '/contact' },
            { label: 'Refunds', href: '/refund-policy' },
            { label: 'License', href: '/license' },
          ]}
        />

        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary sm:text-xs">
                {page.eyebrow}
              </p>
              <h1 className="mt-6 text-balance text-5xl font-normal leading-[0.9] text-primary sm:text-6xl md:text-7xl">
                {page.title}
              </h1>
              <p className="mt-6 text-sm leading-relaxed text-gray-400 sm:text-base">
                {page.intro}
              </p>
              <p className="mt-6 text-xs text-gray-500">
                Last updated: {policyUpdatedAt}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton href="/#packs">Shop Prompt Packs</PrimaryButton>
                <PrimaryButton href={supportHref} variant="ghost">
                  Email Support
                </PrimaryButton>
              </div>
            </div>

            <div className="space-y-3 lg:col-span-7">
              {page.sections.map((section, index) => (
                <RevealCard
                  className="rounded-2xl bg-[#101010] p-6 sm:p-8"
                  delay={index * 0.06}
                  key={section.title}
                >
                  <h2 className="text-2xl font-normal leading-none text-primary">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        className="text-sm leading-relaxed text-gray-400 sm:text-base"
                        key={paragraph}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function PackLanding({ page }: { page: PackPage }) {
  usePageMeta(page.metaTitle, page.metaDescription);

  return (
    <main className="min-h-screen overflow-hidden bg-black">
      <PackHero page={page} />
      <PackProblem page={page} />
      <InsideSection page={page} />
      <PackPreviewSection page={page} />
      <VisualGallerySection page={page} />
      <BenefitsSection page={page} />
      <AudienceSection page={page} />
      <ProcessSection page={page} />
      {page.comparisonRows ? (
        <Comparison
          title={page.comparisonTitle}
          muted={`${page.eyebrow} is organized around real tasks.`}
          rows={page.comparisonRows}
          leftLabel="Free prompts"
          rightLabel={page.eyebrow}
        />
      ) : null}
      <UseCasesSection page={page} />
      <WhySection page={page} />
      <PriceSection page={page} />
      <ValueStackSection />
      <GuaranteeSection />
      <CommerceTrust />
      <FAQ items={[...page.faq, ...objectionFaqItems]} />
      <PackFinalCTA page={page} />
      <SiteFooter />
      <StickyCTA label={`Buy for ${page.price}`} href="#price" secondaryLabel="Details" secondaryHref="#inside" />
    </main>
  );
}

function HomePage() {
  usePageMeta(
    'AI Prompt Packs for ChatGPT, Claude, Gemini & Nano Banana',
    'Buy ready-to-use AI prompt packs for business, marketing, sales, product photography, and Nano Banana image generation. Each prompt pack is sold separately for only $9.90.',
  );

  return (
    <main className="min-h-screen overflow-hidden bg-black">
      <Hero />
      <MobileQuickChooser />
      <Problem />
      <BeforeAfter />
      <Results />
      <PreviewInsideHome />
      <Packs />
      <WhatYouReceive />
      <Bundle />
      <PricingPlansSection />
      <ValueStackSection />
      <GuaranteeSection />
      <WhyBuy />
      <Comparison />
      <Workflow />
      <Audience />
      <CreationMatrix />
      <CommerceTrust />
      <FAQ items={[...homeFaqItems, ...objectionFaqItems]} />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const packPage = packPages.find((page) => page.path === path);
  const policyPage = legalPages.find((page) => page.path === path);

  if (packPage) {
    return <PackLanding page={packPage} />;
  }

  if (policyPage) {
    return <PolicyLanding page={policyPage} />;
  }

  return <HomePage />;
}
