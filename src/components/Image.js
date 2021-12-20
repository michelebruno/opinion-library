import * as React from "react"

import {getImage, getSrc, getSrcSet} from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Helmet} from 'react-helmet';
import {forwardRef} from "react";

const Image = forwardRef(function (props, ref) {
    const image = getImage(props.image);

    if (!image) return null;

    const {
        alt, className, pictureClassName, loading, preload, id,onClick, style
    } = props;

    const {height, width, images} = image;

    return (
        <picture
            className={classNames('mb-image', pictureClassName)}
            id={id}
        >
            {preload && (
                <Helmet link={[
                    ...images.sources.map(({sizes, srcSet, type}) => ({
                        rel: 'preload', as: 'image', href: srcSet, media: sizes, type,
                    })),
                    {
                        rel: 'preload', as: 'image', href: images.fallback.src, imagesrcset: images.fallback.srcSet,
                    },
                ]}
                />
            )}
            {images.sources.map(
                ({sizes, srcSet, type}) => (
                    <source
                        type={type}
                        srcSet={srcSet}
                        sizes={sizes}
                        key={type}
                    />
                ),
            )}
            <img

                ref={ref}
                alt={alt}
                className={className}
                style={style}
                src={getSrc(image)}
                srcSet={getSrcSet(image)}
                width={width}
                height={height}
                loading={loading}
                onClick={onClick}
            />
        </picture>
    );
})
Image.propTypes = {
    image: PropTypes.shape({childImageSharp: PropTypes.object.isRequired}).isRequired,
    loading: PropTypes.oneOf(['lazy', 'eager']),
    className: PropTypes.string,
    alt: PropTypes.string,
    preload: PropTypes.bool,
};

Image.defaultPros = {
    preload: false,
};

export default Image

