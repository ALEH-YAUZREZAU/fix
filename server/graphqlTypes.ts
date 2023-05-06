export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['String'];
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  type: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateAccountInput = {
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  type: Scalars['String'];
};

export type CreateUserInput = {
  accounts: Array<CreateAccountInput>;
  email: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  role: Role;
};

export type CreateWorkoutInput = {
  description: Scalars['String'];
  isPublic?: InputMaybe<Scalars['Boolean']>;
  tags: Array<Scalars['ID']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createWorkout: Workout;
  deleteWorkout: Workout;
  updateUser: User;
  updateWorkout: Workout;
};


export type MutationCreateWorkoutArgs = {
  input: CreateWorkoutInput;
};


export type MutationDeleteWorkoutArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateWorkoutArgs = {
  input: UpdateWorkoutInput;
};

export type Query = {
  __typename?: 'Query';
  allWorkouts: Array<Workout>;
  availableTags: Array<Tag>;
  me: User;
  myWorkouts: Array<Workout>;
  workoutsByTags: Array<Workout>;
};


export type QueryWorkoutsByTagsArgs = {
  tags: Array<Scalars['ID']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
  workouts: Array<Workout>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role>;
};

export type UpdateWorkoutInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isPublic?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<Scalars['ID']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  accounts: Array<Account>;
  email: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role: Role;
};

export type Workout = {
  __typename?: 'Workout';
  description: Scalars['String'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  tags: Array<Tag>;
  title: Scalars['String'];
  user: User;
};
