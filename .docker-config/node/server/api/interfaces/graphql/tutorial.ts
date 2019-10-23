export interface Tutorial {
    title: string,
    description: string[],
    contentSection: string[],
    slug: string,
    featuredImage: any,
    tags: string[],
    color: string,
    id: string
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

export interface TutorialSingle {
    title: string,
    slug: string,
    color: string,
    description: {
        firstLine: string,
        secondLine: string
    }[],
    featuredImage: {
        title: string
    },
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