export default function Suggestion({ $target, initialState, onSelect }) {
  this.$element = document.createElement('div');
  $target.appendChild(this.$element);

  this.state = {
    selectedIndex: 0,
    keyword: initialState.keyword,
    items: initialState.items,
    isFocus: initialState.isFocus,
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.renderMatchedItem = (keyword, item) => {
    if (!item.includes(keyword)) {
      return item;
    }
    const matchedText = item.match(new RegExp(keyword, 'gi'));
    return item.replace(
      new RegExp(matchedText),
      `<span class="Suggestion__item--matched">${matchedText}</span>`,
    );
  };

  this.render = () => {
    const { keyword, items, selectedIndex, isFocus } = this.state;
    this.$element.className = `Suggestion ${isFocus ? 'focus' : ''}`;
    if (items.length > 0 && isFocus) {
      this.$element.style.display = 'block';
      this.$element.innerHTML = `
              <ul>
                  ${items
                    .map(
                      (items, idx) => `
                      <li 
                        class="${idx === selectedIndex ? 'Suggestion__item--selected' : ''}"
                        data-index="${idx}"
                      >
                          ${this.renderMatchedItem(keyword, items)}
                      </li>
                  `,
                    )
                    .join('')}
              </ul>
          `;
    } else {
      this.$element.style.display = 'none';
      this.$element.innerHTML = '';
    }
  };
  this.render();

  window.addEventListener('keyup', (e) => {
    if (this.state.items.length > 0) {
      const { selectedIndex } = this.state;
      const navigationKeys = ['ArrowUp', 'ArrowDown'];

      const lastIndex = this.state.items.length - 1;
      let nextIndex = selectedIndex;

      if (navigationKeys.includes(e.key)) {
        if (e.key === 'ArrowUp') {
          nextIndex = selectedIndex === 0 ? lastIndex : nextIndex - 1;
        }
        if (e.key === 'ArrowDown') {
          nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1;
        }
        this.setState({
          ...this.state,
          selectedIndex: nextIndex,
        });
      }

      if (e.key === 'Enter') {
        onSelect(this.state.items[this.state.selectedIndex]);
      }
    }
  });

  this.$element.addEventListener('mousedown', (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const { index } = $li.dataset;
      try {
        onSelect(this.state.items[parseInt(index)]);
      } catch (e) {
        alert('무언가 잘못되었습니다! 선택할 수 없습니다!');
      }
    }
  });
}
