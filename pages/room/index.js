import React from 'react';
import { v1 as uuid } from 'uuid';
import { useRouter } from 'next/router';

<<<<<<< HEAD
const CreateRoom = (props) => {
=======
const CreateRoom = () => {
>>>>>>> 61cddb4... adjusted eslint and tempoarily removed eslint requirement for prod builds
  const router = useRouter();
  function create() {
    const id = uuid();
    router.push(`/room/${id}`);
  }

  return <button onClick={create}>Create room</button>;
};

export default CreateRoom;
