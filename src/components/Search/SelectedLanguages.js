const MAX_DISPLAY_COUNT = 5;

export default function SelectedLanguage({ $target, initialState }) {
  this.$element = document.createElement('div');
  this.$element.className = 'SelectedLanguage';
  this.state = initialState;

  $target.appendChild(this.$element);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const startPosition = this.state.length - MAX_DISPLAY_COUNT;
    const items = this.state.slice(startPosition, MAX_DISPLAY_COUNT + startPosition);
    this.$element.innerHTML = `
            <ul>
                ${items.map((item) => `<li>${item}</li>`).join('')}
            </ul>
        `;
  };

  this.render();
}
