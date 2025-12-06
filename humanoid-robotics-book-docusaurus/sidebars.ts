import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '📚 Module 1: Foundations of Physical AI',
      collapsed: false,
      items: [
        'module-01/intro',
        'module-01/chapter-01',
        'module-01/chapter-02',
        'module-01/chapter-03',
      ],
    },
    {
      type: 'category',
      label: '🤖 Module 2: AI for the Physical World',
      collapsed: true,
      items: [
        'module-02/intro',
        'module-02/chapter-04',
        'module-02/chapter-05',
        'module-02/chapter-06',
      ],
    },
    {
      type: 'category',
      label: '⚙️ Module 3: Humanoid Robot Engineering',
      collapsed: true,
      items: [
        'module-03/intro',
        'module-03/chapter-07',
        'module-03/chapter-08',
        'module-03/chapter-09',
      ],
    },
    {
      type: 'category',
      label: '🔗 Module 4: Physical AI Integrations',
      collapsed: true,
      items: [
        'module-04/intro',
        'module-04/chapter-10',
        'module-04/chapter-11',
        'module-04/chapter-12',
      ],
    },
    {
      type: 'category',
      label: '🎓 Module 5: Capstone Project',
      collapsed: true,
      items: [
        'module-05/intro',
        'module-05/chapter-13',
      ],
    },
  ],
};

export default sidebars;
