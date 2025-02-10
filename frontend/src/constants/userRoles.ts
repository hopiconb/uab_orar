export const USER_ROLE_LABELS = {
  ADMIN: 'Cont Administrator',
  TEACHER: 'Cont Profesor'
} as const;

export const getRoleLabel = (role: keyof typeof USER_ROLE_LABELS): string => {
  return USER_ROLE_LABELS[role];
};