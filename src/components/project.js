import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Project = ({ title, description, url, sourceUrl, tags }) => {
  return (
    <li className="mb-3">
      <div>
        <h3 class="inline-block mr-2">
          <a
            className="text-xl font-normal no-underline hover:underline text-blue leading-none"
            href={url}
          >
            {title}
          </a>
        </h3>
        <a href={sourceUrl} className="icon-link" title="View Code">
          <FaGithub />
        </a>
      </div>
      <span className="text-sm text-grey-darker">{description}</span>
      <div>
        {tags.map(tag => {
          return (
            <span class="text-sm font-medium bg-purple py-1 px-2 mr-2 rounded text-white align-middle">
              {tag}
            </span>
          );
        })}
      </div>
    </li>
  );
};

export default Project;
