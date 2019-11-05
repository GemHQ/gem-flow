import dateformat from 'dateformat';

export const formatDate = rawDateString => {
  const date = new Date(rawDateString);
  return dateformat(date, 'mmm dd, yyyy H:MM');
}