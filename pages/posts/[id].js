import Date from '../../components/date';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css'  
// Add this import
import Head from 'next/head';

export default function Post({ postData }) {
    return (
      <Layout>
             {/* Add this <Head> tag */}
      <Head>
        <title>{postData.title}</title>
      </Head>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {/* Replace {postData.date} with this */}
        <Date dateString={postData.date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Layout>
    );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id);
  
    return {
      props: {
        postData,
      },
    };
  }