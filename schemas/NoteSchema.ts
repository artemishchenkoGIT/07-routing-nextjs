import * as yup from 'yup';

export const NoteSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Title must be at least 2 characters')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: yup
    .string()
    .min(20, 'Content must be at least 20 characters')
    .max(500, 'Content is too long')
    .required('Content is required'),
  tag: yup
    .string()
    .required('Choose a tag')
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Unknown tag'),
});
