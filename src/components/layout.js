import React from 'react';
import { Link } from 'gatsby';
import { FaGithub, FaTwitter } from 'react-icons/fa';

import '../css/global.css';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="font-sans font-normal leading-normal">
        <header className="border-b">
          <div className="container flex justify-between items-baseline py-3 ">
            <Link
              to="/"
              className="no-underline text-2xl hover:underline text-black"
            >
              Ryan Nielson
            </Link>
            <nav className="">
              <Link
                to="/"
                className="no-underline hover:underline text-black ml-3"
              >
                Posts
              </Link>
              <Link
                to="/projects"
                className="no-underline hover:underline text-black ml-3"
              >
                Projects
              </Link>
            </nav>
          </div>
        </header>
        <div className="container my-6">
          <main>{children}</main>
        </div>

        <footer className="border-t">
          <div className="container py-6">
            <div className="flex justify-between items-baseline">
              <ul className="list-reset">
                <li class="p-name">Ryan Nielson</li>
                <li>
                  <a
                    className="text-blue no-underline hover:underline"
                    href="mailto:ryan.nielson@gmail.com"
                  >
                    ryan.nielson@gmail.com
                  </a>
                </li>
              </ul>

              <ul className="list-reset">
                <li>
                  <a
                    href="https://github.com/RyanNielson"
                    className="icon-link"
                  >
                    <FaGithub />
                    <span>RyanNielson</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com/RyanNielson"
                    className="icon-link"
                  >
                    <FaTwitter />
                    <span>RyanNielson</span>
                  </a>
                </li>
              </ul>

              <div>
                <p className="text-grey-dark">
                  The personal site and blog of Ryan Nielson.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Layout;
