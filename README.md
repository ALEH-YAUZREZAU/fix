Cтек технологий - React, Next.JS, TypeScript, PrismaORM, GraphQL + ReactNative

## Before start

Создайте самоподписанный SSL сертификат:

Установите mkcert - инструмент для создания сертификатов, которые будут действительными для вашего локального сервера.

brew install mkcert

mkcert -install
mkcert localhost

Перепестите созданные сертификаты в папку ssl в root проекта

## In prisma.schema:

The User model contains the basic fields of a user, such as name, email address, and image.
The Account model links the user to authentication providers such as Google and LinkedIn.
The Session model stores information about user sessions.
The VerificationRequest model is used to store information about email verification requests (e.g. for password recovery or registration confirmation).
