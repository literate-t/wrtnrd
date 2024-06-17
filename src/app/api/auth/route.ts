import axios from "@/utils/axios";

const getCookieString = (req: Request, name: string): any => {
  const token = req.headers.get("cookie");
  console.log("token", token);
  return token
    ?.split(";")
    .find((char) => char.trim().startsWith(`${name}=`))
    ?.split("=")[1];
};

export async function GET(req: Request) {
  try {
    const accessToken = getCookieString(req, "ac");
    const refreshToken = getCookieString(req, "rf");

    if (!accessToken || !refreshToken) {
      console.error("Missing tokens in cookies");
      throw new Error("Authentication tokens are missing");
    }

    const res = await axios("/api/auth/check", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `ac=${accessToken}; rf="${refreshToken}"`,
      },
      withCredentials: true,
    });

    return Response.json({ data: res.data });
  } catch (error) {
    return Promise.reject(error);
  }
}
