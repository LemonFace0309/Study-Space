import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TabList, Tab, Tabs, TabPanel } from 'react-tabs';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import renderComponent from 'utils/renderComponent';
import OurPicksTab from './Tabs/OurPicks';
import YoutubeTab from './Tabs/Youtube';
import QueueTab from './Tabs/Queue';

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    flex: 1,
    height: 'auto',
    padding: theme.spacing(1),
    '& > div': {
      height: 'auto',
    },
  },
  tab: {
    flex: 1,
    borderRadius: '8px',
    margin: theme.spacing(1),
    overflow: 'hidden',
    textTransform: 'none',
    color: theme.palette.primary.dark,
  },
  activeTab: {
    textDecoration: 'none',
    backgroundColor: 'rgba(17, 17, 17, 0.04)',
  },
}));

const Music = ({ tabs }) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={() => null} className={classes.tabContainer}>
      <TabList className="flex w-full justify-center">
        {tabs.map((tabObj, index) => (
          <Button
            key={tabObj.title + '_TAB'}
            className={classNames([classes.tab, tabIndex === index && classes.activeTab])}
            onClick={() => setTabIndex(index)}>
            <Tab>
              <Typography variant="subtitle2">{tabObj.title}</Typography>
            </Tab>
          </Button>
        ))}
      </TabList>
      {tabs.map((tabObj) => (
        <TabPanel key={tabObj.title + '_PANEL'}>{renderComponent(tabObj.panel)}</TabPanel>
      ))}
    </Tabs>
  );
};

Music.propTypes = {
  tabs: PropTypes.array,
};

Music.defaultProps = {
  tabs: [
    {
      title: 'Our Picks',
      panel: OurPicksTab,
    },
    {
      title: 'Youtube',
      panel: YoutubeTab,
    },
    {
      title: 'Queue',
      panel: QueueTab,
    },
  ],
};

export default Music;
