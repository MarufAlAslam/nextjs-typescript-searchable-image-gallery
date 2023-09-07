import type { ImagesResults } from "@/models/Images";
import { ImagesShemaWithPhotos } from "@/models/Images";
import env from "./env";

export default async function fetchImages(
  url: string
): Promise<ImagesResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });

    if (!res.ok) {
      throw new Error("Fetch Images Error! \n");
    }

    const ImagesResults: ImagesResults = await res.json();
    // console.log(ImagesResults);

    // parse the data with zod
    const parsedData = ImagesShemaWithPhotos.parse(ImagesResults);

    if (parsedData.total_results === 0) {
      return undefined;
    } else {
      return parsedData;
    }
  } catch (e) {
    if(e instanceof Error) {
      console.error(e.stack);
    }
  }
}
