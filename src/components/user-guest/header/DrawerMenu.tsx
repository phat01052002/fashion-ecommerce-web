import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useTranslation } from 'react-i18next';
import InventoryIcon from '@mui/icons-material/Inventory';
interface DrawerMenuProps {
    open: boolean;
    toggleDrawer: any;
}

const DrawerMenu: React.FC<DrawerMenuProps> = (props) => {
    const { open, toggleDrawer } = props;
    const { t } = useTranslation();
    const DrawerList = (
        <Box sx={{ width: '300px' }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[
                    t('homepage.Category'),
                    t('homepage.New Product'),
                    t('homepage.Sale'),
                    t('homepage.Men Fashion'),
                    t('homepage.Women Fashion'),
                ].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{index % 2 === 0 ? <InventoryIcon /> : <InventoryIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
};
export default DrawerMenu;
