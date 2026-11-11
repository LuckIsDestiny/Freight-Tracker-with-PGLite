CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

CREATE TYPE "LoadStatus" AS ENUM (
  'QUOTED',
  'BOOKED',
  'CANCELED',
  'IN_TRANSIT',
  'DELIVERED'
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
  "User" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  "Shipper" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "contactPerson" TEXT NOT NULL,
    "contactPhone" TEXT,
    "contactEMAIL" TEXT,
    "company" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  "Carrier" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "mcNumber" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactEMAIL" TEXT,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  "Load" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "status" "LoadStatus" DEFAULT 'QUOTED',
    "shipperId" UUID NOT NULL REFERENCES "Shipper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "carrierId" UUID REFERENCES "Carrier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );