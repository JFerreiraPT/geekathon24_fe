import React from 'react';
import { postAPI } from '../services/fetchers';

export const useHandleOutput = (apiPath, getItemTree, update) => {
  const [openOutput, setOpenOutput] = React.useState(false);
  const [output, setOutput] = React.useState('');
  const handleAction = async (itemId) => {
    if (!output) {
      const { previousItems } = getItemTree(itemId);
      const inputs = previousItems
        .filter((item) => item.type !== 'chat')
        .map((item) => item._id);
      const chatId =
        previousItems.filter((item) => item.type === 'chat')[0]?._id ?? '';

      const result = await postAPI(apiPath, {
        inputs,
        chatId,
      });

      if (result && !Array.isArray(result)) {
        setOutput(result.text);
        setOpenOutput((s) => !s);
        update(itemId, { _id: result._id, content: result.text });
      } else if (Array.isArray(result)) {
        setOutput(result.map((i) => i));
        setOpenOutput((s) => !s);
        update(itemId, {
          _ids: result.map((i) => i._id),
          content: result.map((i) => i.text),
        });
      }
    } else {
      setOpenOutput((s) => !s);
    }
  };

  return { openOutput, setOpenOutput, output, setOutput, handleAction };
};
