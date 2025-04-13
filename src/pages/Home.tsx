
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Coins } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeaderboardCard from "@/components/LeaderboardCard";

// Mock leaderboard data
const leaderboardUsers = [
  { id: "1", username: "cryptomaster", xp: 8750, tokens: 145.5, rank: 1 },
  { id: "2", username: "web3learner", xp: 7200, tokens: 120, rank: 2 },
  { id: "3", username: "blockchain_guru", xp: 6800, tokens: 113.3, rank: 3 },
  { id: "4", username: "token_hunter", xp: 6200, tokens: 103.3, rank: 4 },
  { id: "5", username: "crypto_newbie", xp: 5500, tokens: 91.7, rank: 5 },
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-purple-light text-white py-24">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Learn, Complete, <span className="text-brand-amber">Earn</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
            Master blockchain concepts and earn real Aptos tokens while improving your skills.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-brand-purple hover:bg-white/90">
              Start Learning
            </Button>
          </Link>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
                <BookOpen className="text-brand-purple" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Learn</h3>
              <p className="text-muted-foreground">
                Complete interactive courses and master blockchain concepts at your own pace
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
                <Award className="text-brand-purple" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Complete</h3>
              <p className="text-muted-foreground">
                Pass quizzes and challenges to demonstrate your knowledge and understanding
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
                <Coins className="text-brand-purple" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Earn</h3>
              <p className="text-muted-foreground">
                Receive real Aptos tokens for your achievements that you can use in the ecosystem
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leaderboard Preview Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Compete with Others</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our community of learners and compete for the top spots on our leaderboard.
                The more you learn, the more tokens you earn!
              </p>
              <Link to="/signup">
                <Button size="lg">Join the Competition</Button>
              </Link>
            </div>
            
            <div>
              <LeaderboardCard users={leaderboardUsers} />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-brand-purple text-white text-center">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already earning while they learn.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-brand-purple hover:bg-white/90">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
