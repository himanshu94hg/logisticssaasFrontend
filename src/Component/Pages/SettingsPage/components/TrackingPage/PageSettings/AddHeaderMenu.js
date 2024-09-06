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
                            name="name"
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
                        <button className='btn main-button' type="button" onClick={() => deleteMenu(index)}>
                            Delete
                        </button>
                    }
                </div>
            ))}
            <button type="button" onClick={addMenu} className="btn main-button">
                Add More
            </button>
        </div>
    );
};

export default AddHeaderMenu;
