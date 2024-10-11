import axios from 'axios';
import Swal from 'sweetalert2';
export const AlertLogout = (logOut: any) => {
    Swal.fire({
        title: 'Bạn có muốn thoát?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    }).then((result: any) => {
        if (result.isConfirmed) {
            logOut();
        } else if (result.isDenied) {
        }
    });
};

export const AlertSaveInfo = (save: any) => {
    Swal.fire({
        title: 'Đồng ý lưu?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    }).then((result: any) => {
        if (result.isConfirmed) {
            save();
        } else if (result.isDenied) {
        }
    });
};
