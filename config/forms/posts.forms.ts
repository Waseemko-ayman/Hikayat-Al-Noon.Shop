export const CreatePostsFields = [
  {
    id: 1,
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Enter post title',
  },
  {
    id: 2,
    name: 'category',
    label: 'Category',
    type: 'select',
    placeholder: 'e.g. Outfit Ideas',
  },
  {
    id: 3,
    name: 'date',
    label: 'Date',
    type: 'date',
    placeholder: 'Apr 25, 2026',
  },
  {
    id: 4,
    name: 'excerpt',
    label: 'Excerpt',
    type: 'textarea',
    placeholder: 'Enter short description',
  },
  {
    id: 5,
    name: 'body',
    label: 'Body',
    type: 'textarea',
    placeholder: 'Enter post content',
  },
  {
    id: 6,
    name: 'image',
    label: 'Image',
    type: 'file',
  },
  {
    id: 7,
    name: 'is_featured',
    label: "Featured Post (Editor's Pick)",
    type: 'checkbox',
  },
];
