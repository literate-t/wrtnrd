import { atom } from "recoil";

export const csrfTokenAtoms = atom({
  key: "csrfTokenState",
  default: "",
});
