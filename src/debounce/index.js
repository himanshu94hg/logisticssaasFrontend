import { debounce } from 'lodash';

const globalDebouncedClick = debounce((func) => {
  func();
}, 300);

export default globalDebouncedClick;
