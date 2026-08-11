/** Local default while developing — override with NEXT_PUBLIC_API_URL for deploy */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://beachbash-server.vercel.app";
