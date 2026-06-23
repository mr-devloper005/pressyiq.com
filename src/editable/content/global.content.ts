import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Press release distribution & media outreach',
    primaryLinks: [
      { label: 'Newsroom', href: '/updates' },
      { label: 'Press Releases', href: '/updates?category=press-release' },
      { label: 'Media Coverage', href: '/updates?category=news-media' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start distributing', href: '/signup' },
      secondary: { label: 'Talk to sales', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Press release distribution and media outreach',
    description: 'A premium media distribution platform for press releases, news syndication, media outreach, and brand visibility — built to put your story in front of the right audience.',
    columns: [
      {
        title: 'Distribution',
        links: [
          { label: 'Newsroom', href: '/updates' },
          { label: 'Press Releases', href: '/updates?category=press-release' },
          { label: 'Media Coverage', href: '/updates?category=news-media' },
          { label: 'Business News', href: '/updates?category=business' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Search', href: '/search' },
        ],
      },
    ],
    bottomNote: 'Distribution, syndication, and media outreach — engineered for reach.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
