import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';
import { SUBSCRIBE_LIST } from '../../utils/schemas';

const useListSubscription = (listData) => {
  const store = useSelector((state) => state);
  const { data, loading, error } = useSubscription(SUBSCRIBE_LIST, {
    variables: { list_id: listData.id },
  });
  const [list, setList] = useState(listData);

  useEffect(() => {
    if (data) {
      setList((prev) => ({ ...prev, items: data.list[0].items }));
    }
  }, [store, data, listData]);

  return { list, loading, error };
};

export default useListSubscription;
