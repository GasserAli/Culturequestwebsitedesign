import { Sparkles, BookOpen, Trophy, Users, Star, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { LandingNavigation } from './LandingNavigation';
import { LoginModal } from './LoginModal';
import { OnboardingModal } from './OnboardingModal';
import { useState } from 'react';

export function LandingPage() {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const features = [
    {
      icon: BookOpen,
      title: 'Cultural Immersion',
      description: 'Explore Egyptian history, art, language, and daily life through interactive multimedia lessons',
    },
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Earn coins, complete quests, and unlock achievements as you discover Egyptian civilization',
    },
    {
      icon: Users,
      title: 'Parent Dashboard',
      description: 'Track progress, view analytics, and support your child\'s learning journey',
    },
    {
      icon: Sparkles,
      title: 'Egyptian Artifacts',
      description: 'Collect virtual artifacts and customize your avatar with authentic Egyptian-inspired items',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Parent of 8-year-old',
      content: 'My daughter is obsessed! She can now read basic hieroglyphics and knows more about Egyptian culture than I ever did.',
      rating: 5,
    },
    {
      name: 'James T.',
      role: 'Parent of 10-year-old',
      content: 'The multi-faceted approach is brilliant. My son loves learning about pyramids, pharaohs, and daily Egyptian life!',
      rating: 5,
    },
    {
      name: 'Emily R.',
      role: 'Homeschool Mom',
      content: 'Perfect for our curriculum. My kids are learning Egyptian art, religion, and architecture in such an engaging way.',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Explorer',
      price: 9.99,
      features: [
        'Access to Egyptian History unit',
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
        'All 5 Egyptian culture units',
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
      <LandingNavigation
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenOnboardingModal={() => setIsOnboardingModalOpen(true)}
      />

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-[#fff5ef] to-[#ffe8d6] py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-[#2cc75c] text-white px-4 py-2 rounded-full mb-6">
              🎓 Trusted by 10,000+ families
            </div>
            <h1 className="mb-6">Discover Egyptian Culture Through Interactive Learning</h1>
            <p className="text-xl mb-8 text-gray-700">
              CultureQuest brings Egyptian civilization to life through comprehensive exploration of its
              history, art, language, daily life, religion, and architecture—all in one engaging platform.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsOnboardingModalOpen(true)}
                className="bg-[#2cc75c] text-black text-lg px-8 py-4 rounded-xl hover:bg-[#25b350] transition-colors shadow-lg"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-white text-[#a33013] text-lg px-8 py-4 rounded-xl hover:bg-[#e17624] hover:text-white transition-colors border-2 border-[#e17624]"
              >
                Log in
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
            <p className="text-xl text-gray-600">A comprehensive journey through Egyptian culture's many fascinating dimensions</p>
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

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-br from-[#fff5ef] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">About CultureQuest</h2>
            <p className="text-xl text-gray-600">Bringing Egyptian culture to life through comprehensive, multi-dimensional learning</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="mb-4 text-[#a33013]">Our Mission</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                At CultureQuest, we believe that understanding Egyptian culture requires exploring its many
                interconnected aspects. Founded by Egyptologists, educators, and game designers, we've created
                a platform that teaches history, art, language, religion, architecture, and daily life as one cohesive experience.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our multi-dimensional approach helps children aged 7-12 see Egyptian civilization as a living,
                breathing culture—not just dates and facts. From decoding hieroglyphics to understanding pyramid
                construction, every aspect connects to create a complete picture.
              </p>
              <div className="flex gap-4 mt-6">
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow flex-1">
                  <div className="text-3xl font-bold text-[#e17624] mb-1">10,000+</div>
                  <div className="text-sm text-gray-600">Active Students</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow flex-1">
                  <div className="text-3xl font-bold text-[#e17624] mb-1">95%</div>
                  <div className="text-sm text-gray-600">Parent Satisfaction</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow flex-1">
                  <div className="text-3xl font-bold text-[#e17624] mb-1">50+</div>
                  <div className="text-sm text-gray-600">Interactive Lessons</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#2cc75c] rounded-full opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbGVhcm5pbmclMjBleGNpdGVkfGVufDF8fHx8MTc2MzgxNjIzOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Kids learning with excitement"
                className="rounded-2xl shadow-xl relative z-10 w-full h-[400px] object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#e17624] rounded-full opacity-20"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NjM4MTYyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Our team collaborating"
                className="rounded-2xl shadow-xl relative z-10 w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="mb-4 text-[#a33013]">Our Team</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                CultureQuest was born from a collaboration between Egyptologists, experienced educators,
                linguists, art historians, and game designers. Our diverse team brings together deep knowledge
                of Egyptian culture with expertise in interactive learning and child development.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We're passionate about showing the richness of Egyptian civilization through its art, language,
                architecture, religion, and daily life. Every lesson connects these aspects to help children
                understand how Egyptians lived, thought, and created one of history's greatest civilizations.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2cc75c] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-800">Evidence-Based Learning</div>
                    <div className="text-sm text-gray-600">Curriculum aligned with educational standards</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2cc75c] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-800">Child-Centered Design</div>
                    <div className="text-sm text-gray-600">Built with input from kids and parents</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#2cc75c] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-800">Continuous Innovation</div>
                    <div className="text-sm text-gray-600">Regular updates with new content and features</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-white">
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
      <section id="pricing" className="py-20 px-6">
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
                onClick={() => setIsOnboardingModalOpen(true)}
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
      <section className="py-20 px-6">
        <div className="max-w-7xl p-12 rounded-2xl mx-auto text-center text-white bg-gradient-to-r from-[#a33013] to-[#e17624]">
          <h2 className="mb-4 text-[#e17624]  ">Ready to Explore Egyptian Culture?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of families discovering the rich tapestry of Egyptian civilization
          </p>
          <button
            onClick={() => setIsOnboardingModalOpen(true)}
            className="bg-white text-[#a33013] px-10 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenSignup={() => setIsOnboardingModalOpen(true)}
      />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
      />
    </div>
  );
}
