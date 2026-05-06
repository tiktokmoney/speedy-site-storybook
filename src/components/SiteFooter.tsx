import { Link } from "react-router-dom";

export const SiteFooter = () => (
  <footer className="border-t border-border bg-secondary/30 py-8">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
      <p>© {new Date().getFullYear()} Jones Service Group. All rights reserved.</p>
      <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
        <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
      </nav>
    </div>
  </footer>
);

export default SiteFooter;