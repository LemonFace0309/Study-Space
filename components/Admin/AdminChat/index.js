import { useMemo } from 'react';
import Box from '@mui/material/Box';

import Chat from '@/components/Shared/Chat';
import { useAdminContext } from '@/context/admin';

const AdminChat = () => {
  const { role, selectedUser, userConversations, sendMessage } = useAdminContext();
  const conversation = useMemo(() => {
    return [...(userConversations.find((obj) => obj.socketId == selectedUser.socketId)?.conversation ?? [])];
  }, [selectedUser, userConversations]);

  return (
    <Box sx={{ p: 1, height: '100%' }}>
      <Chat role={role} conversation={conversation} sendMessage={sendMessage} />
    </Box>
  );
};

export default AdminChat;
