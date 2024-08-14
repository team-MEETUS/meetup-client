import { useState } from 'react';

import { useLocation } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface CrewState {
  crewId: string;
}

const CrewBoardRegisterPage = () => {
  const location = useLocation();
  const state = location.state as CrewState;
  const [crewId] = useState<string>(state.crewId || '');

  return (
    <>
      {crewId}
      <div>게시글 작성 페이지</div>
    </>
  );
};

export default CrewBoardRegisterPage;
