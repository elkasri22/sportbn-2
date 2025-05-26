import "./style.css";
import { useState } from 'react'
import { Dialog } from 'primereact/dialog';

const Loader = () => {
    const [visible, setVisible] = useState(true);

    return (

        <Dialog visible={visible} className="loader"

            style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
            </div>
        </Dialog>

    );
};

export default Loader;