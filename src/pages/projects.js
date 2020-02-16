import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Project from '../components/project';

class ProjectsIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const projects = [
      {
        title: 'pastehaste',
        description:
          'A client-side text sharing system that uses no datastore. Simply paste some text, pick a formatting style, copy the generated link, and share.',
        url: 'https://pastehaste.nielson.dev',
        sourceUrl: 'https://github.com/RyanNielson/pastehaste',
        tags: ['web development', 'react', 'typescript'],
      },
    ];

    return (
      <Layout title={siteTitle}>
        <SEO title="Projects - Ryan Nielson" keywords={[`projects`]} />
        <h1 className="text-4xl font-normal mb-3">Projects</h1>
        <ul className="list-reset mb-3 leading-normal">
          {projects.map(post => (
            <Project {...post} />
          ))}
        </ul>
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
