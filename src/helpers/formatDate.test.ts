import { describe, it, expect } from 'vitest';
import { formatDate, formatDateTime } from './formatDate';

const TIMESTAMP = new Date('2024-03-15T14:30:00').getTime();

describe('formatDate', () => {
  it('повертає "—" для нульового timestamp', () => {
    expect(formatDate(0)).toBe('—');
  });

  it('форматує дату у вигляді дд.мм.рррр', () => {
    const result = formatDate(TIMESTAMP);
    expect(result).toMatch(/15\.03\.2024/);
  });

  it('не містить часу', () => {
    const result = formatDate(TIMESTAMP);
    expect(result).not.toMatch(/\d{2}:\d{2}/);
  });
});

describe('formatDateTime', () => {
  it('повертає "—" для нульового timestamp', () => {
    expect(formatDateTime(0)).toBe('—');
  });

  it('форматує дату', () => {
    const result = formatDateTime(TIMESTAMP);
    expect(result).toMatch(/15\.03\.2024/);
  });

  it('містить час', () => {
    const result = formatDateTime(TIMESTAMP);
    expect(result).toMatch(/\d{2}:\d{2}/);
  });
});
