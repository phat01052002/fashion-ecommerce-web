import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useStore } from 'react-redux';
import { ReducerProps } from '../../reducers/ReducersProps';

interface LoadingProcessProps {}

const LoadingProcess: React.FC<LoadingProcessProps> = (props) => {
    const store = useStore();
    const isLoading = useSelector((state: ReducerProps) => state.isLoading);
    return (
        <div className={isLoading ? `` : `hidden z-1000`}>
            <div className="flex justify-center items-center fixed top-0 bottom-0 right-0 left-0 z-1000 bg-gray-300 opacity-80">
                <CircularProgress size={40} />
            </div>
        </div>
    );
};
export default LoadingProcess;
