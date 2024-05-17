import { atom } from "recoil";

export interface AuthUser {
  id: number;
  email: string;
}

export const authAtoms = atom<AuthUser | null>({
  key: "authAtoms",
  default: null,
});
