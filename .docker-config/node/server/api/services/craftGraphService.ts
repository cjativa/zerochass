
import { CraftAxiosConfig } from '../classes/axiosConfigurations';
import axios from 'axios';

export const executeCraftRequest = async (method: any, body?: any): Promise<any> => {
  const axiosConfig = new CraftAxiosConfig(method, { query: body });

  try {
    const payload = (await axios(axiosConfig)).data.data.entries;
    return payload;
  }

  catch (error) {
    console.log(`An error occurred executing a ${method.toUpperCase()} for the query ${body}`, error);
  }
};


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