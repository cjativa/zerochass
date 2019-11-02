
import { Config } from '../../config';
import { Tutorial, TutorialsForContentBanner, TutorialSingle } from '../interfaces/graphql/tutorial';
import { CraftAxiosConfig } from '../classes/axiosConfigurations';
import axios from 'axios';

export class CraftGraphService {

  constructor() {
  }

  async getTutorial(slug: string): Promise<TutorialSingle> {
    const tutorial = (await this.requestHandler('post', tutorialSingleQuery(slug)))[0] as TutorialSingle;
    return tutorial;
  }

  async getTutorials(): Promise<TutorialsForContentBanner[]> {
    const tutorials = await this.requestHandler('post', tutorialContentForBannersQuery()) as TutorialsForContentBanner[];
    return tutorials;
  }

  private async requestHandler(method: any, body?: any): Promise<any> {
    const axiosConfig = new CraftAxiosConfig(method, { query: body });

    try {
      const payload = (await axios(axiosConfig)).data.data.entries;
      return payload;
    }

    catch (error) {
      console.log(`An error occurred executing a ${method.toUpperCase()} for the query ${body}`, error);
    }
  }
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

const allEntriesQuery = () => {
  return `
  query {
    entries(type: "tutorial", status: "live") {
      title,
       ... on tutorials_tutorial_Entry {
        color,
        typeHandle,
        description {
          ...on description_description_BlockType {
            firstLine,
            secondLine
          }
        },
        featuredImage {
          id,
          url
        },
        tags {
          uid,
          id,
          title
        },
        tutorialContent {
          ...on tutorialContent_sectionBlock_BlockType {
            sectionTitle,
            sectionContent,
            id,
            uid,
            dateUpdated, 
            dateCreated, 
            sortOrder,
          },
        }
      },
      ... on tutorialSeries_tutorial_Entry {
        color,
        typeHandle,
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
          id,
          url
        },
        tags {
          uid,
          id,
          title
        },
        tutorialContent {
          ...on tutorialContent_sectionBlock_BlockType {
            sectionTitle,
            sectionContent,
            id,
            uid,
            dateUpdated, 
            dateCreated, 
            sortOrder,
          },
        }
      }
    }
  }
  `
}