import React from 'react';

const YearPosts = ({ year, posts }) => {
  return (
    <section>
      <h2 className="text-3xl font-normal border-b mb-3">{year}</h2>
      <ul className="list-reset mb-3 leading-normal">
        {posts.map(post => {
          return (
            <li key={post.node.fields.slug} className="mb-3">
              <h3>
                <a
                  className="text-2xl font-normal no-underline hover:underline text-blue leading-none"
                  href={post.node.fields.slug}
                >
                  {post.node.frontmatter.title}
                </a>
              </h3>
              <span className="text-sm text-grey-dark">
                {post.node.fields.date}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default YearPosts;
