const AppRoleEnum = {
  Admin: "admin",
  User: "user",
};

const BookRequestEnum = {
  NotRequested: 0,
  Pending: 1,
  Issue: 2,
  Cancel: 3,
  Return: 4,
};

export const PageLimit = 10;
export { AppRoleEnum, BookRequestEnum };
