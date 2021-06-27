import { useState } from 'react';

import { Tabs, TabPanel } from 'react-tabs';

import { IconButton, Grid, Paper } from '@material-ui/core';
import { Chat as ChatIcon, People, LibraryMusic, PlaylistAddCheck } from '@material-ui/icons';

import Chat from '../Chat/'


function CallTabs({
  peersRef,
  conversation,
  setConversation,
  showTabs,
  setShowTabs,
}) {
  const callTabsIndex = {
    EMPTY_TAB: 0,
    MUSIC_QUEUE: 1,
    MUSIC_LIBRARY: 2,
    PEOPLE: 3,
    CHAT: 4,
  }
  const [tabIndex, setTabIndex] = useState(callTabsIndex.CHAT);

  function setTab(newTabIndex) {
    if (newTabIndex === tabIndex) {
      setTabIndex(callTabsIndex.EMPTY_TAB)
      setShowTabs(false)
    } else {
      setTabIndex(newTabIndex)
      setShowTabs(true)
    }
  }



  return (
    <>
      {showTabs &&
        <Grid item xs={12} md={4} className="h-full p-5 flex flex-col items-center justify-items-center">
          <Tabs selectedIndex={tabIndex}>
            {/* The empty tab  */}
            <TabPanel></TabPanel>
            <TabPanel>
              <Paper elevation={2} className="w-90 h-full p-5 font-bold bg-white">Add Queue</Paper>
            </TabPanel>
            <TabPanel>
              <Paper elevation={2} className="w-90 h-full p-5 font-bold bg-white">Mujic</Paper>
            </TabPanel>
            <TabPanel>
              <Paper elevation={2} className="w-90 h-full p-5 font-bold bg-white">People</Paper>
            </TabPanel>
            <TabPanel>
              <Chat
                peersRef={peersRef}
                conversation={conversation}
                setConversation={setConversation}
              />
            </TabPanel>
          </Tabs>
        </Grid>
      }

      <div className="absolute bottom-0 right-0">
        <IconButton onClick={() => setTab(callTabsIndex.MUSIC_QUEUE)}>
          <PlaylistAddCheck />
        </IconButton>
        <IconButton onClick={() => setTab(callTabsIndex.MUSIC_LIBRARY)}>
          <LibraryMusic />
        </IconButton>
        <IconButton onClick={() => setTab(callTabsIndex.PEOPLE)}>
          <People />
        </IconButton>
        <IconButton onClick={() => setTab(callTabsIndex.CHAT)}>
          <ChatIcon />
        </IconButton>
      </div>

    </>
  );
}

export default CallTabs;
