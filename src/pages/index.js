import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import YearPosts from '../components/year-posts';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const postsByYear = data.allMarkdownRemark.group.sort(
      (a, b) => b.fieldValue - a.fieldValue,
    );

    return (
      <Layout title={siteTitle}>
        <SEO title="All Posts" keywords={[`blog`]} />
        <h1 className="text-4xl font-normal mb-3">Posts</h1>
        {postsByYear.map(({ fieldValue, edges }) => {
          return <YearPosts key={fieldValue} year={fieldValue} posts={edges} />;
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      group(field: fields___year) {
        fieldValue
        totalCount
        edges {
          node {
            excerpt
            fields {
              slug
              date(formatString: "MMMM DD, YYYY")
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`;
