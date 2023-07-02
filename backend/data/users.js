import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin1 User",
    password: bcrypt.hashSync("12345", 10),
    email: "admin1@example.com",
    isAdmin: true,
  },
  {
    name: "Admin2 User",
    password: bcrypt.hashSync("12345", 10),
    email: "admin2@example.com",
    isAdmin: true,
  },
  {
    name: "Admin3 User",
    password: bcrypt.hashSync("12345", 10),
    email: "admin3@example.com",
    isAdmin: true,
  },
  {
    name: "Jen",
    password: bcrypt.hashSync("12345", 10),
    email: "jen@example.com",
  },
  {
    name: "Abc",
    password: bcrypt.hashSync("12345", 10),
    email: "abc@example.com",
  },
  {
    name: "go",
    password: bcrypt.hashSync("12345", 10),
    email: "go@example.com",
  },
  {
    name: "woah",
    password: bcrypt.hashSync("12345", 10),
    email: "woah@example.com",
  },
];

export default users;
