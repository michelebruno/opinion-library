import * as React from "react"
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function About() {
    return <Layout wrapperClassName={"bg-white text-black"} container footer>
        <h2 className={"text-8xl"}>The research presented in this website was carried out during the Final Synthesis
            Studio of the Master Degree in Communication Design offered by Politecnico di Milano.</h2>

        <div className="mt-32 grid grid-cols-3 gap-x-8">

            <article className={"col-span-2"}>

                <p>
                    The studio course is led by DensityDesign, a Research Lab focusing on the visual representation of
                    complex social, organisational and urban phenomena.
                </p>
                <p>
                    The course's objective is to research a topic chosen by the lab. Students explore subjects ranging
                    from
                    computer science and statistics to semiology and sociology, concluding the course by presenting
                    their
                    research through an interactive web experience.
                </p>


                <h2>Focus, Aim and Objective</h2>
                <p>
                    This research covered online activism on change.org during the pandemic. Starting from an analysis
                    of
                    the main petition themes across different countries, the focus of the research narrowed down to the
                    images and language used on the platform.
                </p>

                <p>
                    The aim of this website is to make the dataset used in this research available to researchers and
                    potential activists interested in the subject. To do this, we set ourselves the objective of
                    realising a
                    tool to explore the language and arguments used in comments to petitions regarding the mask mandate
                    in
                    the United States.

                </p>

                <h2>Data</h2>
                <p>
                    Comments on change.org differ slightly from comments on other platforms. Only those who signed a
                    petition can leave a comment on it, as the platform intends comments as "reasons to sign" and
                    prompts
                    users to explain why they signed right after they do so. This means there are no comments against a
                    petition but only comments supporting it.
                </p>

                <p>
                    When publishing a petition on change.org, users must add at least one tag to indicate its general
                    subject. Tags differ from country to country, and the United States are the only country with tags
                    both
                    in favour and against the same issue: mask mandates.
                    Finding this interesting, we decided to collect all the petitions that used these tags.
                </p>
                <p>
                    The first step was compiling a list of all the tags related to mask mandates and group them
                    according to
                    their position: in favour or against.
                </p>


                <p>
                    We then made a list of all the petitions presenting at least one of the tags above. Since there was
                    no
                    easy way to do this from the website, we wrote a script in python to do this for us.
                    <br/>
                    The script - commonly known as scraper - sends requests to change.org's server-side API, asking for
                    all
                    the petitions tagged with a specific tag. The server then answers back with a *.json file containing
                    all
                    the petitions we asked for - this includes the title, body, image, signature count, etc.
                </p>


                <p>
                    We filtered the petitions, selecting only the 100 most signed in both groups. Once we had the
                    petitions,
                    we could use their ID to ask the API for their comments. Once again, the server answered back with a
                    *.json file containing all the comments for each petition.
                </p>


                <p>
                    Once all the comments were gathered, we used Google Natural Language API to extract entities from
                    the
                    dataset - these are words and idioms. This was a quick and easy way to get rid of punctuation,
                    articles,
                    conjunctions and verbs.
                </p>

                <p>
                    At this point, we counted how many times each word appeared and converted the absolute number to
                    percentage values for both groups.
                </p>


                <p>
                    We then used these percentages to determine whether the word was used with the same frequency by
                    both
                    groups or if one used it more than the other. We used the following proportion to transform the two
                    percentages into a single, more readable metric.
                </p>


                <h2>Interactions</h2>
                <p>
                    The user navigates the archive by the selection of keywords to use as filters. Once the archive is
                    opened, the user can find the first-level filters in the left side column: these are the words used
                    with
                    the same frequency by both groups.
                </p>
                <p>Once the first word is selected, the central panel will display words related to the one that has
                    just
                    been selected. These words will be positioned horizontally according to their usage by either group
                    and
                    vertically according to the amount of time they appear together with the selected word.</p>

                <p> The user can now select any word displayed on the central panel as a second-level filter. Once this
                    is
                    done, the user is presented with a list of comments where both keywords appear.</p>

                <p>
                    If the user does not want to use a second-level filter, comments can be accessed through the "read
                    comments" button under the related words.</p>


                <h2>Visual language</h2>
                <p>The colour palette used in this website was chosen in such a way as to avoid any political
                    affiliation with political parties, given the controversial nature of the issue in the United
                    States. </p>
                <p>
                    The usage of a comment box in the introduction and the usage of pills to display words in the
                    archive have been taken from change.org's user interface. The interaction dynamic has been kept the
                    same while their aesthetic has been adapted to the rest of the website.
                </p>
                <p>We decided to use comments in the introduction to the website. This was done to emphasise the fact
                    that a user can leave a comment only once they have signed the petition. Pills have been used to
                    represent words in the archive to recall the usage of pills to represent topics in Change.org.</p>

            </article>

            <nav className={"sticky top-24"}>
                <Button as={'button'}>
                    FOCUS, AIM AND OBJECTIVE
                </Button>
            </nav>
        </div>
     </Layout>
}