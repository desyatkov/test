import dayjs from 'dayjs';

const monthFormat = 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split(
  '_',
);
const monthStandalone = 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
  '_',
);

const monthShortFormat = 'янв_февр_мар_апр_мая_июня_июля_авг_сент_окт_нояб_дек'.split('_');
const monthShortStandalone = 'янв_февр_март_апр_май_июнь_июль_авг_сент_окт_нояб_дек'.split('_');

const MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
const locale = {
  name: 'ru',
  weekdays: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
  weekdaysShort: 'вск_пнд_втр_срд_чтв_птн_сбт'.split('_'),
  weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
  months: (dayjsInstance, format) => {
    if (MONTHS_IN_FORMAT.test(format)) {
      return monthFormat[dayjsInstance.month()];
    }
    return monthStandalone[dayjsInstance.month()];
  },
  monthsShort: (dayjsInstance, format) => {
    if (MONTHS_IN_FORMAT.test(format)) {
      return monthShortFormat[dayjsInstance.month()];
    }
    return monthShortStandalone[dayjsInstance.month()];
  },
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY г.',
    LLL: 'D MMMM YYYY г., H:mm',
    LLLL: 'dddd, D MMMM YYYY г., H:mm',
  },
  relativeTime: {
    future: 'через %s',
    past: '%s назад',
    s: 'несколько секунд',
    m: 'минута',
    mm: '%d минут',
    h: 'час',
    hh: '%d часов',
    d: 'день',
    dd: '%d дней',
    M: 'месяц',
    MM: '%d месяцев',
    y: 'год',
    yy: '%d лет',
  },
  ordinal: n => n,
};

dayjs.locale(locale, null, true);

export default locale;
