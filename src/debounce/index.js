import { debounce } from 'lodash';

const globalDebouncedClick = debounce((func) => {
  func();
}, 800);

export default globalDebouncedClick;
