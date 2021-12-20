import * as React from "react"
import Layout from "../components/Layout";
import Button from "../components/Button";
import {graphql} from "gatsby";
import Image from "../components/Image";
import petitionJson from '../data/petition.json'
import commentJson from '../data/sample-comments.json'
import {useEffect, useRef} from "react";

import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

function HoverImage({children, component: Component, image, imageUrl, ...props}) {

    let imgClassName = "hidden group-hover:block absolute top-2 right-2 translate-x-100"
    return <span className="relative group">
        <Component {...props}>
            {children}
        </Component>
        {image && <Image image={image} className={imgClassName}/>}
        {imageUrl && <img src={imageUrl} className={imgClassName}/>}

    </span>
}

HoverImage.defaultProps = {
    components: 'span'
}

export default function About({data: {images: {nodes: images}, team: {nodes: team}}}) {
    const nav = useRef()

    useEffect(() => {
        ScrollTrigger.create({
            trigger: nav.current,
            start: 'top 10%',
            end: 'max',
            pin: true
        })

    }, [])

    return <Layout wrapperClassName={"bg-white text-black"} container footer light>
        <h2 className={"text-[4.34vw] leading-[1.15] uppercase"}>
            Opinion library is a website built to explore the language and arguments used in comments to petitions
            regarding the mask mandate in the United States.
        </h2>

        <div className="mt-32 grid grid-cols-3 gap-x-8">

            <article className={"col-span-2 relative"}>
                <p>
                    The research presented in this website was carried out during the Final Synthesis Studio of the
                    Master Degree in Communication Design offered by Politecnico di Milano.
                </p>
                <p>
                    The research examined petitions published on change.org during the pandemic. Starting from an
                    analysis of the main petition themes across different countries, the focus of the research narrowed
                    down to the images and language used on the platform.
                </p>
                <p>
                    The aim of this website is to make the dataset used in this research available to researchers and
                    potential activists interested in the subject. To do this, we set ourselves the objective of
                    realising a tool to explore the language and arguments used in comments to petitions regarding the
                    mask mandate in the <HoverImage
                    imageUrl={"https://media4.giphy.com/media/UPm8BqL6igDUPZ29ik/200.gif"}>United States</HoverImage>.
                </p>

                <h2 id={"data"}>Data</h2>
                <p>
                    Comments on change.org differ slightly from comments on other platforms. Only those who signed a
                    petition can leave a comment on it, as the platform intends comments as "reasons to sign" and
                    prompts users to explain why they signed right after they do so. This means there are no comments
                    against a petition but only comments supporting it.
                </p>
                <p>
                    When publishing a petition on change.org, users must add at least one tag to indicate its general
                    subject. Tags differ from country to country, and the <HoverImage
                    imageUrl="https://c.tenor.com/HbNBhv5Qt3cAAAAC/reaction-trump.gif">United States is the only
                    country</HoverImage> with tags
                    both in favour and against the same issue: mask mandates.
                    Finding this interesting, we decided to collect all the petitions that used these tags.
                </p>
                <p>

                    The first step was compiling a list of all the tags related to mask mandates and group them
                    according to
                    their position: in favour
                    or against.
                </p>
                <div>
                    <Image image={images.find(i => i.relativePath === 'about/tags.png')} className={"mx-auto w-7/12"}/>
                </div>
                <p>We then made a list of all the petitions presenting at least one of the tags above. Since there was
                    no easy way to do this from the website, we wrote a script in python to do this for us.
                    The script sends requests to change.org's server-side API, asking for all the petitions tagged with
                    a specific tag. The server then answers back with a <HoverImage
                        imageUrl="https://media.giphy.com/media/xT3i16tDII3UHUpjVe/giphy.gif">*.json</HoverImage> file
                    containing all the petitions we
                    asked for — this includes the title, body, image, signature count, etc.
                </p>
                <div
                    className="text-base w-full overflow-hidden no-scrollbar border-2 border-black rounded-3xl w-7/12 mx-auto">
                    <h3 className="bg-black text-white px-8 py-4 sticky top-0 left-0 select-none">
                        <code>petition.json</code>
                    </h3>
                    <pre className={"px-8 py-4 h-96  overflow-scroll"}>
                            {JSON.stringify(petitionJson.items[0].petition, null, 2)}
                        </pre>
                </div>
                <p>
                    We filtered the petitions, selecting only the 100 most signed in both groups. Once we had the
                    petitions, we could use their ID to ask the API for their comments. Once again, the server answered
                    back with a *.json file containing all the comments for each petition.
                </p>
                <div
                    className="text-base w-full overflow-hidden no-scrollbar border-2 border-black rounded-3xl w-7/12 mx-auto">
                    <h3 className="bg-black text-white px-8 py-4 sticky top-0 left-0 select-none">
                        <code>comments.json</code>
                    </h3>
                    <pre className={"px-8 py-4 h-96  overflow-scroll"}>
                            {JSON.stringify(commentJson.items, null, 2)}
                        </pre>
                </div>
                <p>
                    Once all the comments were gathered, we used Google Natural Language API to extract entities from
                    the dataset — these are words and n-grams. This was a quick and easy way to get rid of punctuation,
                    articles, conjunctions and verbs.
                </p>

                <div>
                    <Image image={images.find(i => i.relativePath === 'about/google-nl.png')}
                           className={"mx-auto w-7/12"}/>
                </div>

                <p>
                    At this point, we counted how many times each word appeared and converted the absolute number to
                    percentage values for both groups.
                </p>
                <div>
                    <Image image={images.find(i => i.relativePath === 'about/sheets.png')}
                           className={"mx-auto w-7/12"}/>
                </div>

                <p>
                    We then used these percentages to determine whether the word was used with the same frequency by
                    both groups or if one used it more than the other. We used the following proportion to transform the
                    two percentages into a single, more readable metric.
                </p>

                <h2 id={"interactions"}>Interactions</h2>
                <p>
                    The archive presents two kinds of information: how often a word is used by a certain group and which
                    are the comments mentioning that word. Presenting both information to the same panel would result in
                    an overcrowded interface, <HoverImage
                    imageUrl="https://i.pinimg.com/originals/93/a6/42/93a642306c8514a49749bdd557c4b46a.gif">confusing
                    the user</HoverImage>.
                </p>
                <p>
                    For this reason we decided to present the information in two different screens: related words and
                    opinions. Such a division also allowed us to give sequentiality to the navigation, forcing the user
                    to see how a word is used before reading the comments.
                    This offers preliminary information to the user while they’re deciding which comments to read while
                    also allowing them to understand the context of the comments they’re reading of one and
                    the <HoverImage
                    imageUrl={"https://www.google.com/url?sa=i&url=https%3A%2F%2Faptly.de%2Fblog%2Fthe-15-best-gif-reactions%2F&psig=AOvVaw0ZXHX-M2RMs-uLH_bMrbg9&ust=1639756440706000&source=images&cd=vfe&ved=0CAsQjRxqEAoMCA8VAAAAAB0AAAAAEA8"}>other
                    side</HoverImage>.

                </p>
                <h2 id={"team"}>The team</h2>
                <p>This project was created by:</p>

                <div className="grid grid-cols-4 gap-4">
                    {team.map(t => <Image image={t} key={t.publicURL}/>)}
                </div>

            </article>

            <nav className={"relative uppercase"} id={'about-nav'}>
                <ul className={"flex flex-col gap-y-2"} ref={nav}>
                    <li>
                        <Button as={'a'} href={"#data"} light>
                            Data
                        </Button>
                    </li>
                    <li>
                        <Button as={'a'} href={"#interactions"} light>
                            Interactions
                        </Button>
                    </li>
                    <li>
                        <Button as={'a'} href={"#team"} light>
                            The team
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    </Layout>
}

export const query = graphql`{
    images : allFile(filter: {relativeDirectory: {eq: "about"}}) {
        nodes {
            childImageSharp {
                gatsbyImageData
            }
            id
            relativePath
            publicURL
        }
    }
    team : allFile(filter: {relativeDirectory: {eq: "team"}}) {
        nodes {
            childImageSharp {
                gatsbyImageData
            }
            id
            relativePath
            publicURL
        }
    }
}`