import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Press release distribution & media outreach platform',
      description: 'Distribute press releases, syndicate news, and earn media coverage that builds brand visibility — all from one premium media distribution platform.',
      openGraphTitle: 'Press release distribution & media outreach platform',
      openGraphDescription: 'Put your story in front of the right journalists, outlets, and audiences with modern press release distribution and media outreach.',
      keywords: ['press release distribution', 'media outreach', 'news syndication', 'pr platform', 'brand visibility'],
    },
    hero: {
      badge: 'Press release distribution & media outreach',
      title: ['Get your story', 'in front of the right audience.'],
      description: 'Distribute press releases, syndicate your news across trusted outlets, and turn announcements into measurable media coverage and brand visibility.',
      primaryCta: { label: 'Start distributing', href: '/signup' },
      secondaryCta: { label: 'Explore the newsroom', href: '/updates' },
      searchPlaceholder: 'Search news, companies, categories, and updates',
      focusLabel: 'Focus',
      featureCardBadge: 'live distribution feed',
      featureCardTitle: 'Your releases go live across the network.',
      featureCardDescription: 'Published releases and media updates surface here the moment they are syndicated.',
    },
    intro: {
      badge: 'Why teams choose us',
      title: 'A modern media distribution platform built for reach, speed, and credibility.',
      paragraphs: [
        'From a single workspace you can publish press releases, manage PR campaigns, and syndicate news to the outlets and audiences that matter most to your brand.',
        'Every release is structured for discovery — clean categories, fast pages, and search-friendly distribution that helps your story travel further.',
        'Whether you are launching a product, sharing company news, or building ongoing media relationships, the platform keeps your coverage connected and easy to track.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Press release distribution across a connected media network.',
        'Media outreach and news syndication from one workspace.',
        'Category-led newsroom designed for visibility and discovery.',
        'Fast, search-friendly pages that extend the life of every release.',
      ],
      primaryLink: { label: 'Browse the newsroom', href: '/updates' },
      secondaryLink: { label: 'See press releases', href: '/updates?category=press-release' },
    },
    cta: {
      badge: 'Start your campaign',
      title: 'Distribute your next press release across the network.',
      description: 'Publish, syndicate, and amplify your announcements with a media distribution platform built for modern PR teams and growing brands.',
      primaryCta: { label: 'Start distributing', href: '/signup' },
      secondaryCta: { label: 'Talk to our team', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer, clearer way to explore content.',
    description: `${slot4BrandConfig.siteName} is built to make long-form reading, visual discovery, and supporting resources feel like one unified experience.`,
    paragraphs: [
      'Instead of splitting everything into disconnected pages, the platform keeps related content easy to move through and easy to understand.',
      'Whether someone starts with an article, listing, image post, or resource page, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Reading-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can read, browse, and discover without noise.',
      },
      {
        title: 'Connected content surfaces',
        description: 'Articles, visual posts, listings, resources, and profiles stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A support page that matches the product, not a generic contact form.',
    description: 'Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find stories, listings, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
