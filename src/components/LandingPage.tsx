import { Sparkles, BookOpen, Trophy, Users, Star, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Engaging video content and quizzes that make learning Ancient Egypt fun and memorable',
    },
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Earn coins, complete quests, and unlock achievements as you explore ancient cultures',
    },
    {
      icon: Users,
      title: 'Parent Dashboard',
      description: 'Track progress, view analytics, and support your child\'s learning journey',
    },
    {
      icon: Sparkles,
      title: 'Avatar Customization',
      description: 'Use earned coins to buy fun hats and outfits in our marketplace',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Parent of 8-year-old',
      content: 'My daughter is obsessed! She learned more about Ancient Egypt in two weeks than I did in a year of school.',
      rating: 5,
    },
    {
      name: 'James T.',
      role: 'Parent of 10-year-old',
      content: 'The gamification is brilliant. My son actually asks to do his lessons. Worth every penny!',
      rating: 5,
    },
    {
      name: 'Emily R.',
      role: 'Homeschool Mom',
      content: 'Perfect for our curriculum. The parent dashboard helps me track learning outcomes easily.',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Explorer',
      price: 9.99,
      features: [
        'Access to History unit',
        'Basic avatar items',
        'Daily quests',
        'Progress tracking',
      ],
    },
    {
      name: 'Adventurer',
      price: 19.99,
      popular: true,
      features: [
        'All 5 curriculum units',
        'Premium avatar items',
        'Daily & weekly quests',
        'Advanced analytics',
        'Certificate of completion',
      ],
    },
    {
      name: 'Scholar',
      price: 29.99,
      features: [
        'Everything in Adventurer',
        'Exclusive content',
        'Priority support',
        'Monthly bonus quests',
        'Family plan (3 kids)',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#fff5ef] to-[#ffe8d6] py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-[#2cc75c] text-white px-4 py-2 rounded-full mb-6">
              🎓 Trusted by 10,000+ families
            </div>
            <h1 className="mb-6">Explore Ancient Egypt Through Play</h1>
            <p className="text-xl mb-8 text-gray-700">
              CultureQuest makes cultural learning magical with gamified lessons,
              interactive quizzes, and rewards that keep kids engaged and excited to learn.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/student-dashboard')}
                className="bg-[#e17624] text-white px-8 py-4 rounded-xl hover:bg-[#c96520] transition-colors shadow-lg"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => navigate('/parent-dashboard')}
                className="bg-white text-[#a33013] px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors border-2 border-[#a33013]"
              >
                Parent Portal
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#e17624] rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#2cc75c] rounded-full opacity-20"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1662655558695-fa6d74f16b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbGVhcm5pbmclMjBhbmNpZW50JTIwZWd5cHR8ZW58MXx8fHwxNzYzODE2MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Kids learning"
              className="rounded-2xl shadow-2xl relative z-10 w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Parents & Kids Love CultureQuest</h2>
            <p className="text-xl text-gray-600">Everything you need for an engaging cultural learning experience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#e17624] rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Loved by Families Worldwide</h2>
            <p className="text-xl text-gray-600">See what parents are saying about CultureQuest</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#fff5ef] p-8 rounded-xl border-2 border-[#2cc75c]">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#e17624] text-[#e17624]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="text-[#a33013]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Choose Your Adventure</h2>
            <p className="text-xl text-gray-600">Start with a 7-day free trial. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl border-2 ${plan.popular
                  ? 'border-[#e17624] shadow-2xl scale-105'
                  : 'border-gray-200 shadow-md'
                  }`}
              >
                {plan.popular && (
                  <div className="bg-[#e17624] text-white px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-[#a33013]">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#2cc75c] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl transition-colors ${plan.popular
                    ? 'bg-[#e17624] text-white hover:bg-[#c96520]'
                    : 'bg-gray-100 text-[#a33013] hover:bg-gray-200'
                    }`}
                >
                  Start Free Trial
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#a33013] to-[#e17624]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="mb-4 text-white">Ready to Start the Adventure?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of families making cultural learning fun and engaging
          </p>
          <button
            onClick={() => navigate('/student-dashboard')}
            className="bg-white text-[#a33013] px-10 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}
