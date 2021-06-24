import { useState, useRef } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getSession } from 'next-auth/client';
import Button from '@material-ui/core/Button';

import User from '../models/User';
import dbConnect from '../utils/dbConnect';

const Home = ({ session, acceptedFileTypes, allowMultipleFiles }) => {
  session = JSON.parse(session);
  console.debug(session);
  const [userImage, setUserImage] = useState(session.user.image);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!fileInputRef.current.files?.length) {
      return;
    }

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const formData = new FormData();

    Array.from(fileInputRef.current.files).forEach((file) => {
      formData.append(fileInputRef.current.name, file);
    });

    formData.append('id', session.user._id);

    // for (let key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }

    const response = await axios.post(
      '/api/profile/edit-profile',
      formData,
      config
    );
    console.debug(response);
    setUserImage(response.data.data.Location);

    formRef.current?.reset();
  };

  return (
    <>
      <h1>WELCOME :D</h1>
      {session && (
        <>
          {session.user.image && (
            <Image src={userImage} height="250" width="250" />
          )}
          <form className="mt-4" onSubmit={handleUpdateProfile} ref={formRef}>
            <label htmlFor="image">Upload new Profile Pic</label>
            <input
              type="file"
              name="image"
              id="image"
              ref={fileInputRef}
              accept={acceptedFileTypes}
              multiple={allowMultipleFiles}
            />
            <Button type="submit">Save</Button>
          </form>
        </>
      )}
    </>
  );
};

Home.propTypes = {
  session: PropTypes.string.isRequired,
  acceptedFileTypes: PropTypes.string,
  allowMultipleFiles: PropTypes.bool,
};

Home.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
};

export default Home;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  await dbConnect();

  let newSession;
  if (session) {
    const user = await User.findOne({
      email: session.user.email,
    });
    newSession = { ...session, user };
    console.log('Session:', newSession);
  }

  return {
    props: {
      session: JSON.stringify(newSession), // otherwise nextjs throws error - can't serialize data
    },
  };
};
