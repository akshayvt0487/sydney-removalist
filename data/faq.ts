export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How much do removalist services cost in Sydney?",
    answer: "Our rates vary depending on factors like the size of your home, distance, amount of items, and any additional services required. We provide free, no-obligation quotes to give you an accurate estimate tailored to your specific move. Contact us today to get your personalized quote."
  },
  {
    id: 2,
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 2-3 weeks in advance, especially during peak moving season (November to February) and at month-ends. However, we often accommodate last-minute moves and same-week bookings based on availability."
  },
  {
    id: 3,
    question: "Do you work on weekends and public holidays?",
    answer: "Yes, we operate 7 days a week including weekends and most public holidays. Please note that a small surcharge may apply to weekend and holiday moves. Contact us for a quote."
  },
  {
    id: 4,
    question: "Are my belongings insured during the move?",
    answer: "Yes, all our moves include basic transit insurance at no extra cost. This covers loss or damage during transportation. We also offer comprehensive insurance packages for additional peace of mind."
  },
  {
    id: 5,
    question: "Do you provide packing services and materials?",
    answer: "Yes, we offer complete packing services with professional packers. We also supply all necessary packing materials including boxes, bubble wrap, tape, and furniture blankets. You can choose full packing, partial packing, or purchase materials for DIY packing."
  },
  {
    id: 6,
    question: "What items can't you move?",
    answer: "For safety and legal reasons, we cannot transport hazardous materials including flammable liquids, gases, explosives, corrosives, and toxic substances. We also don't move perishable foods, plants, or pets. Contact us if you're unsure about specific items."
  },
  {
    id: 7,
    question: "Do you disassemble and reassemble furniture?",
    answer: "Yes, furniture disassembly and reassembly are included in our service. Our team has the experience and tools to safely dismantle and rebuild beds, wardrobes, tables, and other furniture items."
  },
  {
    id: 8,
    question: "What if my move takes longer than expected?",
    answer: "You only pay for the time we actually work. If a move takes longer than estimated, we charge the additional time at the agreed rate (in 30-minute increments). We always aim for accuracy in our quotes and work efficiently to stay within the estimated timeframe."
  },
  {
    id: 9,
    question: "Do you offer storage solutions?",
    answer: "Yes, we provide secure short-term and long-term storage options in our climate-controlled facilities. Storage is ideal if there's a gap between moving out and moving in, or if you need to store items long-term."
  },
  {
    id: 10,
    question: "What is your cancellation policy?",
    answer: "We understand plans can change. If you need to cancel or reschedule, please give us at least 48 hours notice to avoid cancellation fees. Cancellations with less than 48 hours notice may incur a 25% charge. Same-day cancellations are charged at 50%."
  },
  {
    id: 11,
    question: "How do I prepare for moving day?",
    answer: "We recommend: booking parking spaces if needed, protecting floors and walls, disconnecting appliances, emptying cupboards if we're not packing, preparing a box of essentials for your first day, and being present on moving day to answer questions."
  },
  {
    id: 12,
    question: "Do you move pianos and heavy items?",
    answer: "Yes, we specialize in moving pianos, pool tables, safes, and other heavy or delicate items. These require special equipment and expertise, so additional charges apply. Let us know about any special items when requesting a quote."
  }
];

export const faqCategories = {
  general: [1, 2, 3, 11],
  pricing: [1, 8, 10],
  services: [5, 7, 9, 12],
  insurance: [4, 6]
};