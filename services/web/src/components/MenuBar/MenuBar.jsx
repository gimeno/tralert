import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, MenuItem, Menu } from '@material-ui/core';

function MenuBar({ menuId, menuItems, anchorEl, handleMenuClose }) {
    const isMenuOpen = Boolean(anchorEl);

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {menuItems.map((menuItem, index) => {
                if (Object.prototype.hasOwnProperty.call(menuItem, 'condition') && !menuItem.condition) {
                    return null;
                }

                let component = null;
                if (menuItem.to) {
                    component = (
                        <MenuItem key={index} component={Link} to={menuItem.to} onClick={handleMenuClose}>
                            {menuItem.icon}
                            {menuItem.name}
                        </MenuItem>
                    );
                } else {
                    component = (
                        <MenuItem
                            key={index}
                            onClick={() => {
                                handleMenuClose();
                                menuItem.onClick();
                            }}
                        >
                            {menuItem.icon}
                            {menuItem.name}
                        </MenuItem>
                    );
                }

                if (menuItem.divide) {
                    return (
                        <span key={index}>
                            <Divider />
                            {component}
                        </span>
                    );
                }

                return component;
            })}
        </Menu>
    );
}

export default MenuBar;
