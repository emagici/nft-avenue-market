import { Helmet } from 'react-helmet'

export default function PageTitle({title}) {
  return (
    <Helmet>
      <title>{`The Avenue${title ? ' | ' + title : ''}`}</title>
    </Helmet>
  )
}