import { render, screen } from '@testing-library/react';
import MoodHistory from './MoodHistory';

test('shows empty state when no entries exist', () => {
  render(<MoodHistory entries={[]} />);
  expect(screen.getByText(/no entries yet/i)).toBeInTheDocument();
});

test('renders an entry', () => {
  render(
    <MoodHistory
      entries={[
        { id: '1', mood_value: 'happy', mood_score: 2, entry_text: 'Good day' }
      ]}
    />
  );

  expect(screen.getByText(/good day/i)).toBeInTheDocument();
});
