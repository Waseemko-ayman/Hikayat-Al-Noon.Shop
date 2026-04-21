export const CreateFAQFields = [
  {
    id: 1,
    name: 'question',
    label: 'Question',
    placeholder: 'Enter question',
    type: 'text',
  },
  {
    id: 2,
    name: 'category',
    label: 'Category',
    placeholder: 'Select category',
    type: 'select',
    options: [
      { id: 'orders', name: 'Orders' },
      { id: 'payments', name: 'Payments' },
      { id: 'shipping', name: 'Shipping' },
      { id: 'returns', name: 'Returns & Refunds' },
      { id: 'general', name: 'General' },
    ],
  },
  {
    id: 3,
    name: 'answer',
    label: 'Answer',
    placeholder: 'Enter answer',
    type: 'textarea',
  },
];
