import { gql, useQuery } from "@apollo/client";

export const GET_USER_PROFILE_BY_HANDLE = gql`
  query GetUserProfileByHandle($handle: String!) {
    profileByHandle(handle: $handle) {
      _id
      userId
      username
      handle
      bio
      level
      xp
      challengesCompleted
      rank
      badges
      streak
      achievements
      progress
      joinDate
      lastActive
      avatarUrl
      bannerUrl
      ownedBanners {
        tokenId
        contractAddress
      }
      ownedAvatars {
        tokenId
        contractAddress
      }
    }
  }
`;