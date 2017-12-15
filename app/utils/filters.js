import defaultAvatar from '../assets/img/default_avatar.svg';
import defaultCover from '../assets/img/default_cover.png';

const farsiNum = () => num => num.toLocaleString('fa-IR');

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
  ['imgSrc', () => imgSrc],
  ['avatar', avatarSrc],
  ['cover', coverSrc],
];
