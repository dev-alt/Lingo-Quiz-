"use client"
import {
	Avatar,
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Image
  } from '@nextui-org/react';
  import { Icon } from '@iconify/react';
  import NextImage from "next/image";
  import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { useRouter } from 'next/router';
  
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
  
  export interface ProfilePageProps {
	username: string;
	handle: string;
	avatarUrl: string;
	level: number;
	xp: number;
	badges: number;
	streak: number;
	challengesCompleted: number;
	joinDate: string;
	bio?: string;
	skills?: string[];
  }
  
  interface ProfilePageDataProps {
	profileData: ProfilePageProps;
  }
  
  async function fetchProfileData(handle: string) {
	const client = new ApolloClient({
	  uri: 'http://localhost:7100/graphql',
	  cache: new InMemoryCache(),
	});
  
	const { data } = await client.query({
	  query: GET_USER_PROFILE_BY_HANDLE,
	  variables: { handle },
	});
  
	return data.profile;
  }
  
  const ProfilePage: React.FC<ProfilePageDataProps & { params: { handle: string } }> = async ({ params }) => {
	const router = useRouter();
	const { handle } = router.query as { handle: string };
	const encodedHandle = handle ? encodeURIComponent(handle) : ''; // Encode the handle if it exists
  

	const profileData = await fetchProfileData(encodedHandle);
  
	if (!profileData) {
	  return <p>Profile not found</p>;
	}
  
	const {
	  username,
	  handle: userHandle,
	  avatarUrl,
	  level,
	  xp,
	  badges,
	  streak,
	  challengesCompleted,
	  joinDate,
	  bio,
	  skills,
	} = profileData;
  
	return (
	  <div className="bg-gray-800 min-h-screen p-8 text-white">
		<div className="shadow-lg shadow-slate-100">
		  {/* Header Section */}
		  <div className="relative">
			<Image
			  as={NextImage}
			  width={300}
			  height={200}
			  src="https://e0.pxfuel.com/wallpapers/774/739/desktop-wallpaper-town-8-bit-resolution-artist-and-background-8-bit-anime.jpg"
			  alt="Profile Banner"
			  className="w-full h-40 object-cover rounded-lg mb-4"
			/>
			<div className="absolute bottom-4 left-4">
			  <Avatar src={avatarUrl} size="lg" color="default" />
			</div>
		  </div>
  
		  {/* User Info Section */}
		  <div className="flex items-center justify-between mb-8">
			<div>
			  <h1 className="text-3xl font-semibold">{username}</h1>
			  <p className="text-sm text-gray-400">{userHandle}</p>
			</div>
			<Button>Edit Profile</Button>
		  </div>
		</div>
  
		{/* Bio Section */}
		<Card className="bg-gray-900 p-4 rounded-lg mb-4 text-white shadow-lg shadow-slate-500">
		  <CardBody>
			<p className="text-base">
			  {bio || "You don't have anything in your bio. Go to Account and Edit Profile to add something cool about yourself."}
			</p>
		  </CardBody>
		  <CardFooter>
			<div className="flex items-center">
			  <Icon icon="mdi:calendar-range" className="mr-1 text-teal-400" />
			  <p className="text-sm">Joined {new Date(joinDate).toLocaleDateString()}</p>
			</div>
		  </CardFooter>
		</Card>
		<Divider className="my-4" />
  
		{/* Stats Section */}
		<div className="mb-8">
		  <h2 className="text-xl font-semibold mb-2">Stats</h2>
		  <Divider className="my-4" />
		  <div className="grid grid-cols-2 gap-4">
			<div className="border-2">
			  <div>Challenges</div>
			  {challengesCompleted}
			</div>
			<div className="border-2">
			  <div>Total XP</div>
			  {xp}
			</div>
			<div className="border-2">
			  <div>Badges</div>
			  {badges}
			</div>
			<div className="border-2">
			  <div>Daily Streak</div>
			  {streak}
			</div>
		  </div>
		</div>
		<Divider className="my-4" />
	  </div>
	);
  };
  
  export default ProfilePage;
  