import { render, screen, fireEvent } from '@testing-library/react';
import MoodEntryForm from './MoodEntryForm';

test('does not submit without selecting a mood', () => {
  const onSave = jest.fn();
  render(<MoodEntryForm onSave={onSave} />);

  fireEvent.click(screen.getByText(/save entry/i));
  expect(onSave).not.toHaveBeenCalled();
});

test('submits when mood is selected', () => {
  const onSave = jest.fn();
  render(<MoodEntryForm onSave={onSave} />);

  // simulate mood selection
  fireEvent.click(screen.getByText('Happy'));
  fireEvent.click(screen.getByText(/save entry/i));

  expect(onSave).toHaveBeenCalledTimes(1);
});
