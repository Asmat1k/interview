/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'interview',
  tagline: 'Подготовка к собеседованиям по frontend-разработке',
  url: 'https://asmat1k.github.io',
  baseUrl: '/interview/',
  organizationName: 'Asmat1k',
  projectName: 'interview',
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
        editUrl: 'https://github.com/Asmat1k/interview/edit/main/',
      },
      blog: false,
      theme: { customCss: require.resolve('./src/css/custom.css') },
    }],
  ],
  themeConfig: {
    navbar: {
      title: 'interview',
      items: [
        { type: 'docSidebar', sidebarId: 'interviewSidebar', label: 'Темы', position: 'left' },
        { href: 'https://github.com/Asmat1k/interview', label: 'GitHub', position: 'right' },
      ],
    },
    prism: { additionalLanguages: ['typescript', 'bash', 'json', 'http'] },
  },
};
module.exports = config;
