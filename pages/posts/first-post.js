import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <>
      <Layout>
      <Head>
        <title>第一次发布</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link legacyBehavior href="/">
          <a>回到主页</a>
        </Link>
      </h2>
      </Layout>
      
      <style jsx global>{`
        html,
        body {
          background:green;
        }
  
      `}</style>
    </>
  )
}