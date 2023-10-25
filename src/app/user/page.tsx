import { RedirectType, redirect } from "next/navigation";
const User = () => {
  redirect("/user/settings", "push" as RedirectType);
};

export default User;
