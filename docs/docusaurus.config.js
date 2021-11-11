/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "SyncedStore - Javascript CRDT based real-time sync",
  tagline: "Dinosaurs are cool",
  url: "https://yousefed.github.io",
  baseUrl: "/syncedstore/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  // favicon: "img/favicon.ico",
  organizationName: "YousefED", // Usually your GitHub org/user name.
  projectName: "syncedstore", // Usually your repo name.
  plugins: [
    [
      "docusaurus-plugin-typedoc",

      // Plugin / TypeDoc options
      {
        entryPoints: ["../packages/core/src/index.ts"],
        tsconfig: "../packages/core/tsconfig.json",
        externalPattern: "**/*.js",
        exclude: "**/*.js",
        excludeExternals: true,
        excludePrivate: true,
        readme: "none",
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "SyncedStore",
      // logo: {
      //   alt: "My Site Logo",
      //   src: "img/logo.svg",
      // },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Docs",
        },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/yousefed/syncedstore",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "View documentation",
              to: "/docs",
            },
          ],
        },
        // {
        //   title: "Community",
        //   items: [
        //     {
        //       label: "Stack Overflow",
        //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
        //     },
        //     {
        //       label: "Discord",
        //       href: "https://discordapp.com/invite/docusaurus",
        //     },
        //     {
        //       label: "Twitter",
        //       href: "https://twitter.com/docusaurus",
        //     },
        //   ],
        // },
        {
          title: "More",
          items: [
            // {
            //   label: "Blog",
            //   to: "/blog",
            // },
            {
              label: "GitHub",
              href: "https://github.com/yousefed/syncedstore",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} YousefED. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/yousefed/syncedstore/edit/master/docs/",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl: "https://github.com/facebook/docusaurus/edit/master/website/blog/",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
