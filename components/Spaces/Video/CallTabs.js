import { useState } from 'react';
import PropTypes from 'prop-types';
import { TabList, Tab, Tabs, TabPanel, resetIdCounter } from 'react-tabs';
import { IconButton, Grid, Paper } from '@material-ui/core';
import { Chat as ChatIcon, People as PeopleIcon, LibraryMusic, PlaylistAddCheck } from '@material-ui/icons';

import Chat from '../Chat/';
import People from '../StudySpace/People';

// https://github.com/reactjs/react-tabs#api
resetIdCounter();
const callTabsIndex = {
  EMPTY_TAB: 0,
  MUSIC_QUEUE: 1,
  MUSIC_LIBRARY: 2,
  PEOPLE: 3,
  CHAT: 4,
};

function CallTabs({ username, participants, socketRef, conversation, setConversation, showTabs, setShowTabs }) {
  const [tabIndex, setTabIndex] = useState(callTabsIndex.CHAT);

  function setTab(newTabIndex) {
    if (newTabIndex === tabIndex) {
      setTabIndex(callTabsIndex.EMPTY_TAB);
      setShowTabs(false);
    } else {
      setTabIndex(newTabIndex);
      setShowTabs(true);
    }
  }

  return (
    <>
      {showTabs && (
        <Grid item xs={12} md={4} className="h-full p-5 flex flex-col items-center justify-items-center">
          <Tabs selectedIndex={tabIndex} onSelect={() => null}>
            {/* "There should be an equal number of 'Tab' and 'TabPanel' in `Tabs` " -- react-tabs */}
            <TabList>
              <Tab></Tab>
              <Tab></Tab>
              <Tab></Tab>
              <Tab></Tab>
              <Tab></Tab>
            </TabList>

            {/* The empty tab  */}
            <TabPanel></TabPanel>
            <TabPanel>
              <Paper elevation={2} className="w-90 h-full p-5 font-bold bg-white">
                Add Queue
              </Paper>
            </TabPanel>
            <TabPanel>
              <Paper elevation={2} className="w-90 h-full p-5 font-bold bg-white">
                Mujic
              </Paper>
            </TabPanel>
            <TabPanel>
              <People username={username} participants={participants} />
            </TabPanel>
            <TabPanel>
              <Chat
                username={username}
                socketRef={socketRef}
                conversation={conversation}
                setConversation={setConversation}
              />
            </TabPanel>
          </Tabs>
        </Grid>
      )}

      <div className="absolute bottom-0 right-0">
        <IconButton onClick={() => setTab(callTabsIndex.MUSIC_QUEUE)}>
          <PlaylistAddCheck />
        </IconButton>
        <IconButton onClick={() => setTab(callTabsIndex.MUSIC_LIBRARY)}>
          <LibraryMusic />
        </IconButton>
        <IconButton onClick={() => setTab(callTabsIndex.PEOPLE)}>
          <PeopleIcon />
        </IconButton>
        <IconButton onClick={() => setTab(callTabsIndex.CHAT)}>
          <ChatIcon />
        </IconButton>
      </div>
    </>
  );
}

CallTabs.propTypes = {
  username: PropTypes.string,
  participants: PropTypes.array,
  socketRef: PropTypes.object,
  conversation: PropTypes.array,
  setConversation: PropTypes.func,
  showTabs: PropTypes.bool,
  setShowTabs: PropTypes.func,
};

export default CallTabs;
