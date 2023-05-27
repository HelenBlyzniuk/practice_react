import { useState, useEffect } from 'react';

import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { getImages } from 'service/image-service';
import { getNormalizePhotos } from 'helpers/helpers';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const handleSubmit = value => {
    setQuery(value);
    setPage(1);
    setPhotos([]);
    setLoadMore(false);
  };
  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchImage() {
      try {
        const {
          data: { photos, total_results },
        } = await getImages({ query, page });
        setLoadMore(page < total_results / 15);
        setPhotos(prevPhotos => [...prevPhotos, ...getNormalizePhotos(photos)]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchImage();
  }, [query, page]);

  const onButtonClick = e => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      {photos.length === 0 && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      {photos.length > 0 && (
        <>
          <Grid>
            {photos.map(({ id, avg_color, alt, large }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
          </Grid>
          {loadMore && <Button onClick={onButtonClick}>Load more...</Button>}
        </>
      )}
    </>
  );
};
