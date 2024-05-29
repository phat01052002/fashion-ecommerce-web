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
interface DrawerSearchProps {
    open: boolean;
    toggleDrawer: any;
}
const DrawerSearch: React.FC<DrawerSearchProps> = (props) => {
    const { open, toggleDrawer } = props;
    const { t } = useTranslation();
    const [search, setSearch] = useState<string>('');
    const [listHot, setListHot] = useState<Array<any>>([1, 2, 3, 4, 5, 6]);
    const [listSuggestion, setListSuggestion] = useState<Array<any>>([1, 2]);

    //
    const typingTimeoutRef = useRef<any>(null);
    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
    }
    //
    const getDataSearch = async () => {
        console.log('getApi');
    };
    useEffect(() => {
        typingTimeoutRef.current = setTimeout(() => {
            if (search) {
                getDataSearch();
            }
        }, 500);
    }, [search]);
    const DrawerList = (
        <Box sx={{ width: '900px' }} role="presentation">
            <div className="mt-3 ml-3 mb-3 flex justify-start items-center ">
                <KeyboardBackspaceIcon className="cursor-pointer" onClick={toggleDrawer(false)} />{' '}
                <span className="cursor-pointer pl-3" onClick={toggleDrawer(false)}>
                    {t('homepage.Exit')}
                </span>
            </div>
            <Divider />
            <div className="mt-6 mb-6 ml-12 mr-12 relative">
                <span className="absolute top-1 left-2">
                    <SearchIcon />
                </span>

                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    value={search}
                    InputProps={{
                        style: { borderRadius: '100px', height: '37px' },
                    }}
                    inputProps={{
                        style: { paddingLeft: 40, paddingRight: 40 },
                    }}
                    onChange={(e) => {
                        filterSpecialInput(e.target.value, setSearch);
                    }}
                />
                {search ? (
                    <span className="absolute top-1 right-2 cursor-pointer" onClick={toggleDrawer(false)}>
                        <HighlightOffIcon onClick={() => setSearch('')} />
                    </span>
                ) : null}
            </div>
            <div className="mt-6 ml-12 mr-12">
                <div className="font-bold">{t('homepage.Hot key')}</div>

                <div className="flex mt-3 grid grid-cols-4">
                    {listHot.length > 0 ? listHot.map((hot, index) => <Hot key={index} hot={hot} />) : null}
                </div>
            </div>
            <div className="mt-6 ml-12 mr-12">
                <div className="font-bold">{t('homepage.Product suggestions')}</div>
                <div className="flex mt-3 grid grid-cols-2">
                    {listSuggestion.length > 0
                        ? listSuggestion.map((suggestion, index) => <Suggestion key={index} />)
                        : null}
                </div>
            </div>
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
export default DrawerSearch;
