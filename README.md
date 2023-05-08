Cтек технологий - React, Next.JS, TypeScript, PrismaORM, GraphQL + ReactNative

This will delete all data from the database and roll back any applied migrations.

npx prisma db push --force-reset

## In prisma.schema:

The User model contains the basic fields of a user, such as name, email address, and image.
The Account model links the user to authentication providers such as Google and LinkedIn.
The Session model stores information about user sessions.
The VerificationRequest model is used to store information about email verification requests (e.g. for password recovery or registration confirmation).
