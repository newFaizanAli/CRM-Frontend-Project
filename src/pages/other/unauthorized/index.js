// /pages/Unauthorized.jsx
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-semibold text-red-500">403 - Unauthorized</h1>
      <p className="mt-4">You do not have access to this page.</p>
      <Link to="/" className="text-indigo-500 mt-2 underline">
        Go Back to Home
      </Link>
    </div>
  );
};

export default Index;
