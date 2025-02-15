'use client';

import React from 'react';
import { GetTokenDataResultBodyType } from '@safe-agent/safe/actions/get-token-data/types';
import GetTokenDataResultHeading from './heading';
import Stats from './stats';

interface Props {
  body: GetTokenDataResultBodyType;
}

const GetTokenDataResult: React.FC<Props> = ({ body }) => {
  const { token } = body;

  return (
    <div className="flex w-full flex-col gap-2">
      <GetTokenDataResultHeading token={token} />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Stats token={token} />
      </div>
    </div>
  );
};

export default GetTokenDataResult;
