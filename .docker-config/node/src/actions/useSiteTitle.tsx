import React, { useState, useEffect } from 'react';

export const useSiteTitle = (title: string) => {

    useEffect(() => {
        if (title) {
            document.title = `${title} | Zerochass`;
        }
    }, [title]);
}