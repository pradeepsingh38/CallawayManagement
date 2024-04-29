import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_Retailer_ACCOUNT = gql`
  query getUserAccount($userId: ID!) {
    usersPermissionsUsers(filters: { id: { eq: $userId } }) {
      data {
        attributes {
          username
          email
          provider
          role {
            data {
              id
              attributes {
                name
              }
            }
          }
          
        }
      }
    }
  }
`;