export default function SearchInput({ $target, initialState, onChange, onFocus, onFocusOut }) {
  this.$element = document.createElement('form');
  this.$element.className = 'SearchInput';
  this.state = initialState;
  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
    <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state}">
    `;
  };
  this.render();

  this.$input = this.$element.querySelector('input');
  this.$input.focus();

  this.$input.addEventListener('focus', (e) => {
    onFocus();
  });
  this.$input.addEventListener('focusout', (e) => {
    onFocusOut();
  });

  this.$element.addEventListener('keyup', (e) => {
    const actionIgnoreKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    let timer;
    if (!actionIgnoreKeys.includes(e.key)) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        onChange(e.target.value);
      }, 200);
    }
  });

  this.$element.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}
