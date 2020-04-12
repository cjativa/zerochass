import { Tutorial, TutorialsForContentBanner, TutorialSingle } from '../interfaces/graphql/tutorial';
import { executeCraftRequest } from './craftGraphService';

export const getTutorial = async (slug: string): Promise<TutorialSingle> => {
    const tutorial = (await executeCraftRequest('post', tutorialSingleQuery(slug)))[0] as TutorialSingle;
    return tutorial;
}

export const getTutorials = async (): Promise<TutorialsForContentBanner[]> => {
    const tutorials = await executeCraftRequest('post', tutorialContentForBannersQuery()) as TutorialsForContentBanner[];
    return tutorials;
}

const tutorialContentForBannersQuery = () => {
    return `
  query {
      entries(type: "tutorial") {
      title,
      slug,
       ... on tutorials_tutorial_Entry {
        color,
        description {
          ...on description_description_BlockType {
            firstLine,
            secondLine
          }
        },
        featuredImage {
          url
        },
        tags {
          title
        }
      },
      ... on tutorialSeries_tutorial_Entry {
        color,
        description {
          ...on description_description_BlockType {
            firstLine,
            secondLine
          }
        },
        featuredImage {
          url
        },
        tags {
          title
        }
      }
    }
  }
  `
}

const tutorialSingleQuery = (slug: string) => {
    return `
    query {
      entries(type: "tutorial", slug: "${slug}") {
        title,
        id
         ... on tutorials_tutorial_Entry {
          color,
          description {
              ...on description_description_BlockType {
                firstLine,
                secondLine
              }
          },
          featuredImage {
            url
          },
          tags {
            title
          },
          tutorialContent {
            ...on tutorialContent_sectionBlock_BlockType {
              sectionTitle,
              sectionContent,
              id,
              uid,
              dateUpdated, 
              dateCreated
            },
          }
        },
      ... on tutorialSeries_tutorial_Entry {
          color,
          parent {
            typeHandle,
            id,
            title,
            children {
              id,
              title,
              lft,
              rgt,
            }
          },
          description {
              ...on description_description_BlockType {
                firstLine,
                secondLine
              }
          },
          featuredImage {
            url
          },
          tags {
            title
          },
          tutorialContent {
            ...on tutorialContent_sectionBlock_BlockType {
              sectionTitle,
              sectionContent,
              id,
              uid,
              dateUpdated, 
              dateCreated
            },
          }
        }
      }
    }
  `
}