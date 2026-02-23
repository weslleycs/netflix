export type registerInput = {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
};

export type loginInput = {
  email: string;
  password: string
};


export type LoginUserData = {
  id: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export type LoginOutput = { 
  token: string 
};

export type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};




