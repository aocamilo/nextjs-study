import { getAllPostIds, getPostData } from '../../lib/posts'
import Layout from '../components/layout'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }: any) {
  return <Layout>
    {postData.title}
    <br />
    {postData.id}
    <br />
    {postData.date}
  </Layout>
}