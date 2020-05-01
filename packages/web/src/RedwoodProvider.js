import PropTypes from 'prop-types'
import ApolloClient from 'apollo-client'

import { GraphQLProvider as RealGraphQLProvider } from 'src/graphql'

let USE_AUTH
export const useAuth = () => {
  return USE_AUTH()
}

const RedwoodProvider = ({ client = {}, auth = {}, children }) => {
  const {
    AuthProvider = React.Fragment,
    GraphQLProvider = RealGraphQLProvider,
    useAuth = () => ({}),
  } = auth
  USE_AUTH = useAuth
  return (
    <AuthProvider>
      <GraphQLProvider client={client}>{children}</GraphQLProvider>
    </AuthProvider>
  )
}

RedwoodProvider.propTypes = {
  client: PropTypes.objectOf(ApolloClient),
  auth: PropTypes.shape({
    AuthProvider: PropTypes.func.isRequired,
    useAuth: PropTypes.func.isRequired,
    GraphQLProvider: PropTypes.func.isRequired,
  }),
}

export default RedwoodProvider
