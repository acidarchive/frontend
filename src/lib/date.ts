import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatRelativeTime = (date: string | Date) => {
  return dayjs(date).fromNow();
};
