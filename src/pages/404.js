import * as React from 'react';
import {Link} from 'gatsby';
import Layout from '../components/Layout';
import Button from '../components/Button';

export default function NotFoundPage() {
  return (
    <Layout container className="h-screen flex flex-col justify-between py-16">
      <h1 className="text-8xl">Sorry, page not found.</h1>
      <p className="my-32">
        <Button as={Link} to="/" large>
          Go home
        </Button>
        <br />* please, wear a mask.
      </p>
    </Layout>
  );
}
