import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { EmptyState } from "../components/common/Common";

export default function NotFoundPage() {
  return <div className="mx-auto max-w-lg py-10"><EmptyState icon={Compass} title="404 – Page not found" text="Looks like this route took a wrong turn." action={<Link to="/" className="btn-primary">Back home</Link>} /></div>;
}
