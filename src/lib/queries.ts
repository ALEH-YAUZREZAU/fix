import { gql } from "@apollo/client";

const ME_QUERY = gql`
  query {
    me {
      id
      email
      name
      image
      accounts {
        id
        userId
        type
        provider
        providerAccountId
      }
    }
  }
`;

const MY_WORKOUTS = gql`
  query MyWorkouts {
    myWorkouts {
      id
      title
      description
      tags {
        tag {
          name
        }
      }
    }
  }
`;

const CREATE_WORKOUT = gql`
  mutation CreateWorkout($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
      id
      title
      description
      # tags {
      #   tag {
      #     name
      #   }
      # }
    }
  }
`;

const UPDATE_WORKOUT = gql`
  mutation UpdateWorkout($input: UpdateWorkoutInput!) {
    updateWorkout(input: $input) {
      id
      title
      description
      tags {
        tag {
          name
        }
      }
    }
  }
`;

const DELETE_WORKOUT = gql`
  mutation DeleteWorkout($id: ID!) {
    deleteWorkout(id: $id) {
      id
    }
  }
`;

const AVAILABLE_TAGS = gql`
  query AvailableTags {
    availableTags {
      id
      name
    }
  }
`;

const SEARCH_TAGS = gql`
  query SearchTags($query: String!) {
    searchTags(query: $query) {
      id
      name
    }
  }
`;

export { ME_QUERY, MY_WORKOUTS, CREATE_WORKOUT, UPDATE_WORKOUT, DELETE_WORKOUT, SEARCH_TAGS, AVAILABLE_TAGS };
