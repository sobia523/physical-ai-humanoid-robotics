import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Learning 🚀
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/module-05/chapter-13"
            style={{ marginLeft: '1rem' }}>
            View Capstone Project
          </Link>
        </div>
      </div>
    </header>
  );
}

function ModuleCard({ title, description, link, icon }: { title: string; description: string; link: string; icon: string }) {
  return (
    <div className={clsx('col col--4', styles.moduleCard)}>
      <div className="card">
        <div className="card__header">
          <h3>{icon} {title}</h3>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <Link className="button button--primary button--block" to={link}>
            Explore Module
          </Link>
        </div>
      </div>
    </div>
  );
}

function HomepageModules() {
  return (
    <section className={styles.modules}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Course Modules
        </Heading>
        <div className="row">
          <ModuleCard
            icon="📚"
            title="Module 1: Foundations"
            description="Learn the core principles of Physical AI, humanoid robotics essentials, and embodied cognition."
            link="/docs/module-01/intro"
          />
          <ModuleCard
            icon="🤖"
            title="Module 2: AI Techniques"
            description="Master control systems, computer vision, and reinforcement learning for physical systems."
            link="/docs/module-02/intro"
          />
          <ModuleCard
            icon="⚙️"
            title="Module 3: Engineering"
            description="Implement locomotion, manipulation, and motion planning for humanoid robots."
            link="/docs/module-03/intro"
          />
          <ModuleCard
            icon="🔗"
            title="Module 4: Integration"
            description="Integrate sensors, deploy edge AI, and build digital twins for production systems."
            link="/docs/module-04/intro"
          />
          <ModuleCard
            icon="🎓"
            title="Module 5: Capstone"
            description="Build and control a complete humanoid robot system from scratch."
            link="/docs/module-05/intro"
          />
          <ModuleCard
            icon="🌟"
            title="Industry-Ready Skills"
            description="Gain expertise used by Boston Dynamics, Tesla, and leading robotics companies."
            link="/docs/intro"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Professional textbook on Physical AI and Humanoid Robotics">
      <HomepageHeader />
      <main>
        <HomepageModules />
      </main>
    </Layout>
  );
}
