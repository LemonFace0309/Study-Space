import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TabList, Tab, Tabs, TabPanel, resetIdCounter } from 'react-tabs';
import { IconButton, Grid, Paper } from '@mui/material';
import { Chat as ChatIcon, People as PeopleIcon, LibraryMusic, PlaylistAddCheck } from '@mui/icons-material';

import { useSocketContext } from '@/context/spaces/SocketContext';
import renderComponent from '@/utils/renderComponent';
import TabPanelHeader from './Layout/TabPanelHeader';
import Music from './Music';
import ChatPanel from './Chat';
import People from './People';
import TodoList from './TodoList';

// https://github.com/reactjs/react-tabs#api
resetIdCounter();

const CallTabs = ({ roomId, showTabs, setShowTabs }) => {
  const { username, participants, socketRef, conversation } = useSocketContext();

  useEffect(() => {
    setShowTabs(true);
  }, [setShowTabs]);

  const callTabs = [
    {
      title: 'Empty',
      icon: null,
      panel: null,
    },
    {
      title: 'To-Do List',
      icon: PlaylistAddCheck,
      panel: TodoList,
    },
    {
      title: 'Music Library',
      icon: LibraryMusic,
      panel: Music,
    },
    {
      title: 'Participants',
      icon: PeopleIcon,
      panel: People,
      panelProps: {
        username,
        participants,
      },
    },
    {
      title: 'Chat Messages',
      icon: ChatIcon,
      panel: ChatPanel,
      panelProps: {
        username,
        socketRef,
        roomId,
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

  return <>
    {showTabs && (
      <Grid item xs={12} md={6} lg={5} xl={4} className="h-full p-5 flex flex-col items-center justify-items-center">
        <Tabs selectedIndex={tabIndex} onSelect={() => null}>
          {/* "There should be an equal number of 'Tab' and 'TabPanel' in `Tabs` " -- react-tabs */}
          <TabList>
            {callTabs.map((tabObj) => (
              <Tab key={tabObj.title + '_TAB'} />
            ))}
          </TabList>

          {/* The empty tab  */}
          {callTabs.map((tabObj) => {
            if (!tabObj.panel) return <TabPanel key={tabObj.title + '_PANEL'} />;
            return (
              <TabPanel key={tabObj.title + '_PANEL'}>
                <Paper elevation={2} className="w-90 h-full rounded-md overflow-hidden bg-white flex flex-col">
                  <TabPanelHeader>{tabObj.title}</TabPanelHeader>
                  {renderComponent(tabObj.panel, { ...tabObj.panelProps }, tabObj?.panelChild)}
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
          <IconButton key={tabObj.title + '_ICON'} onClick={() => setTab(index)} size="large">
            {renderComponent(tabObj.icon)}
          </IconButton>
        );
      })}
    </div>
  </>;
};

CallTabs.propTypes = {
  roomId: PropTypes.string.isRequired,
  showTabs: PropTypes.bool.isRequired,
  setShowTabs: PropTypes.func.isRequired,
};

export default CallTabs;
