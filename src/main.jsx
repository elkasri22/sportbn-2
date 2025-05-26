
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './index.css';
import ShowPopupAdblock from "./components/Popups/adblock/component.jsx";
import AppLogicHook from './hooks/App/AppLogicHook.js';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const WarperApp = () => {

    const { loading } = AppLogicHook();

    return (
        <>
            <ShowPopupAdblock />
            <App />
        </>
    )
}

createRoot(document.getElementById("root")).render(<Provider store={store}>
    <WarperApp />
</Provider>);
