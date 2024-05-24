import { debounce } from 'lodash';

const globalDebouncedClick = debounce((func) => {
  func();
}, 1000);

export default globalDebouncedClick;
