import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { filterInput, filterInputNumber } from '../../untils/Logic';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
interface RegisterProps {}
const Register: React.FC<RegisterProps> = (props) => {
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { t } = useTranslation();
    return (
        <div className="mt-3 text-center">
            <div>
                <TextField
                    id="phone"
                    label={t('auth.Phone')}
                    variant="outlined"
                    placeholder={t('auth.Phone')}
                    value={phone}
                    onChange={(e) => filterInputNumber(e.target.defaultValue, setPhone)}
                />
            </div>
            <div className="mt-3">
                <TextField
                    id="phone"
                    label={t('auth.Password')}
                    variant="outlined"
                    placeholder={t('auth.Password')}
                    value={password}
                    onChange={(e) => filterInput(e.target.defaultValue, setPassword)}
                />
            </div>
            <div className="mt-6">
                <Button variant="contained">{t('auth.Register')}</Button>
            </div>
        </div>
    );
};
export default Register;
