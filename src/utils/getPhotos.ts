import axios from 'axios';

export const getPhotos = async (albumId: string): Promise<string[]> => {
  const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g;

  function extractPhotos(content: any): string[] {
    const links = new Set<string>();
    let match;
    while ((match = regex.exec(content))) {
      links.add(match[1]);
    }
    return Array.from(links);
  }

  async function getAlbum(albumId: string): Promise<string[]> {
    const response = await axios.get(`https://photos.app.goo.gl/${albumId}`);
    const photos = extractPhotos(response.data);
    return photos;
  }

  return getAlbum(albumId);
};
