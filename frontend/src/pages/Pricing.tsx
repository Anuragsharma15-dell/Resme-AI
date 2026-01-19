import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "forever",
    features: [
      "1 Resume",
      "Basic templates",
      "AI content suggestions",
      "Shareable link",
      "Basic analytics",
    ],
    cta: "Get Started Free",
    popular: false,
    icon: Sparkles,
  },
  {
    name: "Pro",
    description: "For serious job seekers",
    price: "$12",
    period: "per month",
    features: [
      "Unlimited Resumes",
      "All premium templates",
      "Advanced AI writer",
      "Custom domain",
      "PDF & HTML export",
      "Priority support",
      "SEO optimization",
      "Remove branding",
    ],
    cta: "Start Pro Trial",
    popular: true,
    icon: Zap,
  },
  {
    name: "Enterprise",
    description: "For teams and organizations",
    price: "$49",
    period: "per month",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "White-label solution",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "SSO authentication",
      "Analytics dashboard",
    ],
    cta: "Contact Sales",
    popular: false,
    icon: Crown,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen noise-overlay">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. Upgrade or downgrade anytime.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <div className={`glass-card rounded-2xl p-8 h-full ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    className="w-full mb-6"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Check out our FAQ or reach out to our support team for help.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline">View FAQ</Button>
              <Button variant="ghost">Contact Support</Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
