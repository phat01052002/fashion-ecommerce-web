import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import { filterSpecialInput } from '../../../untils/Logic';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { async } from '@firebase/util';
import Hot from './Hot';
import Suggestion from './Suggestion';
interface DrawerCartProps {
    open: boolean;
    toggleDrawer: any;
}
const DrawerCart: React.FC<DrawerCartProps> = (props) => {
    const { open, toggleDrawer } = props;
    const { t } = useTranslation();

    const DrawerList = (
        <Box sx={{ width: '900px' }} role="presentation">
            <div className="mt-3 ml-3 mb-3 flex justify-start items-center ">
                <KeyboardBackspaceIcon className="cursor-pointer" onClick={toggleDrawer(false)} />{' '}
                <span className="cursor-pointer pl-3" onClick={toggleDrawer(false)}>
                    {t('homepage.Exit')}
                </span>
            </div>
            <Divider />
            <div className="mt-6 mb-6 ml-12 mr-12 relative"></div>
        </Box>
    );
    return (
        <div>
            <Drawer className="lg:block hidden" anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
};
export default DrawerCart;
