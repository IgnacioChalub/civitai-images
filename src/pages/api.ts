import { CardReq } from "./types";

export const fetchImages = async ({ pageParam = null }): Promise<CardReq> => {
    const limit = 20;
    const url = pageParam ? pageParam : `https://civitai.com/api/v1/images?limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};