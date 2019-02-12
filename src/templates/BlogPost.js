import React from 'react';
import { graphql } from 'gatsby';

// Data is injected by the graphql query below

import styled from 'styled-components';
import tw from 'tailwind.macro';

const Button = styled.button`
  ${tw`font-sans bg-blue hover:bg-blue-dark text-white p-2 rounded`};
`;

// const Button2 = styled.button`
//   @apply .font-sans .bg-red .hover:bg-blue-dark .text-white .p-2 .rounded;
// `;

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        {/* <h2>{frontmatter.date}</h2> */}
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Button>WOO</Button>
        {/* <Button2>WOO2</Button2> */}
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

// Restore something like this back to front matter or fields date(formatString: "MMMM DD, YYYY")
