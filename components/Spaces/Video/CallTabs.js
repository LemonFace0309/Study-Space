import { useState } from 'react';
import PropTypes from 'prop-types';
import { TabList, Tab, Tabs, TabPanel, resetIdCounter } from 'react-tabs';
import { IconButton, Grid, Paper } from '@material-ui/core';
import { Chat as ChatIcon, People as PeopleIcon, LibraryMusic, PlaylistAddCheck } from '@material-ui/icons';

import renderComponent from 'utils/renderComponent';
import Music from '../Music';
import ChatPanel from '../Chat';
import People from '../StudySpace/People';
import CallTabPanel from './CallTabPanel';

// https://github.com/reactjs/react-tabs#api
resetIdCounter();

function CallTabs({ username, participants, socketRef, roomID, conversation, showTabs, setShowTabs }) {
  const callTabs = [
    {
      key: 'EMPTY',
      icon: null,
      panel: null,
    },
    {
      key: 'MUSIC_QUEUE',
      icon: PlaylistAddCheck,
      panel: Music,
    },
    {
      key: 'MUSIC_LIBRARY',
      icon: LibraryMusic,
      panel: Music,
    },
    {
      key: 'PEOPLE',
      icon: PeopleIcon,
      panel: People,
      panelProps: {
        username,
        participants,
      },
    },
    {
      key: 'CHAT',
      icon: ChatIcon,
      panel: ChatPanel, // change to chat later
      panelProps: {
        username,
        socketRef,
        roomID,
        conversation,
      },
    },
  ];

  const [tabIndex, setTabIndex] = useState(callTabs.length - 1);

  function setTab(newTabIndex) {
    if (newTabIndex === tabIndex) {
      setTabIndex(0);
      setShowTabs(false);
    } else {
      setTabIndex(newTabIndex);
      setShowTabs(true);
    }
  }

  return (
    <>
      {showTabs && (
        <Grid item xs={12} md={4} className="p-5 flex flex-col items-center justify-items-center">
          <Tabs selectedIndex={tabIndex} onSelect={() => null}>
            {/* "There should be an equal number of 'Tab' and 'TabPanel' in `Tabs` " -- react-tabs */}
            <TabList>
              {callTabs.map((tabObj) => (
                <Tab key={tabObj.key + '_TAB'} />
              ))}
            </TabList>

            {/* The empty tab  */}
            {callTabs.map((tabObj) => {
              if (!tabObj.panel) return <TabPanel key={tabObj.key + '_PANEL'} />;
              return (
                <TabPanel key={tabObj.key + '_PANEL'}>
                  <Paper elevation={2} className="w-90 h-full p-2 font-bold bg-white">
                    {renderComponent(tabObj.panel, tabObj.panelProps ?? {})}
                  </Paper>
                </TabPanel>
              );
            })}
          </Tabs>
        </Grid>
      )}

      <div className="absolute bottom-0 right-0">
        {callTabs.map((tabObj, index) => {
          if (!tabObj.icon) return null;
          return (
            <IconButton key={tabObj.key + '_ICON'} onClick={() => setTab(index)}>
              {renderComponent(tabObj.icon)}
            </IconButton>
          );
        })}
      </div>
    </>
  );
}

CallTabs.propTypes = {
  username: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
  socketRef: PropTypes.object.isRequired,
  roomID: PropTypes.string.isRequired,
  conversation: PropTypes.array.isRequired,
  showTabs: PropTypes.bool.isRequired,
  setShowTabs: PropTypes.func.isRequired,
};

export default CallTabs;
