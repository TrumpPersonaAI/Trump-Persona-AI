import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FAQ } from '../types';

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map(faq => (
        <div
          key={faq.id}
          className="border rounded-lg bg-white overflow-hidden"
        >
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <span className="font-semibold">{faq.question}</span>
            {openId === faq.id ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openId === faq.id && (
            <div className="px-6 py-4 bg-gray-50 border-t">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}