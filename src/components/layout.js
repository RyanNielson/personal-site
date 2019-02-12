import React from 'react';
import { Link } from 'gatsby';

import '../css/global.css';

class Layout extends React.Component {
  render() {
    const { title, children } = this.props;
    // let header;

    // header = (
    //   <h3
    //     style={{
    //       fontFamily: `Montserrat, sans-serif`,
    //       marginTop: 0,
    //     }}
    //   >
    //     <Link
    //       style={{
    //         boxShadow: `none`,
    //         textDecoration: `none`,
    //         color: `inherit`,
    //       }}
    //       to={`/`}
    //     >
    //       {title}
    //     </Link>
    //   </h3>
    // );

    return (
      // container mx-auto flex sm:justify-between flex-col text-center sm:flex-row sm:text-left font-sans py-1 px-0 sm:px-4 sm:py-6 sm:items-baseline
      <div className="font-sans font-normal">
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

        <footer class="border-t">
          <div class="container">
            <div />
            <div class="footer-col-wrapper">
              <div class="footer-col footer-col-1">
                <ul class="contact-list">
                  <li class="p-name">Ryan Nielson</li>
                  <li>
                    <a class="u-email" href="mailto:ryan.nielson@gmail.com">
                      ryan.nielson@gmail.com
                    </a>
                  </li>
                </ul>
              </div>

              <div class="footer-col footer-col-2">
                <ul class="social-media-list">
                  <li>
                    <a href="https://github.com/RyanNielson">
                      {/* <svg class="svg-icon">
                        <use xlink:href="/assets/minima-social-icons.svg#github" />
                      </svg>{' '} */}
                      <span class="username">RyanNielson</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com/RyanNielson">
                      {/* <svg class="svg-icon">
                        <use xlink:href="/assets/minima-social-icons.svg#twitter" />
                      </svg>{' '} */}
                      <span class="username">RyanNielson</span>
                    </a>
                  </li>
                  <li>
                    <a href="/feed.xml">
                      {/* <svg class="svg-icon">
                        <use xlink:href="/assets/minima-social-icons.svg#rss" />
                      </svg>{' '} */}
                      <span>RSS</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div class="footer-col footer-col-3">
                <p>The personal site and blog of Ryan Nielson.</p>
              </div>
            </div>
          </div>
        </footer>
        {/* <div className="font-sans container">
          <header>{header}</header>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div> */}
      </div>
    );
  }
}

// class Layout extends React.Component {
//   render() {
//     const { location, title, children } = this.props;
//     const rootPath = `${__PATH_PREFIX__}/`;
//     let header;

//     if (location.pathname === rootPath) {
//       header = (
//         <h1
//           style={{
//             ...scale(1.5),
//             marginBottom: rhythm(1.5),
//             marginTop: 0
//           }}
//         >
//           <Link
//             style={{
//               boxShadow: `none`,
//               textDecoration: `none`,
//               color: `inherit`
//             }}
//             to={`/`}
//           >
//             {title}
//           </Link>
//         </h1>
//       );
//     } else {
//       header = (
//         <h3
//           style={{
//             fontFamily: `Montserrat, sans-serif`,
//             marginTop: 0
//           }}
//         >
//           <Link
//             style={{
//               boxShadow: `none`,
//               textDecoration: `none`,
//               color: `inherit`
//             }}
//             to={`/`}
//           >
//             {title}
//           </Link>
//         </h3>
//       );
//     }
//     return (
//       <div
//         style={{
//           marginLeft: `auto`,
//           marginRight: `auto`,
//           maxWidth: rhythm(24),
//           padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
//         }}
//       >
//         <header>{header}</header>
//         <main>{children}</main>
//         <footer>
//           © {new Date().getFullYear()}, Built with
//           {` `}
//           <a href="https://www.gatsbyjs.org">Gatsby</a>
//         </footer>
//       </div>
//     );
//   }
// }

export default Layout;
