import { useContext, useEffect, useState } from 'react'
import { SharedContext } from '../../context/shared-context'
import Spinner from './spinner'

export default function LoadingSpinner() {
  const sharedContext = useContext(SharedContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(sharedContext.state.appLoading)
  }, [sharedContext.state.appLoading])

  return (
    loading ? (
      <div className="fixed bottom-5 right-5 flex items-center justify-center z-50">
        <div className="bg-gray-900 text-white rounded-lg flex items-center justify-center px-4 py-2 space-x-2 shadow-2xl">
          <p className="font-bold text-lg">Loading</p>
          <Spinner color="#fff" className="h-5" />
        </div>
      </div>
    ) : <div></div>
  )
}
