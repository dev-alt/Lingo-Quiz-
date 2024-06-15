import { gql, useQuery, useMutation } from "@apollo/client";

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

// GraphQL query to fetch user profile data
export const GET_USER_PROFILE_BY_USER_ID = gql`
  query GetUserProfileByUserId($userId: ID!) {
    profileByUserId(userId: $userId) {
      _id
      username
      handle
      level
      xp
      rank
      badges
      streak
      balance
    }
  }
`;


export const GET_ENROLLED_COURSES = gql`
  query GetEnrolledCourses($userId: ID!) {
    enrolledCourses(userId: $userId) {
      _id
      title
      language
      difficulty
      description
      duration
      quizzes {
      _id
      isCompleted
      }
    }
  }
`;
export const GET_COURSES_DATA = gql`
  query GetCoursesData($language: String!, $difficulty: String!) {
    languages
    difficulties
    courses(language: $language, difficulty: $difficulty) {
      _id
      title
      language
      difficulty
      duration
      description
    }
  }
`;

export const ENROLL_IN_COURSE = gql`
  mutation EnrollInCourse($userId: ID!, $courseId: ID!) {
    enrollInCourse(userId: $userId, courseId: $courseId) {
      success
    }
  }
`;

export const UNENROLL_FROM_COURSE = gql`
mutation UnenrollFromCourse($userId: ID!, $courseId: ID!) {
  unenrollFromCourse(userId: $userId, courseId: $courseId) {
    success
    message
  }
}
`;

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    getCourse(courseId: $id) {
      _id
      title
      language
      difficulty
      description
      duration
      quizzes {
        _id
        title
        language
        difficulty
        isCompleted
      }
    }
  }
`;

export const GET_QUIZ = gql`
  query quiz($quizId: ID!) {
    quiz(id: $quizId) {
      _id
      title
      questions {
        question
        options
      }
    }
  }
`;

export const GET_ITEMS = gql`
query GetItems {
  getItems {
    _id
    name
    description
    price
    imageUrl
    quantity
  }
}
`;