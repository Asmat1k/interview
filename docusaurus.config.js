/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'InterviewJS',
  tagline: 'Подготовка к собеседованиям по frontend-разработке',
  url: 'https://asmat1k.github.io',
  baseUrl: '/InterviewJS/',
  organizationName: 'Asmat1k',
  projectName: 'InterviewJS',
  deploymentBranch: 'gh-pages',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: {
    format: 'detect',
    hooks: { onBrokenMarkdownLinks: 'throw' },
  },
  i18n: { defaultLocale: 'ru', locales: ['ru'] },
  presets: [
    ['classic', {
      docs: {
        routeBasePath: '/',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/Asmat1k/InterviewJS/edit/main/',
      },
      blog: false,
    }],
  ],
  themeConfig: {
    navbar: {
      title: 'InterviewJS',
      items: [
        { type: 'docSidebar', sidebarId: 'interviewSidebar', label: 'Темы', position: 'left' },
        { href: 'https://github.com/Asmat1k/InterviewJS', label: 'GitHub', position: 'right' },
      ],
    },
    prism: { additionalLanguages: ['typescript', 'bash', 'json', 'http'] },
  },
};
module.exports = config;
