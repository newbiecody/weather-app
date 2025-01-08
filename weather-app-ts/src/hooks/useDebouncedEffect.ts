import { useEffect } from "react";

function useDebouncedEffect(
  effect: () => void,
  dependencies: unknown[],
  delay: number
) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, dependencies);
}

export default useDebouncedEffect;
