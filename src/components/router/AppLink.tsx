import { Link as RouterLink, type LinkProps } from "react-router-dom";
import { appRouterTo } from "@/lib/githubPagesPublicUrl";

/** Internal `<Link>` that always targets trailing-slash directory URLs (GitHub Pages canonical). */
export function AppLink({ to, ...props }: LinkProps) {
  return <RouterLink to={appRouterTo(to)} {...props} />;
}
