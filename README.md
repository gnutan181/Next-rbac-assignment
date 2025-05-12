# Next.js RBAC Application

A full-stack Next.js application with Role-Based Access Control (RBAC) using NextAuth.js and Prisma.

## Features

- User authentication with email/password
- Two roles: USER and ADMIN
- Profile management
- Article creation and management
- Admin dashboard for user management

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- SQLite (or PostgreSQL if you prefer)

## Setup

1. Clone the repository:

git clone git clone https://github.com/gnutan181/Next-rbac-assignment
cd nextjs-rbac
npm install

add .env File

npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

npm run dev

Seed Users
The database comes pre-seeded with two test accounts:

Email	Password	Role
admin@example.com	password123	ADMIN
user@example.com	password123	USER
