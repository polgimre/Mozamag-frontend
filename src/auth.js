export function isAdmin(user) {
  if (!user?.email) return false;
  return user.email === import.meta.env.VITE_ADMIN_EMAIL;
}
