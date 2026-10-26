import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export const FaqSection: React.FC = () => {
  // Notice: In the reference image, "How much will a Memo cost?" is open by default!
  const [openId, setOpenId] = useState<string | null>('cost');

  const faqs: FaqItem[] = [
    {
      id: 'what-can-memo-do',
      question: 'What can Memo do?',
      answer:
        'Memo is designed for real-world domestic chores. Today, Memo clears dining tables, loads dishwashers, sorts clutter and children’s toys, folds piles of laundry, and prepares espresso on standard machines. Its onboard neural network downloads new skills over-the-air each month.'
    },
    {
      id: 'purchase',
      question: 'Is Memo available for purchase?',
      answer:
        'Memo is currently restricted to private deployment in our Founding Family homes and Beta research households. Public reservations and commercial delivery are scheduled for late 2026.'
    },
    {
      id: 'cost',
      question: 'How much will a Memo cost?',
      answer: (
        <div className="space-y-3">
          <p>
            Building a single Memo today — by hand, with custom components and no economies of scale — costs approximately $120,000.
          </p>
          <p>
            We don’t expect that to be the retail price. Large-scale manufacturing in our next phase will meaningfully reduce costs by at least 50%, and exact pricing will be announced closer to launch.
          </p>
        </div>
      )
    },
    {
      id: 'size-speed',
      question: 'How big is Memo? How fast can Memo move?',
      answer:
        'Memo stands 125cm (4’1”) tall, with an ultra-slim footprint designed to pass seamlessly through 70cm residential doorways. Its velocity is bounded to human walking speeds (up to 1.2 m/s), slowing down automatically around children and pets.'
    },
    {
      id: 'safety',
      question: 'Is Memo safe?',
      answer:
        'Safety is our governing physical constraint. Memo features compliant force-feedback joints that stop immediately when touching any obstacle, rounded soft-touch outer chassis bumpers, and zero cloud streaming of in-home video feeds.'
    },
    {
      id: 'beta',
      question: 'What is the Sunday Beta program?',
      answer:
        'The Sunday Beta program grants select homes early access to Memo units ahead of commercial rollout. Families collaborate directly with Sunday robotics engineers to test and validate new chore routines.'
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="showcase" className="w-full pb-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      <div id="faq" className="sr-only scroll-mt-20 sm:scroll-mt-24" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Title */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xs sm:text-sm font-medium text-neutral-500 tracking-wide">
              Frequently asked questions
            </h3>
          </motion.div>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:col-span-8 divide-y divide-neutral-200">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="py-5"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full items-center justify-between text-left text-sm sm:text-base font-medium text-neutral-900 hover:text-neutral-600 transition-colors py-1 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-neutral-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-neutral-900' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
