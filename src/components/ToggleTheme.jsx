import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import ReactSwitch from 'react-switch'

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    // <button onClick={toggleTheme} className="theme-toggle moon">
    //   {/* {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'} */}
    //   <MoonIcon width={20} />
    // </button>
    <ReactSwitch
      onChange ={toggleTheme} 
      checked ={theme==="dark"} 
      offColor='#1e1e34' 
      onColor='#fff'
      onHandleColor='#1dbbc3'
      offHandleColor='#fff'
      uncheckedHandleIcon={<MoonIcon color='#1e1e34 ' />}
      checkedHandleIcon={<SunIcon color='#fff' />}
      uncheckedIcon = {false}
    />
  );
}

export default ToggleTheme;
