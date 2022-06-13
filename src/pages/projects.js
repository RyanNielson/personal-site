import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Project from '../components/project';

class ProjectsIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const webProjects = [
      {
        title: 'pastehaste',
        description:
          'A client-side text sharing system that uses no datastore. Simply paste some text, pick a formatting style, copy the generated link, and share.',
        url: 'https://pastehaste.nielson.dev',
        sourceUrl: 'https://github.com/RyanNielson/pastehaste',
        tags: ['web development', 'react', 'typescript'],
      },
      {
        title: 'pollster',
        description:
          'A real-time anonymous polling application built with Ruby on Rails and Hotwire.',
        url: 'https://pollster.nielson.dev',
        sourceUrl: 'https://github.com/RyanNielson/pollster',
        tags: ['ruby', 'ruby on rails', 'stimulus'],
      }
    ];

    const gameProjects = [
      {
        title: 'Displacement',
        description:
          'A puzzle game about pushing and pulling blocks to activated switches and clear a path to the exit. This game was created for the Ludum Dare 46 game jam.',
        url: 'https://ryannielson.itch.io/displacement',
        sourceUrl: 'https://github.com/RyanNielson/Displacement',
        tags: ['game development', 'unity', 'c#'],
      },
    ];

    return (
      <Layout title={siteTitle}>
        <SEO title="Projects - Ryan Nielson" keywords={[`projects`]} />
        <h1 className="text-4xl font-normal mb-3">Projects</h1>
        <div className="border-b-2 pb-3">
          <h2 className="text-2xl font-normal mb-3">Web</h2>
          <ul className="list-reset mb-3 leading-normal">
            {webProjects.map(project => (
              <Project {...project} />
            ))}
          </ul>
        </div>

        <div className="pb-3">
          <h2 className="text-2xl font-normal mt-3 mb-3">Games</h2>
          <ul className="list-reset mb-3 leading-normal">
            {gameProjects.map(project => (
              <Project {...project} />
            ))}
          </ul>
        </div>
      </Layout>
    );
  }
}

export default ProjectsIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
