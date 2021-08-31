// a : 'کاملاً رسمی'
// b : 'رسمی'
// i : 'غیر رسمی'
// t : 'تیتر'
// o : 'گرد'
// f : 'فانتزی'
// h : 'دست‌خط'
// p : 'پیکسلی'
// s : 'خاص'
// d : 'عربی'
// e : 'انگلیسی'
// y : 'زبان‌های دیگه'
// w : 'فونت‌های سیستمی'
// r : 'حذفی'
// u : 'نامشخص'

const GROUP_NAMES = {
    a: 'serif',
    b: 'sans-serif',
    i: 'informal',
    t: 'title',
    o: 'rounded',
    f: 'fantasy',
    h: 'handwriting',
    p: 'pixel',
    s: 'special',
    d: 'arabic',
    e: 'english',
    y: 'other languages',
    w: 'windows',
    r: 'remove',
    u: 'unknown'
};

const EXCLUDE = ['2  Yekan', 'A Hana', 'Mohammad RasoolAllah', 'Nafees Web Naskh', 'Noor_e_Quran'];
const INCLUDE = ['A Armita Black'];
const FONT_TYPE_FILTERS = /(italic|bold|black|heavy|medium|light|narrow|thin|condensed|semicondensed|extbd|extlt|med|sembd)/i;

const SAMPLE_TEXT = `بیا!
بوی عطرت را
بر روی شانه‌ام
فراموش کرده‌ام`;

export default {
    GROUP_NAMES,
    EXCLUDE,
    INCLUDE,
    FONT_TYPE_FILTERS,
    SAMPLE_TEXT
};
