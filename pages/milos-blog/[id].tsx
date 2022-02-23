import Butter from "buttercms"
import Head from "next/head";
import Image from 'next/image';
import { loader } from '../pokemon';

export const butter = Butter('8650de526eb1ba18f6388e52e7a710c4d6a31dc3');

interface Post {
  postData: {
    author: {
      first_name: string;
      last_name: string;
      profile_image: string;
    }
    body: string;
    created: string;
    title: string;
    featured_image: string;
  }
}

interface Params {
  params: { id: string };
}

export async function getStaticPaths() {
  const postIds = ['controlled-props-components-in-react', 'compound-components-in-react'];
  const paths = postIds.map((id: string) => ({ params: { id } }));
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: Params) {
  const { data: postData } = await butter.post.retrieve(params.id);

  return {
    props: {
      postData: postData.data
    }
  }
}

export default function Post({ postData }: Post) {
  console.log(postData)
  const { author, title, created, body, featured_image } = postData;
  const publishDate = new Date(created);
  return (
    <div className="container-fluid px-5 row d-flex align-items-center justify-content-center">
      <Head>
        <title>Milo Blog - Dynamic Paths SSG</title>
      </Head>
      <div className="col-6">
        <Image loader={loader} quality="100" width={900} height={600} src={featured_image} className="mb-5" />
        <h1>{title}</h1>
        <h5 className="mx-2 w-100">By: {`${author.first_name} ${author.last_name}`} {' '}
          <Image loader={loader} src={author.profile_image} width={30} height={30} layout="fixed" />
        </h5>
        <p className="mx-2 mb-4">{publishDate.getDate}</p>
        <div className="mt-5" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  )
}