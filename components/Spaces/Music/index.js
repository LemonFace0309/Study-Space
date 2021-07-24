import { TabList, Tab, Tabs, TabPanel, resetIdCounter } from 'react-tabs';

const Music = () => {
  return (
    <>
      <h1>Music</h1>
      <Tabs>
        <TabList>
          <Tab>Our Recommenations</Tab>
          <Tab>Youtube</Tab>
          <Tab>Queue</Tab>
        </TabList>
        <TabPanel>1</TabPanel>
        <TabPanel>2</TabPanel>
        <TabPanel>3</TabPanel>
      </Tabs>
    </>
  );
};

export default Music;
