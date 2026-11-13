import { FormEvent, useState } from 'react';
import { Check, ChevronDown, Clock, Mail, MapPin } from 'lucide-react';

const FAQS = [
  {
    question: 'How do I pitch a visual essay or architectural story?',
    answer:
      'Send a 200-word outline along with 4–6 sample photographs or sketches using the form above and select "Editorial Pitch". Our editors review pitches every Monday.',
  },
  {
    question: 'What does a free Vesper reader account include?',
    answer:
      'Creating an account lets you bookmark essays across sessions, build a personal reading list, and receive our weekly Sunday Letter.',
  },
  {
    question: 'Can I request print syndication or photography licensing?',
    answer:
      'Yes. Choose "Press & Syndication" in the inquiry topic menu and include your publication name and intended print run.',
  },
];

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Editorial Pitch');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }
    if (message.trim().length < 15) {
      setError('Please write a message of at least 15 characters.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setTopic('Editorial Pitch');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-12 pb-20">
      <header className="max-w-3xl space-y-3 pb-12 border-b border-[#E4E0D8]">
        <p className="text-xs font-medium text-[#9A5B32]">Correspondence</p>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#111110]">
          Editorial &amp; Studio Inquiries
        </h1>
        <p className="text-base text-[#66635E] leading-relaxed">
          Commissioning pitches, studio visits, print archive requests, and general press
          correspondence are welcomed by our editors across Copenhagen, Lisbon, and Kyoto.
        </p>
      </header>

      <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Column: Deep Obsidian Studio Directory */}
        <aside className="lg:col-span-5 bg-[#111110] text-[#FAF9F7] rounded-xl p-8 sm:p-10 flex flex-col justify-between space-y-8">
          <div className="divide-y divide-[#2B2A27]">
            <div className="pb-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#D49A74]">
                <Mail className="w-4 h-4" />
                <span>Editorial Desk</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-[#FAF9F7]">
                Submissions &amp; Press
              </h2>
              <p className="text-sm text-[#A39F98] leading-relaxed">
                Send photography essays, monograph proposals, or review inquiries directly to{' '}
                <span className="text-[#FAF9F7]">desk@vesperjournal.com</span>.
              </p>
            </div>

            <div className="py-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#D49A74]">
                <MapPin className="w-4 h-4" />
                <span>Studios</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-[#FAF9F7]">
                Copenhagen · Lisbon · Kyoto
              </h2>
              <p className="text-sm text-[#A39F98] leading-relaxed">
                Bredgade 45, 1260 København K, Denmark
                <br />
                Rua da Boavista 84, 1200-068 Lisboa, Portugal
              </p>
            </div>

            <div className="pt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#D49A74]">
                <Clock className="w-4 h-4" />
                <span>Office Hours</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-[#FAF9F7]">
                Response Window
              </h2>
              <p className="text-sm text-[#A39F98] leading-relaxed">
                Monday through Friday, 09:00 – 17:30 CET. Typical reply within two business days.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#2B2A27] text-xs text-[#8A867F]">
            Issue No. 14 · Print &amp; Digital Syndication
          </div>
        </aside>

        {/* Right Column: Gallery-White Inquiry Form */}
        <section className="lg:col-span-7 bg-white border border-[#E4E0D8] rounded-xl p-8 sm:p-12">
          {submitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-[#111110] text-[#FAF9F7] flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="font-serif text-3xl font-normal text-[#111110]">
                  Correspondence Received
                </h2>
                <p className="text-sm text-[#66635E] leading-relaxed">
                  Thank you, <span className="font-medium text-[#111110]">{name}</span>. Your note
                  regarding <span className="font-medium text-[#111110]">{topic}</span> has been
                  routed to our editorial desk. We will reply to{' '}
                  <span className="font-medium text-[#111110]">{email}</span> shortly.
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 text-xs font-medium text-[#111110] border border-[#D4CFC7] rounded-md hover:bg-[#F2EFE9] transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="font-serif text-3xl font-normal text-[#111110]">
                  Send a Note
                </h2>
                <p className="text-sm text-[#66635E]">
                  Complete the fields below and an editor will follow up directly.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="px-4 py-3 text-xs font-medium text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] rounded-md"
                >
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[#111110]">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Clara Lindqvist"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#D4CFC7] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[#111110]">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="clara@studio.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#D4CFC7] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-topic" className="block text-xs font-medium text-[#111110]">
                  Inquiry Topic
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#D4CFC7] rounded-md text-[#111110] focus:outline-none focus:border-[#111110]"
                >
                  <option value="Editorial Pitch">Editorial Pitch</option>
                  <option value="Print & Archive Subscriptions">Print &amp; Archive Subscriptions</option>
                  <option value="Studio Collaborations">Studio Collaborations</option>
                  <option value="Press & Syndication">Press &amp; Syndication</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-medium text-[#111110]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about your story, question, or studio project..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#D4CFC7] rounded-md text-[#111110] placeholder:text-[#8A867F] focus:outline-none focus:border-[#111110] resize-y"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-medium text-[#FAF9F7] bg-[#111110] rounded-md hover:bg-[#2C2A27] transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </section>
      </div>

      {/* Editorial FAQ Accordion */}
      <section className="mt-16 pt-14 border-t border-[#E4E0D8] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 space-y-2">
          <p className="text-xs font-medium text-[#9A5B32]">Common Questions</p>
          <h2 className="font-serif text-3xl font-normal text-[#111110]">
            Submission &amp; Press Guide
          </h2>
          <p className="text-sm text-[#66635E] leading-relaxed">
            Quick answers before you write to our editorial team.
          </p>
        </div>

        <div className="lg:col-span-8 divide-y divide-[#E4E0D8] border-y border-[#E4E0D8]">
          {FAQS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={item.question} className="py-5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="font-serif text-xl font-normal text-[#111110]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#66635E] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pt-3 text-sm text-[#66635E] leading-relaxed max-w-2xl">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
