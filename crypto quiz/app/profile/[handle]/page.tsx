import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import  ProfilePageProps  from "@/components/profilePageProps";
import ProfileClientComponent from "@/components/profilePageProps";

const GET_USER_PROFILE_BY_HANDLE = gql`
  query GetUserProfileByHandle($handle: String!) {
    profile(handle: $handle) {
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

async function fetchProfileData(handle: string): Promise<ProfilePageProps | null> {
  const client = new ApolloClient({
    uri: "http://localhost:7100/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: GET_USER_PROFILE_BY_HANDLE,
    variables: { handle },
  });

  return data.profile;
}

interface ProfilePageProps {
  params: {
    handle: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const encodedHandle = encodeURIComponent(params.handle);
  const profileData = await fetchProfileData(encodedHandle);

  if (!profileData) {
    return <p>Profile not found</p>;
  }

  return <ProfileClientComponent profileData={profileData} />;
}
