import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Chrome, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Login = () => {
  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    try {
 
      

      window.location.href = "http://localhost:3000/auth/google";
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  // ================= GITHUB LOGIN =================
  const handleGithubLogin = async () => {
    try {
      

      window.location.href = "http://localhost:3000/auth/github";
    } catch (error) {
      toast.error("GitHub login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold">
            Portfolio<span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Card */}
        <div className="glass-card-elevated rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to continue building your portfolio
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleGoogleLogin}
            >
              <Chrome className="w-4 h-4" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleGithubLogin}
            >
              <Github className="w-4 h-4" />
              Continue with GitHub
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms
            </Link>{" "}
            &{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
