import React, { useEffect, useContext, useState } from 'react'
import { useParams } from "react-router-dom";
import Spinner from '../../components/loading-spinner/spinner';
import { SharedContext } from '../../context/shared-context'
import { GraphQLClient, gql } from 'graphql-request'

export default function BlogPage() {
  const params = useParams()
  const sharedContext = useContext(SharedContext)
  const [loading, setLoading] = useState(true)
  const [article, setArticle] = useState(null)

  const graphQLClient = new GraphQLClient('https://api-eu-central-1.graphcms.com/v2/cksi1jg4i1pgs01xlc7859py8/master', {})

  useEffect(() => {
    if (!params || !params.slug) {
      setLoading(false)
    } else {
      // check context for article first
      const { slug } = params;
      const { articles } = sharedContext.state
      if (articles && articles.filter(item => item.slug === slug).length) {
        setArticle(articles.filter(item => item.slug === slug)[0])
        setLoading(false)
      } else {
        // try downloading article from CMS API
        getArticle()
      }
    }
  }, [])

  async function getArticle() {
    const { slug } = params
    const { article } = await graphQLClient.request(
      gql`
        {
          article(where: { slug: "${slug}" }) {
            id
            publishedAt
            title
            slug
            body {
              html
            }
            featured_image {
              url
            }
          }
        }
      `
    );
    if (article) {
      sharedContext.dispatch({
        type: "ADD_ARTICLE",
        payload: article
      })
      setArticle(article)
    }
    setLoading(false)
  }

  return (
    <div>
      <div className="p-4 md:p-6">
        <div className="max-w-screen-2xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-bold text-center capitalize">Loading</h1>
              <Spinner className="h-6 w-6 ml-2" />
            </div>
          ) : (
            article ? (
              <div>
                <div className="relative mb-6 md:mb-10">
                  <div className="h-40 md:h-52 lg:h-60 shadow-xl w-full rounded-2xl bg-gray-100">
                    {article.featured_image && article.featured_image.url ? (
                      <img
                        className="h-full w-full rounded-2xl object-cover"
                        src={article.featured_image.url}
                        alt=""
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gray-500 mix-blend-multiply rounded-2xl" aria-hidden="true" />
                  </div>
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex sm:justify-center sm:items-center items-end p-2">
                    <h2 className="text-lg md:text-2xl lg:text-4xl font-extrabold text-white md:text-center">{article.title}</h2>
                  </div>
                </div>
                <div className="max-w-screen-xl mx-auto article-content" dangerouslySetInnerHTML={{ __html: article.body.html }}>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl md:text-3xl text-center font-extrabold text-gray-900 mt-5">Oops - This page does not exist</h2>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}