import React from 'react';
import { v1 as uuid } from 'uuid';
import { useRouter } from 'next/router';

const CreateRoom = (props) => {
  const router = useRouter();
  function create() {
    const id = uuid();
    router.push(`/room/${id}`);
  }

  return <button onClick={create}>Create room</button>;
};

export default CreateRoom;
