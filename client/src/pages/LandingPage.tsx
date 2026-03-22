import  { useState } from 'react';
import { Brain, Search, Share2, Link, Youtube, Twitter, Instagram, Facebook, Github, BookMarked, ArrowRight, Menu, X, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  const features = [
    {
      icon: <BookMarked className="w-8 h-8 text-purple-500" />,
      title: 'Save Everything',
      description: 'Store all your favorite social media posts, YouTube videos, and web links in one place.'
    },
    {
      icon: <Search className="w-8 h-8 text-purple-500" />,
      title: 'Smart Search',
      description: 'Quickly find any saved content with our powerful search and tagging system.'
    },
    {
      icon: <Share2 className="w-8 h-8 text-purple-500" />,
      title: 'Share Your Brain',
      description: 'Share your curated collection of links with friends or the world.'
    }
  ];

  const platforms = [
    { icon: <Youtube className="w-8 h-8" />, name: 'YouTube' },
    { icon: <Twitter className="w-8 h-8" />, name: 'Twitter' },
    { icon: <Instagram className="w-8 h-8" />, name: 'Instagram' },
    { icon: <Facebook className="w-8 h-8" />, name: 'Facebook' },
    { icon: <Github className="w-8 h-8" />, name: 'GitHub' },
    { icon: <Link className="w-8 h-8" />, name: 'Web Links' }
  ];

  const startCollectingHandler = () => {
    // Check if user is authenticated (this is a placeholder, replace with actual auth check)
    if(document.cookie.includes("auth=true")){
      navigate("/dashboard")
    }
    else{
      navigate("/signin")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                LinkMind
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600">Features</a>
              <a href="#platforms" className="text-gray-600 hover:text-purple-600">Platforms</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600">Pricing</a>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-purple-600">Features</a>
                <a href="#platforms" className="text-gray-600 hover:text-purple-600">Platforms</a>
                <a href="#pricing" className="text-gray-600 hover:text-purple-600">Pricing</a>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Digital Brain for
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"> Social Links</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Store, organize, and share your favorite content from across the web. Never lose an important link again.
              </p>
              <div className="mt-8 flex items-center space-x-4">
                <button onClick={startCollectingHandler} className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300 flex items-center">
                  Start Collecting <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 transition duration-300">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80"
                alt="Digital organization concept"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Organize Your Digital Life
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Connect All Your Favorite Platforms
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {platforms.map((platform, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center">
                <div className="text-purple-600 mb-3">
                  {platform.icon}
                </div>
                <span className="text-gray-700 font-medium">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Start Building Your Digital Brain?
          </h2>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300 font-semibold">
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-purple-400" />
                <span className="ml-2 text-xl font-bold">LinkMind</span>
              </div>
              <p className="mt-4 text-gray-400">
                Your second brain for social content.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Integration</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 LinkMind. Made with <Heart className="h-4 w-4 inline-block text-red-500" /> by our team.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;