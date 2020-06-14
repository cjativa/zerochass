type TutorialColors = 'pink' | 'teal' | 'black' | 'white';

interface TutorialSection {
    id: number,
    title: string,
    content: string
};

export interface Tutorial {
    id: number,

    title: string,
    description1: string,
    description2: string,

    sections: TutorialSection[],

    tags: string[],
    color: TutorialColors,

    featuredImage: string,
    enabled: boolean,
};

export interface TutorialRequest {
    id?: number,

    title: string,
    description1: string,
    description2: string,

    sections: TutorialSection[],

    tags: string[],
    color: TutorialColors,

    featuredImage: { dataUrl: string },
    enabled: boolean,
};
