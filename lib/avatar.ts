const AVATARS = [
  "/avatars/avatar-1.svg",
  "/avatars/avatar-2.svg",
  "/avatars/avatar-3.svg",
  "/avatars/avatar-4.svg",
] as const;

export function getLocalAvatar(seed: string): string {
  const normalized = seed.trim().toLowerCase();
  if (!normalized) return AVATARS[0];

  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0;
  }

  return AVATARS[hash % AVATARS.length];
}
