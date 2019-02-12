import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';
import YearPosts from '../components/year-posts';

{
  /* <section id="2018" class="year-section">
        <h2 class="year-title post-list-heading">2018</h2>
        <ul class="post-list">

          <li>
            <h3>
              <a class="post-link" href="/2018/05/fixing-automatic-reload-of-code-changes-in-ruby-on-rails-while-using-docker/">Fixing Automatic Reload of Code Changes in Ruby on Rails While Using Docker</a>
            </h3><span class="post-meta">May 18, 2018</span></li>

        </ul>
      </section> */
}

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    // const posts = data.allMarkdownRemark.edges;
    const postsByYear = data.allMarkdownRemark.group.reverse();

    console.log('POSTSBYYEAR');
    console.log(postsByYear);

    return (
      <Layout title={siteTitle}>
        <h1 className="text-5xl font-normal mb-3">Posts</h1>
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
