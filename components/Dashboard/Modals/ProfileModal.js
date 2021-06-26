import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';

import * as authState from '../../../atoms/auth';

const ProfileModal = ({ session, isOpen, handleClose }) => {
  const [userImage, setUserImage] = useState(session?.user?.image);
  const [username, setUsername] = useRecoilState(authState.username);
  const [phoneNumber, setPhoneNumber] = useRecoilState(authState.phoneNumber);
  const [password, setPassword] = useRecoilState(authState.password);
  const [newPassword, setNewPassword] = useRecoilState(authState.newPassword);

  useEffect(() => {
    setUsername(session?.user?.username ?? '');
    setPhoneNumber(session?.user?.phoneNumber ?? '');
  }, []);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!fileInputRef.current.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(fileInputRef.current.files).forEach((file) => {
      formData.append(fileInputRef.current.name, file);
    });

    formData.append('id', session.user._id);

    // for (let key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }

    const response = await axios.post('/api/profile/edit-profile', formData, {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    });
    console.debug(response);
    setUserImage(response.data.data.Location);

    formRef.current?.reset();
  };

  return <div></div>;
};

ProfileModal.propTypes = {
  session: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  acceptedFileTypes: PropTypes.string,
  allowMultipleFiles: PropTypes.bool,
};

ProfileModal.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
};

export default ProfileModal;
