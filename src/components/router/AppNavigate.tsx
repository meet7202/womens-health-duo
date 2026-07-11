import { Navigate as RouterNavigate, type NavigateProps } from "react-router-dom";
import { appRouterTo } from "@/lib/githubPagesPublicUrl";

/** Internal `<Navigate>` that always targets trailing-slash directory URLs. */
export function AppNavigate({ to, ...props }: NavigateProps) {
  return <RouterNavigate to={appRouterTo(to)} {...props} />;
}
