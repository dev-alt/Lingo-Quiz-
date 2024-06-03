"use client";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProfileClientComponent from "@/components/profileClientComponent";
import { GET_USER_PROFILE_BY_HANDLE } from "@/queries/graphql";


export default function ProfilePage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handle = pathname.split("/").pop();

  const { loading, error, data } = useQuery(GET_USER_PROFILE_BY_HANDLE, {
    variables: { handle },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-only",
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.profileByHandle) return <p>Profile not found</p>;

  return <ProfileClientComponent profileData={data} />;
}