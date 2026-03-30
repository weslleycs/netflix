export type registerInput = {
  name: string;
  password: string;
  email: string;
};

export type User = {
  id: number;
  name: string;
  password: string;
  email: string;
  active: boolean | null;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = {
  id: number;
  name: string;
  email: string;
  token: string;
};
