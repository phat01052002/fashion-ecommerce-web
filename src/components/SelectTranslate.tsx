import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { initI18n } from '../translate/Translate';
import { typeLng, typeRole } from '../common/Common';
import { useStore } from 'react-redux';
interface SelectTranslateProps {}
const SelectTranslate: React.FC<SelectTranslateProps> = (props) => {
    const [lng, setLng] = useState<number>(sessionStorage.getItem('lng') == 'vn' ? 1 : 2 || 1);
    const store = useStore();
    const changeLng = (e: any) => {
        setLng(e.target.value);
        if (e.target.value == 1) {
            initI18n(typeLng.VN);
            sessionStorage.setItem('lng', typeLng.VN);
        }
        if (e.target.value == 2) {
            initI18n(typeLng.EN);
            sessionStorage.setItem('lng', typeLng.EN);
        }
    };
    return (
        <div className="mt-3">
            <Select id="demo-simple-select" value={lng} onChange={(e) => changeLng(e)}>
                <MenuItem value={1}>VN</MenuItem>
                <MenuItem value={2}>EN</MenuItem>
            </Select>
        </div>
    );
};
export default SelectTranslate;
