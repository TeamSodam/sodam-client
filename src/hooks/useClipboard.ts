import { RefObject, useEffect } from 'react';

/**
 * @param  {RefObject<HTMLElement>} containerRef -> 붙여넣기 이벤트를 어디에다가 등록할건지 useRef 객체 받음.
 * @param  {(copiedTextArray:string[])=>void} pasteHandler -> 붙여넣기 이벤트가 일어났을 때 무슨 일을 할건지 정의.
 */

function useClipboard(
  containerRef: RefObject<HTMLElement>,
  pasteHandler: (copiedTextArray: string[]) => void,
) {
  useEffect(() => {
    const container = containerRef.current;
    function parseCopiedTextToArray() {
      if ('clipboard' in navigator) {
        // 클립보드에 복사되어있는 텍스트를 가져옴.
        navigator.clipboard.readText().then((copiedText) => {
          // 5678 -> ['5','6','7','8'];
          pasteHandler(Array.from(copiedText).slice(0, 4));
        });
      }
    }

    container?.addEventListener('paste', parseCopiedTextToArray);

    return () => {
      container?.removeEventListener('paste', parseCopiedTextToArray);
    };
  }, []);
}

export default useClipboard;
