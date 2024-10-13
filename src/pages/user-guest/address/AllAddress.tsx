import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useStore } from 'react-redux';
import Header from '../../../components/user-guest/header/Header';
import LeftNav from '../../../components/user-guest/info-user/LeftNav';
import { ReducerProps } from '../../../reducers/ReducersProps';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { GetApi } from '../../../untils/Api';
import AddressItem from '../../../components/user-guest/address/AddressItem';
import { change_list_address } from '../../../reducers/Actions';
import { motion, AnimatePresence } from 'framer-motion';

interface AllAddressProps {}

const AllAddress: React.FC<AllAddressProps> = (props) => {
    const store = useStore();
    const { t } = useTranslation();
    const nav = useNavigate();
    const listAddress = useSelector((state: ReducerProps) => state.listAddress);
    const handleClickCreateAddress = () => {
        nav('/user/address/create');
    };
    const getDataAddress = async () => {
        const resDataAddress = await GetApi('/user/address/get', localStorage.getItem('token'));
        if (resDataAddress.status == 200) {
            store.dispatch(change_list_address(resDataAddress.data.listAddress));
        }
    };
    useEffect(() => {
        getDataAddress();
    }, []);
    return (
        <div>
            <div className="fixed top-0 left-0 right-0 w-full z-50">
                <div className="text-center bg-black text-white">{t('homepage.Free returns within 30 days')}</div>
                <Header />
            </div>

            <div style={{ marginTop: 120 }} className="container z-10">
                <div className="grid grid-cols-4  gap-4 container h-16">
                    <div className="hidden lg:block col-span-1 bg-white box-shadow">
                        <LeftNav index={1} />
                    </div>
                    <div className="col-span-4 lg:col-span-3 mt-12 lg:mt-0">
                        <h1 className="text-2xl font-bold">{t('user.Address')}</h1>
                        <div className="bg-white p-6 rounded-lg box-shadow mt-4 relative">
                            <div>
                                <Button
                                    onClick={handleClickCreateAddress}
                                    style={{ height: 50 }}
                                    fullWidth
                                    variant="outlined"
                                >
                                    <AddIcon />
                                </Button>
                            </div>
                            <div>
                                <AnimatePresence>
                                    {listAddress.length > 0
                                        ? listAddress.map((address: any, index: any) => {
                                              if (index == 0) {
                                                  return (
                                                      <motion.li
                                                          style={{ listStyleType: 'none' }}
                                                          key={index}
                                                          initial={{ opacity: 1, height: 'auto' }}
                                                          exit={{
                                                              opacity: 0,
                                                              height: 0,
                                                              transition: { duration: 0.2 },
                                                          }}
                                                          transition={{ duration: 0.2 }}
                                                      >
                                                          <AddressItem
                                                              key={index}
                                                              address={address}
                                                              isFirst={true}
                                                              index={index}
                                                          />
                                                      </motion.li>
                                                  );
                                              } else {
                                                  return (
                                                      <motion.li
                                                          style={{ listStyleType: 'none' }}
                                                          key={index}
                                                          initial={{ opacity: 1, height: 'auto' }}
                                                          exit={{
                                                              opacity: 0,
                                                              height: 0,
                                                              transition: { duration: 0.2 },
                                                          }}
                                                          transition={{ duration: 0.2 }}
                                                      >
                                                          <AddressItem
                                                              key={index}
                                                              address={address}
                                                              isFirst={false}
                                                              index={index}
                                                          />
                                                      </motion.li>
                                                  );
                                              }
                                          })
                                        : null}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AllAddress;
