import { useState, useEffect } from 'react';
import axios from 'axios';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button } from '@mui/material';
import { getSession } from 'next-auth/client';

function Users() {
  const [userList, setUserList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [session, setSession] = useState();
  const [currentUser, setCurrentUser] = useState({});

  const init = async () => {
    const userSession = await getSession();
    setSession(userSession);
    if (userSession) {
      console.debug(userSession);
      setCurrentUser({
        name: userSession.user.name,
        email: userSession.user.email,
      });

      const res = await axios.get('/api/user/get-user-list', {
        params: {
          name: userSession.user.name,
          email: userSession.user.email,
        },
      });
      setUserList(res.data.users);
      setFriendsList(res.data.friends);
    }
  };

  useEffect(() => {
    init();
  }, []);

  async function handleAddFriend(user) {
    console.debug('[handleAddFriend] send');
    const result = await axios.post('/api/user/create-new-friend', {
      user1name: currentUser.name,
      user1email: currentUser.email,
      user2name: user.name,
      user2email: user.email,
    });
    console.debug(result);
  }

  if (!session) return <h1> Please log in </h1>;
  return (
    <>
      <h1> Users </h1>
      {userList.map((user, i) => {
        if (user.name == currentUser.name && user.email == currentUser.email) return;
        let friendText = 'Add';
        for (let friend in friendsList) {
          friend = friendsList[friend];
          if (friend.requester_email == currentUser.email && friend.recipient_email == user.email) {
            if (friend.status == 1) {
              friendText = 'Pending';
              break;
            } else if (friend.status == 2) {
              friendText = 'Added';
              break;
            }
          }
          if (friend.recipient_email == currentUser.email && friend.requester_email == user.email) {
            if (friend.status == 1) {
              friendText = 'Accept';
              break;
            } else if (friend.status == 2) {
              friendText = 'Added';
              break;
            }
          }
        }

        return (
          <div key={i}>
            {user.name} {user.email}
            <img src={user.image} alt="user" />
            <Button onClick={() => handleAddFriend(user)}> {friendText} </Button>
          </div>
        );
      })}
    </>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    // ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Users;
