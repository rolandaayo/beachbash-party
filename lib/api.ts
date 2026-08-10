/** Production API — baked in as fallback so deploys never hit localhost */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://beachbash-server.vercel.app";
