import { v1 as uuid } from 'uuid';
import { gql } from '@apollo/client';

import { initializeApollo } from '@/utils/apollo/client';

const CREATE_SPACE = gql`
  mutation CreateSpaceMutation($spaceInput: CreateSpaceInput!) {
    createSpace(input: $spaceInput) {
      name
      description
    }
  }
`;

const createNewSpace = async (user) => {
  const spaceId = uuid();

  const spaceInput = {
    // Sample data
    name: 'Pair Programming Session',
    description: '16X 🚀🚀🚀🚀',
    userId: user?._id,
    username: user?.name,
    spaceId,
  };

  const apolloClient = initializeApollo();
  try {
    const result = await apolloClient.mutate({ mutation: CREATE_SPACE, variables: { spaceInput } });

    console.debug('Joining Space:', result);
  } catch (err) {
    console.warn('Unable to join space:', err);
  }
  return `/room/${spaceId}`;
};

export default createNewSpace;
