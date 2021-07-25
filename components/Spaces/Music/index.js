import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TabList, Tab, Tabs, TabPanel } from 'react-tabs';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    flex: 1,
    height: 'auto',
    padding: theme.spacing(1),
    '& > div': {
      height: 'auto',
    },
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
        {tabs.map((tab, index) => (
          <Button
            key={tab.title}
            className={classNames(['flex-1 overflow-hidden normal-case', tabIndex === index && classes.activeTab])}
            onClick={() => setTabIndex(index)}
            active={tabIndex === index}>
            <Tab>
              <Typography variant="subtitle2">{tab.title}</Typography>
            </Tab>
          </Button>
        ))}
      </TabList>
      <TabPanel>1</TabPanel>
      <TabPanel>2</TabPanel>
      <TabPanel>3</TabPanel>
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
    },
    {
      title: 'Youtube',
    },
    {
      title: 'Quene',
    },
  ],
};

export default Music;
