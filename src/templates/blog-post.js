import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;
    console.log('BLOGPOSTTEMPLATE');
    console.log(post);
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <header className="mb-8">
          <h1>{post.frontmatter.title}</h1>
          <p className="text-sm text-grey-dark">{post.fields.date}</p>
        </header>
        <div
          className="blog-post"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
