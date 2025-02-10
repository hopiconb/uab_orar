import React from 'react';
import { Box, Avatar, Typography, Popover, IconButton, Skeleton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { User } from '../../types/user';
import { getRoleLabel } from '../../constants/userRoles';
import { fetchCurrentUser } from '../../api/user';


interface AccountPreviewProps {
  mini?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onSignOut?: () => void;
  user: User | null;
  loading?: boolean;
}

interface AccountPopoverProps {
  onClose?: () => void;
  user: User | null;
}

interface SidebarFooterProps {
  mini?: boolean;
}

const AccountPopoverContent = ({ onClose, user }: AccountPopoverProps) => (
  <Box sx={{ p: 2, width: 200 }}>
    <Box sx={{ mb: 1 }}>
      <Typography variant="body2" fontWeight="medium">
        {user?.name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {user?.email}
      </Typography>
      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
        {user && getRoleLabel(user.role)}
      </Typography>
    </Box>
    <Box
      sx={{
        pt: 1,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          cursor: 'pointer',
          '&:hover': { color: 'primary.main' },
        }}
        onClick={onClose}
      >
        Sign out
      </Typography>
    </Box>
  </Box>
);

const AccountPreview = ({ mini, onClick, onSignOut, user, loading }: AccountPreviewProps) => {
  if (loading) {
    return (
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: mini ? 1 : 2 }}>
        <Skeleton variant="circular" width={mini ? 36 : 45} height={mini ? 36 : 45} />
        {!mini && (
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width={120} />
            <Skeleton variant="text" width={150} />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      onClick={mini ? onClick : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: mini ? 1 : 2,
        p: 2,
        cursor: mini ? 'pointer' : 'default',
        '&:hover': {
          bgcolor: mini ? 'action.hover' : 'transparent',
        },
      }}
    >
      <Avatar
        sx={{
          width: mini ? 36 : 45,
          height: mini ? 36 : 45,
          backgroundColor: 'grey.300',
        }}
      >
        {user?.avatar || user?.name?.charAt(0)}
      </Avatar>
      {!mini && (
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography 
              variant="body2" 
              noWrap 
              sx={{ 
                fontWeight: 600
              }}
            >
              {user?.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                bgcolor: 'action.hover',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontWeight: 500
              }}
            >
              {user && getRoleLabel(user.role)}
            </Typography>
          </Box>
          <Typography 
            variant="caption" 
            color="text.secondary" 
            noWrap
            sx={{ 
              fontWeight: 500
            }}
          >
            {user?.email}
          </Typography>
        </Box>
      )}
      {!mini && (
        <IconButton
          size="small"
          onClick={onSignOut}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
              bgcolor: 'transparent',
            },
          }}
        >
          <LogoutIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

const SidebarFooterAccount = ({ mini = false }: SidebarFooterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (mini) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('Sign out clicked');
  };

  const PreviewComponent = React.useMemo(
    () => (props: AccountPreviewProps) => (
      <AccountPreview 
        {...props} 
        mini={mini} 
        onSignOut={handleSignOut}
        user={user}
        loading={loading}
      />
    ),
    [mini, user, loading]
  );

  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
      <PreviewComponent onClick={handleClick} user={user} loading={loading} />
      {mini && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.10)'
                      : 'rgba(0,0,0,0.32)'
                  })`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
        >
          <AccountPopoverContent onClose={handleClose} user={user} />
        </Popover>
      )}
    </Box>
  );
};

export default SidebarFooterAccount;