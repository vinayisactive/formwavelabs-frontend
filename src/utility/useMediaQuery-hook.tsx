"use client";

import { useEffect, useState } from "react";

const useMediaQuery = (size: string) => {

    const [screenSizeMatches, setScreenSizeMatches] = useState<boolean>(false);

    const updateScreenSizeMatch = (event: MediaQueryListEvent) => {
        setScreenSizeMatches(event.matches);
    };

    useEffect(() => {
        if (!window) {
            return;
        }

        const mediaQueryObject = window.matchMedia(size);
        setScreenSizeMatches(mediaQueryObject.matches); 

        mediaQueryObject.addEventListener("change", updateScreenSizeMatch);

        return () =>
            mediaQueryObject.removeEventListener("change", updateScreenSizeMatch);
    }, [size]);

    return screenSizeMatches;
};

export default useMediaQuery;
