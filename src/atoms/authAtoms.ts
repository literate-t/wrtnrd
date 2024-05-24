import { atom, DefaultValue } from "recoil";

export interface AuthUser {
  id: number;
  email: string;
}

interface SessionStorageEffectParams<T> {
  setSelf: (value: T | DefaultValue) => void;
  onSet: (
    callback: (
      newValue: T,
      oldValue: T | DefaultValue,
      isReset: boolean
    ) => void
  ) => void;
}

const sessionStorageEffect =
  <T>(key: string) =>
  ({ setSelf, onSet }: SessionStorageEffectParams<T>) => {
    if (typeof window === "undefined") {
      return;
    }
    const savedSessionValue = sessionStorage.getItem(key);
    if (savedSessionValue) {
      setSelf(JSON.parse(savedSessionValue));
    }

    onSet((newValue, _, isReset) => {
      if (newValue == null || isReset) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const authAtoms = atom<AuthUser | null>({
  key: "authAtoms",
  default: null,
  effects_UNSTABLE: [sessionStorageEffect("authAtoms")],
});
