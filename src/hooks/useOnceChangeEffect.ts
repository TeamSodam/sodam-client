import { isEqual } from 'lodash-es';
import { useEffect, useRef } from 'react';

function useOnceChangeEffect(effect: () => void, targetDependency: undefined | null | unknown) {
  const isEffectExecuted = useRef(false);
  const prevTargetDependency = useRef(targetDependency);

  useEffect(() => {
    if (
      !isEffectExecuted.current &&
      targetDependency &&
      !isEqual(prevTargetDependency.current, targetDependency)
    ) {
      isEffectExecuted.current = true;
      effect();
    }

    prevTargetDependency.current = targetDependency;
  }, [targetDependency]);
}

export default useOnceChangeEffect;
