import { useState, createContext } from 'react';
import lang from '../utils/localize_data';

const LangContext = createContext();
const { Provider } = LangContext;

const LangProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = () => {
    console.log('click');
    let val = '';
    if (language === 'en') {
      val = 'mm';
    } else {
      val = 'en';
    }
    lang.setLanguage(val);
    setLanguage(val);
  };

  return (
    <Provider
      value={{
        lang,
        language,
        handleLanguageChange,
      }}
    >
      {children}
    </Provider>
  );
};

export { LangContext, LangProvider };
