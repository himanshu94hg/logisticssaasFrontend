import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const AddHeaderMenu = ({ menus, handleMenuChange, addMenu, deleteMenu }) => {
    return (
        <div className="customization-form">
            {menus.map((menu, index) => (
                <div key={index} className="menu-item">
                    <label>
                        Menu Name:
                        <input
                            className='input-field'
                            type="text"
                            name="title"
                            value={menu.name}
                            onChange={(e) => handleMenuChange(index, e)}
                        />
                    </label>
                    <label>
                        Menu Link:
                        <input
                            className='input-field'
                            type="text"
                            name="link"
                            value={menu.link}
                            onChange={(e) => handleMenuChange(index, e)}
                        />
                    </label>
                    {
                        menus.length > 1 &&
                        <div style={{ maxWidth: '36px' }}>
                            <button className='btn' type="button" onClick={() => deleteMenu(index)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    }
                </div>
            ))}
            <div>
                <button type="button" onClick={addMenu} className="btn main-button float-end">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};

export default AddHeaderMenu;
