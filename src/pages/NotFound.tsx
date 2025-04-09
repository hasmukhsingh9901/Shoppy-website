
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-store-secondary px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-store-primary mb-4">404</h1>
        <h2 className="text-2xl font-medium text-store-dark mb-6">Page not found</h2>
        <p className="text-store-muted max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="btn-primary">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
