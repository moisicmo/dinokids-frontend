import { Avatar, Box, IconButton, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MenuOutlined } from '@mui/icons-material';
import { usePopover } from '@/hooks';
import { AccountPopover } from '.';
import noimage from '@/assets/images/profile.png';

const TOP_NAV_HEIGHT = 50;

export const TopNav = ({ onNavOpen }: { onNavOpen: any }) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('md'));

  const accountPopover = usePopover();

  return (
    <>
      <Box
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: () => 'transparent',
          position: 'sticky',
          width:'100%',
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
            py:1
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <MenuOutlined color="primary" />
              </IconButton>
            )}
          </Stack>
          <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{ cursor: 'pointer', width: 45, height: 45 }}
              src={noimage}
            />
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
        onTapSettings={() => {
          accountPopover.handleClose();
        }}
      />
    </>
  );
};
