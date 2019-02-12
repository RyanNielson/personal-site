/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const BlogPost = path.resolve('src/templates/BlogPost.js');

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [fields___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
              date
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: BlogPost,
        context: {
          slug: node.fields.slug,
          date: node.fields.date,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    const [year, month, day, ...title] = parsedFilePath.name.split('-');

    createNodeField({
      name: 'slug',
      node,
      value: `/${year}/${month}/${title.join('-')}`,
    });

    createNodeField({
      name: 'date',
      node,
      value: `${year}-${month}-${day}`,
    });
  }
};
