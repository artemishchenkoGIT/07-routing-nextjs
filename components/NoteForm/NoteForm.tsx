import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import css from './NoteForm.module.css';
import type { NoteTag } from '@/types/note';
import { NoteSchema } from '@/schemas/NoteSchema';
import { useMutationNotes } from '@/hooks/useMutationNotes';
import { createNote } from '@/lib/api';

interface NoteFormProps {
  onClose: () => void;
}

interface CreateNoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialValues: CreateNoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();

  const createNoteMutation = useMutationNotes(
    createNote,
    'created successfully',
    onClose
  );

  const handleSubmit = (
    values: CreateNoteFormValues,
    actions: FormikHelpers<CreateNoteFormValues>
  ) => {
    createNoteMutation.mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            name="content"
            id={`${fieldId}-content`}
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={createNoteMutation.isPending}
          >
            {createNoteMutation.isPending ? 'Creating note...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;
