import { render, screen } from '@testing-library/react';
import MoodCalendar from './MoodCalendar';

test('renders weekday headers', () => {
  render(<MoodCalendar entriesByDay={{}} />);
  expect(screen.getByText('Mon')).toBeInTheDocument();
  expect(screen.getByText('Fri')).toBeInTheDocument();
});
