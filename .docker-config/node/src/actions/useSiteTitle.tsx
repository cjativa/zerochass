import React, { useState, useEffect } from 'react';

export const useSiteTitle = (title: string) => {

    useEffect(() => {
        if (title && typeof document !== "undefined") {
            document.title = `${title} | Zerochass`;
        }
    }, [title]);
}