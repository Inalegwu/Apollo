import { useCallback, useEffect, useState } from "react";

export function useAutoUpdate() {
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

    const installUpdate = useCallback(() => {}, []);

    useEffect(() => {}, []);

    return {
        isUpdateAvailable,
        installUpdate,
    };
}
