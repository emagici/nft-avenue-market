import React, { useEffect, useContext, useState } from 'react'
import { Link } from "react-router-dom";
import SectionHeader from '../../components/section-header'
import Spinner from '../../components/loading-spinner/spinner';
import { SharedContext } from '../../context/shared-context'
import { GraphQLClient, gql } from 'graphql-request'

export default function BlogListPage() {
  const sharedContext = useContext(SharedContext)
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState(null)

  const graphQLClient = new GraphQLClient('https://api-eu-central-1.graphcms.com/v2/cksi1jg4i1pgs01xlc7859py8/master', {})

  useEffect(() => {

    const articlesTmp = sharedContext.state.articles
    if (articlesTmp && articlesTmp.length && articlesTmp.length > 1) {
      // only load new articles on initial load - otherwise restore from state if available
      setArticles(articlesTmp)
      setLoading(false)
      return;
    }

    const fetchArticles = async () => {
      const { articles } = await graphQLClient.request(
        gql`
          {
            articles(orderBy: updatedAt_DESC, first: 12) {
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
      if (articles && articles.length) {
        sharedContext.dispatch({
          type: "UPDATE_ARTICLES",
          payload: articles
        })
        setArticles(articles)
      }
      setLoading(false)
    };

    fetchArticles()
  }, [])


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
            articles && articles.length ? (
              <div className="py-10">
                <div className="max-w-screen-2xl mx-auto">
                  <SectionHeader title="Blog" />
                  <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((item) => (
                      <li key={item.id} className="col-span-1">
                        <Link to={`/blog/${item.slug}`}>
                          <div className="w-full h-40 md:h-72 flex items-center justify-between bg-gray-100 rounded-xl shadow-lg mb-2 md:mb-5">
                            {item.featured_image && item.featured_image.url ? (
                              <img src={item.featured_image.url} className="w-full h-full object-cover rounded-xl" />
                            ) : null}
                          </div>
                          <div>
                            <p className="text-base md:text-xl font-bold">{item.title}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-lg md:text-2xl text-center font-bold text-gray-900 mt-5">Unable to load the blog at the moment</h2>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}