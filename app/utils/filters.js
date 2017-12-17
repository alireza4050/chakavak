import defaultAvatar from '../assets/img/default_avatar.svg';
import defaultCover from '../assets/img/default_cover.png';

const farsiNum = () => num => num.toLocaleString('fa-IR');

const shamsiDate = () => (timestamp) => {
  if (!isNaN(timestamp)) timestamp *= 1000; // eslint-disable-line no-restricted-globals
  const options = {
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(timestamp).toLocaleDateString('fa-IR-u-ca-persian', options);
};

const imgSrc = (file) => {
  if (file && file.id && file.filename) {
    const { id, filename } = file;
    return `/api/image/${id}/${filename}`;
  }
  return undefined;
};

const avatarSrc = () =>
  ({ avatar }) => imgSrc(avatar) || defaultAvatar;

const coverSrc = () =>
  ({ cover }) => imgSrc(cover) || defaultCover;

export default [
  ['farsiNum', farsiNum],
  ['shamsiDate', shamsiDate],
  ['imgSrc', () => imgSrc],
  ['avatar', avatarSrc],
  ['cover', coverSrc],
];
