import React from 'react';

import {Helmet} from 'react-helmet';
import {useStaticQuery, graphql} from 'gatsby';
import {useLocation} from '@reach/router';

/**
 * More or less from Gatsby docs.
 *
 * @link https://www.gatsbyjs.com/docs/add-seo-component/
 * @param title
 * @param description
 * @param image
 * @param article
 * @return {JSX.Element}
 * @constructor
 */
export default function Seo({title, description, image}) {
  const {pathname} = useLocation();
  const {site} = useStaticQuery(graphql`
    query Seo {
      site {
        siteMetadata {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          siteUrl
          defaultImage: image
        }
      }
    }
  `);

  const {defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage} =
    site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}/${pathname}`,
  };

  return (
    <Helmet
      title={title}
      defaultTitle={defaultTitle}
      titleTemplate={titleTemplate}
      meta={[
        {name: 'description', content: seo.description},
        {itemprop: 'name', content: seo.title},
        {itemprop: 'description', content: seo.description},
        {itemprop: 'image', content: seo.image},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:site', content: seo.url},
        {name: 'twitter:title', content: seo.title},
        {name: 'twitter:description', content: seo.description},
        {name: 'twitter:image:src', content: seo.image},
        {property: 'og:image:height', content: '1080'},
        {property: 'og:image:width', content: '1920'},
        {property: 'og:image:type', content: 'image/jpeg'},
        {name: 'description', content: seo.description},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: seo.url},
        {property: 'og:title', content: seo.title},
        {property: 'og:site_name', content: defaultTitle},
        {property: 'og:description', content: seo.description},
        {property: 'og:image', content: seo.image},
        {property: 'og:image:secure_url', content: seo.image},
        {property: 'og:image:height', content: '1080'},
        {property: 'og:image:width', content: '1920'},
        {property: 'og:image:type', content: 'image/jpeg'},
      ]}
    >
      {/* <!-- Twitter Card data --> */}
      {/* <meta name="twitter:site" content="@publisher_handle"> */}
      {/* <meta name="twitter:title" content="Page Title"> */}
      {/* <!-- Twitter summary card with large image must be at least 280x150px --> */}
      {/* <meta property="og:type" content="article"/> */}
      {/* <meta property="article:published_time" content="2013-09-17T05:59:00+01:00"/> */}
      {/* <meta property="article:modified_time" content="2013-09-16T19:08:47+01:00"/> */}
      {/* <meta property="article:section" content="Article Section"/> */}
      {/* <meta property="article:tag" content="Article Tag"/> */}
      {/* <meta property="fb:admins" content="Facebook numberic ID"/> */}
    </Helmet>
  );
}

Seo.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};
