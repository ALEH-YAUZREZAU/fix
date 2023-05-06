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

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: User;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role>;
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
