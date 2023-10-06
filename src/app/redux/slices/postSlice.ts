import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  posterId: String;
  name: string;
  email: string;
  password: string;
};
