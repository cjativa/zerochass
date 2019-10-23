
export interface Tutorial {
    title: string,
    slug: string,
    color: string,
    description: {
        firstLine: string,
        secondLine: string
    }[],
    featuredImage: {
        url: string
    }[],
    tags: {
        title: string
    }[],
    tutorialContent: {
        sectionTitle: string,
        sectionContent: string,
        id: string,
        uid: string,
        dateUpdated: string,
        dateCreated: string,
        sortOrder: number
    }[],
}

export interface TutorialsForContentBanner {
    title: string,
    slug: string,
    color: string,
    description: {
        firstLine: string,
        secondLine: string
    }[],
    featuredImage: {
        url: string
    }[],
    tags: {
        title: string
    }[]
}