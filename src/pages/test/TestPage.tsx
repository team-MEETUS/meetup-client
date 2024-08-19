// src/pages/TestPage.tsx
import React, { useState } from 'react';

import {
  useGetTestData,
  usePostTestData,
} from '@/apis/react-query/test/useTest';

const TestPage: React.FC = () => {
  // GET 요청을 위한 훅
  const { GetTestData, isLoading, error } = useGetTestData();

  // POST 요청을 위한 훅
  const { mutate: postTestData, error: postError } = usePostTestData();

  const [name, setName] = useState('');
  const [testId, setTestId] = useState<number | string>('');

  const handlePost = () => {
    postTestData({ testId: Number(testId), name });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1>Test Data</h1>
      <pre>{JSON.stringify(GetTestData, null, 2)}</pre>

      <h2>Post Data</h2>
      <input
        type="number"
        placeholder="Test ID"
        value={testId}
        onChange={(e) => setTestId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handlePost} disabled={isLoading}>
        {isLoading ? 'Posting...' : 'Post Data'}
      </button>
      {postError && <div>Error: {postError.message}</div>}
    </div>
  );
};

export default TestPage;
