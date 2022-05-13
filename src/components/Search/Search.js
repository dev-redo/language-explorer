import { fetchLanguages } from '../../utils/req.js';
import SearchInput from './SearchInput.js';
import Suggestion from './Suggestion.js';
import SelectedLanguage from './SelectedLanguages.js';

const prevState = JSON.parse(window.localStorage.getItem('state'));

export default function Search({ $target }) {
  this.state = prevState ?? {
    keyword: '',
    isFocus: true,
    fetchedLanguages: [],
    selectedLanguages: [],
  };
  this.state.isFocus = true;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    window.localStorage.setItem('state', JSON.stringify(this.state));
    suggestion.setState({
      selectedIndex: 0,
      isFocus: this.state.isFocus,
      keyword: this.state.keyword,
      items: this.state.fetchedLanguages,
    });
    selectedLanguages.setState(this.state.selectedLanguages);
  };

  const selectedLanguages = new SelectedLanguage({
    $target,
    initialState: this.state.selectedLanguages,
  });

  const searchInput = new SearchInput({
    $target,
    initialState: this.state.keyword,
    onChange: async (keyword) => {
      this.state.keyword = keyword;
      window.localStorage.setItem('keyword', keyword);
      if (keyword.length === 0) {
        this.setState({
          fetchedLanguages: [],
        });
      } else {
        const langages = await fetchLanguages(keyword);
        this.setState({
          fetchedLanguages: langages,
        });
      }
    },
    onFocus: () => {
      this.setState({
        isFocus: true,
      });
    },
    onFocusOut: () => {
      this.setState({
        isFocus: false,
      });
    },
  });
  const suggestion = new Suggestion({
    $target,
    initialState: {
      selectedIndex: 0,
      keyword: this.state.keyword,
      items: this.state.fetchedLanguages,
      isFocus: this.state.isFocus,
    },
    onSelect: (langage) => {
      alert(langage);

      const nextSelectedLanguages = [...this.state.selectedLanguages];
      const index = nextSelectedLanguages.findIndex(
        (selectedLanguage) => selectedLanguage === langage,
      );
      if (index > -1) {
        nextSelectedLanguages.splice(index, 1);
      }
      nextSelectedLanguages.push(langage);

      this.setState({
        ...this.state,
        selectedLanguages: nextSelectedLanguages,
      });
    },
  });
}
