import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Lightbulb, Target, TrendingUp, Users, ArrowRight, Sparkles, Zap, Star, Rocket } from 'lucide-react'

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
          </div>
        ))}
      </div>

    
      {/* Hero Section */}
      <section className="relative z-40 container mx-auto px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Floating Badge */}
          <div className="flex justify-center mb-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center space-x-3 bg-slate-900/50 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
                <span className="text-white font-semibold">Turn Ideas Into Reality</span>
                <Rocket className="w-5 h-5 text-pink-400" />
              </div>
            </div>
          </div>
          
          {/* Main Headline */}
          <div className="relative mb-8">
            <h1 className="text-7xl md:text-8xl font-black text-white mb-6 leading-tight">
              Track Your
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Startup Ideas
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 blur-lg opacity-30 animate-pulse"></div>
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Organize, analyze, and develop your business ideas with our comprehensive tracking system. 
            <span className="text-yellow-400 font-semibold"> Never lose a brilliant idea again.</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              to="/register" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Start Tracking Ideas
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link 
              to="/login" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105"
            >
              I Already Have Account
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: '10K+', label: 'Ideas Tracked', icon: Lightbulb },
              { number: '5K+', label: 'Happy Users', icon: Users },
              { number: '98%', label: 'Success Rate', icon: Star }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-4 group-hover:animate-bounce" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-30 container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-full px-6 py-3 border border-purple-500/30 mb-8">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Powerful Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Everything You Need
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive tools to capture, organize, and develop your startup concepts with precision and style
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[ 
            {
              icon: Lightbulb,
              title: 'Idea Management',
              description: 'Capture and organize all your startup ideas in one secure place with detailed information.',
              gradient: 'from-blue-500 to-purple-600',
              color: 'blue'
            },
            {
              icon: Target,
              title: 'Target Analysis',
              description: 'Define your target audience and analyze market opportunities for each idea.',
              gradient: 'from-green-500 to-blue-600',
              color: 'green'
            },
            {
              icon: TrendingUp,
              title: 'Progress Tracking',
              description: 'Monitor the development status of your ideas from concept to launch.',
              gradient: 'from-purple-500 to-pink-600',
              color: 'purple'
            },
            {
              icon: Users,
              title: 'Personal Dashboard',
              description: 'Access your ideas securely with personalized dashboard and analytics.',
              gradient: 'from-orange-500 to-red-600',
              color: 'orange'
            }
          ].map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative backdrop-blur-md bg-slate-900/50 rounded-3xl p-8 border border-white/20 hover:bg-slate-900/70 transition-all duration-500 hover:scale-105 h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 container mx-auto px-6 py-20">
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl"></div>
          <div className="relative backdrop-blur-md bg-slate-900/50 rounded-3xl p-12 border border-white/20 text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <Star className="w-8 h-8 text-yellow-400 animate-spin" />
                <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                <Star className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDirection: 'reverse' }} />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Ready to Track Your Next Big Idea?
            </h2>
            <p className="text-gray-300 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of entrepreneurs who are already using IdeaTracker to 
              organize and develop their startup concepts into successful businesses.
            </p>
            <Link 
              to="/register" 
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Get Started for Free
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 py-12 border-t border-white/10">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              IdeaTracker
            </span>
          </div>
          <p className="text-gray-400 mb-4">Built with ❤️ for entrepreneurs worldwide</p>
          <p className="text-gray-500 text-sm">&copy; 2024 IdeaTracker. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default LandingPage